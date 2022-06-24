const mongoose = require("mongoose");

const CakeToppersSchema = new mongoose.Schema({

    VendorID: {
        type: String,
    },
    Vendor_ID: {
        type: String,
    },
    VendorName: {
        type: String,
    },
    TopperName: {
        type: String,
    },
    TopperImage: {
        type: String,
    },
    Price: {
        type: String,
    },
    Stock: {
        type: String,
    },
    Created_On: {
        type: String,
    },
    Modified_On: {
        type: String,
    },
    IsDeleted: {
        type: String,
        default: 'n',
    },
});

const collectionName = 'Toppers';

module.exports = mongoose.model('Toppers', CakeToppersSchema, collectionName);