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
    Images: [

    ],

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
    FlavorList: [],
    ShapesLists: [],
    CakeToppings: [],
    WeightList: [],
    IsDeleted: {
        type: String,
        default: 'n'
    },


});

const collectionName = 'CakeList';

module.exports = mongoose.model('CakeList', CakeSchema, collectionName);