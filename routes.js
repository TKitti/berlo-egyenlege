const express = require('express');
const app = express();
const path = require('path');
const bodyparser = require('body-parser')
const { getCostService, createCostService } = require('./database/services/cost.service');
const { getBalanceService } = require('./database/services/balance.service');


// Body-parser middleware
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/create-cost', (req, res) => {
  res.sendFile(path.join(__dirname + '/views/createCost.html'));
});

app.get("/costs", getCostService);
app.post("/costs", createCostService);
app.get("/balance", getBalanceService);


module.exports = app;