const CakeTypeModel = require('../models/CakeTypeModels');
const AdminNotificationModel = require("../models/AdminNotificationModels");

const AddNewCakeType = (req, res) => {
    const Type = req.body.Type;
    const SubType = req.body.SubType;
    try {
        var FinalSubType = [];
        CakeTypeModel.find({}, function(err, result1){
            if(err){
                res.send({ statusCode: 400, message: "Failed" }); 
            }else if(result1.length === 0){
                FinalSubType = [];
                const NewCakeType = CakeTypeModel({
                    Type: Type?.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase()),
                    SubType: FinalSubType
                });
                NewCakeType.save(function (err) {
                    if (err) {
                        res.send({ statusCode: 400, message: "Failed" });
                    } else {
                        res.send({ statusCode: 200, message: "Created Successfully" });
                    }
                });
            }else{
                if (Type !== result1.Type) {
                    if (SubType) {
                        CakeTypeModel.findOne({ Type: Type }, function (err, result2) {
                            if (err) {
                                res.send({ statusCode: 400, message: "Failed" });
                            } else if (result2 === null) {
                                FinalSubType = [SubType?.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())];
                                const NewCakeType = CakeTypeModel({
                                    Type: Type?.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase()),
                                    SubType: FinalSubType
                                });
                                NewCakeType.save(function (err) {
                                    if (err) {
                                        res.send({ statusCode: 400, message: "Failed" });
                                    } else {
                                        res.send({ statusCode: 200, message: "Created Successfully" });
                                    }
                                });
                            } else {
                                if(result2.SubType.length === 0){
                                    FinalSubType = [SubType?.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())];  
                                }else{
                                    var Result2 = result2.SubType;
                                    FinalSubType = Result2.concat(SubType?.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase()));
                                }
                                CakeTypeModel.findOneAndUpdate({ Type: Type }, {
                                    $set: {
                                        SubType: FinalSubType
                                    }
                                }, function (err) {
                                    if (err) {
                                        res.send({ statusCode: 400, message: "Failed" });
                                    } else {
                                        res.send({ statusCode: 200, message: "Created Successfully" });
                                    }
                                });
                            }
                        });
                    } else {
                        FinalSubType = [];
                        const NewCakeType = CakeTypeModel({
                            Type: Type.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase()),
                            SubType: FinalSubType
                        });
                        NewCakeType.save(function (err) {
                            if (err) {
                                res.send({ statusCode: 400, message: "Failed" });
                            } else {
                                res.send({ statusCode: 200, message: "Created Successfully" });
                            }
                        });
                    }
                }else{
                    res.send({ statusCode: 400, message: "Cake Type Already Exist" });
                }
            }
        });
        
    } catch (err) {
        res.send({ statusCode: 400, message: "Failed" });
    };
};

const GetCakeTypeList = (req, res) => {
    try{
        CakeTypeModel.find({IsDeleted: 'n'}, function(err, result){
            if(err){
                res.send({ statusCode: 400, message: "Failed" });
            }else if(result.length === 0){
                res.send({ message: 'No Records Found' });
            }else{
                res.send(result);
            }
        })
    }catch(err){
        res.send({ statusCode: 400, message: "Failed" });
    }
};

const DeleteCakeTypeOrCakeSubType = (req, res) => {
    const TypeStatus = req.body.TypeStatus;
    const Type = req.body.Type;
    const SubType = req.body.SubType;
    try{
        if(TypeStatus === 'Type'){
            CakeTypeModel.findOneAndDelete({ Type: Type }, function (err) {
                if (err) {
                    res.send({ statusCode: 400, message: "Failed" });
                } else {
                    res.send({ statusCode: 200, message: "Deleted Successfully" });
                }
            });
        }else{
            CakeTypeModel.findOne({ Type: Type }, function(err, result){
                if(err){
                    res.send({ statusCode: 400, message: "Failed" });
                }else if(result.length === 0){
                    res.send({ message: 'No Records Found' });
                }else{
                    var Final = []
                    result.SubType.filter(val => {
                        if (val !== SubType) {
                            Final.push(val);
                        }
                    });
                    CakeTypeModel.findOneAndUpdate({ Type: Type },{
                        $set: {
                            SubType: Final 
                        }
                    }, function(err){
                        if(err){
                            res.send({ statusCode: 400, message: "Failed" });
                        }else{
                            res.send({ statusCode: 200, message: "Deleted Successfully" });
                        }
                    });
                }
            });
        };
    }catch(err){
        res.send({ statusCode: 400, message: "Failed" });
    }
};

const RemoveAdminNotification = (req, res) => {
    const Id = req.params.id;

    try{
        AdminNotificationModel.findOneAndDelete({ _id: Id}, function(err){
            if(err){
                res.send({ statusCode: 400, message: "Failed" });
            }else{
                res.send({ statusCode: 201, message: "Removed Successfully" });
            }
        })
    }catch(err){
        res.send({ statusCode: 400, message: "Failed" });
    }
};

module.exports = {
    AddNewCakeType,
    GetCakeTypeList,
    DeleteCakeTypeOrCakeSubType,
    RemoveAdminNotification
}