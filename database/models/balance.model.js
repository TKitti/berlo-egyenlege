const mongoose = require('mongoose');

const balanceSchema = mongoose.Schema({
  identity: {type: String, required: true},
  balance: {type: Number, required: true}
});

module.exports = mongoose.model('Balance', balanceSchema);