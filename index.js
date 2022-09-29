const express = require("express");
const db = require('./config/db');
const app = express();
// const path= require('path')

app.use(express.json());

app.use(express.static('public'))
// app.use(express.static(path.resolve(__dirname, 'build')));

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, 'build'), 'index.html');
// });
const authRoute = require("./routes/auth");
const authRoute2 = require("./routes/auth2");

app.use('/api', authRoute);
app.use('/api', authRoute2);




var server = app.listen(3001, () => {
  console.log("Server is running at port 3001");
});

server.timeout = 120000;

