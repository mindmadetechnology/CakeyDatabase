const userModel = require("../models/addUserModels");

//Get all users
const getUsers = (req,res) => {

    userModel.find({}, function (err, result) {
        if (err) {
            res.send({ statusCode: 400, message: "There was a problem adding the information to the database." });
        }else {
            res.send(result);
        }
    })
};

const setUsers = (req,res) => {
    res.send("Set User")
    // const user = new userModel(request.body);
    // user.save(function (err, result) {
    //     if (err) {
    //         response.send({ statusCode: 400, message: "Failed" });
    //     }
    //     else {
    //         response.send(result);
    //     }
    // });
}

//Update user's details
const putUsers = (req,res) => {

    const UserName = req.body.UserName;
    const Address = req.body.Address;
    const userId = req.params.userId;

    userModel.findById({_id : userId}, function(err,result){
        if(err){
            res.send(err);
        }else{
            if(result.Address === undefined || result.Address === null || result.Address === ""){
                if(UserName === undefined || Address === undefined){
                    res.send({statusCode: 400, message: "*required"})
                }else{
                    if(UserName !== "" && Address !== ""){
                        userModel.findOneAndUpdate({ _id : userId  }, 
                            { $set: {file:'https://cakey-database.vercel.app/public/images/'+req.file.filename, UserName : UserName, Address:Address } }, function (err, result) {
                                if (err) {
                                    res.send({ statusCode: 400, message: "Failed" });
                                }else {
                                    res.send({ statusCode: 200, message: "Updated Successfully" });
                                }
                        });
                    }else{
                        res.send({ statusCode: 400, message: "*required" }); 
                    }  
                }
            }else{
                if(UserName !== "" && Address !== ""){
                    userModel.findOneAndUpdate({ _id : userId  }, 
                        { $set: {file:`https://cakey-database.vercel.app/public/images/${req.file.filename}`, UserName : UserName, Address:Address } }, function (err, result) {
                            if (err) {
                                res.send({ statusCode: 400, message: "Failed" });
                            }else {
                                res.send({ statusCode: 200, message: "Updated Successfully" });
                            }
                    });
                }else{
                    res.send({ statusCode: 400, message: "*required" }); 
                }  
            }
        }
    }) 
}

//Validate the user -> If phonenumber is exists login else register
const validateUsers = (req,res) => {

    const PhoneNumber = req.body.PhoneNumber;

    userModel.findOne({ PhoneNumber: PhoneNumber }, function (err, result) {
        if (result === null) {
            if(PhoneNumber === "" || PhoneNumber === null || PhoneNumber === undefined){
                res.send({ statusCode: 400, message: "Invalid Mobile Number" });
            }else{
                const uservalidate = new userModel({
                    PhoneNumber : PhoneNumber
                });
                uservalidate.save(function (err, result) {
                  if (err) {
                     res.send({ statusCode: 400, message: "Failed" });
                  }else {
                     res.send({ statusCode: 200, message: "registered Successfully" })
                  }
                });
            }     
        }else if (err) {
            res.send({ statusCode: 400, message: "error" });
        }else {
            res.send({ statusCode: 200, message: "Login Succeed" });
        }
    })
};

module.exports = {
    getUsers,
    setUsers,
    putUsers,
    validateUsers
}