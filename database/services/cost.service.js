const { checkPassword, WrongPasswordError } = require("./password.service")
const costRepository = require('../repositories/cost.repository')

const getCostService = (req, res) => {
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
        res.status(403).json({ error: 'Something went wrong, please try again later.' })
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
        return res.status(201)
      }
      return res.status(404).json({ error: 'No cost was created' })
    })
    .catch((_) => {
      res.status(500).json({ error: 'Something went wrong, please try again later.' })
    })
}

module.exports = { getCostService, createCostService }