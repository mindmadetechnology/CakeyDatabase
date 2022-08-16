const mongoose = require("mongoose");

const VendorNotificationSchema = new mongoose.Schema({

    OrderID: {
        type: String,
    },
    Order_ID: {
        type: String,
    },
    CustomizedCakeID: {
        type: String,
    },
    CustomizedCake_ID: {
        type: String,
    },
    Cake_ID: {
        type: String,
    },
    CakeID: {
        type: String,
    },
    HamperID:{
        type: String,
    },
    Hamper_ID:{
        type: String,
    },
    CakeNotificationType: {
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
    Status_Updated_On: {
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
    For_Display: {
        type: String,
    },
    CustomizedCake: {
        type: String,
        default: 'n',
    },
});

const collectionName = 'VendorNotification';

module.exports = mongoose.model('VendorNotification', VendorNotificationSchema, collectionName);