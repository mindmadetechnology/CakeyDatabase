const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({

    TypeOfCake : {
        type : String,
    },
    EggOrEggless : {
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
    CakeTower : {
        type : String,
    },
    MessageOnTheCake : {
        type : String,
    },
    SpecialRequest : {
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
    Status : {
        type : String,
        default : 'New'
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

const collectionName = 'CustomizeCakeList';

module.exports = mongoose.model('CustomizeCakeList',OrderSchema,collectionName);