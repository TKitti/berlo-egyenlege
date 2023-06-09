const balanceRepository = require('../repositories/balance.repository');

const getBalanceService = (_, res) => {
  return balanceRepository
    .getBalance()
    .then((balance) => {
      if (balance && balance.length > 0) {
        console.log("actual balance", balance[0].balance);

        return res.status(200).json(balance);
      }
      return res.status(404).json({ error: 'No balance found' });
    })
    .catch(err => res.status(500).json({ error: err.message }));
}

module.exports = { getBalanceService }