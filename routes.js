const express = require('express');
const { getCostService, createCostService } = require('./database/services/cost.service');
const { getBalanceService } = require('./database/services/balance.service');
const router = express.Router();

router.get("/", (req,res)=>res.send("teszt"));
router.get("/costs", getCostService);
router.post("/costs", createCostService);
router.get("/balance", getBalanceService);


module.exports = router;