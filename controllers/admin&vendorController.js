const adminModel = require("../models/adminModels");
const vendorModel = require("../models/vendorModels");
const JWT = require('jsonwebtoken');
const moment = require('moment-timezone');
const cloudinary = require("../middleware/cloudnary");
const { transporter } = require('../middleware/nodemailer');

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
    const Modified_On = moment().tz('Asia/Kolkata').format("DD-MM-YYYY hh:mm A");

    try {

        if (req.file === undefined) {
            adminModel.findById({ _id: id }, function (err, result) {
                if (err) {
                    res.send({ statusCode: 400, message: "Failed" });
                } else if (result.Email === Email) {
                    adminModel.findOneAndUpdate({ _id: id },
                        { $set: { 
                            Email: Email, 
                            AdminName : AdminName,
                            Modified_On: Modified_On 
                        } }, function (err, result) {
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
                                        { $set: { 
                                            Email: Email,
                                            AdminName : AdminName, 
                                            Modified_On: Modified_On 
                                        } }, function (err, result) {
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
                        { $set: { 
                            ProfileImage: imagesUrl.secure_url, 
                            AdminName : AdminName,
                            Modified_On: Modified_On 
                        } }, function (err, result) {
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
                                        { $set: { 
                                            Email: Email, 
                                            AdminName : AdminName,
                                            ProfileImage: imagesUrl.secure_url, 
                                            Modified_On: Modified_On 
                                        } }, function (err, result) {
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
            res.send(result);
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
                    res.send({ statusCode: 400, message: "Invalid username or password" });
                } else if (err) {
                    res.send({ statusCode: 400, message: "error" });
                } else {
                    const token = JWT.sign({
                        id: result._id,
                        Email : result.Email
                    }, 'secret123', { expiresIn: 60 * 60 * 96 })
                    res.send({ statusCode: 200, message: "Login Succeed", type: 'vendor', token: token });
                }
            });
        } else if (err) {
            res.send({ statusCode: 400, message: "error" });
        } else {
            const token = JWT.sign({
                id: result._id,
                Email : result.Email
            }, 'secret123', { expiresIn:  60 * 60 * 96 })
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
        if(result===null) {
            vendorModel.findById({ _id: decodeToken.id }, function (err, result) {
                if (err) {
                    res.send({ statusCode: 400, message: "Failed" });
                } 
                if(result===null) {
                    res.send({statusCode : 400,message : "Invalid token"});
                }else{
                    if(decodeToken.exp < Date.now()/1000){
                        res.send({statusCode : 400,message : "Invalid token"});
                    }else{
                        res.send({statusCode : 200, result : result, type : 'vendor'});
                    }    
                }
            });
        }else{
            if(decodeToken.exp < Date.now()/1000){
                res.send({statusCode : 400,message : "Invalid token"});
            }else{
                res.send({statusCode : 200, result : result, type : 'admin'});
            }  
        }
    });

};

//Add new vendors
const addVendors = (req, res) => {

    const Email = req.body.Email;
    const Password = req.body.Password;
    const VendorName = req.body.VendorName;
    const Street = req.body.Street;
    const City = req.body.City;
    const District = req.body.District;
    const Pincode = req.body.Pincode;
    const PhoneNumber = req.body.PhoneNumber;
    const Created_On = moment().tz('Asia/Kolkata').format("DD-MM-YYYY hh:mm A");

    adminModel.findOne({ Email: Email }, function (err, result) {
        if (err) {
            res.send({ statusCode: 400, message: "Failed1" });

        } else if (result === null) {
            vendorModel.findOne({ Email: Email }, function (err, result) {
                if (err) {
                    res.send({ statusCode: 400, message: "Failed2" });

                } else if (result === null) {
                    if (Email === undefined || VendorName === undefined || Street === undefined || City ===undefined || 
                        District === undefined || Pincode === undefined || PhoneNumber === undefined || Password === undefined) {
                            res.send({ statusCode: 400, message: "*required" });
                    } else {
                        const vendorValidate = new vendorModel({
                            Email: Email,
                            Password: Password,
                            VendorName: VendorName,
                            Address: {
                                Street : Street,
                                City : City,
                                District : District,
                                Pincode : Pincode
                            },
                            PhoneNumber: PhoneNumber,
                            Created_On: Created_On
                        });

                        vendorValidate.save(function (err, result) {
                            if (err) {
                                res.send({ statusCode: 400, message: err });
                            } else {
                                res.send({ statusCode: 200, message: "Registered Successfully" });
                            }
                        });
                    }
                } else {
                    res.send({ statusCode: 400, message: "Email already Exist" });
                }
            });
        } else {
            res.send({ statusCode: 400, message: "Email already Exist" });
        }
    });

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
    const PhoneNumber = req.body.PhoneNumber;
    const DeliveryCharge = req.body.DeliveryCharge;
    const Description = req.body.Description;
    const Modified_On = moment().tz('Asia/Kolkata').format("DD-MM-YYYY hh:mm A");

    if (req.file === undefined) {
        vendorModel.findById({ _id: id }, function (err, result) {
            if (err) {
                res.send({ statusCode: 400, message: "Failed" });
            } else if (result.Email === Email) {
                vendorModel.findOneAndUpdate({ _id: id },
                    { $set: { 
                        Email: Email, 
                        Password: Password, 
                        VendorName: VendorName, 
                        Address: {
                            Street : Street,
                            City : City,
                            District : District,
                            Pincode : Pincode
                        },
                        PhoneNumber: PhoneNumber, 
                        DeliveryCharge:DeliveryCharge,
                        Description : Description, 
                        Modified_On: Modified_On
                    } }, function (err, result) {
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
                                    { $set: { 
                                        Email: Email, 
                                        Password: Password, 
                                        VendorName: VendorName, 
                                        Address: {
                                            Street : Street,
                                            City : City,
                                            District : District,
                                            Pincode : Pincode
                                        }, 
                                        PhoneNumber: PhoneNumber,
                                        DeliveryCharge:DeliveryCharge, 
                                        Description : Description, 
                                        Modified_On: Modified_On
                                    } }, function (err, result) {
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
        const imagesUrl = await cloudinary.uploader.upload(req.file.path, { width: 185, height: 185, crop: "fill" });

        vendorModel.findById({ _id: id }, function (err, result) {
            if (err) {
                res.send({ statusCode: 400, message: "Failed" });
            } else if (result.Email === Email) {
                vendorModel.findOneAndUpdate({ _id: id },
                    { $set: { 
                        Email: Email, 
                        Password: Password, 
                        VendorName: VendorName, 
                        Address: {
                            Street : Street,
                            City : City,
                            District : District,
                            Pincode : Pincode
                        },
                        PhoneNumber: PhoneNumber,
                        DeliveryCharge:DeliveryCharge, 
                        Description : Description, 
                        ProfileImage: imagesUrl.secure_url, 
                        Modified_On: Modified_On
                    } }, function (err, result) {
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
                                    { $set: { 
                                        Email: Email, 
                                        Password: Password, 
                                        VendorName: VendorName, 
                                        Address: {
                                            Street : Street,
                                            City : City,
                                            District : District,
                                            Pincode : Pincode
                                        }, 
                                        PhoneNumber: PhoneNumber,
                                        DeliveryCharge:DeliveryCharge,
                                        Description : Description,  
                                        ProfileImage: imagesUrl.secure_url,
                                        Modified_On: Modified_On 
                                    } }, function (err, result) {
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
        { $set: { 
            IsDeleted: IsDeleted, 
            Modified_On: Modified_On 
        } }, function (err, result) {
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
                                { $set: { 
                                    Password: Password, 
                                    Modified_On: Modified_On 
                                } }, function (err, result) {
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
                        { $set: { 
                            Password: Password, 
                            Modified_On: Modified_On 
                        } }, function (err, result) {
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
    deleteVendors

};