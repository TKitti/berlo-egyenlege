const balanceModel = require('../models/balance.model')

const getBalance = () => balanceModel.find({ "identity": "balanceID" }).exec()
const addToBalance = (diff) => balanceModel.updateOne({ "identity": "balanceID" }, { $inc: { "balance": diff } })

module.exports = { getBalance, addToBalance }