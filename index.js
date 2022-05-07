const express = require("express");
const db = require('./config/db');
const app = express();

app.use(express.json());

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
  
const authRoute = require("./routes/auth");
const cakeRoute = require("./routes/cake");

app.use('/api',authRoute);
app.use('/api',cakeRoute);


app.listen(3001, () => {
  console.log("Server is running at port 3001");
});

