const cakeModel = require("../models/CakeModels");
const OtherProductModel = require('../models/OtherProductsModels');
const VendorModel = require('../models/vendorModels');
const LastLoginSessionModel = require('../models/LastLoginSessionModel');
const moment = require('moment-timezone');

const GetActiveVendorsCakesList = (req, res) => {
    try {
        LastLoginSessionModel.find({}, function (err, result) {
            if (err) {
                res.send({ statusCode: 400, message: 'Failed' });
            } else if (result.length === 0) {
                res.send({ message: 'No Records Found' });
            } else {
                VendorModel.find({}, function (err, result2) {
                    if (err) {
                        res.send({ statusCode: 400, message: 'Failed' });
                    } else {
                        var NewArray = [], FinalArray = [];
                        result.filter(val => {
                            let today = moment().tz('Asia/Kolkata').format("DD-MM-YYYY hh:mm A");
                            let ms = moment(today, "DD-MM-YYYY HH:mm A").diff(moment(val.LastLogout_At, "DD-MM-YYYY HH:mm A"));
                            let d = moment.duration(ms);
                            let s = Math.floor(d.asHours()) + moment.utc(ms).format(":mm:ss");
                            let a = s.split(':');
                            let seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);
                            NewArray.push({ seconds: seconds, Array: val });
                        });
                        NewArray.filter(val => {
                            result2.filter(v => {
                                if (val.seconds <= 120) {
                                    if (val.Array.Vendor_ID === v.Id) {
                                        if (v.Status === 'Approved') {
                                            FinalArray.push(JSON.parse(JSON.stringify(v._id)));
                                        }
                                    }
                                }
                            });
                        });
                        if (FinalArray.length === 0) {
                            res.send({ message: "No Records Found" });
                        } else {
                            cakeModel.find({ $and: [{ VendorID: { $in: FinalArray } }, { IsDeleted: 'n' }] }, function (err, CakesList) {
                                if (err) {
                                    res.send({ statusCode: 400, message: "Failed" });
                                } else {
                                    if (CakesList.length === 0) {
                                        res.send({ message: "No Records Found" });
                                    } else {
                                        res.send(CakesList);
                                    }
                                }
                            });
                        };
                    }
                });
            }
        });
    } catch (err) {
        res.send({ statusCode: 400, message: 'Failed' });
    };
};

const GetActiveVendorsOtherProductList = (req, res) => {
    try {
        LastLoginSessionModel.find({}, function (err, result) {
            if (err) {
                res.send({ statusCode: 400, message: 'Failed' });
            } else if (result.length === 0) {
                res.send({ message: 'No Records Found' });
            } else {
                VendorModel.find({}, function (err, result2) {
                    if (err) {
                        res.send({ statusCode: 400, message: 'Failed' });
                    } else {
                        var NewArray = [], FinalArray = [];
                        result.filter(val => {
                            let today = moment().tz('Asia/Kolkata').format("DD-MM-YYYY hh:mm A");
                            let ms = moment(today, "DD-MM-YYYY HH:mm A").diff(moment(val.LastLogout_At, "DD-MM-YYYY HH:mm A"));
                            let d = moment.duration(ms);
                            let s = Math.floor(d.asHours()) + moment.utc(ms).format(":mm:ss");
                            let a = s.split(':');
                            let seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);
                            NewArray.push({ seconds: seconds, Array: val });
                        });
                        NewArray.filter(val => {
                            result2.filter(v => {
                                if (val.seconds <= 120) {
                                    if (val.Array.Vendor_ID === v.Id) {
                                        if (v.Status === 'Approved') {
                                            FinalArray.push(JSON.parse(JSON.stringify(v._id)));
                                        }
                                    }
                                }
                            });
                        });
                        if (FinalArray.length === 0) {
                            res.send({ message: "No Records Found" });
                        } else {
                            OtherProductModel.find({ $and: [{ VendorID: { $in: FinalArray } }, { IsDeleted: 'n' }] }, function (err, ProductList) {
                                if (err) {
                                    res.send({ statusCode: 400, message: "Failed" });
                                } else {
                                    if (ProductList.length === 0) {
                                        res.send({ message: "No Records Found" });
                                    } else {
                                        res.send(ProductList);
                                    }
                                }
                            });
                        };
                    }
                });
            }
        });
    } catch (err) {
        res.send({ statusCode: 400, message: 'Failed' });
    };
};

const GetActiveVendorsList = (req, res) => {
    try {
        LastLoginSessionModel.find({}, function (err, result) {
            if (err) {
                res.send({ statusCode: 400, message: 'Failed' });
            } else if (result.length === 0) {
                res.send({ message: 'No Records Found' });
            } else {
                VendorModel.find({}, function (err, result2) {
                    if (err) {
                        res.send({ statusCode: 400, message: 'Failed' });
                    } else {
                        var NewArray = [], FinalArray = [];
                        result.filter(val => {
                            let today = moment().tz('Asia/Kolkata').format("DD-MM-YYYY hh:mm A");
                            let ms = moment(today, "DD-MM-YYYY HH:mm A").diff(moment(val.LastLogout_At, "DD-MM-YYYY HH:mm A"));
                            let d = moment.duration(ms);
                            let s = Math.floor(d.asHours()) + moment.utc(ms).format(":mm:ss");
                            let a = s.split(':');
                            let seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);
                            NewArray.push({ seconds: seconds, Array: val });
                        });
                        NewArray.filter(val => {
                            result2.filter(v => {
                                if (val.seconds <= 120) {
                                    if (val.Array.Vendor_ID === v.Id) {
                                        if (v.Status === 'Approved') {
                                            FinalArray.push(v);
                                        }
                                    }
                                }
                            });
                        });
                        if (FinalArray.length === 0) {
                            res.send({ message: "No Records Found" });
                        } else {
                            res.send(FinalArray);
                        };
                    }
                });
            }
        });
    } catch (err) {
        res.send({ statusCode: 400, message: 'Failed' });
    };
};

module.exports = {
    GetActiveVendorsCakesList,
    GetActiveVendorsOtherProductList,
    GetActiveVendorsList,
}