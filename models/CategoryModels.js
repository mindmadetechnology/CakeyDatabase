const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({

    Category: {
        type: String,
    },
    SubCategory:[{
        Name:{
            type:String
        },
        SubCategory_Created_On:{
            type:String
        }
    }],
    Category_Created_On : {
        type : String,
    },
    Category_Modified_On : {
        type : String
    },
    
});

const collectionName = 'category';

module.exports = mongoose.model('category', CategorySchema, collectionName);