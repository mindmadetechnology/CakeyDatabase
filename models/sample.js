const mongoose = require("mongoose");

const SampleSchema = new mongoose.Schema({
    VendorName: {
        type: String,
    },
    PinCode: {
        type: String,
    },
    Date: {
        type: String,
    }
});

const collectionName = 'sample';

module.exports = mongoose.model('sample', SampleSchema, collectionName);