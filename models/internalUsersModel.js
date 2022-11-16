const mongoose = require("mongoose");
const { increment } = require('../config/db');

const UserSchema = new mongoose.Schema({

    ProfileImage: {
        data: Buffer,
        contentType: String
    },
    Name: {
        type: Number,
    },
    Mobilenumber: {
        type: String,
    },
    Password: {
        type: String
    },
    TypeOfUser: {
        type: String
    },
    Created_On: {
        type: String,
    },
    Modified_On: {
        type: String,
    },
  

});

UserSchema.plugin(increment, {
    type: String,
    modelName: 'internalUsers',
    fieldName: 'Id',
    prefix: 'CKYCUS-',
});

const collectionName = 'internalUsers';

module.exports = mongoose.model('internalUsers', UserSchema, collectionName);