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
    Ratings: {
        type: String
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
        type : String
    },
    IsDeleted: {
        type: String,
        default: 'n'
    },

});

const collectionName = 'CakeList';

module.exports = mongoose.model('CakeList', CakeSchema, collectionName);