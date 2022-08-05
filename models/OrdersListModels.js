const mongoose = require("mongoose");
const { increment } = require('../config/db');

const OrderSchema = new mongoose.Schema({

    CakeID: {
        type: String
    },
    Cake_ID: {
        type: String
    },
    CakeName: {
        type: String,
    },
    CakeCommonName: {
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
    EggOrEggless: {
        type: String,
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
        Name: {
            type: String
        },
        Price: {
            type: String
        }
    },
    Weight: {
        type: String,
    },
    Theme: {
        type: String,
    },
    ThemeSampleImage: {
        type: String,
    },
    Tier: {
        type: String,
    },
    Toppers : {
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
    // Article: {
    //     Name: {
    //         type: String
    //     },
    //     Price: {
    //         type: String
    //     }
    // },
    MessageOnTheCake: {
        type: String,
    },
    SpecialRequest: {
        type: String,
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
    ExtraCharges: {
        type: String,
        default: '0',
    },
    DeliveryCharge: {
        type: String,
    },
    Gst: {
        type: String,
    },
    Sgst: {
        type: String,
    },
    Tax: {
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
    Above5KG: {
        type: String,
        default: 'n'
    },
    PremiumVendor: {
        type: String,
        default: 'n'
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
    CustomizeCake: {
        type: String,
        default: 'n'
    },
    Vendor_Response_Status: {
        type: String,
        default: 'unseen'
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