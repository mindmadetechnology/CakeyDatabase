const mongoose = require("mongoose");

const CakeShapesSchema = new mongoose.Schema({

    Name: {
        type: String
    },
    Created_On: {
        type: String
    },
});

const collectionName = 'CakeShapes';

module.exports = mongoose.model('CakeShapes', CakeShapesSchema, collectionName);