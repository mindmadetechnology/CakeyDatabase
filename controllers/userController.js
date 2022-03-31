const userModel = require("../models/userModels");
const path = require("path");
// const moment = require("moment");
const moment = require('moment-timezone');
const JWT = require('jsonwebtoken');
const cloudinary = require("../middleware/cloudnary");

//Get all users
const getUsers = (req, res) => {
    userModel.find({}, function (err, result) {
        if (err) {
            res.send({ statusCode: 400, message: "There  is was a problem adding the information to the database." });
        } else {
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
            res.send(result);
        }
    })
};

//Update user's details
const putUsers = async(req, res) => {
    const UserName = req.body.UserName;
    const Address = req.body.Address;
    const userId = req.params.userId;
    const Modified_On = moment().tz('Asia/Kolkata').format("DD-MM-YYYY hh:mm A");

    // let d = new Date()
    // let ank = d.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
    // res.send("your time zone " + ank)

    console.log(Modified_On)

    // try {
    //     if (req.file === undefined) {
    //         userModel.findById({ _id: userId }, function (err, result) {
    //             if (err) {
    //                 res.send(err);
    //             } else {
    //                 if (result.Address === undefined || result.Address === null || result.Address === "") {
    //                     if (UserName === undefined || Address === undefined) {
    //                         res.send({ statusCode: 400, message: "*required" })
    //                     } else {
    //                         if (UserName !== "" && Address !== "") {

    //                             userModel.findOneAndUpdate({ _id: userId },
    //                                 { $set: { UserName: UserName, Address: Address, Modified_On: Modified_On } }, function (err, result) {
    //                                     if (err) {
    //                                         res.send({ statusCode: 400, message: "Failed" });
    //                                     } else {
    //                                         res.send({ statusCode: 200, message: "Updated Successfully" });
    //                                     }
    //                                 });
    //                         } else {
    //                             res.send({ statusCode: 400, message: "*required" });
    //                         }
    //                     }
    //                 } else {
    //                     if (UserName !== "" && Address !== "") {

    //                         userModel.findOneAndUpdate({ _id: userId },
    //                             { $set: { UserName: UserName, Address: Address, Modified_On: Modified_On } }, function (err, result) {
    //                                 if (err) {
    //                                     res.send({ statusCode: 400, message: "Failed" });
    //                                 } else {
    //                                     res.send({ statusCode: 200, message: "Updated Successfully" });
    //                                 }
    //                             });
    //                     } else {
    //                         res.send({ statusCode: 400, message: "*required" });
    //                     }
    //                 }
    //             }
    //         })
    //     } else {
    //         const imagesUrl = await cloudinary.uploader.upload(req.file.path);

    //         userModel.findById({ _id: userId }, function (err, result) {
    //             if (err) {
    //                 res.send(err);
    //             } else {
    //                 if (result.Address === undefined || result.Address === null || result.Address === "") {
    //                     if (UserName === undefined || Address === undefined) {
    //                         res.send({ statusCode: 400, message: "*required" })
    //                     } else {
    //                         if (UserName !== "" && Address !== "") {

    //                             userModel.findOneAndUpdate({ _id: userId },
    //                                 { $set: { ProfileImage: imagesUrl.secure_url, UserName: UserName, Address: Address, Modified_On: Modified_On } }, function (err, result) {
    //                                     if (err) {
    //                                         res.send({ statusCode: 400, message: "Failed" });
    //                                     } else {
    //                                         res.send({ statusCode: 200, message: "Updated Successfully" });
    //                                     }
    //                                 });
    //                         } else {
    //                             res.send({ statusCode: 400, message: "*required" });
    //                         }
    //                     }
    //                 } else {
    //                     if (UserName !== "" && Address !== "") {

    //                         userModel.findOneAndUpdate({ _id: userId },
    //                             { $set: { ProfileImage: imagesUrl.secure_url, UserName: UserName, Address: Address, Modified_On: Modified_On } }, function (err, result) {
    //                                 if (err) {
    //                                     res.send({ statusCode: 400, message: "Failed" });
    //                                 } else {
    //                                     res.send({ statusCode: 200, message: "Updated Successfully" });
    //                                 }
    //                             });
    //                     } else {
    //                         res.send({ statusCode: 400, message: "*required" });
    //                     }
    //                 }
    //             }
    //         })
    //     }
    // } catch (err) {
    //     console.log(err);
    // }
}

//Validate the user -> If phonenumber is exists login else register
const validateUsers = (req, res) => {

    const PhoneNumber = req.body.PhoneNumber;
    const Created_On = moment().format("DD-MM-YYYY hh:mm a")

    userModel.findOne({ PhoneNumber: PhoneNumber }, function (err, result) {
        if (result === null) {
            if (PhoneNumber === "" || PhoneNumber === null || PhoneNumber === undefined) {
                res.send({ statusCode: 400, message: "Invalid Mobile Number" });
            } else {
                const uservalidate = new userModel({
                    PhoneNumber: PhoneNumber,
                    Created_On
                });
                uservalidate.save(function (err, result) {
                    if (err) {
                        res.send({ statusCode: 400, message: "Failed" });
                    } else {
                        res.send({ statusCode: 200, message: "registered Successfully" })
                    }
                });
            }
        } else if (err) {
            res.send({ statusCode: 400, message: "error" });
        } else {
            const token = JWT.sign({
                id : result._id
            },'secret123',{expiresIn : '7d'})
            res.send({ statusCode: 200, message: "Login Succeed",token : token });
        }
    })
};
var fs = require('fs');

const viewImg = function (req, res) {
    var file = req.params.file;
    var fileLocation = path.join('public/images/', file);
    fs.readFile(fileLocation, function (err, data) {
        if (err) throw err; // Fail if the file can't be read.
        res.writeHead(200, { 'Content-Type': 'image/jpeg' });
        res.end(data); // Send the file data to the browser.
    });
}


module.exports = {
    viewImg,
    getUsers,
    putUsers,
    validateUsers
}