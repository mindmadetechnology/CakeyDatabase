const mongoose = require("mongoose");

const BannerSchema = new mongoose.Schema({

    Image: {
        type: String,
    },
    Slogan: {
        type: String,
    },
    Created_On: {
        type: String,
    },
    Modified_On:{ 
        type: String,
    },

});

const collectionName = 'Banner';

module.exports = mongoose.model('Banner', BannerSchema, collectionName);