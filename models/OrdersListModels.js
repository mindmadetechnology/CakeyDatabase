const mongoose = require("mongoose");
const { increment } = require('../config/db');

const OrderSchema = new mongoose.Schema({

    CakeID: {
        type: String
    },
    Cake_ID: {
        type: String
    },
    Title: {
        type: String,
    },
    TypeOfCake: {
        type: String,
    },
    Description: {
        type: String,
    },
    Images: {
        type: String,
    },
    EggOrEggless: {
        type: String,
    },
    Price: {
        type: String,
    },
    Discount: {
        type: Number,
        default: 0,
    },
    ExtraCharges: {
        type: String,
        default: '0',
    },
    Flavour: [{
        Name: {
            type: String
        },
        Price: {
            type: String
        }
    }],
    Shape: {
        type: String,
    },
    Article: {
        Name: {
            type: String
        },
        Price: {
            type: String
        }
    },
    // CakeToppings: [{
    //     type: String
    // }],
    Weight: {
        type: String,
    },
    MessageOnTheCake: {
        type: String,
    },
    SpecialRequest: {
        type: String,
    },
    VendorID: {
        type: String,
    },
    Vendor_ID: {
        type: String,
    },
    VendorName: {
        type: String,
    },
    VendorPhoneNumber: {
        type: String,
    },
    UserID: {
        type: String,
    },
    User_ID: {
        type: String,
    },
    UserName: {
        type: String,
    },
    UserPhoneNumber: {
        type: String,
    },
    DeliveryAddress: {
        type: String,
    },
    DeliveryDate: {
        type: String,
    },
    DeliverySession: {
        type: String,
    },
    DeliveryInformation: {
        type: String
    },
    VendorAddress: {
        type: String,
    },
    ItemCount: {
        type: Number,
    },
    Total: {
        type: String,
    },
    DeliveryCharge: {
        type: String,
    },
    Status: {
        type: String,
        default: 'New'
    },
    PaymentType: {
        type: String,
    },
    PaymentStatus: {
        type: String,
    },
    Gst: {
        type: String,
    },
    Sgst: {
        type: String,
    },
    Created_On: {
        type: String
    },
    Modified_On: {
        type: String
    },
    Status_Updated_On: {
        type: String,
    },
    Status_Updated_By: {
        type: String,
    },

});

OrderSchema.plugin(increment, {
    type: String,
    modelName: 'OrdersList',
    fieldName: 'Id',
    prefix: 'CKYORD-',
});

const collectionName = 'OrdersList';

module.exports = mongoose.model('OrdersList', OrderSchema, collectionName);