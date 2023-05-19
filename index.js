const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require("mongoose");
const dotenv = require('dotenv').config({path: __dirname + '/.env'});
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


app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpecification));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router);

app.listen(port, ()=> {
  console.log("listening to the server on http://localhost:3000")
});


module.exports = app;