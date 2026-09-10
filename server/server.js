require('dotenv').config();
const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']); // Ensure proper DNS SRV resolution for MongoDB Atlas

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');

const apiRoutes = require('./routes/api');
const SiteSettings = require('./models/SiteSettings');
const Page = require('./models/Page');
const Blog = require('./models/Blog');
const User = require('./models/User');
const seedDatabase = require('./seedData');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

// Middleware
app.use(cors());
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

// Static uploads folder
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
app.use('/uploads', express.static(uploadsDir));
app.use('/wp-content/uploads', express.static(uploadsDir));

// API Routes
app.use('/api', apiRoutes);

// Dynamic Sitemap Generator
app.get('/sitemap.xml', async (req, res) => {
  try {
    const baseUrl = 'https://spacesandplaces.com.pk';
    let pages = [];
    let blogs = [];

    try {
      pages = await Page.find({ indexRobots: true }, 'slug updatedAt');
      blogs = await Blog.find({ published: true }, 'slug updatedAt');
    } catch (e) {
      const defaultPagesPath = path.join(__dirname, 'data', 'defaultPages.json');
      if (fs.existsSync(defaultPagesPath)) {
        pages = JSON.parse(fs.readFileSync(defaultPagesPath, 'utf8'));
      }
    }

    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    pages.forEach(p => {
      const loc = p.slug === 'home' ? baseUrl + '/' : `${baseUrl}/${p.slug}`;
      const lastmod = p.updatedAt ? new Date(p.updatedAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0];
      const priority = p.slug === 'home' ? '1.0' : p.category === 'main' ? '0.9' : p.category === 'legal' ? '0.5' : '0.8';
      const changefreq = p.slug === 'home' ? 'daily' : 'weekly';

      xml += `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>\n`;
    });

    blogs.forEach(b => {
      const loc = `${baseUrl}/blog/${b.slug}`;
      const lastmod = b.updatedAt ? new Date(b.updatedAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0];
      xml += `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.7</priority>\n  </url>\n`;
    });

    xml += '</urlset>';

    res.header('Content-Type', 'application/xml');
    res.send(xml);
  } catch (err) {
    res.status(500).send('Error generating sitemap');
  }
});

// Dynamic Robots.txt Generator
app.get('/robots.txt', async (req, res) => {
  try {
    let settings = null;
    try {
      settings = await SiteSettings.findOne();
    } catch (e) {}

    const robotsContent = settings && settings.robotsTxt
      ? settings.robotsTxt
      : "User-agent: *\nAllow: /\nDisallow: /admin\nDisallow: /api\nSitemap: https://spacesandplaces.com.pk/sitemap.xml";

    res.header('Content-Type', 'text/plain');
    res.send(robotsContent);
  } catch (err) {
    res.status(500).send('User-agent: *\nAllow: /');
  }
});

// Serve frontend dist if available (production build)
const clientDist = path.resolve(__dirname, '..', 'client', 'dist');
if (fs.existsSync(clientDist)) {
  app.use(express.static(clientDist));
  app.get('*', (req, res) => {
    res.sendFile(path.join(clientDist, 'index.html'));
  });
}

// Connect to MongoDB Atlas and Start Server
async function startServer() {
  try {
    if (MONGODB_URI) {
      console.log('Connecting to MongoDB Atlas...');
      await mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 8000 });
      console.log('MongoDB Atlas connected successfully!');
      
      // Seed database
      await seedDatabase({ SiteSettings, Page, Blog, User });
    } else {
      console.warn('MONGODB_URI not provided. Running in standalone fallback mode.');
    }

    const server = app.listen(PORT, () => {
      console.log(`Spaces & Places Server running on port ${PORT}`);
      console.log(`Frontend Application: http://localhost:${PORT}`);
      console.log(`API available at: http://localhost:${PORT}/api`);
      console.log(`cPanel Admin: http://localhost:${PORT}/admin`);
      console.log(`Sitemap available at: http://localhost:${PORT}/sitemap.xml`);
      console.log(`Robots.txt available at: http://localhost:${PORT}/robots.txt`);
    });

    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use by another running instance.`);
        console.log(`The application is already live at: http://localhost:${PORT}`);
      } else {
        console.error('Server error:', err);
      }
    });
  } catch (err) {
    console.error('Database connection error:', err.message);
    const server = app.listen(PORT, () => {
      console.log(`Server started in standalone fallback mode on port ${PORT}`);
    });
    server.on('error', (e) => {
      if (e.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use.`);
      }
    });
  }
}

if (require.main === module) {
  startServer();
} else {
  if (MONGODB_URI && mongoose.connection.readyState === 0) {
    mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 8000 }).catch(err => {
      console.error('Serverless Mongo connect error:', err.message);
    });
  }
}

module.exports = app;
