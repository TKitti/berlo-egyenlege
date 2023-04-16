const express = require('express');
const app = express();
const path = require('path');
const { getCostService, createCostService } = require('./database/services/cost.service');
const { getBalanceService } = require('./database/services/balance.service');


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.get("/costs", getCostService);
app.post("/costs", createCostService);
app.get("/balance", getBalanceService);


module.exports = app;