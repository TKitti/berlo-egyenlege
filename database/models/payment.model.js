const mongoose = require('mongoose');

const paymentSchema = mongoose.Schema({
  date: { type: String, required: true },
  amount: { type: Number, required: true }
});

module.exports = mongoose.model('Payment', paymentSchema);