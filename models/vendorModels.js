const mongoose = require("mongoose");

const VendorSchema = new mongoose.Schema({
    Email: {
        type: String,
    },
    Password : {
        type : String,
    },
    Created_On : {
        type : String,
    },
    Modified_On : {
        type : String,
    },
    IsDeleted : {
        type : String,
        default : 'n'
    }
});

const collectionName = 'vendors';

module.exports = mongoose.model('vendors',VendorSchema,collectionName);