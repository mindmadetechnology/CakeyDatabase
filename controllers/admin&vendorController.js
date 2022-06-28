require('dotenv').config();
const adminModel = require("../models/adminModels");
const vendorModel = require("../models/vendorModels");
const userModel = require("../models/userModels");
const CustomizeCakeModel = require('../models/CustomizeCakeModels');
const OrdersListModel = require("../models/OrdersListModels");
const helpDeskModel = require('../models/helpDeskModels');
const LastLoginSessionModel = require('../models/LastLoginSessionModel');
const JWT = require('jsonwebtoken');
const moment = require('moment-timezone');
const cloudinary = require("../middleware/cloudnary");
const { transporter } = require('../middleware/nodemailer');

//Get Admin details by email
const getAdminbyEmail = (req, res) => {

    const Email = req.params.email;
    try {
        adminModel.find({ Email: Email }, function (err, result) {
            if (err) {
                res.send({ statusCode: 400, message: "Failed" });
            } else {
                res.send(result);
            }
        });
    } catch (err) {
        res.send({ statusCode: 400, message: 'Failed' });
    }
};

//add new admin
const NewAdmin = (req, res) => {

    const Email = req.body.Email;
    const Password = req.body.Password;
    try {
        const data = adminModel({
            Email: Email,
            Password: Password
        });
        data.save(function (err, result) {
            if (err) {
                res.send({ statusCode: 400, message: 'Failed' });
            } else {
                res.send({ statusCode: 200, message: 'Success' });
            }
        });
    } catch (err) {
        res.send({ statusCode: 400, message: 'Failed' });
    };
};

//Update admin's details
const putAdmin = async (req, res) => {

    const id = req.params.id;
    const Email = req.body.Email;
    const AdminName = req.body.AdminName;
    const Password = req.body.Password;
    const Modified_On = moment().tz('Asia/Kolkata').format("DD-MM-YYYY hh:mm A");
    try {
        if (req.file === undefined) {
            adminModel.findById({ _id: id }, function (err, result) {
                if (err) {
                    res.send({ statusCode: 400, message: "Failed" });
                } else if (result.Email === Email) {
                    adminModel.findOneAndUpdate({ _id: id },
                        {
                            $set: {
                                Email: Email,
                                AdminName: AdminName,
                                Password: Password,
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
                    adminModel.findOne({ Email: Email }, function (err, result) {
                        if (result === null) {
                            vendorModel.findOne({ Email: Email }, function (err, result) {
                                if (result === null) {
                                    adminModel.findOneAndUpdate({ _id: id },
                                        {
                                            $set: {
                                                Email: Email,
                                                AdminName: AdminName,
                                                Password: Password,
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
                                    res.send({ statusCode: 400, message: "Email already Exist" });
                                }
                            });
                        } else {
                            res.send({ statusCode: 400, message: "Email already Exist" });
                        }
                    });
                }
            });
        } else {
            const imagesUrl = await cloudinary.uploader.upload(req.file.path);
            adminModel.findById({ _id: id }, function (err, result) {
                if (err) {
                    res.send({ statusCode: 400, message: "Failed" });
                } else if (result.Email === Email) {
                    adminModel.findOneAndUpdate({ _id: id },
                        {
                            $set: {
                                Email: Email,
                                ProfileImage: imagesUrl.secure_url,
                                AdminName: AdminName,
                                Password: Password,
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
                    adminModel.findOne({ Email: Email }, function (err, result) {
                        if (result === null) {
                            vendorModel.findOne({ Email: Email }, function (err, result) {
                                if (result === null) {
                                    adminModel.findOneAndUpdate({ _id: id },
                                        {
                                            $set: {
                                                Email: Email,
                                                AdminName: AdminName,
                                                Password: Password,
                                                ProfileImage: imagesUrl.secure_url,
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
                                    res.send({ statusCode: 400, message: "Email already Exist" });
                                }
                            });
                        } else {
                            res.send({ statusCode: 400, message: "Email already Exist" });
                        }
                    });
                }
            });
        }
    } catch (err) {
        res.send({ statusCode: 400, message: "Failed" });
    };
};

//Get all Vendors
const getVendors = (req, res) => {

    try {
        vendorModel.find({ IsDeleted: 'n' }, function (err, result) {
            if (err) {
                res.send({ statusCode: 400, message: "Failed" });
            } else {
                if (result.length === 0) {
                    res.send({ message: "No Records Found" });
                } else {
                    res.send(result);
                }
            }
        });
    } catch (err) {
        res.send({ statusCode: 400, message: 'Failed' });
    }
};

//Get Vendor details by email
const getVendorsbyEmail = (req, res) => {

    const Email = req.params.email;
    try {
        vendorModel.find({ IsDeleted: 'n', Email: Email }, function (err, result) {
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

//login for admin and vendors
const loginValidate = (req, res) => {

    const Email = req.body.Email;
    const Password = req.body.Password;
    const LastLogin_At = moment().tz('Asia/Kolkata').format("DD-MM-YYYY hh:mm A");
    try {
        adminModel.findOne({ Email: Email, Password: Password }, function (err, result) {
            if (result === null) {
                vendorModel.findOne({ Email: Email, Password: Password }, function (err, result) {
                    if (result === null) {
                        helpDeskModel.findOne({ Email: Email, Password: Password }, function (err, result) {
                            if (err) {
                                res.send(res.send({ statusCode: 400, message: "error" }))
                            } else if (result === null) {
                                res.send({ statusCode: 400, message: "Invalid Email or Password" });
                            } else {
                                const token = JWT.sign({
                                    id: result._id,
                                    Email: result.Email
                                }, process.env.JWT_SECRET, { expiresIn: '7d' });
                                res.send({ statusCode: 200, message: "Login Succeed", type: 'helpdesk', token: token });
                            }
                        })
                    } else if (err) {
                        res.send({ statusCode: 400, message: "Failed1", error: err });
                    } else {
                        LastLoginSessionModel.findOne({ Id: result._id.toString() }, function (err, result2) {
                            if (err) {
                                res.send({ statusCode: 400, message: "Failed2", error:err });
                            } else if (result2 === null) {
                                const LastLogin = new LastLoginSessionModel({
                                    Id: result._id,
                                    LastLogin_At: LastLogin_At
                                });
                                LastLogin.save(function (err, result3) {
                                    if (err) {
                                        res.send({ statusCode: 400, message: "Failed3", error: err });
                                    } else {
                                        const token = JWT.sign({
                                            id: result._id,
                                            Email: result.Email
                                        }, process.env.JWT_SECRET, { expiresIn: '7d' });
                                        res.send({ statusCode: 200, message: "Login Succeed", type: 'vendor', token: token });
                                    }
                                });
                            } else {
                                LastLoginSessionModel.findOneAndUpdate({ Id: decodeToken.id }, {
                                    $set: {
                                        LastLogin_At: LastLogin_At
                                    }
                                }, function (err, result) {
                                    if (err) {
                                        res.send({ statusCode: 400, message: "Failed" });
                                    } else {
                                        const token = JWT.sign({
                                            id: result._id,
                                            Email: result.Email
                                        }, process.env.JWT_SECRET, { expiresIn: '7d' });
                                        res.send({ statusCode: 200, message: "Login Succeed", type: 'vendor', token: token });
                                    }
                                });
                            }
                        });
                    }
                });
            } else if (err) {
                res.send({ statusCode: 400, message: "error" });
            } else {
                const token = JWT.sign({
                    id: result._id,
                    Email: result.Email
                }, process.env.JWT_SECRET, { expiresIn: '7d' });
                res.send({ statusCode: 200, message: "Login Succeed", type: 'admin', token: token });
            }
        });
    } catch (err) {
        res.send({ statusCode: 400, message: 'Failed' });
    };
};

//verify token
const verifyToken = (req, res) => {

    const token = req.params.token;
    const decodeToken = JWT.decode(token);
    try {
        adminModel.findById({ _id: decodeToken.id }, function (err, result) {
            if (err) {
                res.send({ statusCode: 400, message: "Failed" });
            }
            if (result === null) {
                vendorModel.findById({ _id: decodeToken.id }, function (err, result) {
                    if (err) {
                        res.send({ statusCode: 400, message: "Failed" });
                    }
                    if (result === null) {
                        helpDeskModel.findById({ _id: decodeToken.id }, function (err, result) {
                            if (err) {
                                res.send({ statusCode: 400, message: "Failed" });
                            }
                            if (result === null) {
                                res.send({ statusCode: 400, message: "Invalid token" });
                            } else {
                                if (decodeToken.exp < Date.now() / 1000) {
                                    res.send({ statusCode: 400, message: "Invalid token" });
                                } else {
                                    res.send({ statusCode: 200, result: result, type: 'helpdesk' });
                                }
                            }
                        });
                    } else {
                        if (decodeToken.exp < Date.now() / 1000) {
                            res.send({ statusCode: 400, message: "Invalid token" });
                        } else {
                            res.send({ statusCode: 200, result: result, type: 'vendor' });
                        }
                    }
                });
            } else {
                if (decodeToken.exp < Date.now() / 1000) {
                    res.send({ statusCode: 400, message: "Invalid token" });
                } else {
                    res.send({ statusCode: 200, result: result, type: 'admin' });
                }
            }
        });
    } catch (err) {
        res.send({ statusCode: 400, message: "Failed" });
    };
};

//delete vendors
const deleteVendors = (req, res) => {

    const id = req.params.id;
    const IsDeleted = 'y';
    const Modified_On = moment().tz('Asia/Kolkata').format("DD-MM-YYYY hh:mm A");
    try {
        vendorModel.findOneAndUpdate({ _id: id }, {
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

//forgot password
const forgotPassword = (req, res) => {

    const Email = req.params.email;
    const Password = req.body.Password;
    const Modified_On = moment().tz('Asia/Kolkata').format("DD-MM-YYYY hh:mm A");
    const mailBody = `
    <h3>Dear Sir/Madam,</h3>
      <br />
    <p>
      We have received a request to reset the password for your account.<br />

      Your System generated Password:${Password} <br />

      You can change your password once you logged in.
      </p>
      <br />
      <h4>Best wishes,</h4>
      <h5>MindMade Team</h5>
    `
    try {
        if (Password.length > 5) {
            adminModel.findOne({ Email: Email }, function (err, result) {
                if (err) {
                    res.send({ statusCode: 400, message: "Failed" });
                } else if (result === null) {
                    vendorModel.findOne({ Email: Email }, function (err, result) {
                        if (err) {
                            res.send({ statusCode: 400, message: "Failed" });
                        }
                        if (result === null) {
                            res.send({ statusCode: 400, message: "Invalid" });
                        } else {
                            if (result.Password === Password) {
                                res.send({ statusCode: 400, message: "Please enter a new password" });
                            } else {
                                vendorModel.findOneAndUpdate({ Email: Email }, {
                                    $set: {
                                        Password: Password,
                                        Modified_On: Modified_On
                                    }
                                }, function (err, result) {
                                    if (err) {
                                        res.send({ statusCode: 400, message: "Failed" });
                                    } else {
                                        let mailOptions = {
                                            from: 'support@mindmade.in',
                                            to: Email,
                                            subject: 'Reset Password - reg',
                                            html: mailBody
                                        };
                                        transporter.sendMail(mailOptions, (err, info) => {
                                            if (err) {
                                                return err;
                                            } else {
                                                return info;
                                            }
                                        });
                                        res.send({ statusCode: 200, message: "Updated Successfully" });
                                    }
                                });
                            }
                        }
                    });
                } else {
                    if (result.Password === Password) {
                        res.send({ statusCode: 400, message: "Please enter a new password" });
                    } else {
                        adminModel.findOneAndUpdate({ Email: Email }, {
                            $set: {
                                Password: Password,
                                Modified_On: Modified_On
                            }
                        }, function (err, result) {
                            if (err) {
                                res.send({ statusCode: 400, message: "Failed" });
                            } else {
                                let mailOptions = {
                                    from: 'support@mindmade.in',
                                    to: Email,
                                    subject: 'Reset Password - reg',
                                    html: mailBody
                                };
                                transporter.sendMail(mailOptions, (err, info) => {
                                    if (err) {
                                        return err;
                                    } else {
                                        return info;
                                    }
                                });
                                res.send({ statusCode: 200, message: "Updated Successfully" });
                            }
                        });
                    }
                }
            });
        } else {
            res.send({ statusCode: 400, message: "you have to enter at least 6 char!" });
        }
    } catch (err) {
        res.send({ statusCode: 400, message: "Failed" });
    };
};

//get all vendors and users
const getAllUsersCount = (req, res) => {
    try {
        userModel.count({}, function (err, count1) {
            if (!err) {
                vendorModel.count({ Status: 'Approved' }, function (err, count2) {
                    if (!err) {
                        CustomizeCakeModel.count({ Status: 'New' }, function (err, count3) {
                            if (!err) {
                                CustomizeCakeModel.count({}, function (err, count4) {
                                    if (!err) {
                                        res.send({
                                            Users: count1.toString(),
                                            Vendors: count2.toString(),
                                            CustomizeCakes: count3.toString(),
                                            TotalCustomizeCakes: count4.toString()
                                        });
                                    }
                                })
                            }
                        })
                    }
                });
            }
        });
    } catch (err) {
        res.send({ statusCode: 400, message: 'Failed' });
    };
};

//get notification count
const GetNotificationCount = (req, res) => {
    try {
        OrdersListModel.count({ Status: 'New' }, function (err, count1) {
            if (!err) {
                CustomizeCakeModel.count({ Status: 'New' }, function (err, count2) {
                    if (!err) {
                        vendorModel.count({ Status: 'New' }, function (err, count3) {
                            if (!err) {
                                res.send({ Orders: count1.toString(), CustomizeCakes: count2.toString(), Newvendors: count3.toString() });
                            }
                        });
                    }
                });
            }
        });
    } catch (err) {
        res.send({ statusCode: 400, message: 'Failed' });
    };
};

module.exports = {

    getAdminbyEmail,
    putAdmin,
    loginValidate,
    verifyToken,
    forgotPassword,
    getVendors,
    getVendorsbyEmail,
    // addVendors,
    // putVendors,
    deleteVendors,
    getAllUsersCount,
    NewAdmin,
    GetNotificationCount,

};