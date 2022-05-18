const mongoose = require("mongoose");

const CakeShapesSchema = new mongoose.Schema({

    Weight: {
        type: String
    },
    Created_On: {
        type: String
    },
});

const collectionName = 'CakeWeight';

module.exports = mongoose.model('CakeWeight', CakeShapesSchema, collectionName);