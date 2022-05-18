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
        // Street: {
        //     type: String
        // },
        // City: {
        //     type: String
        // },
        // District: {
        //     type: String
        // },
        // Postalcode : {
        //     type : Number
        // }
    },
    Created_On: {
        type: String,
    },
    Modified_On: {
        type: String,
    }

});

UserSchema.plugin(increment, {
    type: String,
    modelName: 'users',
    fieldName: 'Id',
    prefix: 'CKYCUS-',
});

const collectionName = 'users';

module.exports = mongoose.model('users', UserSchema, collectionName);