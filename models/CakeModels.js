const mongoose = require("mongoose");

const CakeSchema = new mongoose.Schema({

    Title: {
        type: String
    },
    Description: {
        type: String
    },
    TypeOfCake: {
        type: String
    },
    Images: [{
        type: String
    }],

    EggOrEggless: {
        type: String
    },
    Price: {
        type: String
    },
    Discount : {
        type : Number,
        default : 0,
    },
    Ratings: {
        type: Number
    },
    VendorID: {
        type: String
    },
    VendorName: {
        type: String
    },
    VendorPhoneNumber: {
        type: String
    },
    VendorAddress : {
        Street: {
            type: String
        },
        City: {
            type: String
        },
        District: {
            type: String
        },
        Pincode : {
            type : Number
        }
    },
    Created_On: {
        type: String
    },
    Modified_On: {
        type: String
    },
    FlavourList: [{
        type: String
    }],
    ShapeList: [{
        type: String
    }],
    CakeToppings: [{
        type: String
    }],
    WeightList: [{
        type: String
    }],
    Stock : {
        type : String,
        default : 'InStock'
    },
    DeliveryCharge : {
        type : String,
        default : '0'
    },
    Tax : {
        type : Number,
        default : '0'
    },
    Status : {
        type : String,
        default : 'New'
    },
    Status_Updated_On : {
        type : String,
    },
    IsDeleted: {
        type: String,
        default: 'n'
    },

});

const collectionName = 'CakeList';

module.exports = mongoose.model('CakeList', CakeSchema, collectionName);