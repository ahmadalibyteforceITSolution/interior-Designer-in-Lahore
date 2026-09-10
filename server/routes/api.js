const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const auth = require('../middleware/auth');
const SiteSettings = require('../models/SiteSettings');
const Page = require('../models/Page');
const Blog = require('../models/Blog');
const Lead = require('../models/Lead');
const User = require('../models/User');

let defaultPages = [];
let defaultSettings = {};
try {
  defaultPages = require('../data/defaultPages.json');
} catch (e) {}
try {
  defaultSettings = require('../data/defaultSettings.json');
} catch (e) {}

const JWT_SECRET = process.env.JWT_SECRET || 'spaces_and_places_super_secret_jwt_key_2026';

// Configure Multer for image uploads
const uploadsDir = path.resolve(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const cleanName = file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_');
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + cleanName);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 15 * 1024 * 1024 }, // 15MB limit
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|webp|svg|gif|mp4/;
    const ext = path.extname(file.originalname).toLowerCase().replace('.', '');
    if (allowed.test(ext)) {
      return cb(null, true);
    }
    cb(new Error('Only image files and MP4 videos are allowed'));
  }
});

// In-Memory Server Cache for Ultra-Fast Sub-10ms API Responses
const serverCache = new Map();

function getCached(key, ttl = 180000) {
  const item = serverCache.get(key);
  if (item && (Date.now() - item.time < ttl)) {
    return item.data;
  }
  return null;
}

function setCached(key, data) {
  serverCache.set(key, { data, time: Date.now() });
}

function clearServerCache() {
  serverCache.clear();
}

// ==========================================
// 1. AUTHENTICATION ROUTES
// ==========================================

router.post('/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password required' });
    }

    const user = await User.findOne({ username: username.toLowerCase() });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        name: user.name,
        role: user.role
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.get('/auth/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.post('/auth/change-password', auth, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Current password does not match' });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// ==========================================
// 2. SITE SETTINGS & ADSENSE
// ==========================================

router.get('/settings', async (req, res) => {
  try {
    res.set('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=86400');
    const cached = getCached('settings');
    if (cached) return res.json(cached);

    let settings = null;
    if (mongoose.connection.readyState === 1) {
      try {
        settings = await SiteSettings.findOne();
      } catch (dbErr) {
        console.warn('DB settings read error:', dbErr.message);
      }
    }

    const finalData = settings || defaultSettings || {};
    setCached('settings', finalData);
    return res.json(finalData);
  } catch (err) {
    return res.json(defaultSettings || {});
  }
});

router.put('/settings', auth, async (req, res) => {
  try {
    clearServerCache();
    let settings = await SiteSettings.findOne();
    if (!settings) {
      settings = new SiteSettings(req.body);
    } else {
      Object.assign(settings, req.body);
    }
    await settings.save();
    res.json({ message: 'Site settings updated successfully', settings });
  } catch (err) {
    res.status(500).json({ message: 'Error updating settings', error: err.message });
  }
});

// ==========================================
// 3. PAGES & CMS SECTION EDITOR
// ==========================================

router.get('/pages', async (req, res) => {
  try {
    res.set('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=86400');
    const cached = getCached('pages_list');
    if (cached) return res.json(cached);

    let pages = [];
    if (mongoose.connection.readyState === 1) {
      try {
        pages = await Page.find({}, 'slug title category metaTitle updatedAt').sort({ category: 1, title: 1 });
      } catch (dbErr) {
        console.warn('DB pages read error:', dbErr.message);
      }
    }

    if (!pages || pages.length === 0) {
      pages = (defaultPages || []).map(p => ({
        slug: p.slug,
        title: p.title,
        category: p.category,
        metaTitle: p.metaTitle,
        updatedAt: p.updatedAt || new Date().toISOString()
      }));
    }
    setCached('pages_list', pages);
    return res.json(pages);
  } catch (err) {
    const fallbackList = (defaultPages || []).map(p => ({
      slug: p.slug,
      title: p.title,
      category: p.category,
      metaTitle: p.metaTitle,
      updatedAt: new Date().toISOString()
    }));
    return res.json(fallbackList);
  }
});

router.get('/pages/:slug', async (req, res) => {
  try {
    res.set('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=86400');
    const slug = req.params.slug;
    const cacheKey = `page_${slug}`;
    const cached = getCached(cacheKey);
    if (cached) return res.json(cached);

    let page = null;
    if (mongoose.connection.readyState === 1) {
      try {
        page = await Page.findOne({ slug });
      } catch (dbErr) {
        console.warn(`DB read error for ${slug}:`, dbErr.message);
      }
    }

    if (!page) {
      page = (defaultPages || []).find(p => p.slug === slug);
    }

    if (!page) {
      return res.status(404).json({ message: 'Page not found' });
    }

    setCached(cacheKey, page);
    return res.json(page);
  } catch (err) {
    const fallback = (defaultPages || []).find(p => p.slug === req.params.slug);
    if (fallback) return res.json(fallback);
    return res.status(404).json({ message: 'Page not found' });
  }
});

router.put('/pages/:slug', auth, async (req, res) => {
  try {
    const updateData = req.body;
    const page = await Page.findOneAndUpdate(
      { slug: req.params.slug },
      { $set: updateData },
      { new: true, upsert: true }
    );
    res.json({ message: 'Page updated successfully', page });
  } catch (err) {
    res.status(500).json({ message: 'Error updating page', error: err.message });
  }
});

router.post('/pages', auth, async (req, res) => {
  try {
    const { slug, title, category } = req.body;
    if (!slug || !title) {
      return res.status(400).json({ message: 'Slug and title are required' });
    }
    const existing = await Page.findOne({ slug });
    if (existing) {
      return res.status(400).json({ message: 'Page slug already exists' });
    }
    const newPage = new Page(req.body);
    await newPage.save();
    res.status(201).json({ message: 'Page created successfully', page: newPage });
  } catch (err) {
    res.status(500).json({ message: 'Error creating page', error: err.message });
  }
});

router.delete('/pages/:slug', auth, async (req, res) => {
  try {
    const deleted = await Page.findOneAndDelete({ slug: req.params.slug });
    if (!deleted) return res.status(404).json({ message: 'Page not found' });
    res.json({ message: 'Page deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting page', error: err.message });
  }
});

// ==========================================
// 4. SEO & CPANEL HUB
// ==========================================

router.get('/seo', async (req, res) => {
  try {
    const pages = await Page.find({}, 'slug title category metaTitle metaDescription focusKeywords canonicalUrl ogImage indexRobots updatedAt');
    res.json(pages);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching SEO items', error: err.message });
  }
});

router.put('/seo/:slug', auth, async (req, res) => {
  try {
    const { metaTitle, metaDescription, focusKeywords, canonicalUrl, ogImage, indexRobots } = req.body;
    const updated = await Page.findOneAndUpdate(
      { slug: req.params.slug },
      { $set: { metaTitle, metaDescription, focusKeywords, canonicalUrl, ogImage, indexRobots } },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Page not found' });
    res.json({ message: 'SEO updated successfully', page: updated });
  } catch (err) {
    res.status(500).json({ message: 'Error updating SEO', error: err.message });
  }
});

router.get('/seo/robots', async (req, res) => {
  try {
    const settings = await SiteSettings.findOne();
    const robots = settings && settings.robotsTxt
      ? settings.robotsTxt
      : "User-agent: *\nAllow: /\nDisallow: /admin\nDisallow: /api\nSitemap: https://spacesandplaces.com.pk/sitemap.xml";
    res.json({ robotsTxt: robots });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching robots.txt', error: err.message });
  }
});

router.put('/seo/robots', auth, async (req, res) => {
  try {
    const { robotsTxt } = req.body;
    let settings = await SiteSettings.findOne();
    if (!settings) {
      settings = new SiteSettings({ robotsTxt });
    } else {
      settings.robotsTxt = robotsTxt;
    }
    await settings.save();
    res.json({ message: 'robots.txt updated successfully', robotsTxt });
  } catch (err) {
    res.status(500).json({ message: 'Error saving robots.txt', error: err.message });
  }
});

// ==========================================
// 5. BLOG CMS
// ==========================================

router.get('/blogs', async (req, res) => {
  try {
    res.set('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=86400');
    const { category, search } = req.query;
    let query = {};
    if (category && category !== 'All') {
      query.category = category;
    }
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { excerpt: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }
    let blogs = [];
    try {
      blogs = await Blog.find(query).sort({ createdAt: -1 });
    } catch (dbErr) {
      console.warn('DB read error for blogs:', dbErr.message);
    }
    res.json(blogs || []);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching blogs', error: err.message });
  }
});

router.get('/blogs/:slug', async (req, res) => {
  try {
    res.set('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=86400');
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) return res.status(404).json({ message: 'Blog post not found' });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching blog', error: err.message });
  }
});

router.post('/blogs', auth, async (req, res) => {
  try {
    const newBlog = new Blog(req.body);
    await newBlog.save();
    res.status(201).json({ message: 'Blog post created successfully', blog: newBlog });
  } catch (err) {
    res.status(500).json({ message: 'Error creating blog', error: err.message });
  }
});

router.put('/blogs/:id', auth, async (req, res) => {
  try {
    const updated = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Blog not found' });
    res.json({ message: 'Blog updated successfully', blog: updated });
  } catch (err) {
    res.status(500).json({ message: 'Error updating blog', error: err.message });
  }
});

router.delete('/blogs/:id', auth, async (req, res) => {
  try {
    const deleted = await Blog.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Blog not found' });
    res.json({ message: 'Blog deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting blog', error: err.message });
  }
});

// ==========================================
// 6. INQUIRIES & LEADS
// ==========================================

router.post('/leads', async (req, res) => {
  try {
    const { name, email, phone, service, message, source } = req.body;
    if (!name || !email) {
      return res.status(400).json({ message: 'Name and email are required' });
    }
    const lead = new Lead({
      name,
      email,
      phone: phone || '',
      service: service || 'General Consultation',
      message: message || '',
      source: source || 'contact_form'
    });
    await lead.save();
    res.status(201).json({ message: 'Inquiry received successfully! We will contact you soon.', lead });
  } catch (err) {
    res.status(500).json({ message: 'Error saving inquiry', error: err.message });
  }
});

router.get('/leads', auth, async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.json(leads);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching leads', error: err.message });
  }
});

router.put('/leads/:id', auth, async (req, res) => {
  try {
    const updated = await Lead.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Lead not found' });
    res.json({ message: 'Lead status updated', lead: updated });
  } catch (err) {
    res.status(500).json({ message: 'Error updating lead', error: err.message });
  }
});

router.delete('/leads/:id', auth, async (req, res) => {
  try {
    const deleted = await Lead.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Lead not found' });
    res.json({ message: 'Lead deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting lead', error: err.message });
  }
});

// ==========================================
// 7. MEDIA LIBRARY
// ==========================================

router.get('/media', async (req, res) => {
  try {
    const files = fs.readdirSync(uploadsDir);
    const mediaList = files
      .filter(file => !file.startsWith('.'))
      .map(file => {
        const full = path.join(uploadsDir, file);
        const stat = fs.statSync(full);
        return {
          name: file,
          url: `/uploads/${file}`,
          size: stat.size,
          updatedAt: stat.mtime
        };
      })
      .sort((a, b) => b.updatedAt - a.updatedAt);
    res.json(mediaList);
  } catch (err) {
    res.status(500).json({ message: 'Error reading media directory', error: err.message });
  }
});

router.post('/media/upload', auth, upload.single('file'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    res.status(201).json({
      message: 'File uploaded successfully',
      file: {
        name: req.file.filename,
        url: `/uploads/${req.file.filename}`,
        size: req.file.size
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Error uploading file', error: err.message });
  }
});

router.delete('/media/:filename', auth, (req, res) => {
  try {
    const filePath = path.join(uploadsDir, req.params.filename);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      return res.json({ message: 'File deleted successfully' });
    }
    res.status(404).json({ message: 'File not found' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting file', error: err.message });
  }
});

module.exports = router;
