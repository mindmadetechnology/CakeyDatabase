const BankNameModel = require('../models/BankNameModels');

const CreateBankName = (req, res) => {
    const BankName = req.body.BankName;

    try {
        BankNameModel.find({}, function (err, result) {
            if (err) {
                res.send({ statusCode: 400, message: "Failed" });
            } else {
                let FinalBankName, ValidateBankName = [];
                if (result.length === 0) {
                    FinalBankName = BankName.toUpperCase();
                } else {
                    result.filter(val => {
                        if (val.BankName.toUpperCase() === BankName.toUpperCase()) {
                            ValidateBankName.push('y');
                        } else {
                            ValidateBankName.push('n');
                        }
                    });
                }
                if (ValidateBankName.includes('y')) {
                    res.send({ statusCode: 400, message: 'required' });
                } else {
                    FinalBankName = BankName.toUpperCase();
                }
                const NewBankName = BankNameModel({
                    BankName: FinalBankName
                });
                NewBankName.save(function (err) {
                    if (err) {
                        res.send({ statusCode: 400, message: "Failed" });
                    } else {
                        res.send({ statusCode: 200, message: "Created Successfully" });
                    }
                })

            }
        });
    } catch (err) {
        res.send({ statusCode: 400, message: "Failed" });
    };
};

const DeleteBankName = (req, res) => {

};

const GetBankNameList = (req, res) => {

};

module.exports = {
    CreateBankName,
    DeleteBankName,
    GetBankNameList
};