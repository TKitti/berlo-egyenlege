const mongoose = require('mongoose');

const costSchema = mongoose.Schema({
  date: { type: String, required: true },
  amount: { type: Number, required: true }
});

module.exports = mongoose.model('Cost', costSchema);