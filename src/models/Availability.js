const mongoose = require('mongoose');

const availabilitySchema = new mongoose.Schema({
  professorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: String, required: true },
  slots: [{ type: String, required: true }],
});

module.exports = mongoose.model('Availability', availabilitySchema);
