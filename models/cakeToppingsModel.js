const mongoose = require("mongoose");

const CakeToppingsSchema = new mongoose.Schema({

    Name: {
        type: String
    },
    Created_On: {
        type: String
    },
});

const collectionName = 'CakeToppings';

module.exports = mongoose.model('CakeToppings', CakeToppingsSchema, collectionName);