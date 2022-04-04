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
    CakeImage : {
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
    MobileNumberCustomer : {
        type : String,
    },
    VendorMobileNumber : {
        type : String,
    },
    CustomerID : {
        type : String,
    },
    CustomerName : {
        type : String,
    },
    DeliveryAddress: {
        type : String,
    },
    VendorAddressDiscussing : {
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
    StatusPreparingDeliveredWithTimeCancelled : {
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