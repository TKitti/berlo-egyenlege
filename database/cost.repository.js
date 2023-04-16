const Cost = require('../database/models/cost.model');

const getCosts = () => Cost.find().exec();

module.exports = {
  getCosts
}