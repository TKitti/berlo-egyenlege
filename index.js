const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require("mongoose");
const dotenv = require('dotenv').config({ path: __dirname + '/.env' });
const path = require('path');
const port = process.env.PORT || 3000;
const router = require('./routes');
const swaggerUI = require("swagger-ui-express");
const swaggerSpecification = require('./swagger');


// database connection
mongoose.connect(process.env.CONNECTION_STRING, {
  useNewUrlParser: true,
  dbName: 'balance-sheet',
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Successfully connected to db");
});

const convertNumericStrings = (req, res, next) => {
  innerConvertNumeric(req.body)
  next();
};

const innerConvertNumeric = (obj) => {
  for (const key in obj) {
    if (typeof (obj[key]) === 'object') {
      innerConvertNumeric(obj[key])
    } else if (!isNaN(obj[key]) && obj[key] !== '') {
      obj[key] = Number(obj[key]);
    }
  }
}

app.use('/public', express.static(path.join(__dirname, 'public')));
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpecification));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(convertNumericStrings);
app.use(router);

app.listen(port, () => {
  console.log("listening to the server on http://localhost:3000")
});


module.exports = app;