const mongoose = require("mongoose");

const SampleVendorSchema = new mongoose.Schema({

    Email: {
        type: String,
    },
    VendorName: {
        type: String,
    },
    PinCode: {
        type: String,
    },
    
});

const collectionName = 'SampleVendor';

module.exports = mongoose.model('SampleVendor', SampleVendorSchema, collectionName);