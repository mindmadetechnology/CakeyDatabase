const mongoose = require("mongoose");

const CakeSchema = new mongoose.Schema({
    Title: {
        type: String
    },
    Description : {
        type : String
    },
    TypeOfCake : {
        type : String
    },
    Images : {
        Images1: {
            type: String
        },
        Images2: {
            type: String
        },
        Images3: {
            type: String
        },
        Images4: {
            type: String
        }
    },
    eggOrEggless : {
        type : String
    },
    Price: {
        type : String
    },
    Ratings : {
        type : String
    },
    VendorID  : {
        type : String
    },
    VendorName: {
        type : String
    },
    MobileNumberVendor: {
        type : String
    },
    Created_On:{
        type : String
    },
    Modified_On:{
        type : String
    },
    FlavorList : {
        flavor1: {
            type: String
        },
        flavor2: {
            type: String
        },
        flavor3: {
            type: String
        },
        flavor4: {
            type: String
        }
    },
    ShapesLists : {
        Shape1: {
            type: String
        },
        Shape2: {
            type: String
        },
        Shape3: {
            type: String
        },
        Shape4: {
            type: String
        }
    },
    CakeToppings : {
        Toppings1: {
            type: String
        },
        Toppings2: {
            type: String
        },
        Toppings3: {
            type: String
        },
        Toppings4: {
            type: String
        }
    },
    WeightList : {
        Weigth1: {
            type: String
        },
        Weigth2: {
            type: String
        },
        Weigth3: {
            type: String
        },
        Weigth4: {
            type: String
        }
    },
    IsDeleted : {
        type : String,
        default : 'n'
    },
   
   
});

const collectionName = 'CakeList';

module.exports = mongoose.model('CakeList',CakeSchema,collectionName);