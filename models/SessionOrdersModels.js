const mongoose = require("mongoose");

const SessionOrderSchema = new mongoose.Schema({

    Vendor_ID: {
        type: String,
    },
    Login_At: {
        type: String,
    },
    Logout_At: {
        type: String,
    },
    No_Of_Orders: {
        data: Buffer,
        contentType: String
    },
    Total_Value_Of_Orders: {
        type: String,
    },
    Delivered_Orders: {
        type: String,
    },
    Pending_Orders: {
        type: String,
    },
    Cancelled_Orders_By_User: {
        type: String,
    },
    Cancelled_Orders_By_Vendor: {
        type: String,
    },
    Created_On: {
        type: String,
    },

});

const collectionName = 'SessionOrder';

module.exports = mongoose.model('SessionOrder', SessionOrderSchema, collectionName);