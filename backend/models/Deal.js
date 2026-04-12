const mongoose = require('mongoose');

const DealSchema = new mongoose.Schema({
  customer: { type: String, required: true },
  value: { type: Number, required: true, default: 0 },
  stage: { type: String, enum: ['New Lead', 'Qualified', 'Proposal', 'Negotiation', 'Closed'], default: 'New Lead' }
});

module.exports = mongoose.model('Deal', DealSchema);
