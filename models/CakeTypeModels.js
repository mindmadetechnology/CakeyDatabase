const mongoose = require("mongoose");

const CakeTyeSchema = new mongoose.Schema({

    Type: {
        type: String
    },
    SubType: [{
        type: String,
    }],
    IsDeleted: {
        type: String,
        default: 'n'
    },
});

const collectionName = 'CakeTye';

module.exports = mongoose.model('CakeTye', CakeTyeSchema, collectionName);