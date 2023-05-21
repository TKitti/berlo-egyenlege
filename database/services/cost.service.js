const { checkPassword, WrongPasswordError } = require("./password.service")
const costRepository = require('../repositories/cost.repository')
const { addToBalance } = require('../repositories/balance.repository')

const getCostsService = (req, res) => {
  return costRepository
    .getCosts()
    .then((costs) => {
      if (costs) {
        return res.status(200).json(costs)
      }
      return res.status(404).json({ error: 'No costs found' })
    })
    .catch(err => res.status(500).json({ error: err.message }))
}

const createCostService = (req, res) => {

  checkPassword(req.body, res)
    .then((_) => createCost(req, res))
    .catch(error => {
      if (error instanceof WrongPasswordError) {
        console.error("Creating the cost was not possible, due to: " + error.message)
        return res.status(403).json({ error: 'Something went wrong, please try again later.' })

      } else {
        throw error
      }
    })
}

const createCost = (req, res) => {

  costRepository
    .createCost(req.body)
    .then((insertedCost) => {

      if (insertedCost) {
        addToBalance(-req.body.amount)
          .catch(e => { throw e })

        return res.status(201)
      }
      return res.status(404).json({ error: 'No cost was created' })
    })
    .catch((error) => {
      return res.status(500).json({ error: 'Something went wrong, please try again later.' })
    })
}

module.exports = { getCostsService, createCostService }