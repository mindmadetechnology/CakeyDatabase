const mongoose = require("mongoose");
const { increment } = require('../config/db');

const OrderSchema = new mongoose.Schema({

    TypeOfCake: {
        type: String,
    },
    EggOrEggless: {
        type: String,
    },
    Images: [{
        type: String
    }],
    Flavour: [{
        Name: {
            type: String
        },
        Price: {
            type: String
        }
    }],
    Shape: {
        type: String,
    },
    Article: {
        Name: {
            type: String
        },
        Price: {
            type: String
        }
    },
    Weight: {
        type: String,
    },
    Above5KG: {
        type: String,
        default: 'n'
    },
    MessageOnTheCake: {
        type: String,
    },
    SpecialRequest: {
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
    VendorPhoneNumber: {
        type: String,
    },
    VendorAddress: {
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
    UserPhoneNumber: {
        type: String,
    },
    DeliveryAddress: {
        type: String,
    },
    DeliveryInformation: {
        type: String,
    },
    DeliveryDate: {
        type: String,
    },
    DeliverySession: {
        type: String,
    },
    Status: {
        type: String,
        default: 'New'
    },
    Created_On: {
        type: String
    },
    Modified_On: {
        type: String
    },
    Status_Updated_On: {
        type: String,
    },
    Status_Updated_By: {
        type: String,
    },
    Notification : {
        type : String,
        default:'New'
    },
    Notification_Updated_On : {
        type : String,
    },
    Price : {
        type : String,
    },
    Discount : {
        type : Number,
        default: 0
    },
    Gst : {
        type: String,
    },
    Sgst : {
        type: String,
    },
    Total : {
        type: String,
    },
    ExtraCharges : {
        type : String,
        default: '0',
    },
    Invoice_Sent_On : {
        type : String,
    },
    Invoice_Sent_By : {
        type : String
    }

});

OrderSchema.plugin(increment, {
    type: String,
    modelName: 'CustomizeCakeList',
    fieldName: 'Id',
    prefix: 'CKYCCO-',
});

const collectionName = 'CustomizeCakeList';

module.exports = mongoose.model('CustomizeCakeList', OrderSchema, collectionName);