const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String
}, { timestamps: { createdAt: 'created_at' } });

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;