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
        type : String,
    },
    PhoneNumber: {
        type : String,
    },
    ProfileBanner: {
        data: Buffer,
        contentType: String
    },
    Description:{
        type : String,
    },
    ProfileImage: {
        data: Buffer,
        contentType: String
    },
    Created_On: {
        type : String,
    },
    Modified_On: {
        type : String,
    },
    IsDeleted: {
        type : String,
        default : 'n'
    }
});

const collectionName = 'vendors';

module.exports = mongoose.model('vendors',VendorSchema,collectionName);