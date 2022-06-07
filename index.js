const express = require("express");
const db = require('./config/db');
const app = express();
var CronJob = require('cron').CronJob;
// const schedule = require('node-schedule');

app.use(express.json());

app.use(express.static('public'))

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const authRoute = require("./routes/auth");
const OrdersListModel = require('./models/OrdersListModels');
const moment = require('moment-timezone');

app.use('/api', authRoute);

new CronJob('* * * * * *', function (req, res) {
  OrdersListModel.find({ Vendor_Response_Status: 'unseen' }, function (err, result) {
    if (!err) {
      if (result !== null) {
        result.map((val) => {
          var today = moment(new Date()).format("DD-MM-YYYY hh:mm A");
          const ms = moment(today, "DD-MM-YYYY HH:mm A").diff(moment(val.Created_On, "DD-MM-YYYY HH:mm A"));
          var d = moment.duration(ms);
          var s = Math.floor(d.asHours()) + moment.utc(ms).format(":mm:ss");
          var a = s.split(':');
          var seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);
          if (seconds === 300 || seconds > 300) {
            OrdersListModel.findOneAndUpdate({ _id: val._id }, {
              $set: {
                Vendor_Response_Status: 'no response'
              }
            }, function (err, result) {
              if (err) {
                res.send({ statusCode: 400, message: 'Failed' });
              } else {
                res.send({ statusCode: 200, message: 'Updated Successfully' });
              }
            });
          }
        });
      } else {
        return null;
      }
    }
  });
}, null, true, "Asia/Kolkata");

// const job = schedule.scheduleJob('* * * * * *', function (req, res) {
//   OrdersListModel.find({ Vendor_Response_Status: 'unseen' }, function (err, result) {
//     if (!err) {
//       if (result !== null) {
//         result.map((val) => {
//           var today = moment(new Date()).format("DD-MM-YYYY hh:mm A");
//           const ms = moment(today, "DD-MM-YYYY HH:mm A").diff(moment(val.Created_On, "DD-MM-YYYY HH:mm A"));
//           var d = moment.duration(ms);
//           var s = Math.floor(d.asHours()) + moment.utc(ms).format(":mm:ss");
//           var a = s.split(':');
//           var seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);
//           if (seconds === 300 || seconds > 300) {
//             OrdersListModel.findOneAndUpdate({ _id: val._id }, {
//               $set: {
//                 Vendor_Response_Status: 'no response'
//               }
//             }, function (err, result) {
//               if (err) {
//                 res.send({ statusCode: 400, message: 'Failed' });
//               } else {
//                 res.send({ statusCode: 200, message: 'Updated Successfully' });
//               }
//             });
//           }
//         });
//       } else {
//         return null;
//       }
//     }
//   });
// });

app.listen(3001, () => {
  console.log("Server is running at port 3001");
});

