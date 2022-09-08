const OrdersListModel = require("../models/OrdersListModels");
const HamperOrderModel = require('../models/HamperOrdersListModels');
const OtherProductOrdersModel = require("../models/OtherProductOrdersModels");
const StatementOfAccountsModel = require("../models/StatementOfAccountsModels");
const moment = require('moment-timezone');

const GetAdminStatementOfAccounts = (req, res) => {
    const Month = req.params.Month;
    const Year = req.params.Year;

    try {
        OrdersListModel.find({}, function (err, result) {
            if (err) {
                res.send({ statusCode: 400, message: 'Failed' });
            } else {
                HamperOrderModel.find({}, function (err, result2) {
                    if (err) {
                        res.send({ statusCode: 400, message: 'Failed' });
                    } else {
                        OtherProductOrdersModel.find({}, function (err, result3) {
                            if (err) {
                                res.send({ statusCode: 400, message: 'Failed' });
                            } else {
                                let FinalSortedList = [];
                                let OrderResult = result;
                                let TwoOrdersList = OrderResult.concat(result2);
                                let FinalOrdersArray = TwoOrdersList.concat(result3);
                                if (FinalOrdersArray.length === 0) {
                                    FinalSortedList = [];
                                } else if (FinalOrdersArray.length === 1) {
                                    FinalSortedList = FinalOrdersArray;
                                } else {
                                    const Array2 = FinalOrdersArray.map(val => {
                                        return { ...val, date: moment(val.Created_On, 'DD-MM-YYYY hh:mm A').diff(moment(new Date(), 'DD-MM-YYYY hh:mm A')) };
                                    });
                                    const NewList = Array2.sort((a, b) => { return a.date - b.date });
                                    NewList.filter(val => { FinalSortedList.push(val._doc) });
                                }
                                var OrdersList = [], OpeningArray = [], OpeningBalanceArray = [], OpeningBalance,
                                    ClosingArray = [], ClosingBalanceArray = [], ClosingBalance;
                                //opening balance
                                FinalSortedList.filter(val => {
                                    if (moment('01' + '-' + val.Created_On.slice(3, 10), 'DD-MM-YYYY').diff(moment('01' + '-' + Month + '-' + Year, 'DD-MM-YYYY')) < 0) {
                                        if (val.Status !== 'Cancelled') {
                                            OpeningArray.push(val);
                                        }
                                    }
                                });
                                if (OpeningArray.length === 0) {
                                    OpeningBalance = 0
                                } else {
                                    OpeningArray.filter(val => {
                                        if (val.PaymentStatus !== 'Paid') {
                                            OpeningBalanceArray.push(JSON.parse(val.Total));
                                        }
                                    });
                                    if (OpeningBalanceArray.length === 0) {
                                        OpeningBalance = 0
                                    } else if (OpeningBalanceArray.length === 1) {
                                        OpeningBalance = OpeningBalanceArray[0];
                                    } else {
                                        OpeningBalance = OpeningBalanceArray.reduce((a, b) => a + b, 0);
                                    };
                                };
                                //closing balance
                                FinalSortedList.filter(val => {
                                    if (moment('01' + '-' + val.Created_On.slice(3, 10), 'DD-MM-YYYY').diff(moment('01' + '-' + Month + '-' + Year, 'DD-MM-YYYY')) <= 0) {
                                        if (val.Status !== 'Cancelled') {
                                            ClosingArray.push(val);
                                        }
                                    }
                                });
                                if (ClosingArray.length === 0) {
                                    ClosingBalance = 0
                                } else {
                                    ClosingArray.filter(val => {
                                        if (val.PaymentStatus !== 'Paid') {
                                            ClosingBalanceArray.push(JSON.parse(val.Total));
                                        }
                                    });
                                    if (ClosingBalanceArray.length === 0) {
                                        ClosingBalance = 0
                                    } else if (ClosingBalanceArray.length === 1) {
                                        ClosingBalance = ClosingBalanceArray[0];
                                    } else {
                                        ClosingBalance = ClosingBalanceArray.reduce((a, b) => a + b, 0);
                                    };
                                };
                                FinalSortedList.filter(val => {
                                    if (val.Created_On.slice(3, 10) === Month + '-' + Year) {
                                        OrdersList.push(val);
                                    }
                                });
                                res.send({ OpeningBalance: OpeningBalance, ClosingBalance: ClosingBalance, result: OrdersList });
                            }
                        })
                    }
                })
            }
        })
    } catch (err) {
        res.send({ statusCode: 400, message: 'Failed' });
    }
};

const CreateStatementOfAccountsByVendorID = (req, res) => {
    const VendorID = req.body.VendorID;
    const Payment = req.body.Payment;
    const PaymentType = req.body.PaymentType;
    const Payment_Date = req.body.Payment_Date;
    const Created_On = moment().tz('Asia/Kolkata').format("DD-MM-YYYY hh:mm A");

    try {
        if (VendorID || Payment || PaymentType || Payment_Date) {
            const NewStatement = new StatementOfAccountsModel({
                VendorID: VendorID,
                Payment: Payment,
                PaymentType: PaymentType,
                Payment_Date: Payment_Date,
                Created_On: Created_On,
            });
            NewStatement.save(function (err) {
                if (err) {
                    res.send({ statusCode: 400, message: 'Failed' });
                } else {
                    res.send({ statusCode: 200, message: 'Created Successfully' });
                }
            });
        } else {
            res.send({ statusCode: 400, message: "required" });
        }
    } catch (err) {
        res.send({ statusCode: 400, message: 'Failed' });
    };
};

const GetVendorStatementOfAccountsList = (req, res) => {

    try {
        OrdersListModel.find({ $nor: [{ Status: 'Cancelled' }] }, function (err, result) {
            if (err) {
                res.send({ statusCode: 400, message: 'Failed' });
            } else {
                HamperOrderModel.find({ $nor: [{ Status: 'Cancelled' }] }, function (err, result2) {
                    if (err) {
                        res.send({ statusCode: 400, message: 'Failed' });
                    } else {
                        OtherProductOrdersModel.find({ $nor: [{ Status: 'Cancelled' }] }, function (err, result3) {
                            if (err) {
                                res.send({ statusCode: 400, message: 'Failed' });
                            } else {
                                let FinalSortedList = [];
                                let OrderResult = result;
                                let TwoOrdersList = OrderResult.concat(result2);
                                let FinalOrdersArray = TwoOrdersList.concat(result3);
                                if (FinalOrdersArray.length === 0) {
                                    FinalSortedList = [];
                                } else if (FinalOrdersArray.length === 1) {
                                    FinalSortedList = FinalOrdersArray;
                                } else {
                                    const Array2 = FinalOrdersArray.map(val => {
                                        return { ...val, date: moment(val.Created_On, 'DD-MM-YYYY hh:mm A').diff(moment(new Date(), 'DD-MM-YYYY hh:mm A')) };
                                    });
                                    const NewList = Array2.sort((a, b) => { return a.date - b.date });
                                    NewList.filter(val => { FinalSortedList.push(val._doc) });
                                }

                                if (FinalSortedList.length === 0) {
                                    res.send({ message: "No Records Found" });
                                } else {
                                    StatementOfAccountsModel.find({}, function (err, result4) {
                                        if (err) {
                                            res.send({ statusCode: 400, message: 'Failed' });
                                        } else {
                                            var VendorList = [], totals = [], VendorStatement = [], VendorListFromSOA = [], payments = [];
                                            FinalSortedList.filter(val => {
                                                if (val.VendorID) {
                                                    const NewVendor = {
                                                        Id: val.VendorID, Vendor_ID: val.Vendor_ID,
                                                        VendorName: val.VendorName, TotalAmount: val.Total
                                                    };
                                                    VendorList.push(NewVendor);
                                                }
                                            });
                                            VendorList.forEach(x => {
                                                const obj = totals.find(o => o.Id === x.Id);
                                                (obj) ? obj.TotalAmount = JSON.parse(obj.TotalAmount) + JSON.parse(x.TotalAmount)
                                                    : totals.push({
                                                        Id: x.Id, Vendor_ID: x.Vendor_ID,
                                                        VendorName: x.VendorName, TotalAmount: x.TotalAmount
                                                    });
                                            });
                                            console.log(result4)
                                            if (result4.length === 0) {
                                                totals.forEach(a => {
                                                    const Final = {
                                                        Id: a.Id, Vendor_ID: a.Vendor_ID,
                                                        VendorName: a.VendorName, TotalAmount: Math.round(a.TotalAmount),
                                                        TotalPayment: 0,
                                                        AmountDue: Math.abs(Math.round(a.TotalAmount))
                                                    };
                                                    VendorStatement.push(Final);

                                                });
                                            } else {
                                                result4.filter(val => {
                                                    const NewVendor = {
                                                        Id: val.VendorID, Payment: val.Payment
                                                    };
                                                    VendorListFromSOA.push(NewVendor);
                                                });
                                                VendorListFromSOA.forEach(x => {
                                                    const obj = payments.find(o => o.Id === x.Id);
                                                    (obj) ? obj.Payment = JSON.parse(obj.Payment) + JSON.parse(x.Payment)
                                                        : payments.push({ Id: x.Id, Payment: JSON.parse(x.Payment) });
                                                });
                                                totals.forEach(a => {
                                                    payments.forEach(b => {
                                                        if (a.Id === b.Id) {
                                                            const Final = {
                                                                Id: a.Id, Vendor_ID: a.Vendor_ID,
                                                                VendorName: a.VendorName, TotalAmount: Math.round(a.TotalAmount),
                                                                TotalPayment: Math.round(b.Payment),
                                                                AmountDue: Math.abs(Math.round(a.TotalAmount) - Math.round(b.Payment))
                                                            };
                                                            VendorStatement.push(Final);
                                                        } else {
                                                            const Final = {
                                                                Id: a.Id, Vendor_ID: a.Vendor_ID,
                                                                VendorName: a.VendorName, TotalAmount: Math.round(a.TotalAmount),
                                                                TotalPayment: 0,
                                                                AmountDue: Math.round(a.TotalAmount)
                                                            };
                                                            VendorStatement.push(Final);
                                                        }
                                                    });
                                                });
                                            }

                                            if (VendorStatement.length === 0) {
                                                res.send({ message: "No Records Found" });
                                            } else {
                                                res.send(VendorStatement)
                                            }

                                        }
                                    });
                                }
                            }
                        })
                    };
                })
            }
        });
    } catch (err) {
        res.send({ statusCode: 400, message: 'Failed' });
    };
};

const GetVendorStatementOfAccountsDetails = (req, res) => {
    const VendorID = req.params.VendorID;
    const Month = req.params.Month;
    const Year = req.params.Year;

    try {
        OrdersListModel.find({ VendorID: VendorID }, function (err, result) {
            if (err) {
                res.send({ statusCode: 400, message: 'Failed' });
            } else {
                HamperOrderModel.find({ VendorID: VendorID }, function (err, result2) {
                    if (err) {
                        res.send({ statusCode: 400, message: 'Failed' });
                    } else {
                        OtherProductOrdersModel.find({ VendorID: VendorID }, function (err, result3) {
                            if (err) {
                                res.send({ statusCode: 400, message: 'Failed' });
                            } else {
                                let FinalSortedList = [];
                                let OrderResult = result;
                                let TwoOrdersList = OrderResult.concat(result2);
                                let FinalOrdersArray = TwoOrdersList.concat(result3);
                                if (FinalOrdersArray.length === 0) {
                                    FinalSortedList = [];
                                } else if (FinalOrdersArray.length === 1) {
                                    FinalSortedList = FinalOrdersArray;
                                } else {
                                    const Array2 = FinalOrdersArray.map(val => {
                                        return { ...val, date: moment(val.Created_On, 'DD-MM-YYYY hh:mm A').diff(moment(new Date(), 'DD-MM-YYYY hh:mm A')) };
                                    });
                                    const NewList = Array2.sort((a, b) => { return a.date - b.date });
                                    NewList.filter(val => { FinalSortedList.push(val._doc) });
                                }
                                if (FinalSortedList.length === 0) {
                                    res.send({ message: "No Records Found" });
                                } else {
                                    StatementOfAccountsModel.find({ VendorID: VendorID }, function (err, statement) {
                                        if (err) {
                                            res.send({ statusCode: 400, message: 'Failed' });
                                        } else {
                                            var OrderList = [], VendorStatement = [];
                                            var OpeningArray = [], OpeningBalanceArray = [], OpeningBalance,
                                                ClosingArray = [], ClosingBalanceArray = [], ClosingBalance;
                                            //opening balance
                                            FinalSortedList.filter(val => {
                                                if (moment('01' + '-' + val.Created_On.slice(3, 10), 'DD-MM-YYYY').diff(moment('01' + '-' + Month + '-' + Year, 'DD-MM-YYYY')) < 0) {
                                                    if (val.Status !== 'Cancelled') { OpeningArray.push(val) }
                                                }
                                            });
                                            // console.log(OpeningArray)
                                            FinalSortedList.filter(val => {
                                                if (moment('01' + '-' + val.Created_On.slice(3, 10), 'DD-MM-YYYY').diff(moment('01' + '-' + Month + '-' + Year, 'DD-MM-YYYY')) <= 0) {
                                                    if (val.Status !== 'Cancelled') { ClosingArray.push(val) }
                                                }
                                            });
                                            if (statement.length === 0) {
                                                if (OpeningArray.length === 0) {
                                                    OpeningBalance = 0
                                                } else {
                                                    OpeningArray.filter(val => {
                                                        OpeningBalanceArray.push(JSON.parse(val.Total));
                                                    });
                                                    if (OpeningBalanceArray.length === 0) {
                                                        OpeningBalance = 0
                                                    } else if (OpeningBalanceArray.length === 1) {
                                                        OpeningBalance = OpeningBalanceArray[0];
                                                    } else {
                                                        OpeningBalance = OpeningBalanceArray.reduce((a, b) => a + b, 0);
                                                    };
                                                };
                                                if (ClosingArray.length === 0) {
                                                    ClosingBalance = 0
                                                } else {
                                                    ClosingArray.filter(val => {
                                                        ClosingBalanceArray.push(JSON.parse(val.Total));
                                                    });
                                                    if (ClosingBalanceArray.length === 0) {
                                                        ClosingBalance = 0
                                                    } else if (ClosingBalanceArray.length === 1) {
                                                        ClosingBalance = ClosingBalanceArray[0];
                                                    } else {
                                                        ClosingBalance = ClosingBalanceArray.reduce((a, b) => a + b, 0);
                                                    };
                                                };
                                                FinalSortedList.filter(val => {
                                                    if (moment('01' + '-' + val.Created_On.slice(3, 10), 'DD-MM-YYYY').diff(moment('01' + '-' + Month + '-' + Year, 'DD-MM-YYYY')) === 0) {
                                                        if (val.Status !== 'Cancelled') {
                                                            const NewData = {
                                                                OrderID: val._id, Order_ID: val.Id,
                                                                VendorID: val.VendorID, Vendor_ID: val.Vendor_ID,
                                                                VendorName: val.VendorName, Type: 'Sales',
                                                                Total: val.Total, Date: val.Created_On.slice(0, 10)
                                                            };
                                                            OrderList.push(NewData);
                                                        }
                                                    }
                                                });
                                                const NewArray = OrderList.map(val => {
                                                    return { value: val, date: moment(val.Date, 'DD-MM-YYYY hh:mm A').diff(moment(new Date(), 'DD-MM-YYYY hh:mm A')) };
                                                });
                                                const Statement = NewArray.sort((a, b) => { return a.date - b.date });
                                                Statement.filter(val => VendorStatement.push(val.value));
                                                res.send({
                                                    OpeningBalance: OpeningBalance,
                                                    ClosingBalance: ClosingBalance,
                                                    result: VendorStatement
                                                });
                                            } else {
                                                FinalSortedList.filter(val => {
                                                    if (moment('01' + '-' + val.Created_On.slice(3, 10), 'DD-MM-YYYY').diff(moment('01' + '-' + Month + '-' + Year, 'DD-MM-YYYY')) === 0) {
                                                        if (val.Status !== 'Cancelled') {
                                                            const NewData = {
                                                                OrderID: val._id, Order_ID: val.Id,
                                                                VendorID: val.VendorID, Vendor_ID: val.Vendor_ID,
                                                                VendorName: val.VendorName, Type: 'Sales',
                                                                Total: val.Total, Date: val.Created_On.slice(0, 10)
                                                            };
                                                            OrderList.push(NewData);
                                                        }
                                                    }
                                                });
                                                var AllPayments = [], TotalPayment;
                                                var OpeningPayments = [], TotalOpeningPayment, ClosingPayments = [], TotalClosingPayment;
                                                statement.filter(val => {
                                                    if (moment('01' + '-' + val.Payment_Date.slice(3, 10), 'DD-MM-YYYY').diff(moment('01' + '-' + Month + '-' + Year, 'DD-MM-YYYY')) === 0) {
                                                        const NewData = {
                                                            VendorID: val.VendorID, Type: 'Payment', PaymentType: val.PaymentType,
                                                            Total: val.Payment, Date: val.Payment_Date
                                                        };
                                                        OrderList.push(NewData);
                                                        AllPayments.push(val.Payment);
                                                    }
                                                });
                                                statement.filter(val => {
                                                    if (moment('01' + '-' + val.Payment_Date.slice(3, 10), 'DD-MM-YYYY').diff(moment('01' + '-' + Month + '-' + Year, 'DD-MM-YYYY')) < 0) {
                                                        OpeningPayments.push(val.Payment);
                                                    }
                                                });
                                                if (OpeningPayments.length === 0) {
                                                    TotalOpeningPayment = 0;
                                                } else if (OpeningPayments.length === 1) {
                                                    TotalOpeningPayment = JSON.parse(OpeningPayments[0]);
                                                } else {
                                                    TotalOpeningPayment = OpeningPayments.reduce((a, b) => { return JSON.parse(a) + JSON.parse(b) })
                                                };

                                                statement.filter(val => {
                                                    if (moment('01' + '-' + val.Payment_Date.slice(3, 10), 'DD-MM-YYYY').diff(moment('01' + '-' + Month + '-' + Year, 'DD-MM-YYYY')) <= 0) {
                                                        ClosingPayments.push(val.Payment);
                                                    }
                                                });
                                                if (ClosingPayments.length === 0) {
                                                    TotalClosingPayment = 0;
                                                } else if (ClosingPayments.length === 1) {
                                                    TotalClosingPayment = JSON.parse(ClosingPayments[0]);
                                                } else {
                                                    TotalClosingPayment = ClosingPayments.reduce((a, b) => { return JSON.parse(a) + JSON.parse(b) })
                                                };

                                                if (AllPayments.length === 0) {
                                                    TotalPayment = 0;
                                                } else if (AllPayments.length === 1) {
                                                    TotalPayment = JSON.parse(AllPayments[0])
                                                } else {
                                                    TotalPayment = AllPayments.reduce((a, b) => { return JSON.parse(a) + JSON.parse(b) })
                                                };
                                                if (ClosingArray.length === 0) {
                                                    ClosingBalance = 0
                                                } else {
                                                    ClosingArray.filter(val => {
                                                        ClosingBalanceArray.push(JSON.parse(val.Total));
                                                    });
                                                    if (ClosingBalanceArray.length === 0) {
                                                        ClosingBalance = 0
                                                    } else if (ClosingBalanceArray.length === 1) {
                                                        ClosingBalance = ClosingBalanceArray[0];
                                                    } else {
                                                        ClosingBalance = ClosingBalanceArray.reduce((a, b) => a + b, 0);
                                                    };
                                                };
                                                if (OpeningArray.length === 0) {
                                                    OpeningBalance = 0
                                                } else {
                                                    OpeningArray.filter(val => {
                                                        OpeningBalanceArray.push(JSON.parse(val.Total));
                                                    });
                                                    if (OpeningBalanceArray.length === 0) {
                                                        OpeningBalance = 0
                                                    } else if (OpeningBalanceArray.length === 1) {
                                                        OpeningBalance = OpeningBalanceArray[0];
                                                    } else {
                                                        OpeningBalance = OpeningBalanceArray.reduce((a, b) => a + b, 0);
                                                    };
                                                };
                                                const NewArray = OrderList.map(val => {
                                                    return { value: val, date: moment(val.Date, 'DD-MM-YYYY hh:mm A').diff(moment(new Date(), 'DD-MM-YYYY hh:mm A')) };
                                                });
                                                const Statement = NewArray.sort((a, b) => { return a.date - b.date });
                                                Statement.filter(val => VendorStatement.push(val.value));
                                                res.send({
                                                    OpeningBalance: Math.abs(Math.round(OpeningBalance - TotalOpeningPayment)),
                                                    ClosingBalance: Math.abs(Math.round(ClosingBalance - TotalClosingPayment)),
                                                    result: VendorStatement
                                                });
                                            }
                                        }
                                    });
                                }
                            }
                        })
                    }
                })
            }
        });
    } catch (err) {
        res.send({ statusCode: 400, message: 'Failed' });
    };
};


module.exports = {
    GetAdminStatementOfAccounts,
    GetVendorStatementOfAccountsList,
    CreateStatementOfAccountsByVendorID,
    GetVendorStatementOfAccountsDetails
}