const mongoose = require('mongoose');

const SupportTicketSchema = new mongoose.Schema({
  issue: { type: String, required: true },
  status: { type: String, default: 'Open' },
}, { timestamps: true });

module.exports = mongoose.model('SupportTicket', SupportTicketSchema);
