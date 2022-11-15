const DeliveryChargeModel = require('../models/DeliveryChargeModels');
const TaxModel = require('../models/TaxModel');
const ProductSharePercentageModel = require('../models/ProductSharePercentageModel');
const moment = require('moment-timezone');

const ChangeDeliveryCharge = (req, res) => {
    const Km = req.body.Km;
    const Amount = req.body.Amount;
    const Modified_On = moment().tz('Asia/Kolkata').format("DD-MM-YYYY hh:mm A");

    try {
        DeliveryChargeModel.find({}, function (err, result) {
            if (err) {
                res.send({ statusCode: 400, message: 'Failed' });
            } else if (result.length === 0) {
                const NewDeliveryCharge = new DeliveryChargeModel({
                    Km: Km,
                    Amount: Amount,
                    Modified_On: Modified_On
                });
                NewDeliveryCharge.save(function (err, result2) {
                    if (err) {
                        res.send({ statusCode: 400, message: 'Failed' });
                    } else {
                        res.send({ statusCode: 200, message: 'Delivery Charge Updated Successfully' });
                    }
                });
            } else {
                // console.log(result[0]._id);
                DeliveryChargeModel.findByIdAndUpdate({ _id: result[0]._id }, {
                    $set: {
                        Km: Km,
                        Amount: Amount,
                        Modified_On: Modified_On
                    }
                }, function (err, result3) {
                    if (err) {
                        res.send({ statusCode: 400, message: 'Failed' });
                    } else {
                        res.send({ statusCode: 200, message: 'Delivery Charge Updated Successfully' });
                    }
                })
            }
        });
    } catch (err) {
        res.send({ statusCode: 400, message: 'Failed' });
    }
};

const GetDeliveryCharge = (req, res) => {
    try {
        DeliveryChargeModel.find({}, function (err, result) {
            if (err) {
                res.send({ statusCode: 400, message: 'Failed' });
            } else {
                res.send(result)
            }
        });
    } catch (err) {
        res.send({ statusCode: 400, message: 'Failed' });
    }
};

const ChangeProductSharePercentage = (req, res) => {
    const Percentage = req.body.Percentage;
    const Modified_On = moment().tz('Asia/Kolkata').format("DD-MM-YYYY hh:mm A");

    try {
        ProductSharePercentageModel.find({}, function (err, result) {
            if (err) {
                res.send({ statusCode: 400, message: 'Failed' });
            } else if (result.length === 0) {
                const NewProductSharePercentage = new ProductSharePercentageModel({
                    Km: Km,
                    Amount: Amount,
                    Modified_On: Modified_On
                });
                NewProductSharePercentage.save(function (err, result2) {
                    if (err) {
                        res.send({ statusCode: 400, message: 'Failed' });
                    } else {
                        res.send({ statusCode: 200, message: 'Delivery Charge Updated Successfully' });
                    }
                });
            } else {
                // console.log(result[0]._id);
                ProductSharePercentageModel.findByIdAndUpdate({ _id: result[0]._id }, {
                    $set: {

                        Percentage: Percentage,
                        Modified_On: Modified_On
                    }
                }, function (err, result3) {
                    if (err) {
                        res.send({ statusCode: 400, message: 'Failed' });
                    } else {
                        res.send({ statusCode: 200, message: 'Delivery Charge Updated Successfully' });
                    }
                })
            }
        });
    } catch (err) {
        res.send({ statusCode: 400, message: 'Failed' });
    }
};

const GetProductSharePercentage = (req, res) => {
    try {
        ProductSharePercentageModel.find({}, function (err, result) {
            if (err) {
                res.send({ statusCode: 400, message: 'Failed' });
            } else {
                if (result.length === 0) {
                    res.send({ message: 'No Records Found' });
                } else {
                    res.send(result);
                }
            }
        });
    } catch (err) {
        res.send({ statusCode: 400, message: 'Failed' });
    }
};


const ChangeTax = (req, res) => {
    const CGST = req.body.CGST;
    const GST = req.body.GST;
    const Total_GST = req.body.Total_GST;
    const Modified_On = moment().tz('Asia/Kolkata').format("DD-MM-YYYY hh:mm A");

    try {
        TaxModel.find({}, function (err, result) {
            if (err) {
                res.send({ statusCode: 400, message: 'Failed' });
            } else if (result.length === 0) {
                const NewTax = new TaxModel({
                    CGST: CGST,
                    GST: GST,
                    Total_GST: Total_GST,
                    Modified_On: Modified_On
                });
                NewTax.save(function (err) {
                    if (err) {
                        res.send({ statusCode: 400, message: 'Failed' });
                    } else {
                        res.send({ statusCode: 200, message: 'Tax Updated Successfully' });
                    }
                });
            } else {
                TaxModel.findByIdAndUpdate({ _id: result[0]._id }, {
                    $set: {
                        CGST: CGST,
                        GST: GST,
                        Total_GST: Total_GST,
                        Modified_On: Modified_On
                    }
                }, function (err) {
                    if (err) {
                        res.send({ statusCode: 400, message: 'Failed' });
                    } else {
                        res.send({ statusCode: 200, message: 'Updated Successfully' });
                    }
                })
            }
        });
    } catch (err) {
        res.send({ statusCode: 400, message: 'Failed' });
    }
};

const GetTax = (req, res) => {
    try {
        TaxModel.find({}, function (err, result) {
            if (err) {
                res.send({ statusCode: 400, message: 'Failed' });
            } else {
                if (result.length === 0) {
                    res.send({ message: 'No Records Found' });
                } else {
                    res.send(result);
                }
            }
        });
    } catch (err) {
        res.send({ statusCode: 400, message: 'Failed' });
    }
};

module.exports = {
    ChangeDeliveryCharge,
    GetDeliveryCharge,
    ChangeTax,
    GetTax,
    GetProductSharePercentage,
    ChangeProductSharePercentage
};