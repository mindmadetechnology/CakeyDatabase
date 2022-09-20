const mongoose = require("mongoose");

const UserNotificationSchema = new mongoose.Schema({

    OrderID: {
        type: String,
    },
    Order_ID:{
        type: String,
    },
    HamperID:{
        type: String,
    },
    Hamper_ID:{
        type: String,
    },
    CustomizedCakeID: {
        type: String,
    },
    CustomizedCake_ID: {
        type: String,
    },
    Other_ProductID: {
        type: String,
    },
    Other_Product_ID: {
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
    For_Display: {
        type: String,
    },
});

const collectionName = 'UserNotification';

module.exports = mongoose.model('UserNotification', UserNotificationSchema, collectionName);