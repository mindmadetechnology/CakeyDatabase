const mongoose = require("mongoose");

const CakeTypeSchema = new mongoose.Schema({

    Type: {
        type: String
    },
    Type_Image: {
        type: String,
    },
    SubType: [{
        Name: {
            type: String,
        },
        SubType_Image: {
            type: String,
        },
    }],
    IsDeleted: {
        type: String,
        default: 'n'
    },
});

const collectionName = 'CakeType';

module.exports = mongoose.model('CakeType', CakeTypeSchema, collectionName);