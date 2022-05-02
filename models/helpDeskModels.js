const mongoose = require("mongoose");

const HelpDeskSchema = new mongoose.Schema({

    Email: {
        type: String,
    },
    Name : {
        type : String,
    },
    Password : {
        type : String,
    },
    Created_On : {
        type : String
    },
    ProfileImage: {
        data: Buffer,
        contentType: String
    },
    Modified_On : {
        type : String,
    }
    
});

const collectionName = 'helpDesk';

module.exports = mongoose.model('helpDesk',HelpDeskSchema,collectionName);