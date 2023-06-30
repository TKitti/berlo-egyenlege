const { checkPassword } = require("./password.service")
const paymentRepository = require('../repositories/payment.repository')
const { addToBalance } = require('../repositories/balance.repository')
const { validate } = require("../../validators")

const getPaymentsService = (_, res) => {
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
  validate("Payment", req.body.payment)

  checkPassword(req.body.password)
    .then((_) => createPayment(req.body.payment, res))
    .catch(error => {
      if (error.message === "Wrong password.") {
        console.error("Creating the payment was not possible, due to: " + error.message)
        return res.status(403).json({ error: error.message })
      }
      console.error("ERROR:", error.message)
      return res.status(500).json({ error: error.message })
    })
}

const createPayment = (payment, res) => {
  if (!payment) throw new Error("Mandatory payment is missing!")
  if (payment.amount === undefined) throw new Error("Mandatory payment.amount is missing!")

  paymentRepository
    .createPayment(payment)
    .then((insertedPayment) => {
      
      if (insertedPayment) {
        addToBalance(payment.amount)
          .catch(e => { throw e })

        return res.status(201).end()
      }
      return res.status(404).json({ error: 'No payment was created' })
    })
    .catch((error) => {
      console.error("ERROR:", error)
      return res.status(500).json({ error: 'Something went wrong, please try again later.' })
    })
}

module.exports = { getPaymentsService, createPaymentService }