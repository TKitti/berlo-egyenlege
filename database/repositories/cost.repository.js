const costModel = require('../models/cost.model');

const getCosts = () => costModel.find().exec();
const createCost = (cost) => new costModel(cost).save();

module.exports = { getCosts, createCost };