const adminModel = require("../models/adminModels");
const vendorModel = require("../models/vendorModels");
const userModel = require("../models/userModels");
const CustomizeCakeModel = require('../models/CustomizeCakeModels');
const OrdersListModel = require("../models/OrdersListModels");
const JWT = require('jsonwebtoken');
const moment = require('moment-timezone');
const cloudinary = require("../middleware/cloudnary");
const { transporter } = require('../middleware/nodemailer');
require('dotenv').config();
const helpDeskModel = require('../models/helpDeskModels');

//Get Admin details by email
const getAdminbyEmail = (req, res) => {

    const Email = req.params.email;

    try {
        adminModel.find({ Email: Email }, function (err, result) {
            if (err) {
                res.send({ statusCode: 400, message: "There was a problem adding the information to the database." });
            } else {
                res.send(result);
            }
        });
    } catch (err) {
        res.send({ statusCode: 400, message: 'Failed' });
    }
};

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
                res.send('Failed')
            } else {
                res.send('success')
            }
        })
    } catch (err) {
        res.send({ statusCode: 400, message: 'Failed' });
    }

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
        res.send({ statusCode: 400, message: "Failed" });
    };
};

//Get all Vendors
const getVendors = (req, res) => {

    try {
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
    } catch (err) {
        res.send({ statusCode: 400, message: 'Failed' });
    }
};

//Get Vendor details by email
const getVendorsbyEmail = (req, res) => {

    const Email = req.params.email;

    try {
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
    } catch (err) {
        res.send({ statusCode: 400, message: 'Failed' });
    }
};

//login for admin and vendors
const loginValidate = (req, res) => {

    const Email = req.body.Email;
    const Password = req.body.Password;

    try {
        adminModel.findOne({ Email: Email, Password: Password }, function (err, result) {
            if (result === null) {
                vendorModel.findOne({ Email: Email, Password: Password, Status: 'Approved' }, function (err, result) {
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
                                }, process.env.JWT_SECRET, { expiresIn: '7d' })
                                res.send({ statusCode: 200, message: "Login Succeed", type: 'helpdesk', token: token });
                            }
                        })
                    } else if (err) {
                        res.send({ statusCode: 400, message: "error" });
                    } else {
                        const token = JWT.sign({
                            id: result._id,
                            Email: result.Email
                        }, process.env.JWT_SECRET, { expiresIn: '7d' })
                        res.send({ statusCode: 200, message: "Login Succeed", type: 'vendor', token: token });
                    }
                });
            } else if (err) {
                res.send({ statusCode: 400, message: "error" });
            } else {
                const token = JWT.sign({
                    id: result._id,
                    Email: result.Email
                }, process.env.JWT_SECRET, { expiresIn: '7d' })
                res.send({ statusCode: 200, message: "Login Succeed", type: 'admin', token: token });
            }
        });
    } catch (err) {
        res.send({ statusCode: 400, message: 'Failed' });
    }
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
    }
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

    try {
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
    } catch (err) {
        res.send({ statusCode: 400, message: "Failed" });
    }
};

//Update vendor's details
const putVendors = async (req, res) => {

    const id = req.params.id;
    const Email = req.body.Email;
    const Password = req.body.Password;
    const VendorName = req.body.VendorName;
    const PhoneNumber1 = req.body.PhoneNumber1;
    const PhoneNumber2 = req.body.PhoneNumber2;
    const Street = req.body.Street;
    const City = req.body.City;
    const State = req.body.State;
    const Pincode = req.body.Pincode;
    const FullAddress = req.body.FullAddress;
    const Description = req.body.Description;
    const EggOrEggless = req.body.EggOrEggless;
    const PreferredVendorName = req.body.PreferredVendorName; //optional
    const DateOfBirth = req.body.DateOfBirth;
    const Gender = req.body.Gender;
    const YearsOfExperienceAsBaker = req.body.YearsOfExperienceAsBaker;
    const AadhaarNumber = req.body.AadhaarNumber;
    const PANNumber = req.body.PANNumber;
    const GSTNumber = req.body.GSTNumber; //optional
    const FSSAINumber = req.body.FSSAINumber;
    const FSSAIExpiryDate = req.body.FSSAIExpiryDate;
    const MaximumCakesPerDay = req.body.MaximumCakesPerDay;
    const MaximumCakesPerWeek = req.body.MaximumCakesPerWeek;
    const JobType = req.body.JobType;
    const SpecializedIn = req.body.SpecializedIn; //optional
    const BankName = req.body.BankName;
    const Branch = req.body.Branch;
    const AccountNumber = req.body.AccountNumber;
    const IFSCCode = req.body.IFSCCode;
    const UPIId = req.body.UPIId; //optional
    const Modified_On = moment().tz('Asia/Kolkata').format("DD-MM-YYYY hh:mm A");

    try {
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
                                PhoneNumber1: PhoneNumber1,
                                PhoneNumber2: PhoneNumber2,
                                Address: {
                                    FullAddress: FullAddress,
                                    Street: Street,
                                    City: City,
                                    State: State,
                                    Pincode: Pincode
                                },
                                Description: Description,
                                EggOrEggless: EggOrEggless,
                                PreferredVendorName: PreferredVendorName,
                                DateOfBirth: DateOfBirth,
                                Gender: Gender,
                                YearsOfExperienceAsBaker: YearsOfExperienceAsBaker,
                                AadhaarNumber: AadhaarNumber,
                                PANNumber: PANNumber,
                                GSTNumber: GSTNumber,
                                FSSAINumber: FSSAINumber,
                                FSSAIExpiryDate: FSSAIExpiryDate,
                                MaximumCakesPerDay: MaximumCakesPerDay,
                                MaximumCakesPerWeek: MaximumCakesPerWeek,
                                JobType: JobType,
                                SpecializedIn: SpecializedIn,
                                BankName: BankName,
                                Branch: Branch,
                                AccountNumber: AccountNumber,
                                IFSCCode: IFSCCode,
                                UPIId: UPIId,
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
                                                PhoneNumber1: PhoneNumber1,
                                                PhoneNumber2: PhoneNumber2,
                                                Address: {
                                                    FullAddress: FullAddress,
                                                    Street: Street,
                                                    City: City,
                                                    State: State,
                                                    Pincode: Pincode
                                                },
                                                Description: Description,
                                                EggOrEggless: EggOrEggless,
                                                PreferredVendorName: PreferredVendorName,
                                                DateOfBirth: DateOfBirth,
                                                Gender: Gender,
                                                YearsOfExperienceAsBaker: YearsOfExperienceAsBaker,
                                                AadhaarNumber: AadhaarNumber,
                                                PANNumber: PANNumber,
                                                GSTNumber: GSTNumber,
                                                FSSAINumber: FSSAINumber,
                                                FSSAIExpiryDate: FSSAIExpiryDate,
                                                MaximumCakesPerDay: MaximumCakesPerDay,
                                                MaximumCakesPerWeek: MaximumCakesPerWeek,
                                                JobType: JobType,
                                                SpecializedIn: SpecializedIn,
                                                BankName: BankName,
                                                Branch: Branch,
                                                AccountNumber: AccountNumber,
                                                IFSCCode: IFSCCode,
                                                UPIId: UPIId,
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
                                PhoneNumber1: PhoneNumber1,
                                PhoneNumber2: PhoneNumber2,
                                Address: {
                                    FullAddress: FullAddress,
                                    Street: Street,
                                    City: City,
                                    State: State,
                                    Pincode: Pincode
                                },
                                Description: Description,
                                EggOrEggless: EggOrEggless,
                                PreferredVendorName: PreferredVendorName,
                                DateOfBirth: DateOfBirth,
                                Gender: Gender,
                                YearsOfExperienceAsBaker: YearsOfExperienceAsBaker,
                                AadhaarNumber: AadhaarNumber,
                                PANNumber: PANNumber,
                                GSTNumber: GSTNumber,
                                FSSAINumber: FSSAINumber,
                                FSSAIExpiryDate: FSSAIExpiryDate,
                                MaximumCakesPerDay: MaximumCakesPerDay,
                                MaximumCakesPerWeek: MaximumCakesPerWeek,
                                JobType: JobType,
                                SpecializedIn: SpecializedIn,
                                BankName: BankName,
                                Branch: Branch,
                                AccountNumber: AccountNumber,
                                IFSCCode: IFSCCode,
                                UPIId: UPIId,
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
                                                PhoneNumber1: PhoneNumber1,
                                                PhoneNumber2: PhoneNumber2,
                                                Address: {
                                                    FullAddress: FullAddress,
                                                    Street: Street,
                                                    City: City,
                                                    State: State,
                                                    Pincode: Pincode
                                                },
                                                Description: Description,
                                                EggOrEggless: EggOrEggless,
                                                PreferredVendorName: PreferredVendorName,
                                                DateOfBirth: DateOfBirth,
                                                Gender: Gender,
                                                YearsOfExperienceAsBaker: YearsOfExperienceAsBaker,
                                                AadhaarNumber: AadhaarNumber,
                                                PANNumber: PANNumber,
                                                GSTNumber: GSTNumber,
                                                FSSAINumber: FSSAINumber,
                                                FSSAIExpiryDate: FSSAIExpiryDate,
                                                MaximumCakesPerDay: MaximumCakesPerDay,
                                                MaximumCakesPerWeek: MaximumCakesPerWeek,
                                                JobType: JobType,
                                                SpecializedIn: SpecializedIn,
                                                BankName: BankName,
                                                Branch: Branch,
                                                AccountNumber: AccountNumber,
                                                IFSCCode: IFSCCode,
                                                UPIId: UPIId,
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
    }
};

//delete vendors
const deleteVendors = (req, res) => {

    const id = req.params.id;
    const IsDeleted = 'y';
    const Modified_On = moment().tz('Asia/Kolkata').format("DD-MM-YYYY hh:mm A");

    try {
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
    } catch (err) {
        res.send({ statusCode: 400, message: "Failed" });
    }
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
    } catch (err) {
        res.send({ statusCode: 400, message: "Failed" });
    }
};

const getAllUsersCount = (req, res) => {
    try {
        userModel.count({}, function (err, count1) {
            // res.send(count1.toString())
            if (!err) {
                vendorModel.count({ Status: 'Approved' }, function (err, count2) {
                    if (!err) {
                        CustomizeCakeModel.count({ Status: 'New' }, function (err, count3) {
                            if(!err){
                                CustomizeCakeModel.count({}, function (err, count4) {
                                    if(!err){
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
        })
    } catch (err) {
        res.send({ statusCode: 400, message: 'Failed' });
    }
};

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
                        })
                    }
                })
            }
        })
    } catch (err) {
        res.send({ statusCode: 400, message: 'Failed' });
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
    deleteVendors,
    getAllUsersCount,
    NewAdmin,
    GetNotificationCount

};