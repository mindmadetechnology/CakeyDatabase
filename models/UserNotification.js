const mongoose = require("mongoose");

const UserNotificationSchema = new mongoose.Schema({

    OrderID: {
        type: String,
    },
    Order_ID:{
        type: String,
    },
    CustomizedCakeID: {
        type: String,
    },
    CustomizedCake_ID: {
        type: String,
    },
    Image: {
        type: String
    },
    CakeName: {
        type: String,
    },
    Status: {
        type: String,
    },
    Status_Updated_On : {
        type: String,
    },
    UserID: {
        type: String,
    },
    User_ID: {
        type: String,
    },
    UserName: {
        type: String,
    },
    CustomizedCake: {
        type: String,
        default: 'n',
    },
});

const collectionName = 'UserNotification';

module.exports = mongoose.model('UserNotification', UserNotificationSchema, collectionName);