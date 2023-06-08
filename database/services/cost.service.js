const { checkPassword, WrongPasswordError } = require("./password.service")
const costRepository = require('../repositories/cost.repository')
const { addToBalance } = require('../repositories/balance.repository')

const getCostsService = (_, res) => {
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

  checkPassword(req.body.password)
    .then((_) => createCost(req.body.cost, res))
    .catch(error => {
      if (error.message === "Wrong password.") {
        console.error("Creating the cost was not possible, due to: " + error.message)
        return res.status(403).json({ error: error.message })
      }
      console.error("ERROR:", error.message)
      return res.status(500).json({ error: error.message })
    })
}

const createCost = (cost, res) => {
  if (!cost) throw new Error("Mandatory cost is missing!")
  if (cost.amount === undefined) throw new Error("Mandatory cost.amount is missing!")

  costRepository
    .createCost(cost)
    .then((insertedCost) => {

      if (insertedCost) {
        addToBalance(-cost.amount)
          .catch(e => { throw e })

        return res.status(201).end()
      }
      return res.status(404).json({ error: 'No cost was created' })
    })
    .catch((error) => {
      console.error("ERROR:", error)
      return res.status(500).json({ error: 'Something went wrong, please try again later.' })
    })
}

module.exports = { getCostsService, createCostService }