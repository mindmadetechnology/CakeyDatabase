const express = require("express");
const db = require('./config/db');
const app = express();

app.use(express.json());

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
  
const authRoute = require("./routes/auth");

app.use('/api',authRoute);


app.listen(3001, () => {
  console.log("Server is running at port 3001");
});

