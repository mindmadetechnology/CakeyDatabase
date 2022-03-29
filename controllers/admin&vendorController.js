const adminModel = require("../models/adminModels");
const vendorModel = require("../models/vendorModels");
const JWT = require('jsonwebtoken');
const moment = require("moment");

//Get all Vendors
const getVendors = (req,res) => {

    vendorModel.find({IsDeleted : 'n'}, function (err, result) {
        if (err) {
            res.send({ statusCode: 400, message: "There was a problem adding the information to the database." });
        }else {
            res.send(result);
        }
    })
};

//login for admin and vendors
const loginValidate = (req,res) => { 

    const Email = req.body.Email;
    const Password = req.body.Password;

    adminModel.findOne({ Email: Email, Password : Password }, function (err, result) {
        if (result === null) {
            vendorModel.findOne({ Email: Email, Password : Password }, function (err, result) {
                if (result === null) {
                    res.send({ statusCode: 400, message: "Invalid username or password" })
                }else if (err) {
                    res.send({ statusCode: 400, message: "error" });
                }else {
                    const token = JWT.sign({
                        id : result._id
                    },'secret123',{expiresIn : '7d'})
                    res.send({ statusCode: 200, message: "Login Succeed",type : 'vendor', token : token });
                }
            })
        }else if (err) {
            res.send({ statusCode: 400, message: "error" });
        }else {
            const token = JWT.sign({
                id : result._id
            },'secret123',{expiresIn : '7d'})
            res.send({ statusCode: 200, message: "Login Succeed", type : 'admin', token : token});
        }
    })
};

//Add new vendors
const addVendors = (req,res) => {

    const Email = req.body.Email;
    const Password = req.body.Password;
    const Created_On= moment().format("DD-MM-YYYY, h:mm a");

    adminModel.findOne({ Email: Email }, function (err, result) {
        if(err){
            res.send({ statusCode: 400, message: "Failed" });

        }
        else if (result === null) {
            vendorModel.findOne({ Email: Email }, function (err, result) {
                if(err){
                    res.send({ statusCode: 400, message: "Failed" });
        
                }
               else if (result === null) {
                    if(Email === "" || Email === null || Email === undefined){
                        res.send({ statusCode: 400, message: "*required" });
                    }else{
                        const vendorValidate = new vendorModel({
                            Email : Email,
                            Password: Password,
                            Created_On:Created_On
        
                        });
                        vendorValidate.save(function (err, result) {
                          if (err) {
                             res.send({ statusCode: 400, message: "Failed" });
                          }else {
                             res.send({ statusCode: 200, message: "Registered Successfully" })
                          }
                        });
                    }     
                }else {
                    res.send({ statusCode: 400, message: "Email already Exist" });
                }
            })
        }
        else {
            res.send({ statusCode: 400, message: "Email already Exist" });
        }

    })
    
};

//Update vendor's details
const putVendors = (req,res) => {
    const id=req.params.id;
    const Email = req.body.Email;
    const Password = req.body.Password;
    const Modified_On= moment().format("DD-MM-YYYY, h:mm a");
    
    vendorModel.findById({_id:id},function(err,result){
        if(err){
            res.send({statusCode : 400,message :"Failed"})
        }
        else if(result.Email === Email){
        
                vendorModel.findOneAndUpdate({ _id : id  }, 
                    { $set: { Email : Email, Password:Password, Modified_On: Modified_On } }, function (err, result) {
                        if (err) {
                            res.send({ statusCode: 400, message: "Failed" });
                        }else {
                            res.send({ statusCode: 200, message: "Updated Successfully" });
                        }
                });
           
        }
        else{
            adminModel.findOne({Email : Email},function(err,result){
                if(result === null){
                    vendorModel.findOne({Email : Email},function(err,result){
                        if(result === null){
                            vendorModel.findOneAndUpdate({ _id : id  }, 
                                { $set: { Email : Email, Password:Password, Modified_On : Modified_On } }, function (err, result) {
                                    if (err) {
                                        res.send({ statusCode: 400, message: "Failed" });
                                    }else {
                                        res.send({ statusCode: 200, message: "Updated Successfully" });
                                    }
                            });
                        }else{
                            res.send({statusCode : 400, message : "Email already Exist"})
                        }
                    })
                }else{
                    res.send({statusCode : 400, message : "Email already Exist"})

                }
            })
        }
    })
};

//delete vendors
const deleteVendors = (req, res) => {
    const id = req.params.id;
    const IsDeleted = 'y';
    const Modified_On = moment().format("DD-MM-YYYY, h:mm a");

    vendorModel.findOneAndUpdate({ _id : id  }, { $set: { IsDeleted : IsDeleted, Modified_On : Modified_On } }, function(err,result){
        if(err){
            res.send({statusCode : 400, message : "Failed"})
        }else{
            res.send({statusCode : 200, message : "Deleted Successfully"})
        }
    })
}

//forgot password
const forgotPassword = (req,res) => {
    const id = req.params.id;
    const Password = req.body.Password;
    const Modified_On = moment().format("DD-MM-YYYY, h:mm a");

    if(Password.length > 5){
        adminModel.findById({_id : id}, function(err,result){
            if(err){
                res.send({statusCode : 400, message : "Failed"});
            }else if(result === null){
                vendorModel.findById({_id : id}, function(err,result){
                    if(err){
                        res.send({statusCode : 400, message : "Failed"});
                    }
                    if(result === null){
                        res.send({statusCode : 400, message : "Invalid"})
                    }else{
                        if(result.Password === Password){
                            res.send({statusCode : 400, message : "Please enter a new password"})
                        }else{
                            vendorModel.findOneAndUpdate({ _id : id  }, { $set: { Password : Password, Modified_On : Modified_On } }, function(err,result){
                                if(err){
                                    res.send({statusCode : 400, message : "Failed"})
                                }else{
                                    res.send({statusCode : 200, message : "Updated Successfully"})
                                }
                            })
                        }
                    }
                })
            }else{
                if(result.Password === Password){
                    res.send({statusCode : 400, message : "Please enter a new password"})
                }else{
                    adminModel.findOneAndUpdate({ _id : id  }, { $set: { Password : Password, Modified_On : Modified_On } }, function(err,result){
                        if(err){
                            res.send({statusCode : 400, message : "Failed"})
                        }else{
                            res.send({statusCode : 200, message : "Updated Successfully"})
                        }
                    })
                }
            }
        })
    }else{
        res.send({statusCode : 400, message : "you have to enter at least 6 char!"})
    }      
};

module.exports = {
    loginValidate,
    forgotPassword,
    getVendors,
    addVendors,
    putVendors,
    deleteVendors
}