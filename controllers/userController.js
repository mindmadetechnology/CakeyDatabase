require('dotenv').config();
const userModel = require("../models/userModels");
const UserNotificationModel = require("../models/UserNotification");
const VendorNotificationModel = require("../models/VendorNotification");
const AdminNotificationModel = require("../models/AdminNotificationModels");
const SessionOrdersModel = require("../models/SessionOrdersModels");
const moment = require('moment-timezone');
const JWT = require('jsonwebtoken');
const cloudinary = require("../middleware/cloudnary");

//Get all users
const getUsers = (req, res) => {

    try {
        userModel.find({}, function (err, result) {
            if (err) {
                res.send({ statusCode: 400, message: "Failed" });
            } else {
                if (result.length === 0) {
                    res.send({ message: "No Records Found" });
                } else {
                    res.send(result.reverse());
                }
            }
        });
    } catch (err) {
        res.send({ statusCode: 400, message: 'Failed' });
    };
};

//Get user details by id
const getUsersbyPhoneNumber = (req, res) => {

    const PhoneNumber = req.params.pn;
    try {
        userModel.find({ PhoneNumber: PhoneNumber }, function (err, result) {
            if (err) {
                res.send({ statusCode: 400, message: "Failed" });
            } else {
                res.send(result);
            }
        });
    } catch (err) {
        res.send({ statusCode: 400, message: 'Failed' });
    };
};

const GetUsersbyId = (req, res) => {
    const Id = req.params.id;
    try {
        userModel.findById({ _id: Id }, function (err, result) {
            if (err) {
                res.send({ statusCode: 400, message: 'Failed' });
            } else {
                res.send(result);
            }
        });
    } catch (err) {
        res.send({ statusCode: 400, message: 'Failed' });
    };
};

//Update user's details
const putUsers = async (req, res) => {

    const UserName = req.body.UserName;
    const Address = req.body.Address;
    const userId = req.params.userId;
    const Notification = req.body.Notification;
    const Notification_Id = req.body.Notification_Id;
    const Modified_On = moment().tz('Asia/Kolkata').format("DD-MM-YYYY hh:mm A");
    try {
        if (req.file === undefined) {
            userModel.findById({ _id: userId }, function (err, result) {
                if (err) {
                    res.send({ statusCode: 400, message: "Failed" });
                } else {
                    if (result.Address === undefined || result.Address === null || result.Address === "") {
                        if (UserName === undefined || Address === undefined) {
                            res.send({ statusCode: 400, message: "*required" });
                        } else {
                            if (UserName !== "" && Address !== "") {
                                userModel.findOneAndUpdate({ _id: userId }, {
                                    $set: {
                                        UserName: UserName?.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase()),
                                        Address: Address?.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase()),
                                        Notification: Notification,
                                        Notification_Id: Notification_Id,
                                        Modified_On: Modified_On
                                    }
                                }, function (err, result) {
                                    if (err) {
                                        res.send({ statusCode: 400, message: "Failed" });
                                    } else {
                                        res.send({ statusCode: 200, message: "Updated Successfully" });
                                    }
                                });
                            } else {
                                res.send({ statusCode: 400, message: "*required" });
                            }
                        }
                    } else {
                        if (UserName !== "" && Address !== "") {
                            userModel.findOneAndUpdate({ _id: userId }, {
                                $set: {
                                    UserName: UserName?.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase()),
                                    Address: Address?.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase()),
                                    Notification: Notification,
                                    Notification_Id: Notification_Id,
                                    Modified_On: Modified_On
                                }
                            }, function (err, result) {
                                if (err) {
                                    res.send({ statusCode: 400, message: "Failed" });
                                } else {
                                    res.send({ statusCode: 200, message: "Updated Successfully" });
                                }
                            });
                        } else {
                            res.send({ statusCode: 400, message: "*required" });
                        }
                    }
                }
            });
        } else {
            const imagesUrl = await cloudinary.uploader.upload(req.file.path, { width: 640, height: 426, crop: "scale", format: 'webp' });
            userModel.findById({ _id: userId }, function (err, result) {
                if (err) {
                    res.send(err);
                } else {
                    if (result.Address === undefined || result.Address === null || result.Address === "") {
                        if (UserName === undefined || Address === undefined) {
                            res.send({ statusCode: 400, message: "*required" });
                        } else {
                            if (UserName !== "" && Address !== "") {
                                userModel.findOneAndUpdate({ _id: userId }, {
                                    $set: {
                                        ProfileImage: imagesUrl.secure_url,
                                        UserName: UserName?.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase()),
                                        Address: Address?.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase()),
                                        Notification: Notification,
                                        Notification_Id: Notification_Id,
                                        Modified_On: Modified_On
                                    }
                                }, function (err, result) {
                                    if (err) {
                                        res.send({ statusCode: 400, message: "Failed" });
                                    } else {
                                        res.send({ statusCode: 200, message: "Updated Successfully" });
                                    }
                                });
                            } else {
                                res.send({ statusCode: 400, message: "*required" });
                            }
                        }
                    } else {
                        if (UserName !== "" && Address !== "") {
                            userModel.findOneAndUpdate({ _id: userId }, {
                                $set: {
                                    ProfileImage: imagesUrl.secure_url,
                                    UserName: UserName?.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase()),
                                    Address: Address?.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase()),
                                    Notification: Notification,
                                    Notification_Id: Notification_Id,
                                    Modified_On: Modified_On
                                }
                            }, function (err, result) {
                                if (err) {
                                    res.send({ statusCode: 400, message: "Failed" });
                                } else {
                                    res.send({ statusCode: 200, message: "Updated Successfully" });
                                }
                            });
                        } else {
                            res.send({ statusCode: 400, message: "*required" });
                        }
                    }
                }
            });
        }
    } catch (err) {
        res.send({ statusCode: 400, message: "Failed" });
    };
};

//Validate the user -> If phonenumber is exists login else register
const validateUsers = (req, res) => {

    const PhoneNumber = req.body.PhoneNumber;
    const Created_On = moment().tz('Asia/Kolkata').format("DD-MM-YYYY hh:mm A");
    try {
        userModel.findOne({ PhoneNumber: PhoneNumber }, function (err, result) {
            if (result === null) {
                if (PhoneNumber === "" || PhoneNumber === null || PhoneNumber === undefined) {
                    res.send({ statusCode: 400, message: "Invalid Mobile Number" });
                } else {
                    const uservalidate = new userModel({
                        PhoneNumber: PhoneNumber,
                        Created_On: Created_On
                    });
                    uservalidate.save(function (err, result) {
                        if (err) {
                            res.send({ statusCode: 400, message: "Failed" });
                        } else {
                            res.send({ statusCode: 200, message: "registered Successfully" });
                        }
                    });
                }
            } else if (err) {
                res.send({ statusCode: 400, message: "Failed" });
            } else {
                const token = JWT.sign({
                    id: result._id
                }, process.env.JWT_SECRET, { expiresIn: '1825d' });
                res.send({ statusCode: 200, message: "Login Succeed", token: token });
            }
        });
    } catch (err) {
        res.send({ statusCode: 400, message: "error" });
    };
};

const UserNotificationOrderList = (req, res) => {
    const Id = req.params.id;

    try {
        UserNotificationModel.find({ UserID: Id }, function (err, result) {
            if (err) {
                res.send({ statusCode: 400, message: "Failed" });
            } else {
                if (result.length === 0) {
                    res.send({ message: "No Records Found" });
                } else {
                    res.send(result.reverse());
                }
            }
        });
    } catch (err) {
        res.send({ statusCode: 400, message: "Failed" });
    }
};

const VendorNotificationOrderList = (req, res) => {
    const Id = req.params.id;

    try {
        VendorNotificationModel.find({ VendorID: Id }, function (err, result) {
            if (err) {
                res.send({ statusCode: 400, message: "Failed" });
            } else {
                if (result.length === 0) {
                    res.send({ message: "No Records Found" });
                } else {
                    res.send(result.reverse());
                }
            }
        });
    } catch (err) {
        res.send({ statusCode: 400, message: "Failed" });
    }
};

const AdminNotificationOrderList = (req, res) => {

    try {
        AdminNotificationModel.find({}, function (err, result) {
            if (err) {
                res.send({ statusCode: 400, message: "Failed" });
            } else {
                if (result.length === 0) {
                    res.send({ message: "No Records Found" });
                } else {
                    res.send(result.reverse());
                }
            }
        });
    } catch (err) {
        res.send({ statusCode: 400, message: "Failed" });
    }
};

const RemoveAdminNotificationById = (req, res) => {
    const Id = req.params.id;
    try{
        AdminNotificationModel.findOneAndDelete({_id: Id}, function(err){
            if(err){
                res.send({ statusCode: 400, message: "Failed" });
            }else{
                res.send({ statusCode: 200, message: "Removed Successfully" });
            }
        });
    }catch(err){
        res.send({ statusCode: 400, message: "Failed" });
    }
};

const RemoveAdminNotification = (req, res) => {

    try {
        AdminNotificationModel.find({}, function (err, result) {
            if (err) {
                res.send({ statusCode: 400, message: "Failed" });
            } else if (result.length === 0) {
                res.send({ message: "No Records Found" });
            } else {
                var Ids = [];
                result.filter(val => {
                    Ids.push(val._id);
                });
                AdminNotificationModel.deleteMany({ _id: { $in: Ids } }, function (err) {
                    if (err) {
                        res.send({ statusCode: 400, message: "Failed" });
                    } else {
                        res.send({ statusCode: 200, message: "Notification removed successfully" });
                    }
                })
            }
        });
    } catch (err) {
        res.send({ statusCode: 400, message: "Failed" });
    }
};

const RemoveUserNotification = (req, res) => {
    const Id = req.params.id;

    try {
        UserNotificationModel.find({}, function (err, result) {
            if (err) {
                res.send({ statusCode: 400, message: "Failed" });
            } else if (result.length === 0) {
                res.send({ message: "No Records Found" });
            } else {
                var Ids = [];
                result.filter(val => {
                    Ids.push(val._id);
                });
                UserNotificationModel.deleteMany({  _id: { $in: Ids } }, function (err) {
                    if (err) {
                        res.send({ statusCode: 400, message: "Failed" });
                    } else {
                        res.send({ statusCode: 200, message: "Notification removed successfully" });
                    }
                })
            }
        });
    } catch (err) {
        res.send({ statusCode: 400, message: "Failed" });
    }
};

const RemoveVendorNotification = (req, res) => {
    const Id = req.params.id;

    try {
        VendorNotificationModel.find({ VendorID: Id }, function (err, result) {
            if (err) {
                res.send({ statusCode: 400, message: "Failed" });
            } else if (result.length === 0) {
                res.send({ message: "No Records Found" });
            } else {
                var Ids = [];
                result.filter(val => {
                    Ids.push(val._id);
                });
                VendorNotificationModel.deleteMany({ _id: { $in: Ids } }, function (err) {
                    if (err) {
                        res.send({ statusCode: 400, message: "Failed" });
                    } else {
                        res.send({ statusCode: 200, message: "Notification removed successfully" });
                    }
                })
            }
        });
    } catch (err) {
        res.send({ statusCode: 400, message: "Failed" });
    }
};

const RemoveVendorNotificationById = (req, res) => {
    const Id = req.params.id;
    try{
        VendorNotificationModel.findOneAndDelete({_id: Id}, function(err){
            if(err){
                res.send({ statusCode: 400, message: "Failed" });
            }else{
                res.send({ statusCode: 200, message: "Removed Successfully" });
            }
        });
    }catch(err){
        res.send({ statusCode: 400, message: "Failed" });
    }
};

const GetLoginTimeWithDateRange = (req, res) => {
    const Id = req.params.id;
    const date = req.params.date;
    try{
        SessionOrdersModel.find({Vendor_ID: Id}, function(err, result){
            if(err){
                res.send({ statusCode: 400, message: "Failed" });
            }else if(result.length === 0){
                res.send({ message: "No Records Found" });
            }else{
                var List = [];
                result.filter(val => {
                    if(val.Login_At.slice(0,10) === date){
                        List.push(val);
                    }
                });
                if(List.length === 0){
                    res.send({ message: "No Records Found" });
                }else{
                    res.send(List);
                }
            }
        });
    }catch(err){
        res.send({ statusCode: 400, message: "Failed" });
    };
};

// var fs = require('fs');

// const viewImg = function (req, res) {
//     var file = req.params.file;
//     var fileLocation = path.join('public/images/', file);
//     fs.readFile(fileLocation, function (err, data) {
//         if (err) throw err; // Fail if the file can't be read.
//         res.writeHead(200, { 'Content-Type': 'image/jpeg' });
//         res.end(data); // Send the file data to the browser.
//     });
// }

module.exports = {

    getUsers,
    putUsers,
    validateUsers,
    getUsersbyPhoneNumber,
    GetUsersbyId,
    UserNotificationOrderList,
    VendorNotificationOrderList,
    RemoveUserNotification,
    RemoveVendorNotification,
    GetLoginTimeWithDateRange,
    RemoveVendorNotificationById,
    AdminNotificationOrderList,
    RemoveAdminNotificationById,
    RemoveAdminNotification

};