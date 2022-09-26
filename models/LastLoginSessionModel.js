const mongoose = require('mongoose');

const LastLoginSessionSchema = new mongoose.Schema({
    Id: {
        type: String,
    },
    Vendor_ID: {
        type: String,
    },
    VendorName: {
        type: String,
    },
    LastLogin_At: {
        type: String,
    },
    LastLogout_At: {
        type: String,
    },
});

const CollectionName = 'LastLoginSession';

module.exports = mongoose.model('LastLoginSession', LastLoginSessionSchema, CollectionName)