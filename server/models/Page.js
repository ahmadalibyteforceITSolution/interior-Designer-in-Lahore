const mongoose = require('mongoose');

const pageSectionSchema = new mongoose.Schema({
  id: { type: String },
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  description: { type: String, default: '' },
  icon: { type: String, default: '' },
  image: { type: String, default: '' },
  points: [{ type: String }]
}, { _id: false });

const faqSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true }
}, { _id: false });

const galleryItemSchema = new mongoose.Schema({
  title: { type: String, default: '' },
  image: { type: String, required: true },
  category: { type: String, default: 'General' },
  alt: { type: String, default: '' }
}, { _id: false });

const pageSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true, index: true },
  title: { type: String, required: true },
  category: { 
    type: String, 
    enum: ['main', 'interior-design', 'architectural-designs', 'construction-services', 'furniture', 'legal'],
    default: 'main'
  },
  
  // SEO fields
  metaTitle: { type: String, default: '' },
  metaDescription: { type: String, default: '' },
  focusKeywords: { type: String, default: '' },
  canonicalUrl: { type: String, default: '' },
  ogImage: { type: String, default: '' },
  indexRobots: { type: Boolean, default: true },

  // Section 1: Hero
  hero: {
    title: { type: String, default: '' },
    subtitle: { type: String, default: '' },
    bgImage: { type: String, default: '' },
    bgVideo: { type: String, default: '' },
    ctaText: { type: String, default: "LET'S TALK" },
    ctaLink: { type: String, default: "/contact" },
    badge: { type: String, default: "SPACES & PLACES" }
  },

  // Section 2: Intro & Overview
  overview: {
    badge: { type: String, default: 'EXCELLENCE & CRAFTSMANSHIP' },
    title: { type: String, default: '' },
    subtitle: { type: String, default: '' },
    paragraph1: { type: String, default: '' },
    paragraph2: { type: String, default: '' },
    highlights: [{ type: String }],
    image: { type: String, default: '' }
  },

  // Section 3: Detailed Sections & Cards (fully editable/deletable)
  sections: [pageSectionSchema],

  // Section 4: Project Showcase / Gallery
  gallery: [galleryItemSchema],

  // Section 5: FAQs (for SEO & Schema richness)
  faqs: [faqSchema],

  // Section 6: Bottom Call to Action
  cta: {
    title: { type: String, default: 'Ready to Transform Your Space in Lahore?' },
    subtitle: { type: String, default: 'Schedule a private consultation with our master architects and interior designers today.' },
    buttonText: { type: String, default: 'BOOK CONSULTATION' },
    buttonLink: { type: String, default: '/contact' }
  }
}, { timestamps: true });

module.exports = mongoose.model('Page', pageSchema);
