const mongoose = require("mongoose");

const AdminNotificationSchema = new mongoose.Schema({

    NotificationType: {
        type: String,
    },
    Image:{
        type: String,
    },
    VendorID: {
        type: String,
    },
    Vendor_ID: {
        type: String,
    },
    VendorName: {
        type: String,
    },
    Id: {
        type: String,
    },
    Created_On: {
        type: String,
    }

});

const collectionName = 'AdminNotification';

module.exports = mongoose.model('AdminNotification', AdminNotificationSchema, collectionName);