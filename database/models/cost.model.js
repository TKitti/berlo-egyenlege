const mongoose = require('mongoose');

const costSchema = mongoose.Schema({
  date: {type: Date, required: true},
  amount: {type: Number, required: true}
});

module.exports = mongoose.model('Cost', costSchema);