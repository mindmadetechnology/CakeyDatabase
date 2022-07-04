const mongoose = require("mongoose");
const { increment } = require('../config/db');

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
        type: String
    },
    Created_On: {
        type: String,
    },
    Modified_On: {
        type: String,
    },
    Notification: {
        type: String,
        default: 'n',
    },
    Notification_Id: {
        type: String,
    },

});

UserSchema.plugin(increment, {
    type: String,
    modelName: 'users',
    fieldName: 'Id',
    prefix: 'CKYCUS-',
});

const collectionName = 'users';

module.exports = mongoose.model('users', UserSchema, collectionName);