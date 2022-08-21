const mongoose = require("mongoose");
const { increment } = require('../config/db');

const OrderSchema = new mongoose.Schema({

    Other_ProductID: {
        type: String
    },
    Other_Product_ID: {
        type: String
    },
    ProductName: {
        type: String,
    },
    ProductCommonName: {
        type: String
    },
    CakeType: {
        type: String,
    },
    CakeSubType: {
        type: String,
    },
    Image: {
        type: String, //main cake image
    },
    FinalProductImage: {
        type: String,
    },
    EggOrEggless: {
        type: String,
    },
    Flavour: [{
        type: String
    }],
    Shape: {
        type: String
    },
    Weight: {
        type: String,
    },
    Toppers: {
        TopperId: {
            type: String,
        },
        TopperName: {
            type: String
        },
        TopperImage: {
            type: String,
        },
        TopperPrice: {
            type: String,
        },
    },
    Description: {
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
    Price: {
        type: String,
    },
    ItemCount: {
        type: Number,
    },
    Discount: {
        type: Number,
        default: 0,
    },
    DeliveryCharge: {
        type: String,
    },
    Total: {
        type: String,
    },
    PaymentType: {
        type: String,
    },
    PaymentStatus: {
        type: String,
    },
    Created_On: {
        type: String
    },
    Status: {
        type: String,
        default: 'New'
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
    Cancelled_By: {
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