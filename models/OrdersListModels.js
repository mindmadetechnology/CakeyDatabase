const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({

    CakeID : {
        type : String
    },
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
    Flavour : {
        type : String,
    },
    Shape : {
        type : String,
    },
    CakeToppings: [{
        type: String
    }],
    Weight : {
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
    DeliveryDate : {
        type : String,
    },
    DeliverySession : {
        type : String,
    },
    VendorAddress : {
        type : String,
    },
    ItemCount : {
        type : Number,
    },
    Total : {
        type : String,
    },
    DeliveryCharge: {
        type : String,
    },
    Status : {
        type : String,
        default : 'New Order'
    },
    PaymentType : {
        type : String,
    },
    PaymentStatus : {
        type : String,
    },
    Discount : {
        type : String,
    },
    Created_On: {
        type: String
    },
    Modified_On: {
        type: String
    },
    Status_Updated_On : {
        type : String,
    },
    Status_Updated_By : {
        type : String,
    },

});

const collectionName = 'OrdersList';

module.exports = mongoose.model('OrdersList',OrderSchema,collectionName);