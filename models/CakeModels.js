const mongoose = require("mongoose");
const { increment } = require('../config/db');

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
    Category: {
        type: String
    },
    SubCategory: {
        type: String
    },
    Discount: {
        type: Number,
        default: 0,
    },
    Ratings : {
        type : Number,
        default : 0
    },
    VendorID: {
        type: String
    },
    Vendor_ID: {
        type: String,
    },
    VendorName: {
        type: String
    },
    VendorPhoneNumber: {
        type: String
    },
    VendorAddress: {
        Street: {
            type: String
        },
        City: {
            type: String
        },
        State: {
            type: String
        },
        Pincode: {
            type: Number
        }
    },
    Created_On: {
        type: String
    },
    Modified_On: {
        type: String
    },
    FlavourList: [{
        // type: String
        Name: {
            type: String
        },
        Price: {
            type: String
        }
    }],
    ShapeList: [{
        type: String
    }],
    ArticleList: [{
        // type: String
        Name: {
            type: String
        },
        Price: {
            type: String
        }
    }],
    // CakeToppings: [{
    //     type: String
    // }],
    WeightList: [{
        type: String
    }],
    Stock: {
        type: String,
        default: 'InStock'
    },
    // DeliveryCharge : {
    //     type : String,
    //     default : '0'
    // },
    Tax: {
        type: Number,
        default: '0'
    },
    Status: {
        type: String,
        default: 'New'
    },
    Status_Updated_On: {
        type: String,
    },
    IsDeleted: {
        type: String,
        default: 'n'
    },
});

CakeSchema.plugin(increment, {
    type: String,
    modelName: 'CakeList',
    fieldName: 'Id',
    prefix: 'CKYC-',
});

const collectionName = 'CakeList';

module.exports = mongoose.model('CakeList', CakeSchema, collectionName);