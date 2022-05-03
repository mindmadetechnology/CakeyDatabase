const adminModel = require("../models/adminModels");
const vendorModel = require("../models/vendorModels");
const userModel = require("../models/userModels");
const JWT = require('jsonwebtoken');
const moment = require('moment-timezone');
const cloudinary = require("../middleware/cloudnary");
const { transporter } = require('../middleware/nodemailer');
require('dotenv').config();

//Get Admin details by email
const getAdminbyEmail = (req, res) => {

    const Email = req.params.email;

    adminModel.find({ Email: Email }, function (err, result) {
        if (err) {
            res.send({ statusCode: 400, message: "There was a problem adding the information to the database." });
        } else {
            res.send(result);
        }
    });

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
                            })
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
        return err;
    };

};

//Get all Vendors
const getVendors = (req, res) => {

    vendorModel.find({ IsDeleted: 'n' }, function (err, result) {
        if (err) {
            res.send({ statusCode: 400, message: "There was a problem adding the information to the database." });
        } else {
            if (result.length === 0) {
                res.send({ message: "No Records Found" })
            } else {
                res.send(result)
            }
        }
    });

};

//Get Vendor details by email
const getVendorsbyEmail = (req, res) => {

    const Email = req.params.email;

    vendorModel.find({
        IsDeleted: 'n',
        Email: Email
    }, function (err, result) {
        if (err) {
            res.send({ statusCode: 400, message: "There was a problem adding the information to the database." });
        } else {
            res.send(result);
        }
    });

};

//login for admin and vendors
const loginValidate = (req, res) => {

    const Email = req.body.Email;
    const Password = req.body.Password;

    adminModel.findOne({ Email: Email, Password: Password }, function (err, result) {
        if (result === null) {
            vendorModel.findOne({ Email: Email, Password: Password }, function (err, result) {
                if (result === null) {
                    res.send({ statusCode: 400, message: "Invalid Email or Password" });
                } else if (err) {
                    res.send({ statusCode: 400, message: "error" });
                } else {
                    const token = JWT.sign({
                        id: result._id,
                        Email: result.Email
                    }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 96 })
                    res.send({ statusCode: 200, message: "Login Succeed", type: 'vendor', token: token });
                }
            });
        } else if (err) {
            res.send({ statusCode: 400, message: "error" });
        } else {
            const token = JWT.sign({
                id: result._id,
                Email: result.Email
            }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 96 })
            res.send({ statusCode: 200, message: "Login Succeed", type: 'admin', token: token });
        }
    });

};

//verify token
const verifyToken = (req, res) => {

    const token = req.params.token;
    const decodeToken = JWT.decode(token);

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
                    res.send({ statusCode: 400, message: "Invalid token" });
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

};



//Add new vendors
const addVendors = (req, res) => {

    const id = req.params.id;
    const VendorName = req.body.VendorName;
    const Email = req.body.Email;
    const Password = req.body.Password;
    const Status = req.body.Status;
    const Created_On = moment().tz('Asia/Kolkata').format("DD-MM-YYYY hh:mm A");

    const mailBody = `
    <h3>Hello ${VendorName},</h3>
      <br />
    <p>
        Your Registration was approved as a vendor on Cakey. <br /><br />
        To log in, go to https://cakey-react-project.vercel.app/ then enter the following credentials <br /><br />

      <b>Email</b> : ${Email} <br />
      <b>Password</b> : ${Password} <br /> <br />
      

      You can change your password once you logged in.
      </p>

      <h4>Best wishes,</h4>
      <h5>MindMade Team</h5>
    `

    if (Status === 'Approved') {
        vendorModel.findOneAndUpdate({ _id: id },
            {
                $set: {
                    Password: Password,
                    Status: Status,
                    Created_On: Created_On
                }
            }, function (err, result) {
                if (err) {
                    res.send({ statusCode: 400, message: "Failed" });
                } else {
                    let mailOptions = {
                        from: 'support@mindmade.in',
                        to: Email,
                        subject: 'Cakey Credentials - reg',
                        html: mailBody
                    };
                    transporter.sendMail(mailOptions, (err, info) => {
                        if (err) {
                            return err;
                        } else {
                            return info;
                        }
                    });
                    res.send({ statusCode: 200, message: "Registered Successfully" });
                }
            })
    } else if (Status === 'Rejected') {
        vendorModel.findOneAndUpdate({ _id: id },
            {
                $set: {
                    Status: Status,
                    Created_On: Created_On
                }
            }, function (err, result) {
                if (err) {
                    res.send({ statusCode: 400, message: "Failed" });
                } else {
                    res.send({ statusCode: 200, message: "Updated Successfully" });
                }
            })
    }


};

//Update vendor's details
const putVendors = async (req, res) => {

    const id = req.params.id;
    const Email = req.body.Email;
    const Password = req.body.Password;
    const VendorName = req.body.VendorName;
    const Street = req.body.Street;
    const City = req.body.City;
    const District = req.body.District;
    const Pincode = req.body.Pincode;
    const FullAddress = req.body.FullAddress;
    const PhoneNumber = req.body.PhoneNumber;
    const DeliveryCharge = req.body.DeliveryCharge;
    const Description = req.body.Description;
    const EggOrEggless = req.body.EggOrEggless;
    const Modified_On = moment().tz('Asia/Kolkata').format("DD-MM-YYYY hh:mm A");

    if (req.file === undefined) {
        vendorModel.findById({ _id: id }, function (err, result) {
            if (err) {
                res.send({ statusCode: 400, message: "Failed" });
            } else if (result.Email === Email) {
                vendorModel.findOneAndUpdate({ _id: id },
                    {
                        $set: {
                            Email: Email,
                            Password: Password,
                            VendorName: VendorName,
                            Address: {
                                FullAddress: FullAddress,
                                Street: Street,
                                City: City,
                                District: District,
                                Pincode: Pincode
                            },
                            PhoneNumber: PhoneNumber,
                            DeliveryCharge: DeliveryCharge,
                            Description: Description,
                            EggOrEggless: EggOrEggless,
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
                                vendorModel.findOneAndUpdate({ _id: id },
                                    {
                                        $set: {
                                            Email: Email,
                                            Password: Password,
                                            VendorName: VendorName,
                                            Address: {
                                                FullAddress: FullAddress,
                                                Street: Street,
                                                City: City,
                                                District: District,
                                                Pincode: Pincode
                                            },
                                            PhoneNumber: PhoneNumber,
                                            DeliveryCharge: DeliveryCharge,
                                            Description: Description,
                                            EggOrEggless: EggOrEggless,
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
        const imagesUrl = await cloudinary.uploader.upload(req.file.path, { width: 640, height: 426, crop: "scale", format: 'webp' });

        vendorModel.findById({ _id: id }, function (err, result) {
            if (err) {
                res.send({ statusCode: 400, message: "Failed" });
            } else if (result.Email === Email) {
                vendorModel.findOneAndUpdate({ _id: id },
                    {
                        $set: {
                            Email: Email,
                            Password: Password,
                            VendorName: VendorName,
                            Address: {
                                FullAddress: FullAddress,
                                Street: Street,
                                City: City,
                                District: District,
                                Pincode: Pincode
                            },
                            PhoneNumber: PhoneNumber,
                            DeliveryCharge: DeliveryCharge,
                            Description: Description,
                            ProfileImage: imagesUrl.secure_url,
                            EggOrEggless: EggOrEggless,
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
                                vendorModel.findOneAndUpdate({ _id: id },
                                    {
                                        $set: {
                                            Email: Email,
                                            Password: Password,
                                            VendorName: VendorName,
                                            Address: {
                                                FullAddress: FullAddress,
                                                Street: Street,
                                                City: City,
                                                District: District,
                                                Pincode: Pincode
                                            },
                                            PhoneNumber: PhoneNumber,
                                            DeliveryCharge: DeliveryCharge,
                                            Description: Description,
                                            ProfileImage: imagesUrl.secure_url,
                                            EggOrEggless: EggOrEggless,
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

};

//delete vendors
const deleteVendors = (req, res) => {

    const id = req.params.id;
    const IsDeleted = 'y';
    const Modified_On = moment().tz('Asia/Kolkata').format("DD-MM-YYYY hh:mm A");

    vendorModel.findOneAndUpdate({ _id: id },
        {
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
                            vendorModel.findOneAndUpdate({ Email: Email },
                                {
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
                    adminModel.findOneAndUpdate({ Email: Email },
                        {
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

};

const getAllUsersCount = (req, res) => {
    userModel.count({}, function (err, count1) {
        // res.send(count1.toString())
        if (!err) {
            vendorModel.count({}, function (err, count2) {
                if (!err) {
                    res.send({ Users: count1.toString(), Vendors: count2.toString() });
                }
            });
        }
    })
}



module.exports = {

    getAdminbyEmail,
    putAdmin,
    loginValidate,
    verifyToken,
    forgotPassword,
    getVendors,
    getVendorsbyEmail,
    addVendors,
    putVendors,
    deleteVendors,
    getAllUsersCount

};