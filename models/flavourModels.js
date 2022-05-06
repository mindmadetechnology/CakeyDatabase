const mongoose = require("mongoose");

const CakeFlavoursSchema = new mongoose.Schema({

    Name : {
        type : String
    },
    Created_On : {
        type : String
    },
});

const collectionName = 'CakeFlavours';

module.exports = mongoose.model('CakeFlavours',CakeFlavoursSchema,collectionName);