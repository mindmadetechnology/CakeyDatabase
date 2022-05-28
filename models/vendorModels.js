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
    Address: {
        FullAddress: {
            type: String
        },
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
    GoogleLocation: {
        type: String,
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
    PreferredVendorName: {
        type: String
    },
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
    MaximumCakesPerDay: {
        type: String
    },
    MaximumCakesPerWeek: {
        type: String
    },
    JobType: {
        type: String
    },
    SpecializedIn: {
        type: String
    },
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
    Registered_On: {
        type: String
    },
    Created_On: {
        type: String,
    },
    Modified_On: {
        type: String,
    },
    Status: {
        type: String,
        default: 'New'
    },
    IsDeleted: {
        type: String,
        default: 'n'
    },
    Ratings: {
        type: Number,
        default: 0
    }

});

VendorSchema.plugin(increment, {
    type: String,
    modelName: 'vendors',
    fieldName: 'Id',
    prefix: 'CKYV-',
});

const collectionName = 'vendors';

module.exports = mongoose.model('vendors', VendorSchema, collectionName);