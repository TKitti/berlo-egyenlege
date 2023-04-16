const costRepository = require('../repositories/cost.repository');

const costService = (req, res) => {
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

module.exports = { costService }
