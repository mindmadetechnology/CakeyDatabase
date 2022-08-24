const express = require("express");
const db = require('./config/db');
const app = express();

app.use(express.json());

app.use(express.static('public'))

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const authRoute = require("./routes/auth");
const authRoute2 = require("./routes/auth2");

app.use('/api', authRoute);
app.use('/api', authRoute2);


app.listen(3001, () => {
  console.log("Server is running at port 3001");
});

app.timeout = 60 * 1000;

