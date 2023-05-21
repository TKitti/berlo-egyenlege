const balanceModel = require('../models/balance.model').default;

const getBalance = () => balanceModel.find({ "identity": "balanceID" }).exec();
const updateBalance = (newBalance) => balanceModel.updateOne({ "identity": "balanceID" }, { "balance": newBalance });

module.exports = { updateBalance, getBalance };