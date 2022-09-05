const mongoose = require("mongoose");
const { increment } = require('../config/db');

const HamperOrderSchema = new mongoose.Schema({

    HamperID: {
        type: String
    },
    Hamper_ID: {
        type: String
    },
    HampersName: {
        type: String,
    },
    Title: {
        type: String,
    },
    Product_Contains: [{
        type: String,
    }],
    HamperImage: {
        type: String,
    },
    FinalHamperImage: {
        type: String,
    },
    Weight: {
        type: String,
    },
    Price: {
        type: String,
    },
    Description: {
        type: String,
    },
    EggOrEggless: {
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
    VendorPhoneNumber1: {
        type: String,
    },
    VendorPhoneNumber2: {
        type: String,
    },
    VendorAddress: {
        type: String,
    },
    GoogleLocation: {
        Latitude: {
            type: Number
        },
        Longitude: {
            type: Number
        }
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
    DeliveryDate: {
        type: String,
    },
    DeliverySession: {
        type: String,
    },
    DeliveryInformation: {
        type: String
    },
    ItemCount: {
        type: Number,
    },
    DeliveryCharge: {
        type: String,
    },
    Total: {
        type: String,
    },
    PaymentType: {
        type: String,
    },
    PaymentStatus: {
        type: String,
    },
    Created_On: {
        type: String
    },
    Status: {
        type: String,
        default: 'New'
    },
    Status_Updated_On: {
        type: String,
    },
    Cancelled_By: {
        type: String,   
    },

});

HamperOrderSchema.plugin(increment, {
    type: String,
    modelName: 'HamperOrdersList',
    fieldName: 'Id',
    prefix: 'CKYHORD-',
});

const collectionName = 'HamperOrdersList';

module.exports = mongoose.model('HamperOrdersList', HamperOrderSchema, collectionName);