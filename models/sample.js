const mongoose = require("mongoose");
// const { increment } = require('../config/db');

const SampleSchema = new mongoose.Schema({
    // Name: {
    //     type: String,
    // },
    // Password: {
    //     type: String,
    // },
    Image:{
        type:Object,
        data:Buffer
    }

});

// SampleSchema.plugin(increment, {
//     type: String,
//     modelName: 'sample',
//     fieldName: 'Id',
//     prefix: 'CKY',
// });

const collectionName = 'sample';

module.exports = mongoose.model('sample', SampleSchema, collectionName);