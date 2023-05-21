const { checkPassword, WrongPasswordError } = require("./password.service")
const paymentRepository = require('../repositories/payment.repository')
const { addToBalance } = require('../repositories/balance.repository')

const getPaymentsService = (req, res) => {
  return paymentRepository
    .getPayments()
    .then((payments) => {
      if (payments) {
        return res.status(200).json(payments)
      }
      return res.status(404).json({ error: 'No payments found' })
    })
    .catch(err => res.status(500).json({ error: err.message }))
}

const createPaymentService = (req, res) => {

  checkPassword(req.body, res)
    .then((_) => createPayment(req, res))
    .catch(error => {
      if (error instanceof WrongPasswordError) {
        console.error("Creating the payment was not possible, due to: " + error.message)
        return res.status(403).json({ error: 'Something went wrong, please try again later.' })

      } else {
        throw error
      }
    })
}

const createPayment = (req, res) => {

  paymentRepository
    .createPayment(req.body)
    .then((insertedPayment) => {
      
      if (insertedPayment) {
        addToBalance(req.body.amount)
          .catch(e => { throw e })

        return res.status(201)
      }
      return res.status(404).json({ error: 'No payment was created' })
    })
    .catch((_) => {
      return res.status(500).json({ error: 'Something went wrong, please try again later.' })
    })
}

module.exports = { getPaymentsService, createPaymentService }