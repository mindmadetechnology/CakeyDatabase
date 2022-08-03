const mongoose = require("mongoose");

const StatementOfAccountsSchema = new mongoose.Schema({

    Name: {
        type: String
    },
    Created_On: {
        type: String
    },
});

const collectionName = 'StatementOfAccounts';

module.exports = mongoose.model('StatementOfAccounts', StatementOfAccountsSchema, collectionName);