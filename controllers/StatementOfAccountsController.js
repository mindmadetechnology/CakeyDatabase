const OrdersListModel = require("../models/OrdersListModels");
const moment = require('moment-timezone');

const GetAdminStatementOfAccounts = (req, res) => {
    const Month = req.params.Month;
    const Year = req.params.Year;

    try {
        OrdersListModel.find({}, function (err, result) {
            if (err) {
                res.send({ statusCode: 400, message: 'Failed' });
            } else {
                var OrdersList = [], OpeningArray = [], OpeningBalanceArray = [], OpeningBalance,
                ClosingArray = [], ClosingBalanceArray = [], ClosingBalance;
                //opening balance
                result.filter(val => {
                    if(moment('01' + '-' + val.Created_On.slice(3,10), 'DD-MM-YYYY').diff(moment('01' + '-' + Month + '-' + Year, 'DD-MM-YYYY')) < 0){
                        if(val.Status !== 'Cancelled'){
                            OpeningArray.push(val);
                        }
                    }
                });
                if(OpeningArray.length === 0){
                    OpeningBalance = 0
                }else{
                    OpeningArray.filter(val => {
                        if(val.PaymentStatus !== 'Paid'){
                            OpeningBalanceArray.push(JSON.parse(val.Total));
                        }
                    });
                    if(OpeningBalanceArray.length === 0){
                        OpeningBalance = 0
                    }else if(OpeningBalanceArray.length === 1){
                        OpeningBalance = OpeningBalanceArray[0];
                    }else{
                        OpeningBalance = OpeningBalanceArray.reduce((a,b) => a+b, 0);
                    };
                };
                //closing balance
                result.filter(val => {
                    if(moment('01' + '-' + val.Created_On.slice(3,10), 'DD-MM-YYYY').diff(moment('01' + '-' + Month + '-' + Year, 'DD-MM-YYYY')) <= 0){
                        if(val.Status !== 'Cancelled'){
                            ClosingArray.push(val);
                        }
                    }
                });
                if(ClosingArray.length === 0){
                    ClosingBalance = 0
                }else{
                    ClosingArray.filter(val => {
                        if(val.PaymentStatus !== 'Paid'){
                            ClosingBalanceArray.push(JSON.parse(val.Total));
                        }
                    });
                    if(ClosingBalanceArray.length === 0){
                        ClosingBalance = 0
                    }else if(ClosingBalanceArray.length === 1){
                        ClosingBalance = ClosingBalanceArray[0];
                    }else{
                        ClosingBalance = ClosingBalanceArray.reduce((a,b) => a+b, 0);
                    };
                };
                result.filter(val => {
                    if (val.Created_On.slice(3, 10) === Month + '-' + Year) {
                        OrdersList.push(val);
                    }
                });
                res.send({ OpeningBalance: OpeningBalance, ClosingBalance: ClosingBalance, result: OrdersList });
            }
        })
    } catch (err) {
        res.send({ statusCode: 400, message: 'Failed' });
    }
};

module.exports = {
    GetAdminStatementOfAccounts,
}