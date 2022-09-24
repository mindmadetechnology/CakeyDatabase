const mongoose = require('mongoose');

const TaxSchema = new mongoose.Schema({
    CGST: {
        type: String,
        default: '0'
    },
    GST: {
        type: String,
        default: '0'
    },
    Total_GST: {
        type: String,
        default: '0'
    },
    Modified_On:{
        type: String,
    },
});

const collectionName = 'Tax';

module.exports = mongoose.model('Tax', TaxSchema, collectionName);