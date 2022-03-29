const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    file: {
        type : String,
        // data: Buffer,
        // contentType: String
    },
    PhoneNumber: {
        type: Number,
    },
    UserName: {
        type: String,
    },
    Address: {
        no: {
            type: String
        },
        area: {
            type: String
        },
        district: {
            type: String
        }
    }
});

const collectionName = 'users';

module.exports = mongoose.model('users', UserSchema, collectionName);