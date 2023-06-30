const { getPayments } = require('../repositories/payment.repository')
const { getCosts } = require('../repositories/cost.repository')

const getBalanceService = (_, res) => {

  Promise.all([getCosts(), getPayments()])
    .then(([costs, payments]) => {
      if (!costs || !payments) {
        return res.status(404).json({ error: 'No balance found' });
      }

      let hasCalculationError = false
      let balance = 0

      costs.forEach(cost => {
        if (!isNaN(cost.amount) && cost.amount !== '') {
          balance -= cost.amount
        } else {
          hasCalculationError = true
        }
      })

      payments.forEach(payment => {
        if (!isNaN(payment.amount) && payment.amount !== '') {
          balance += payment.amount
        } else {
          hasCalculationError = true
        }
      })

      return res.status(200).json({
        balance,
        hasCalculationError
      })
    })
    .catch(err => res.status(500).json({ error: err.message }));
}

module.exports = { getBalanceService }