const mongoose = require("mongoose");
const { increment } = require('../config/db');

const CakeSchema = new mongoose.Schema({
    CakeType: [{
        type: String,
    }],
    CakeSubType: [{
        type: String,
    }],
    CakeName: {
        type: String
    },
    CakeCommonName: {
        type: String
    },
    BasicFlavour: {
            type: String,
    },
    BasicShape: {
            type : String,
    },
    MinWeight: {
            type : String,
    },
    BasicCakePrice: {
        type: String,
    },
    DefaultCakeEggOrEggless: {
        type: String
    },
    IsEgglessOptionAvailable: {
        type: String,
        default: 'n'
    },
    BasicEgglessCostPerKg: {
        type: String,
    },
    CustomFlavourList: [{
        Name: {
            type: String
        },
        Price: {
            type: String
        }
    }],
    CustomShapeList: {
        Info: [{
            Name: {
                type: String
            },
            Price: {
                type: String
            },
        }],
        SampleImages: [{
            type: String,
        }],
    },
    MinWeightList: [{
            type: String
    }],
    IsTierCakePossible: {
        type: String,
        default:'n',
    },
    TierCakeMinWeightAndPrice: [{
        Tier: {
            type: String
        },
        Weight: {
            type: String
        },
        Price: {
            type: String
        }
    }],
    ThemeCakePossible: {
        type: String,
        default:'n',
    },
    ToppersPossible: {
        type: String,
        default:'n',
    },
    MinTimeForDeliveryOfDefaultCake: {
        type: String,
    },
    MinTimeForDeliveryOfA3KgCake: {
        type: String,
    },
    MinTimeForDeliveryOfA5KgCake: {
        type: String,
    },
    MinTimeForDeliveryFortierCake: [{
        Tier: {
            type: String,
        },
        MinTime: {
            type: String,
        },
    }],
    BasicCustomisationPossible: {
        type: String,
    },
    FullCustomisationPossible: {
        type: String,
    },
    CakeBase: {
        type: String,
    },
    CakeCream: {
        type: String,
    },
    CakeCreamType: {
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
    OtherInstructions: {
        type: String,
    },
    Description: {
        type: String
    },
    MainCakeImage: {
        type: String
    },
    AdditionalCakeImages: [{
        type: String
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
        type: String
        // Street: {
        //     type: String
        // },
        // City: {
        //     type: String
        // },
        // State: {
        //     type: String
        // },
        // Pincode: {
        //     type: Number
        // }
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
    Tax: {
        type: Number,
        default: '0'
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
    IsDeleted: {
        type: String,
        default: 'n'
    },
    RatingsForVendor: {
        type: String,
    },
    Ratings: {
        type: Number,
        default: 0
    },
    CakeCategory: {
        type: String,
    },
    SendInformation:[{
        Information:{
            type:String
        },
        Created_On:{
            type:String
        },
        Created_By:{
            type:String
        }
    }],
    // Category: {
    //     type: String
    // },
    // SubCategory: {
    //     type: String
    // },
    // ArticleList: [{
    //     Name: {
    //         type: String
    //     },
    //     Price: {
    //         type: String
    //     }
    // }],

});

CakeSchema.plugin(increment, {
    type: String,
    modelName: 'CakeList',
    fieldName: 'Id',
    prefix: 'CKYC-',
});

const collectionName = 'CakeList';

module.exports = mongoose.model('CakeList', CakeSchema, collectionName);