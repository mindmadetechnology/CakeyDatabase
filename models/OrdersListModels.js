const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    Title: {
        type: String,
    },
    TypeOfCake : {
        type : String,
    },
    Description : {
        type : String,
    },
    Images : {
        type : String,
    },
    EggOrEggless : {
        type : String,
    },
    Price: {
        type : String,
    },
    VendorID : {
        type : String,
    },
    VendorName : {
        type : String,
    },
    VendorPhoneNumber : {
        type : String,
    }, 
    UserID : {
        type : String,
    },
    UserName : {
        type : String,
    },
    UserPhoneNumber : {
        type : String,
    },
    DeliveryAddress: {
        type : String,
    },
    VendorAddress : {
        type : String,
    },
    ItemCount : {
        type : String,
    },
    Total : {
        type : String,
    },
    DeliveryCharge: {
        type : String,
    },
    Status : {
        type : String,
    },
    PaymentType : {
        type : String,
    },
    PaymentStatus : {
        type : String,
    },
    Discount : {
        type : String,
    }
});

const collectionName = 'OrdersList';

module.exports = mongoose.model('OrdersList',OrderSchema,collectionName);