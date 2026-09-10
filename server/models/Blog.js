const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true, index: true },
  category: { type: String, default: 'Interior Design' },
  author: { type: String, default: 'Spaces & Places Editorial' },
  readTime: { type: String, default: '5 min read' },
  excerpt: { type: String, default: '' },
  content: { type: String, required: true },
  featuredImage: { type: String, default: '/uploads/living-eye-level.jpg' },
  tags: [{ type: String }],
  metaTitle: { type: String, default: '' },
  metaDescription: { type: String, default: '' },
  published: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema);
