const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({

    Email: {
        type: String,
    },
    AdminName : {
        type : String,
    },
    Password : {
        type : String,
    },
    ProfileImage: {
        data: Buffer,
        contentType: String
    },
    Modified_On : {
        type : String,
    }
    
});

const collectionName = 'admin';

module.exports = mongoose.model('admin',AdminSchema,collectionName);