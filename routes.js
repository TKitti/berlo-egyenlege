const express = require('express');
const app = express();
const path = require('path');
const { costService } = require('./database/services/cost.service');


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.get("/costs", costService);


module.exports = app;