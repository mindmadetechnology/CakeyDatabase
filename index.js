const express = require("express");
const db = require('./config/db');
const app = express();
app.use(express.static(__dirname+'/public'));
app.use(express.json());

const authRoute = require("./routes/auth");

app.use('/api',authRoute);


app.listen(3000, () => {
  console.log("Server is running at port 3000");
});

