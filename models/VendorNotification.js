const mongoose = require("mongoose");

const VendorNotificationSchema = new mongoose.Schema({

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
    VendorID: {
        type: String,
    },
    Vendor_ID: {
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

const collectionName = 'VendorNotification';

module.exports = mongoose.model('VendorNotification', VendorNotificationSchema, collectionName);