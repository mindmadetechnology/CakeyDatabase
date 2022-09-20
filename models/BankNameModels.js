const mongoose = require("mongoose");

const BankNameSchema = new mongoose.Schema({

    BankName: {
        type: String,
    }

});

const collectionName = 'BankName';

module.exports = mongoose.model('BankName', BankNameSchema, collectionName);