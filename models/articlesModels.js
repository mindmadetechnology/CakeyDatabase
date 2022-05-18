const mongoose = require("mongoose");

const CakeArticlesSchema = new mongoose.Schema({

    Name: {
        type: String
    },
    Created_On: {
        type: String
    },
});

const collectionName = 'CakeArticles';

module.exports = mongoose.model('CakeArticles', CakeArticlesSchema, collectionName);