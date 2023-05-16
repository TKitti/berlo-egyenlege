const express = require('express');
//const app = express();
//const path = require('path');
//const bodyparser = require('body-parser')
const { getCostService, createCostService } = require('./database/services/cost.service');
const { getBalanceService } = require('./database/services/balance.service');


// Body-parser middleware
/*
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())
*/

const router = express.Router();

router.get("/", (req,res)=>res.send("teszt"));
router.get("/costs", getCostService);
router.post("/costs", createCostService);
router.get("/balance", getBalanceService);


module.exports = router;