const mongoose = require('mongoose');

const siteSettingsSchema = new mongoose.Schema({
  siteName: { type: String, default: 'SPACES & PLACES' },
  tagline: { type: String, default: 'Interior Designer and Architects in Lahore' },
  phone: { type: String, default: '+92 300 1999967' },
  whatsapp: { type: String, default: '+923001999967' },
  email: { type: String, default: 'info@spacesandplaces.com.pk' },
  address: { type: String, default: 'Spaces & Places Studio, Lahore, Punjab, Pakistan' },
  workingHours: { type: String, default: 'Monday - Saturday: 9:00 AM - 7:00 PM' },
  logoUrl: { type: String, default: '/uploads/header-logo.webp' },
  logoDarkUrl: { type: String, default: '/logo-dark.png' },
  footerLogoUrl: { type: String, default: '/uploads/SP-Logo-for-web-footer-1.png' },
  adsensePublisherId: { type: String, default: 'ca-pub-XXXXXXXXXXXXXXXX' },
  adsenseEnabled: { type: Boolean, default: true },
  adSlots: {
    header: { type: Boolean, default: true },
    inArticle: { type: Boolean, default: true },
    sidebar: { type: Boolean, default: true },
    footer: { type: Boolean, default: true }
  },
  googleAnalyticsId: { type: String, default: 'G-XXXXXXXXXX' },
  googleSiteVerification: { type: String, default: '' },
  robotsTxt: {
    type: String,
    default: "User-agent: *\nAllow: /\nDisallow: /admin\nDisallow: /api\nSitemap: https://spacesandplaces.com.pk/sitemap.xml"
  },
  socialLinks: {
    facebook: { type: String, default: 'https://facebook.com/spacesandplaces' },
    instagram: { type: String, default: 'https://instagram.com/spacesandplaces' },
    linkedin: { type: String, default: 'https://linkedin.com/company/spacesandplaces' },
    youtube: { type: String, default: 'https://youtube.com' }
  }
}, { timestamps: true });

module.exports = mongoose.model('SiteSettings', siteSettingsSchema);
