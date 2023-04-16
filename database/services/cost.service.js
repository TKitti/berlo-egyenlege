const costRepository = require('../repositories/cost.repository');

const getCostService = (req, res) => {
  return costRepository
  .getCosts()
  .then((costs) => {
    if (costs) {
      return res.status(200).json(costs);
    }
    return res.status(404).json({ error: 'No costs found' });
  })
  .catch(err => res.status(500).json({ error: err.message }));
};

const createCostService = (req, res) => {
  return costRepository
    .createCost(req.body)
    .then((insertedCost) => {
      if (insertedCost) {
        return res.status(200).json(insertedCost);
      }
      return res.status(404).json({ error: 'No cost was created' });
    })
    .catch(() => {
      res.status(500).json({ error: 'Something went wrong, please try again later.' });
    });
}

module.exports = { getCostService, createCostService }
