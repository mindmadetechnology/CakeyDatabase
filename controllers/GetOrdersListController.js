const OrdersModel = require('../models/OrdersListModels');
const OtherProductOrdersModel = require('../models/OtherProductOrdersModels');
const HamperOrdersModel = require('../models/HamperOrdersListModels');
const moment = require('moment-timezone');

const GetDeliveryOrdersListForHelpdesk = async (req, res) => {
    const StartDate = req.params.StartDate;
    const EndDate = req.params.EndDate; //date or today

    try {
        const Orders = await new Promise((resolve, reject) => {
            OrdersModel.find({}, function (err, result) {
                (err) ? reject(err) : (result === null) ? reject(false) : resolve(result);
            });
        });
        const OtherProductOrders = await new Promise((resolve, reject) => {
            OtherProductOrdersModel.find({}, function (err, result) {
                (err) ? reject(err) : (result === null) ? reject(false) : resolve(result);
            });
        });
        const HamperOrders = await new Promise((resolve, reject) => {
            HamperOrdersModel.find({}, function (err, result) {
                (err) ? reject(err) : (result === null) ? reject(false) : resolve(result);
            });
        });
        let Result = [...Orders, ...OtherProductOrders, ...HamperOrders];
        let FilteredData = [], SortedData = [];
        if (EndDate === 'today') {
            FilteredData = Result.filter(val => {
                if (val.DeliveryDate === StartDate) {
                    return val;
                }
            });
        } else {
            var SD = moment(StartDate, 'DD-MM-YYYY');
            var ED = moment(EndDate, 'DD-MM-YYYY');
            var Differ = ED.diff(SD, 'days');
            var RangeDate = [];
            for (let i = 0; i <= Differ; i++) {
                RangeDate.push(moment(StartDate, 'DD-MM-YYYY').add(i, 'days').format('DD-MM-YYYY'))
            };
            FilteredData = Result.filter(val => {
                for (let j = 0; j < RangeDate.length; j++) {
                    if (val.DeliveryDate.slice(0, 10) === RangeDate[j]) {
                        return val;
                    }
                }
            });
        };
        if (FilteredData.length === 0) {
            res.send({ statusCode: 200, message: 'No Records Found' });
        } else {
            SortedData = FilteredData.sort((a, b) => { return new Date(a.DeliveryDate) - new Date(b.DeliveryDate) });
            res.send(SortedData);
        };
    } catch (err) {
        res.send({ statusCode: 400, message: "Failed" });
    }
};

const GetCurrentOrdersListForHelpdesk = async (req, res) => {
    const StartDate = req.params.StartDate;
    const EndDate = req.params.EndDate; //date or today

    try {
        const Orders = await new Promise((resolve, reject) => {
            OrdersModel.find({}, function (err, result) {
                (err) ? reject(err) : (result === null) ? reject(false) : resolve(result);
            });
        });
        const OtherProductOrders = await new Promise((resolve, reject) => {
            OtherProductOrdersModel.find({}, function (err, result) {
                (err) ? reject(err) : (result === null) ? reject(false) : resolve(result);
            });
        });
        const HamperOrders = await new Promise((resolve, reject) => {
            HamperOrdersModel.find({}, function (err, result) {
                (err) ? reject(err) : (result === null) ? reject(false) : resolve(result);
            });
        });
        let Result = [...Orders, ...OtherProductOrders, ...HamperOrders];
        let FilteredData = [], SortedData = [];
        if (EndDate === 'today') {
            FilteredData = Result.filter(val => {
                if (val.Created_On.slice(0, 10) === StartDate) {
                    return val;
                }
            });
        } else {
            var SD = moment(StartDate, 'DD-MM-YYYY');
            var ED = moment(EndDate, 'DD-MM-YYYY');
            var Differ = ED.diff(SD, 'days');
            var RangeDate = [];
            for (let i = 0; i <= Differ; i++) {
                RangeDate.push(moment(StartDate, 'DD-MM-YYYY').add(i, 'days').format('DD-MM-YYYY'))
            };
            FilteredData = Result.filter(val => {
                for (let j = 0; j < RangeDate.length; j++) {
                    if (val.Created_On.slice(0, 10) === RangeDate[j]) {
                        return val;
                    }
                }
            });
        };
        if (FilteredData.length === 0) {
            res.send({ statusCode: 200, message: 'No Records Found' });
        } else {
            SortedData = FilteredData.sort((a, b) => { return new Date(a.Created_On) - new Date(b.Created_On) });
            res.send(SortedData);
        };
    } catch (err) {
        res.send({ statusCode: 400, message: "Failed" });
    }
};

module.exports = {
    GetDeliveryOrdersListForHelpdesk,
    GetCurrentOrdersListForHelpdesk
};