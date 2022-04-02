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

    eggOrEggless: {
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
    MobileNumberVendor: {
        type: String
    },
    Created_On: {
        type: String
    },
    Modified_On: {
        type: String
    },
    FlavorList: [{
        type: String
    }],
    ShapesLists: [{
        type: String
    }],
    CakeToppings: [{
        type: String
    }],
    WeightList: [{
        type: String
    }],
    IsDeleted: {
        type: String,
        default: 'n'
    },


});

const collectionName = 'CakeList';

module.exports = mongoose.model('CakeList', CakeSchema, collectionName);