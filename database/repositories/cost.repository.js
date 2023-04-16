const costModel = require('../models/cost.model');

const getCosts = () => costModel.find().exec();

module.exports = { getCosts };