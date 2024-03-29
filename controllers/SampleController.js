const sampleModel = require('../models/sample');
const SampleVendorModel = require('../models/SampleVendorModel');
const moment = require('moment-timezone');

const CreateSampleVendors = (req, res) => {

    const Email = req.body.Email;
    const VendorName = req.body.VendorName;
    const PinCode = req.body.PinCode;

    try {
        const NewVendor = new SampleVendorModel({
            Email: Email,
            VendorName: VendorName,
            PinCode: PinCode,
        });

        NewVendor.save(function (err, result) {
            if (err) {
                res.send({ statusCode: 400, message: "Failed" });
            } else {
                res.send({ statusCode: 200, message: "Created Successfully" });
            }
        })
    } catch (err) {
        res.send({ statusCode: 400, message: "Failed" });
    }
};

const CreateSampleOrders = (req, res) => {

    const VendorName = req.body.VendorName;
    const PinCode = req.body.PinCode;
    const Date = req.body.Date;

    try {
        const NewOrder = new sampleModel({
            VendorName: VendorName,
            PinCode: PinCode,
            Date: Date,
        });

        NewOrder.save(function (err, result) {
            if (err) {
                res.send({ statusCode: 400, message: "Failed" });
            } else {
                res.send({ statusCode: 200, message: "Order placed Successfully" });
            }
        })
    } catch (err) {
        res.send({ statusCode: 400, message: "Failed" });
    }
};

const GetPinCodeList = (req, res) => {
    try {
        SampleVendorModel.find({}, function (err, result) {
            if (err) {
                res.send({ statusCode: 400, message: "Failed" });
            } else if (result.length === 0) {
                res.send({ statusCode: 400, message: "No Records Found" });
            } else {
                let List = [];
                result.filter(val => {
                    List.push(val.PinCode);
                });
                let PinCodeList = List.filter((val, i) => List.indexOf(val) === i);
                const FinalList = PinCodeList.sort((a, b) => Number(a) - Number(b))
                res.send(FinalList);
            }
        });
    } catch (err) {
        res.send({ statusCode: 400, message: "Failed" });
    }
};

const GetSalesCountByPincode = (req, res) => {

    const StartDate = req.params.StartDate;
    const EndDate = req.params.EndDate;
    const Type = req.params.Type; //single, double

    try {
        if (Type === 'single') {
            SampleVendorModel.find({}, function (err, result) {
                if (err) {
                    res.send({ statusCode: 400, message: "Failed" });
                } else if (result.length === 0) {
                    res.send({ statusCode: 400, message: "No Records Found" });
                } else {
                    sampleModel.find({}, function (err, result2) {
                        if (err) {
                            res.send({ statusCode: 400, message: "Failed" });
                        } else if (result.length === 0) {
                            res.send({ statusCode: 400, message: "No Records Found" });
                        } else {
                            let List = [], DateFilteredData = [];
                            result.filter(val => {
                                List.push(val.PinCode);
                            });
                            let PinCodeList = List.filter((val, i) => List.indexOf(val) === i);
                            const FinalPincodeList = PinCodeList.sort((a, b) => Number(a) - Number(b));

                            result2.filter(val => {
                                if (moment(val.Date, 'DD-MM-YYYY hh:mm A').format('MM-YYYY') === moment(StartDate, 'MM-YYYY').format('MM-YYYY')) {
                                    DateFilteredData.push(val);
                                }
                            });
                            let FinalResult = [];
                            if (DateFilteredData.length === 0) {
                                FinalResult.push({
                                    label: moment(StartDate, 'MM-YYYY').format('MMMM'),
                                    data: [],
                                    borderColor: 'rgb(255, 99, 132)',
                                    backgroundColor: "transparent"
                                });
                            } else {
                                let NewArray = new Array(FinalPincodeList.length).fill(0);
                                DateFilteredData.filter(val => {
                                    let Index = FinalPincodeList.indexOf(val.PinCode);
                                    let ArrayValues = [...NewArray];
                                    ArrayValues[Index] = ArrayValues[Index] + 1;
                                    NewArray = ArrayValues;
                                });
                                FinalResult.push({
                                    label: moment(StartDate, 'MM-YYYY').format('MMMM'),
                                    data: NewArray,
                                    borderColor: 'rgb(255, 99, 132)',
                                    backgroundColor: "transparent"
                                });
                            }
                            res.send(FinalResult);
                        }
                    });
                }
            });
        } else {
            SampleVendorModel.find({}, function (err, result) {
                if (err) {
                    res.send({ statusCode: 400, message: "Failed" });
                } else if (result.length === 0) {
                    res.send({ statusCode: 400, message: "No Records Found" });
                } else {
                    sampleModel.find({}, function (err, result2) {
                        if (err) {
                            res.send({ statusCode: 400, message: "Failed" });
                        } else if (result.length === 0) {
                            res.send({ statusCode: 400, message: "No Records Found" });
                        } else {
                            let List = [], StartDateFilteredData = [], EndDateFilteredData = [];
                            result.filter(val => {
                                List.push(val.PinCode);
                            });
                            let PinCodeList = List.filter((val, i) => List.indexOf(val) === i);
                            const FinalPincodeList = PinCodeList.sort((a, b) => Number(a) - Number(b));

                            result2.filter(val => {
                                if (moment(val.Date, 'DD-MM-YYYY hh:mm A').format('MM-YYYY') === moment(StartDate, 'MM-YYYY').format('MM-YYYY')) {
                                    StartDateFilteredData.push(val);
                                }
                            });
                            result2.filter(val => {
                                if (moment(val.Date, 'DD-MM-YYYY hh:mm A').format('MM-YYYY') === moment(EndDate, 'MM-YYYY').format('MM-YYYY')) {
                                    EndDateFilteredData.push(val);
                                }
                            });
                            let DataSet = [];
                            if (StartDateFilteredData.length === 0) {
                                DataSet.push({
                                    label: moment(StartDate, 'MM-YYYY').format('MMMM'),
                                    data: [],
                                    borderColor: 'rgb(255, 99, 132)',
                                    backgroundColor: "transparent"
                                });
                            } else {
                                let NewArray = new Array(FinalPincodeList.length).fill(0);
                                StartDateFilteredData.filter(val => {
                                    let Index = FinalPincodeList.indexOf(val.PinCode);
                                    let ArrayValues = [...NewArray];
                                    ArrayValues[Index] = ArrayValues[Index] + 1;
                                    NewArray = ArrayValues;
                                });
                                DataSet.push({
                                    label: moment(StartDate, 'MM-YYYY').format('MMMM'),
                                    data: NewArray,
                                    borderColor: 'rgb(255, 99, 132)',
                                    backgroundColor: "transparent"
                                });
                            };

                            if (EndDateFilteredData.length === 0) {
                                DataSet.push({
                                    label: moment(EndDate, 'MM-YYYY').format('MMMM'),
                                    data: [],
                                    borderColor: 'rgb(53, 162, 235)',
                                    backgroundColor: "transparent"
                                });
                            } else {
                                let NewArray = new Array(FinalPincodeList.length).fill(0);
                                EndDateFilteredData.filter(val => {
                                    let Index = FinalPincodeList.indexOf(val.PinCode);
                                    let ArrayValues = [...NewArray];
                                    ArrayValues[Index] = ArrayValues[Index] + 1;
                                    NewArray = ArrayValues;
                                });
                                DataSet.push({
                                    label: moment(EndDate, 'MM-YYYY').format('MMMM'),
                                    data: NewArray,
                                    borderColor: 'rgb(53, 162, 235)',
                                    backgroundColor: "transparent"
                                });
                            };
                            res.send(DataSet);
                        }
                    });
                }
            });
        }
    } catch (err) {
        res.send({ statusCode: 400, message: "Failed" });
    }
};

module.exports = {
    CreateSampleVendors,
    CreateSampleOrders,
    GetPinCodeList,
    GetSalesCountByPincode
}