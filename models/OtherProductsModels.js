const mongoose = require("mongoose");
const { increment } = require('../config/db');

const OtherProductsSchema = new mongoose.Schema({
    CakeType: {
        type: String,
        default: 'Others'
    },
    CakeSubType: {
        type: String,
    },
    ProductName: {
        type: String
    },
    ProductCommonName: {
        type: String
    },
    Flavour: [{
        type: String,
    }],
    Shape: {
        type: String,
    },
    Type: {
        type: String, //Kg, Unit, Box
    },
    MinWeightPerKg: {
        Weight:{
            type: String,
        },
        PricePerKg: {
            type: String
        }
    },
    MinWeightPerUnit: [{
        Weight:{
            type: String,
        },
        MinCount: {
            type: String,
        },
        PricePerUnit: {
            type: String,
        },
    }],
    MinWeightPerBox: [{
        Piece:{
            type: String,
        },
        MinCount: {
            type: String,
        },
        PricePerBox: {
            type: String,
        },
    }],
    EggOrEggless: {
        type: String
    },
    ToppersPossible: {
        type: String,
    },
    MinTimeForDelivery: {
        type: String,
    },
    CakeBase: {
        type: String,
    },
    BestUsedBefore: {
        type: String,
    },
    ToBeStoredIn: {
        type: String,
    },
    KeepTheCakeInRoomTemperature: {
        type: String,
    },
    Description: {
        type: String
    },
    ProductImage: [{
        type: String
    }],
    AdditionalProductImages: [{
        type: String,
    }],
    HowGoodAreYouWithTheCake: {
        type: String
    },
    HowManyTimesHaveYouBakedThisParticularCake: {
        type: String
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
    VendorPhoneNumber1: {
        type: String
    },
    VendorPhoneNumber2: {
        type: String
    },
    VendorAddress: {
        type: String,
    },
    GoogleLocation: {
        Latitude: {
            type: Number
        },
        Longitude: {
            type: Number
        }
    },
    Discount: {
        type: Number,
        default: 0,
    },
    Stock: {
        type: String,
        default: 'InStock'
    },
    Created_On: {
        type: String
    },
    Modified_On: {
        type: String
    },
    Status: {
        type: String,
        default: 'New'
    },
    Status_Updated_On: {
        type: String,
    },
    Status_Updated_By: {
        type: String,
    },
    IsDeleted: {
        type: String,
        default: 'n'
    },
    RatingsForVendor: {
        type: String,
    },
    CakeCategory: {
        type: String,
    },
    Ratings: {
        type: Number,
        default: 0
    },
    SendInformation: [{
        Information: {
            type: String
        },
        Created_On: {
            type: String
        },
        Created_By: {
            type: String
        }
    }],
    ReasonForSuspend:{
        type:String
    }

});

OtherProductsSchema.plugin(increment, {
    type: String,
    modelName: 'OtherProductList',
    fieldName: 'Id',
    prefix: 'CKYOP-',
});

const collectionName = 'OtherProductList';

module.exports = mongoose.model('OtherProductList', OtherProductsSchema, collectionName);