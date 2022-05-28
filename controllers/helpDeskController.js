const helpDeskModel = require('../models/helpDeskModels');
const adminModel = require("../models/adminModels");
const vendorModel = require("../models/vendorModels");
const OrdersListModel = require("../models/OrdersListModels");
const CustomizeCakeModel = require('../models/CustomizeCakeModels');
const moment = require('moment-timezone');

//get all helpdesk members
const GetHelpdeskMembers = (req, res) => {

    try{
        helpDeskModel.find({ IsDeleted : 'n' }, function(err, result){
            if(err){
                res.send({ statusCode : 400, message: 'Failed'});  
            }else{
                if (result.length === 0) {
                    res.send({ message: "No Records Found" });
                } else {
                    res.send(result);
                }
            }
        });
    }catch(err){
        res.send({ statusCode : 400, message: 'Failed'});
    };
};

//add new helpdesk member
const HelpDeskNew = (req, res) => {

    const Email = req.body.Email;
    const Password = req.body.Password;
    const Name = req.body.Name;
    const Created_On = moment().tz('Asia/Kolkata').format("DD-MM-YYYY hh:mm A");
    try {
        if (Email || Password || Name) {
            helpDeskModel.findOne({ Email: Email }, function (err, result) {
                if (err) {
                    res.send({ statusCode: 400, message: 'Failed' });
                } else {
                    if (result === null) {
                        const HelpDesk = new helpDeskModel({
                            Email: Email,
                            Password: Password,
                            Name: Name,
                            Created_On: Created_On
                        });
                        HelpDesk.save(function (err, result) {
                            if (err) {
                                res.send({ statusCode: 400, message: "Failed" });
                            } else {
                                res.send({ statusCode: 200, message: "Registered Successfully" });
                            }
                        });
                    } else {
                        res.send({ statusCode: 400, message: 'Email Already Exist!' })
                    }
                }
            });
        } else {
            res.send({ statusCode: 400, message: '*reqired' });
        }
    } catch (err) {
        res.send({ statusCode: 400, message: "Failed" });
    };
};

//get above 5kg orders and customized cake orders count
const Above5kgCount = (req, res) => {

    try {
        OrdersListModel.count({ Above5KG: 'y', Status: 'New' }, function (err, count1) {
            if (err) {
                res.send({ statusCode: 400, message: "Failed" })
            } else {
                OrdersListModel.count({ Above5KG: 'y', Status: 'Assigned' }, function (err, count2) {
                    if (err) {
                        res.send({ statusCode: 400, message: "Failed" })
                    } else {
                        CustomizeCakeModel.count({ Above5KG: 'y', Status: 'New' }, function (err, count3) {
                            if (err) {
                                res.send({ statusCode: 400, message: "Failed" })
                            } else {
                                CustomizeCakeModel.count({ Above5KG: 'y', Status: 'Assigned' }, function (err, count4) {
                                    if (err) {
                                        res.send({ statusCode: 400, message: "Failed" })
                                    } else {
                                        res.send({
                                            OrderNew: count1,
                                            OrderAssigned: count2,
                                            CustomizeCakeNew: count3,
                                            CustomizeCakeAssigned: count4
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    } catch (err) {
        res.send({ statusCode: 400, message: "Failed" });
    };
};

//Change password
const ChangePassword = (req, res) => {

    const Id = req.params.id;
    const Password = req.body.Password;
    try {
        adminModel.findOne({ _id: Id }, function (err, result) {
            if (err) {
                res.send({ statusCode: 400, message: "Failed" });
            } else {
                if (result === null) {
                    vendorModel.findOne({ _id: Id }, function (err, result) {
                        if (err) {
                            res.send({ statusCode: 400, message: "Failed" });
                        } else {
                            if (result === null) {
                                helpDeskModel.findOne({ _id: Id }, function (err, result) {
                                    if (err) {
                                        res.send({ statusCode: 400, message: "Failed" });
                                    } else {
                                        if (result === null) {
                                            res.send({ statusCode: 400, message: "User Not Exist" });
                                        } else {
                                            helpDeskModel.findOneAndUpdate({ _id: Id }, {
                                                $set: {
                                                    Password: Password
                                                }
                                            }, function (err, result) {
                                                if (err) {
                                                    res.send({ statusCode: 400, message: "Failed" });
                                                } else {
                                                    res.send({ statusCode: 200, message: "Updated Successfully" });
                                                }
                                            });
                                        }
                                    }
                                });
                            } else {
                                vendorModel.findOneAndUpdate({ _id: Id }, {
                                    $set: {
                                        Password: Password
                                    }
                                }, function (err, result) {
                                    if (err) {
                                        res.send({ statusCode: 400, message: "Failed" });
                                    } else {
                                        res.send({ statusCode: 200, message: "Updated Successfully" });
                                    }
                                });
                            }
                        }
                    });
                } else {
                    adminModel.findOneAndUpdate({ _id: Id }, {
                        $set: {
                            Password: Password
                        }
                    }, function (err, result) {
                        if (err) {
                            res.send({ statusCode: 400, message: "Failed" });
                        } else {
                            res.send({ statusCode: 200, message: "Updated Successfully" });
                        }
                    });
                }
            }
        });
    } catch (err) {
        res.send({ statusCode: 400, message: "Failed" });
    };
};

const DeleteHelpdeskMember = (req, res) => {

    const id = req.params.id;
    const IsDeleted = 'y';
    const Modified_On = moment().tz('Asia/Kolkata').format("DD-MM-YYYY hh:mm A");
    try {
        helpDeskModel.findOneAndUpdate({ _id: id }, {
            $set: {
                IsDeleted: IsDeleted,
                Modified_On: Modified_On
            }
        }, function (err, result) {
            if (err) {
                res.send({ statusCode: 400, message: "Failed" });
            } else {
                res.send({ statusCode: 200, message: "Deleted Successfully" });
            }
        });
    } catch (err) {
        res.send({ statusCode: 400, message: "Failed" });
    };
};

module.exports = {

    HelpDeskNew,
    Above5kgCount,
    ChangePassword,
    GetHelpdeskMembers,
    DeleteHelpdeskMember

}