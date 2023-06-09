const passwordModel = require('../models/password.model');

const getPasswords = () => passwordModel.find().exec();

module.exports = { getPasswords };