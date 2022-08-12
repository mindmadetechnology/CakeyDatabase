const CakeTypeModel = require('../models/CakeTypeModels');

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
                    Type: Type,
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
                                FinalSubType = [SubType];
                                const NewCakeType = CakeTypeModel({
                                    Type: Type,
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
                                    FinalSubType = [SubType];  
                                }else{
                                    var Result2 = result2.SubType;
                                    FinalSubType = Result2.concat(SubType);
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
                            Type: Type,
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

module.exports = {
    AddNewCakeType,
    GetCakeTypeList
}