const mongoose = require('mongoose');

const DeliveryChangeSchema = new mongoose.Schema({
    Km: {
        type: String,
    },
    Amount: {
        type: String,
    },
    Modified_On: {
        type: String,
    },
});

const collectionName = 'DeliveryCharge';

module.exports = mongoose.model('DeliveryCharge', DeliveryChangeSchema, collectionName);