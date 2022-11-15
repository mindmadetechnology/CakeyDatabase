const mongoose = require('mongoose');

const DeliveryChangeSchema = new mongoose.Schema({

    Percentage: {
        type: String,
    },
    Modified_On: {
        type: String,
    },
});

const collectionName = 'ProductSharePercentage';

module.exports = mongoose.model('ProductSharePercentage', DeliveryChangeSchema, collectionName);