const SessionOrdersModel = require('../models/SessionOrdersModels');


const GetSessionOrders = (req, res) => {
    SessionOrdersModel.find({}, function (err, result) {
        if (err) {
            res.send({ statusCode: 400, message: 'Failed' });
        } else {
            if (result.length === 0) {
                res.send({ message: 'No Records Found' });
            } else {
                res.send(result);
            }
        }
    });
};


{/* Scheduled job */ }
// const SessionOrders = (req, res) => {
//     LastLoginSessionModel.find({}, function (err, result) {
//         if (err) {
//             res.send({ statusCode: 400, message: 'Failed' });
//         } else {
//             if (result === null) {
//                 res.send({ statusCode: 400, message: 'No Records Found' });
//             } else {
//                 for (let i = 0; i < result.length; i++) {
//                     let today = moment().tz('Asia/Kolkata').format("DD-MM-YYYY hh:mm A");
//                     let ms = moment(today, "DD-MM-YYYY HH:mm A").diff(moment(result[i].LastLogout_At, "DD-MM-YYYY HH:mm A"));
//                     let d = moment.duration(ms);
//                     let s = Math.floor(d.asHours()) + moment.utc(ms).format(":mm:ss");
//                     let a = s.split(':');
//                     let seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);
//                     let FinalSeconds = JSON.stringify(seconds);
//                     // if ((FinalSeconds >= 120) && (FinalSeconds < 5000)) {
//                     if ((FinalSeconds >= 120) && (FinalSeconds < 180)) {
//                         OrdersListModel.find({ VendorID: result[i].Id }, function (err, result2) {
//                             if (err) {
//                                 res.send({ statusCode: 400, message: 'Failed' });
//                             } else if (result2 === null) {
//                                 const Session = new SessionOrdersModel({
//                                     Vendor_ID: result[i].Id,
//                                     Login_At: result[i].LastLogin_At,
//                                     Logout_At: result[i].LastLogout_At,
//                                     No_Of_Orders: "0",
//                                     Total_Valur_Of_Orders: "0",
//                                     Delivered_Orders: "0",
//                                     Pending_Orders: "0",
//                                     Cancelled_Orders_By_User: "0",
//                                     Cancelled_Orders_By_Vendor: "0",
//                                     Created_On: moment().tz('Asia/Kolkata').format("DD-MM-YYYY hh:mm A"),
//                                 });
//                                 Session.save(function (err, result3) {
//                                     if (err) {
//                                         res.send({ statusCode: 400, message: 'Failed' });
//                                     } else {
//                                         res.send({ statusCode: 200, message: 'Added Successfully' });
//                                     }
//                                 })
//                             } else {
//                                 var NewArray = [], Result;
//                                 for (let j = 0; j < result2.length; j++) {
//                                     let ms2 = moment(result[i].LastLogin_At, "DD-MM-YYYY").diff(moment(result2[j].Created_On, "DD-MM-YYYY"));
//                                     let d2 = moment.duration(ms2);
//                                     let s2 = Math.floor(d2.asHours()) + moment.utc(ms2).format(":mm:ss");
//                                     let a2 = s2.split(':');
//                                     let seconds2 = (+a2[0]) * 60 * 60 + (+a2[1]) * 60 + (+a2[2]);

//                                     var LLDiff;
//                                     let ms3 = moment(result[i].LastLogout_At, "DD-MM-YYYY HH:mm A").diff(moment(result[i].LastLogin_At, "DD-MM-YYYY HH:mm A"));
//                                     let d3 = moment.duration(ms3);
//                                     let s3 = Math.floor(d3.asHours()) + moment.utc(ms3).format(":mm:ss");
//                                     let a3 = s3.split(':');
//                                     LLDiff = (+a3[0]) * 60 * 60 + (+a3[1]) * 60 + (+a3[2]);

//                                     if (seconds2 === 0) {
//                                         let ms4 = moment(result2[j].Created_On, "DD-MM-YYYY HH:mm A").diff(moment(result[i].LastLogin_At, "DD-MM-YYYY HH:mm A"));
//                                         let d4 = moment.duration(ms4);
//                                         let s4 = Math.floor(d4.asHours()) + moment.utc(ms4).format(":mm:ss");
//                                         let a4 = s4.split(':');
//                                         let seconds4 = (+a4[0]) * 60 * 60 + (+a4[1]) * 60 + (+a4[2]);
//                                         if (seconds4 > 0 && seconds4 <= LLDiff) {
//                                             Result = result2[j];
//                                         }
//                                         NewArray.push(Result);
//                                     }
//                                 };
//                                 var StatusNew = [], ValueOfNew = [], StatusDelivered = [], StatusPending = [], StatusCancelledU = [], StatusCancelledV = [];
//                                 NewArray.filter(val => {
//                                     if (val.Status === 'New') {
//                                         StatusNew.push(val);
//                                         ValueOfNew.push(parseInt(val.Total))
//                                     } else if (val.Status === 'Delivered') {
//                                         StatusDelivered.push(val);
//                                     }
//                                 });
//                                 NewArray.filter(val => {
//                                     if (val.Status === 'New' || val.Status === 'Assigned' || val.Status === 'Preparing') {
//                                         StatusPending.push(val);
//                                     }
//                                 });
//                                 NewArray.filter(val => {
//                                     if (val.Status === 'Cancelled' && Cancelled_By === 'User') {
//                                         StatusCancelledU.push(val);
//                                     }
//                                 });
//                                 NewArray.filter(val => {
//                                     if (val.Status === 'Cancelled' && Cancelled_By === 'Vendor') {
//                                         StatusCancelledV.push(val);
//                                     }
//                                 });
//                                 //Total value of orders between each session - TotalValueOfNew
//                                 var TotalValueOfNew = ValueOfNew.reduce((a, b) => a + b, 0);

//                                 const Session = new SessionOrdersModel({
//                                     Vendor_ID: result[i].Id,
//                                     Login_At: result[i].LastLogin_At,
//                                     Logout_At: result[i].LastLogout_At,
//                                     No_Of_Orders: JSON.stringify(StatusNew.length),
//                                     Total_Valur_Of_Orders: JSON.stringify(TotalValueOfNew),
//                                     Delivered_Orders: JSON.stringify(StatusDelivered.length),
//                                     Pending_Orders: JSON.stringify(StatusPending.length),
//                                     Cancelled_Orders_By_User: JSON.stringify(StatusCancelledU.length),
//                                     Cancelled_Orders_By_Vendor: JSON.stringify(StatusCancelledV.length),
//                                     Created_On: moment().tz('Asia/Kolkata').format("DD-MM-YYYY hh:mm A"),
//                                 });
//                                 Session.save(function (err, result3) {
//                                     if (err) {
//                                         res.send({ statusCode: 400, message: 'Failed' });
//                                     } else {
//                                         res.send({ statusCode: 200, message: 'Added Successfully' });
//                                     }
//                                 })
//                             }
//                         })
//                     }
//                 }
//             }
//         }
//     })
// };

module.exports = {
    // SessionOrders,
    GetSessionOrders,
};