const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');

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

// In-Memory Server Cache with Instant Mutation Invalidation
const serverCache = new Map();

function setNoCacheHeaders(res) {
  res.set('Cache-Control', 'no-cache, no-store, must-revalidate, max-age=0');
  res.set('Pragma', 'no-cache');
  res.set('Expires', '0');
}

function getCached(key, ttl = 30000) {
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

const DEFAULT_MONGODB_URI = 'mongodb+srv://ahmedalihafeez25_db_user:%40Sublime12345@cluster0.oe0inne.mongodb.net/spaceandplaces?retryWrites=true&w=majority';
const MONGODB_URI = process.env.MONGODB_URI || DEFAULT_MONGODB_URI;

async function ensureDb() {
  if (mongoose.connection.readyState !== 1) {
    try {
      await mongoose.connect(MONGODB_URI, {
        serverSelectionTimeoutMS: 5000,
        maxPoolSize: 10
      });
    } catch (err) {
      console.warn('DB connect warning in api.js:', err.message);
    }
  }
}

function getIdOrSlugQuery(identifier) {
  if (!identifier) return {};
  if (mongoose.Types.ObjectId.isValid(identifier) && identifier.length === 24) {
    return { $or: [{ _id: identifier }, { slug: identifier }] };
  }
  return { slug: identifier };
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
    setNoCacheHeaders(res);
    const cached = getCached('settings');
    if (cached) return res.json(cached);

    await ensureDb();
    let settings = null;
    try {
      settings = await SiteSettings.findOne();
    } catch (dbErr) {
      console.warn('DB settings read error:', dbErr.message);
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
    await ensureDb();
    let settings = await SiteSettings.findOne();
    if (!settings) {
      settings = new SiteSettings(req.body);
    } else {
      Object.assign(settings, req.body);
    }
    await settings.save();
    clearServerCache();
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
    setNoCacheHeaders(res);
    const cached = getCached('pages_list');
    if (cached) return res.json(cached);

    await ensureDb();
    let pages = [];
    try {
      pages = await Page.find({}, '_id slug title category metaTitle updatedAt').sort({ category: 1, title: 1 });
    } catch (dbErr) {
      console.warn('DB pages read error:', dbErr.message);
    }

    if (!pages || pages.length === 0) {
      pages = (defaultPages || []).map(p => ({
        _id: p._id,
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
      _id: p._id,
      slug: p.slug,
      title: p.title,
      category: p.category,
      metaTitle: p.metaTitle,
      updatedAt: new Date().toISOString()
    }));
    return res.json(fallbackList);
  }
});

router.get('/pages/:identifier', async (req, res) => {
  try {
    setNoCacheHeaders(res);
    const identifier = req.params.identifier;
    const cacheKey = `page_${identifier}`;
    const cached = getCached(cacheKey);
    if (cached) return res.json(cached);

    await ensureDb();
    let page = null;
    try {
      page = await Page.findOne(getIdOrSlugQuery(identifier));
    } catch (dbErr) {
      console.warn(`DB read error for ${identifier}:`, dbErr.message);
    }

    if (!page) {
      page = (defaultPages || []).find(p => p.slug === identifier || (p._id && p._id.toString() === identifier));
    }

    if (!page) {
      return res.status(404).json({ message: 'Page not found' });
    }

    setCached(cacheKey, page);
    return res.json(page);
  } catch (err) {
    const fallback = (defaultPages || []).find(p => p.slug === req.params.identifier || (p._id && p._id.toString() === req.params.identifier));
    if (fallback) return res.json(fallback);
    return res.status(404).json({ message: 'Page not found' });
  }
});

router.put('/pages/:identifier', auth, async (req, res) => {
  try {
    clearServerCache();
    await ensureDb();
    const identifier = req.params.identifier;
    const query = getIdOrSlugQuery(identifier);
    const updateData = req.body;
    updateData.updatedAt = new Date();

    const page = await Page.findOneAndUpdate(
      query,
      { $set: updateData },
      { new: true, upsert: true }
    );
    clearServerCache();
    res.json({ message: 'Page updated successfully', page });
  } catch (err) {
    res.status(500).json({ message: 'Error updating page', error: err.message });
  }
});

router.post('/pages', auth, async (req, res) => {
  try {
    clearServerCache();
    await ensureDb();
    const { slug, title, category } = req.body;
    if (!slug || !title) {
      return res.status(400).json({ message: 'Slug and title are required' });
    }

    const cleanSlug = slug.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    if (!cleanSlug) {
      return res.status(400).json({ message: 'Invalid slug generated' });
    }

    const existing = await Page.findOne({ slug: cleanSlug });
    if (existing) {
      return res.status(400).json({ message: `Page route /${cleanSlug} already exists.` });
    }

    const pagePayload = {
      slug: cleanSlug,
      title: title.trim(),
      category: category || 'interior-design',
      metaTitle: req.body.metaTitle || `${title.trim()} | Spaces & Places Lahore`,
      metaDescription: req.body.metaDescription || `Discover bespoke luxury ${title.trim()} by Spaces & Places, leading architects and interior designers in Lahore.`,
      focusKeywords: req.body.focusKeywords || `${title.trim()}, Interior Designers in Lahore, Architects in Lahore`,
      canonicalUrl: req.body.canonicalUrl || `https://spacesandplaces.com.pk/${cleanSlug}`,
      ogImage: req.body.ogImage || '/uploads/living-eye-level.jpg',
      indexRobots: req.body.indexRobots !== undefined ? req.body.indexRobots : true,
      hero: req.body.hero || {
        badge: 'SPACES & PLACES',
        title: title.trim().toUpperCase(),
        subtitle: 'From concept to turnkey delivery, we combine creativity, precision, and craftsmanship to design breathtaking spaces.',
        bgImage: '/uploads/living-eye-level.jpg',
        bgVideo: '',
        ctaText: "LET'S TALK",
        ctaLink: '/contact'
      },
      overview: req.body.overview || {
        badge: 'OVERVIEW & PRACTICE',
        title: `Mastering ${title.trim()} in Lahore`,
        subtitle: 'Bespoke design concepts paired with uncompromising structural craftsmanship.',
        paragraph1: `Spaces & Places is an acclaimed design and architectural firm established in Lahore. We specialize in bespoke ${title.trim()}, combining spatial ergonomics with timeless aesthetics.`,
        paragraph2: 'Our team of licensed architects, interior designers, 3D visualizers, and site engineers ensure every marla is utilized to its pinnacle of elegance and functionality.',
        highlights: [
          'Turnkey solutions from conceptual blueprints to final decor',
          'In-house custom solid wood and brass furniture manufacturing',
          'Photorealistic 3D CGI visualizations and lighting models',
          'Rigorous BOQ transparency and timeline guarantees'
        ],
        image: '/uploads/01-01-8.jpg'
      },
      sections: req.body.sections || [
        {
          id: 'sec-' + Date.now() + '-1',
          title: 'Spatial Planning & Architecture',
          subtitle: 'Phase 01',
          description: 'Meticulous layout drafting, lighting zoning, and spatial flow optimization tailored to your lifestyle.',
          icon: 'Palette',
          image: '/uploads/01-02-9.jpg',
          points: ['Ergonomic zoning', 'Photorealistic 3D walk-throughs', 'LDA and society bylaws compliance']
        },
        {
          id: 'sec-' + Date.now() + '-2',
          title: 'Premium Structural Execution',
          subtitle: 'Phase 02',
          description: 'Uncompromising engineering supervision using A-grade materials, structural testing, and precision joinery.',
          icon: 'Building2',
          image: '/uploads/01-03-7.jpg',
          points: ['Structural site engineers on-premise', 'PPRC pressure testing', 'Imported porcelain tile & marble']
        },
        {
          id: 'sec-' + Date.now() + '-3',
          title: 'Bespoke Furniture & Handover',
          subtitle: 'Phase 03',
          description: 'Handcrafted luxury solid wood furniture, bespoke architectural illumination, and turnkey handover.',
          icon: 'Armchair',
          image: '/uploads/01-05-6.jpg',
          points: ['Factory direct woodwork', 'Warm 2700K ambient illumination', '100% turnkey handover guarantee']
        }
      ],
      gallery: req.body.gallery || [
        { title: `${title.trim()} Showcase 01`, image: '/uploads/01-01-8.jpg', category: 'Showcase', alt: `${title} luxury design` },
        { title: `${title.trim()} Showcase 02`, image: '/uploads/01-02-9.jpg', category: 'Showcase', alt: `${title} modern lounge` },
        { title: `${title.trim()} Showcase 03`, image: '/uploads/01-03-7.jpg', category: 'Showcase', alt: `${title} executive finish` }
      ],
      faqs: req.body.faqs || [
        {
          question: `What makes Spaces & Places unique for ${title.trim()}?`,
          answer: 'Spaces & Places delivers a fully unified lifecycle under one roof: architectural blueprints, 3D photorealistic visualizations, full-scale construction, and custom furniture manufacturing.'
        },
        {
          question: 'Do you consult outside Lahore in other cities?',
          answer: 'Yes! While our primary studio is based in DHA Phase 6 Lahore, we design and consult across Islamabad, Rawalpindi, Faisalabad, and Karachi.'
        }
      ],
      cta: req.body.cta || {
        title: `Ready to Bring Your ${title.trim()} Vision to Life?`,
        subtitle: 'Book a discovery session with our lead architects and interior styling consultants in Lahore.',
        buttonText: 'BOOK A CONSULTATION',
        buttonLink: '/contact'
      }
    };

    const newPage = new Page(pagePayload);
    await newPage.save();
    clearServerCache();
    res.status(201).json({ message: 'Page created successfully', page: newPage });
  } catch (err) {
    res.status(500).json({ message: 'Error creating page', error: err.message });
  }
});

router.delete('/pages/:identifier', auth, async (req, res) => {
  try {
    clearServerCache();
    await ensureDb();
    const identifier = req.params.identifier;
    const query = getIdOrSlugQuery(identifier);
    const existing = await Page.findOne(query);

    const PROTECTED_PAGES = ['home', 'about-us', 'our-clients', 'contact', 'blogs', 'privacy-policy', 'terms-conditions', 'disclaimer'];
    if (existing && PROTECTED_PAGES.includes(existing.slug)) {
      return res.status(400).json({ message: 'Core system pages cannot be deleted.' });
    }
    if (PROTECTED_PAGES.includes(identifier)) {
      return res.status(400).json({ message: 'Core system pages cannot be deleted.' });
    }

    const deleted = await Page.findOneAndDelete(query);
    if (!deleted) return res.status(404).json({ message: 'Page not found' });
    clearServerCache();
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
    setNoCacheHeaders(res);
    await ensureDb();
    const pages = await Page.find({}, '_id slug title category metaTitle metaDescription focusKeywords canonicalUrl ogImage indexRobots updatedAt');
    res.json(pages);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching SEO items', error: err.message });
  }
});

router.put('/seo/:identifier', auth, async (req, res) => {
  try {
    clearServerCache();
    await ensureDb();
    const { metaTitle, metaDescription, focusKeywords, canonicalUrl, ogImage, indexRobots } = req.body;
    const query = getIdOrSlugQuery(req.params.identifier);
    const updated = await Page.findOneAndUpdate(
      query,
      { $set: { metaTitle, metaDescription, focusKeywords, canonicalUrl, ogImage, indexRobots } },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Page not found' });
    clearServerCache();
    res.json({ message: 'SEO updated successfully', page: updated });
  } catch (err) {
    res.status(500).json({ message: 'Error updating SEO', error: err.message });
  }
});

router.get('/seo/robots', async (req, res) => {
  try {
    setNoCacheHeaders(res);
    await ensureDb();
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
    clearServerCache();
    await ensureDb();
    const { robotsTxt } = req.body;
    let settings = await SiteSettings.findOne();
    if (!settings) {
      settings = new SiteSettings({ robotsTxt });
    } else {
      settings.robotsTxt = robotsTxt;
    }
    await settings.save();
    clearServerCache();
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
    setNoCacheHeaders(res);
    await ensureDb();
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

router.get('/blogs/:identifier', async (req, res) => {
  try {
    setNoCacheHeaders(res);
    await ensureDb();
    const blog = await Blog.findOne(getIdOrSlugQuery(req.params.identifier));
    if (!blog) return res.status(404).json({ message: 'Blog post not found' });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching blog', error: err.message });
  }
});

router.post('/blogs', auth, async (req, res) => {
  try {
    clearServerCache();
    await ensureDb();
    if (!req.body.excerpt) {
      const stripped = (req.body.content || '').replace(/<[^>]+>/g, '').trim();
      req.body.excerpt = stripped.slice(0, 160) || req.body.title || 'Spaces & Places architectural and interior design journal.';
    }
    const newBlog = new Blog(req.body);
    await newBlog.save();
    clearServerCache();
    res.status(201).json({ message: 'Blog post created successfully', blog: newBlog });
  } catch (err) {
    res.status(500).json({ message: 'Error creating blog', error: err.message });
  }
});

router.put('/blogs/:identifier', auth, async (req, res) => {
  try {
    clearServerCache();
    await ensureDb();
    const query = getIdOrSlugQuery(req.params.identifier);
    const updated = await Blog.findOneAndUpdate(query, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Blog not found' });
    clearServerCache();
    res.json({ message: 'Blog updated successfully', blog: updated });
  } catch (err) {
    res.status(500).json({ message: 'Error updating blog', error: err.message });
  }
});

router.delete('/blogs/:identifier', auth, async (req, res) => {
  try {
    clearServerCache();
    await ensureDb();
    const query = getIdOrSlugQuery(req.params.identifier);
    const deleted = await Blog.findOneAndDelete(query);
    if (!deleted) return res.status(404).json({ message: 'Blog not found' });
    clearServerCache();
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
    await ensureDb();
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
    await ensureDb();
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.json(leads);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching leads', error: err.message });
  }
});

router.put('/leads/:id', auth, async (req, res) => {
  try {
    await ensureDb();
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
