const mongoose = require("mongoose");
const { increment } = require('../config/db');

const VendorSchema = new mongoose.Schema({

    Email: {
        type: String,
    },
    Password: {
        type: String,
    },
    VendorName: {
        type: String,
    },
    PreferredNameOnTheApp: {
        type: String
    },
    Address: {
        type: String
        // FullAddress: {
        //     type: String
        // },
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
    PhoneNumber1: {
        type: String,
    },
    PhoneNumber2: {
        type: String,
    },
    Description: {
        type: String,
    },
    ProfileImage: {
        type: String,
    },
    EggOrEggless: {
        type: String
    },
    // PreferredVendorName: {
    //     type: String
    // },
    DateOfBirth: {
        type: String
    },
    Gender: {
        type: String
    },
    YearsOfExperienceAsBaker: {
        type: String,
    },
    AadhaarNumber: {
        type: String
    },
    PANNumber: {
        type: String
    },
    GSTNumber: {
        type: String,
    },
    FSSAINumber: {
        type: String
    },
    FSSAIExpiryDate: {
        type: String
    },
    // MaximumCakesPerDay: {
    //     type: String
    // },
    // MaximumCakesPerWeek: {
    //     type: String
    // },
    JobType: {
        type: String
    },
    // SpecializedIn: {
    //     type: String
    // },
    BankName: {
        type: String
    },
    Branch: {
        type: String
    },
    AccountNumber: {
        type: String
    },
    IFSCCode: {
        type: String
    },
    UPIId: {
        type: String
    },
    // Registered_On: {
    //     type: String
    // },
    Created_On: {
        type: String,
    },
    Modified_On: {
        type: String,
    },
    // Status: {
    //     type: String,
    //     default: 'New'
    // },
    IsDeleted: {
        type: String,
        default: 'n'
    },
    Ratings: {
        type: Number,
        default: 0
    },
    AreYouFamiliarOnWorkingWithApps: {
        type: String,
        default: 'n'
    },
    LearningType: {
        type: String,
    },
    TotalDurationOfLearning: {
        type: String,
    },
    InstitutionName: [{
        type: String,
    }],
    CurrentAverageSalePerMonth: {
        type: String
    },
    HowManyCakesCanYouMakeInaWeek: {
        type: String
    },
    HowManyDaysCanYouWorkInaWeek: {
        type: String
    },
    YourSpecialityCakes: [{
        type: String
    }],
    CanYouMakeSingleCakeAbove5Kgs: {
        type: String,
        default: 'n'
    },
    CanYouMakeTierCakes: {
        type: String,
        default: 'n'
    },
    CakeTypesYouBake: [{
        type: String,
    }],
    CanYouMakeARegularCakeWithFondantAsToppers: {
        type: String,
        default: 'n',
    },
    CanYouMakeARegularCakeWithFondantAsToppersImage: [{
        type: String
    }],
    Notification_Id: {
        type: String,
    },
});

VendorSchema.plugin(increment, {
    type: String,
    modelName: 'vendors',
    fieldName: 'Id',
    prefix: 'CKYV-',
});

const collectionName = 'vendors';

module.exports = mongoose.model('vendors', VendorSchema, collectionName);