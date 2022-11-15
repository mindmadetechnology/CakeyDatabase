const mongoose = require('mongoose');
const { increment } = require('../config/db');

const TicketSchema = new mongoose.Schema({
    TypeOfUser: {
        type: String,
    },
    CauseOfTicket: {
        type: String,
    },
    TicketDescription: {
        type: String,
    },
    TypeOfOrder: {
        type: String,
    },
    OrderID: {
        type: String,
    },
    Order_ID: {
        type: String,
    },
    Order_Status: {
        type: String,
    },
    ProductID: {
        type: String,
    },
    Product_ID: {
        type: String,
    },
    VendorID: {
        type: String,
    },
    Vendor_ID: {
        type: String,
    },
    Ticket_Raised_On: {
        type: String,
    },
    Ticket_Raised_By: {
        ID: {
            type: String,
        },
        Name: {
            type: String,
        },
    },
    Ticket_Accessed_By: {
        HelpdeskV: {
            type: String,
            default: 'n'
        },
        HelpdeskC: {
            type: String,
            default: 'n'
        },
        Manager: {
            type: String,
            default: 'n'
        },
        Management: {
            type: String,
            default: 'n'
        },
        Accounts: {
            type: String,
            default: 'n'
        },
        Customer: {
            type: String,
            default: 'n'
        },
        Vendor: {
            type: String,
            default: 'n'
        },
    },
    Updated_By: {
        TypeOfUser: {
            type: String,
        },
        ID: {
            type: String,
        },
        Name: {
            type: String,
        },
    },
    Updated_On: {
        type: String,
    },
});

TicketSchema.plugin(increment, {
    type: String,
    modelName: 'Tickets',
    fieldName: 'Id',
    prefix: 'CKYT-',
});

const collectionName = 'Tickets';

module.exports = mongoose.model('Tickets', TicketSchema, collectionName);

