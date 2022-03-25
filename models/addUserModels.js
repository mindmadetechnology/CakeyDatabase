const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    ProfileImg: {
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
    }
});

const collectionName = 'users';

module.exports = mongoose.model('users', UserSchema, collectionName);