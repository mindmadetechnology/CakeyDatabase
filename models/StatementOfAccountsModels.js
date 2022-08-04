const mongoose = require("mongoose");

const StatementOfAccountsSchema = new mongoose.Schema({

    VendorID: {
        type: String
    },
    Payment: {
        type: String
    },
    PaymentType: {
        type: String
    },
    Payment_Date: {
        type: String,
    },
    Created_On: {
        type: String,
    },
});

const collectionName = 'Vendor-StatementOfAccounts';

module.exports = mongoose.model('Vendor-StatementOfAccounts', StatementOfAccountsSchema, collectionName);