const mongoose = require('mongoose');

const paymentSchema = mongoose.Schema({
  date: { type: Number, required: true },
  amount: { type: Number, required: true }
});

module.exports = mongoose.model('Payment', paymentSchema);