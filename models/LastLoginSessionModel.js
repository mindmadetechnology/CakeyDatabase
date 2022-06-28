const mongoose = require('mongoose');

const LastLoginSessionSchema = new mongoose.Schema({
    Id: {
        type: String,
    },
    LastLogin: {
        type: String,
    },
});

const CollectionName = 'LastLoginSession';

module.exports = mongoose.model('LastLoginSession', LastLoginSessionSchema, CollectionName)