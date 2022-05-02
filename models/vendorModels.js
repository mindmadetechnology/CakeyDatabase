const mongoose = require("mongoose");

const VendorSchema = new mongoose.Schema({

    Email: {
        type: String,
    },
    Password: {
        type : String,
    },
    VendorName: {
        type : String,
    },
    Address: {
        // type : String
        FullAddress : {
            type : String
        },
        Street: {
            type: String
        },
        City: {
            type: String
        },
        District: {
            type: String
        },
        Pincode : {
            type : Number
        }
    },
    GoogleLocation : {
        type : String,
    },
    PhoneNumber1: {
        type : String,
    },
    PhoneNumber2: {
        type : String,
    },
    // ProfileBanner: {
    //     data: Buffer,
    //     contentType: String
    // },
    Description:{
        type : String,
    },
    ProfileImage: {
        data: Buffer,
        contentType: String
    },
    EggOrEggless : {
        type : String
    },
    PreferredVendorName : {
        type : String
    },
    DateOfBirth : {
        type : String
    },
    Gender : {
        type :String
    },
    YearsOfExperienceAsBaker : {
        type : String,
    },
    AadhaarNumber : {
        type : String
    },
    PANNumber : {
        type : String
    },
    GSTNumber : {
        type : String,
    },
    FSSAINumber : {
        type : String
    },
    FSSAIExpiryDate : {
        type : String
    },
    MaximumCakesPerDay : {
        type : String
    },
    MaximumCakesPerWeek : {
        type : String
    },
    JobType : {
        type : String
    },
    SpecializedIn : {
        type : String
    },
    BankName : {
        type : String
    },
    Branch : {
        type : String
    },
    AccountNumber : {
        type : String
    },
    IFSCCode : {
        type : String
    },
    UPIId : {
        type : String
    }, 
    Registered_On : {
        type : String
    },
    Created_On: {
        type : String,
    },
    Modified_On: {
        type : String,
    },
    Status : {
        type : String,
        default : 'New'
    },
    IsDeleted: {
        type : String,
        default : 'n'
    }
    
});

const collectionName = 'vendors';

module.exports = mongoose.model('vendors',VendorSchema,collectionName);