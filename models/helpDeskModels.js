const mongoose = require("mongoose");
const { increment } = require('../config/db');

const HelpDeskSchema = new mongoose.Schema({

    Email: {
        type: String,
    },
    Name: {
        type: String,
    },
    Password: {
        type: String,
    },
    Created_On: {
        type: String
    },
    ProfileImage: {
        data: Buffer,
        contentType: String
    },
    Modified_On: {
        type: String,
    },
    IsDeleted : {
        type : String,
        default : 'n'
    }

});

HelpDeskSchema.plugin(increment, {
    type: String,
    modelName: 'helpDesk',
    fieldName: 'Id',
    prefix: 'CKYHLP-',
});

const collectionName = 'helpDesk';

module.exports = mongoose.model('helpDesk', HelpDeskSchema, collectionName);