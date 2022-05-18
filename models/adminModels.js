const mongoose = require("mongoose");
const { increment } = require('../config/db');

const AdminSchema = new mongoose.Schema({

    Email: {
        type: String,
    },
    AdminName: {
        type: String,
    },
    Password: {
        type: String,
    },
    ProfileImage: {
        data: Buffer,
        contentType: String
    },
    Modified_On: {
        type: String,
    }

});

AdminSchema.plugin(increment, {
    type: String,
    modelName: 'admin',
    fieldName: 'Id',
    prefix: 'CKYADM-',
});

const collectionName = 'admin';

module.exports = mongoose.model('admin', AdminSchema, collectionName);