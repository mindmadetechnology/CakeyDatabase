const userModel = require("../models/userModels");
const moment = require('moment-timezone');
const JWT = require('jsonwebtoken');
const cloudinary = require("../middleware/cloudnary");
require('dotenv').config();



//Get all users
const getUsers = (req, res) => {

    userModel.find({}, function (err, result) {
        if (err) {
            res.send({ statusCode: 400, message: "There  is was a problem adding the information to the database." });
        } else {
            if(result.length === 0){
                res.send({message : "No Records Found"})
            }else{
                res.send(result)
            }
        }
    });

};

//Get user details by id
const getUsersbyPhoneNumber = (req, res) => {

    const PhoneNumber = req.params.pn;

    userModel.find({ PhoneNumber: PhoneNumber }, function (err, result) {
        if (err) {
            res.send({ statusCode: 400, message: "There  is was a problem adding the information to the database." });
        } else {
            res.send(result);
        }
    });
};

//Update user's details
const putUsers = async (req, res) => {

    const UserName = req.body.UserName;
    const Address = req.body.Address;
    const userId = req.params.userId;
    const Modified_On = moment().tz('Asia/Kolkata').format("DD-MM-YYYY hh:mm A");

    try {

        if (req.file === undefined) {
            userModel.findById({ _id: userId }, function (err, result) {
                if (err) {
                    res.send(err);
                } else {
                    if (result.Address === undefined || result.Address === null || result.Address === "") {
                        if (UserName === undefined || Address === undefined) {
                            res.send({ statusCode: 400, message: "*required" });
                        } else {
                            if (UserName !== "" && Address !== "") {
                                userModel.findOneAndUpdate({ _id: userId },
                                    {
                                        $set: {
                                            UserName: UserName,
                                            Address: Address,
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
                            userModel.findOneAndUpdate({ _id: userId },
                                { $set: { 
                                    UserName: UserName, 
                                    Address: Address, 
                                    Modified_On: Modified_On 
                                } }, function (err, result) {
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
            const imagesUrl = await cloudinary.uploader.upload(req.file.path, { width: 640,height : 426, crop: "scale",format:'webp' });

            userModel.findById({ _id: userId }, function (err, result) {
                if (err) {
                    res.send(err);
                } else {
                    if (result.Address === undefined || result.Address === null || result.Address === "") {
                        if (UserName === undefined || Address === undefined) {
                            res.send({ statusCode: 400, message: "*required" });
                        } else {
                            if (UserName !== "" && Address !== "") {

                                userModel.findOneAndUpdate({ _id: userId },
                                    { $set: { 
                                        ProfileImage: imagesUrl.secure_url, 
                                        UserName: UserName, 
                                        Address: Address, 
                                        Modified_On: Modified_On 
                                    } }, function (err, result) {
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
                            userModel.findOneAndUpdate({ _id: userId },
                                { $set: { 
                                    ProfileImage: imagesUrl.secure_url, 
                                    UserName: UserName, 
                                    Address: Address, 
                                    Modified_On: Modified_On 
                                } }, function (err, result) {
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
        return err;
    };

};

//Validate the user -> If phonenumber is exists login else register
const validateUsers = (req, res) => {

    const PhoneNumber = req.body.PhoneNumber;
    const Created_On = moment().tz('Asia/Kolkata').format("DD-MM-YYYY hh:mm A");

    userModel.findOne({ PhoneNumber: PhoneNumber }, function (err, result) {
        if (result === null) {
            if (PhoneNumber === "" || PhoneNumber === null || PhoneNumber === undefined) {
                res.send({ statusCode: 400, message: "Invalid Mobile Number" });
            } else {
                const uservalidate = new userModel({
                    PhoneNumber: PhoneNumber,
                    Created_On :Created_On
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
            res.send({ statusCode: 400, message: "error" });
        } else {
            const token = JWT.sign({
                id: result._id
            }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 96 });
            res.send({ statusCode: 200, message: "Login Succeed", token: token });
            // req.setHeader('Authorization','Bearer ' + token)
        }
    });
    
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
    getUsersbyPhoneNumber

};