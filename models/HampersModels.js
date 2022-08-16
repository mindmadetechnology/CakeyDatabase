const mongoose = require("mongoose");
const { increment } = require('../config/db');

const HampersSchema = new mongoose.Schema({

    VendorID: {
        type: String,
    },
    Vendor_ID: {
        type: String,
    },
    VendorName: {
        type: String,
    },
    VendorPhoneNumber1: {
        type: String,
    },
    VendorPhoneNumber2: {
        type: String,
    },
    VendorAddress: {
        type: String,
    },
    GoogleLocation: {
        Latitude: {
            type: Number
        },
        Longitude: {
            type: Number
        }
    },
    HampersName: {
        type: String,
    },
    Product_Contains: [{
        type: String,
    }],
    HamperImage: {
        type: String,
    },
    Price: {
        type: String,
    },
    Description: {
        type: String,
    },
    // DeliveryCharge: {
    //     type: String,
    // },
    // Total: {
    //     type: String,
    // },
    Created_On: {
        type: String,
    },
    Modified_On: {
        type: String,
    },
    Status: {
        type: String,
        default: 'New'
    },
    Status_Updated_On: {
        type: String,
    },
    Status_Updated_By: {
        type: String,
    },

});

HampersSchema.plugin(increment, {
    type: String,
    modelName: 'Hampers',
    fieldName: 'Id',
    prefix: 'CKYH-',
});

const collectionName = 'Hampers';

module.exports = mongoose.model('Hampers', HampersSchema, collectionName);