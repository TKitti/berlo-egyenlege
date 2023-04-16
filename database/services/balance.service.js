const balanceRepository = require('../repositories/balance.repository');

const getBalanceService = (req, res) => {
  return balanceRepository
  .getBalance()
  .then((balance) => {
    if (balance && balance.length > 0) {
      console.log("actual balance", balance[0].balance);
      
      //TODO: update view
      
      return res.status(200).json(balance);
    }
    return res.status(404).json({ error: 'No balance found' });
  })
  .catch(err => res.status(500).json({ error: err.message }));
}

const updateBalanceService = (req, res) => {
  return balanceRepository
  .updateBalance()
  .then(() => {
      if (res.modifiedCount === 1) {
        return res.status(200).json();
      }
      return res.status(404).json({ error: 'Balance could not be updated' });
    })
    .catch(err => res.status(500).json({ error: err.message }));
};

module.exports = {updateBalanceService,getBalanceService}