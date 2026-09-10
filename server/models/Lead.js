const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, default: '' },
  service: { type: String, default: 'General Inquiry' },
  message: { type: String, default: '' },
  source: { type: String, default: 'website' }, // 'contact_page', 'lets_talk_modal', 'quick_consultation'
  status: { type: String, enum: ['new', 'contacted', 'in_progress', 'completed', 'archived'], default: 'new' },
  notes: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Lead', leadSchema);
