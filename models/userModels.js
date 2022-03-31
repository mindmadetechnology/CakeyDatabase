const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    ProfileImage: {
        data: Buffer,
        contentType: String
    },
    PhoneNumber: {
        type: Number,
    },
    UserName: {
        type: String,
    },
    Address: {
        type: String,
        // no: {
        //     type: String
        // },
        // area: {
        //     type: String
        // },
        // district: {
        //     type: String
        // }
    },
    Created_On : {
        type : String,
    },
    Modified_On : {
        type : String,
    }
});

const collectionName = 'users';

module.exports = mongoose.model('users', UserSchema, collectionName);