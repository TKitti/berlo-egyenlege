const paymentModel = require('../models/payment.model');

const getPayments = () => paymentModel.find().exec();
const createPayment = (payment) => new paymentModel(payment).save();

module.exports = { getPayments, createPayment };