const TicketModel = require('../models/TicketModels');
const moment = require('moment-timezone');

const AddTickets = (req, res) => {

    const {
        TypeOfUser, CauseOfTicket, TicketDescription, TypeOfOrder, OrderID, Order_ID, Order_Status,
        ProductID, Product_ID, VendorID, Vendor_ID, Ticket_Raised_By, Ticket_Accessed_By
    } = req.body;
    const Ticket_Raised_On = moment().tz('Asia/Kolkata').format("DD-MM-YYYY hh:mm A");

    try {
        const NewTicket = new TicketModel({
            TypeOfUser: TypeOfUser,
            CauseOfTicket: CauseOfTicket,
            TicketDescription: TicketDescription,
            TypeOfOrder: TypeOfOrder,
            OrderID: OrderID,
            Order_ID: Order_ID,
            Order_Status: Order_Status,
            ProductID: ProductID,
            Product_ID: Product_ID,
            VendorID: VendorID,
            Vendor_ID: Vendor_ID,
            Ticket_Raised_By: Ticket_Raised_By,
            Ticket_Raised_On: Ticket_Raised_On,
            Ticket_Accessed_By: Ticket_Accessed_By
        });
        NewTicket.save(function (err, result) {
            if (err) {
                res.send({ statusCode: 400, message: "Failed" });
            } else {
                res.send({ statusCode: 200, message: "Ticket Raised Successfully" });
            }
        });
    } catch (err) {
        res.send({ statusCode: 400, message: "Failed" });
    };
};

const IntimationUpdate = (req, res) => {

    const Id = req.params.Id;
    const { Updated_By, Ticket_Accessed_By } = req.body;
    const Updated_On = moment().tz('Asia/Kolkata').format("DD-MM-YYYY hh:mm A");

    try {
        TicketModel.findOneAndUpdate({ _id: Id }, {
            $set: {
                Ticket_Accessed_By: Ticket_Accessed_By,
                Updated_By: Updated_By,
                Updated_On: Updated_On
            }
        }, function (err) {
            if (err) {
                res.send({ statusCode: 400, message: 'Failed' });
            } else {
                res.send({ statusCode: 200, message: 'Intimation Succeeds' });
            }
        });
    } catch (err) {
        res.send({ statusCode: 400, message: "Failed" });
    };
};

module.exports = {
    AddTickets,
    IntimationUpdate
};