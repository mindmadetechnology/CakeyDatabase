const CakeTypeModel = require('../models/CakeTypeModels');
const AdminNotificationModel = require("../models/AdminNotificationModels");
const cloudinary = require("../middleware/cloudnary");

const AddNewCakeType = (req, res) => {
    const Type = req.body.Type;
    const SubType = req.body.SubType;
    //Type_Image - for Type
    //SubType_Image - for Subtype
    try {
        var FinalSubType = [];
        CakeTypeModel.find({}, async function (err, result1) {
            if (err) {
                res.send({ statusCode: 400, message: "Failed" });
            } else if (result1.length === 0) {
                FinalSubType = [];
                var Image = await cloudinary.uploader.upload(req.files['Type_Image'][0].path, { width: 640, height: 426, crop: "scale", format: 'webp' });
                const NewCakeType = CakeTypeModel({
                    Type: Type?.toLowerCase().replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase()),
                    Type_Image: Image.url,
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
                if (Type !== result1.Type) {
                    if (SubType) {
                        var Image = await cloudinary.uploader.upload(req.files['SubType_Image'][0].path, { width: 640, height: 426, crop: "scale", format: 'webp' });
                        CakeTypeModel.findOne({ Type: Type }, function (err, result2) {
                            if (err) {
                                res.send({ statusCode: 400, message: "Failed" });
                            } else if (result2 === null) {
                                FinalSubType = [{
                                    Name: SubType?.toLowerCase().replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase()),
                                    SubType_Image: Image.url
                                }];
                                const NewCakeType = CakeTypeModel({
                                    Type: Type?.toLowerCase().replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase()),
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
                                if (result2.SubType.length === 0) {
                                    FinalSubType = [{
                                        Name: SubType?.toLowerCase().replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase()),
                                        SubType_Image: Image.url
                                    }];
                                } else {
                                    var Result2 = result2.SubType;
                                    var newSubType = [{
                                        Name: SubType?.toLowerCase().replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase()),
                                        SubType_Image: Image.url
                                    }];
                                    FinalSubType = Result2.concat(newSubType);
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
                        var Image = await cloudinary.uploader.upload(req.files['Type_Image'][0].path, { width: 640, height: 426, crop: "scale", format: 'webp' });
                        const NewCakeType = CakeTypeModel({
                            Type: Type?.toLowerCase().replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase()),
                            Type_Image: Image.url,
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
                } else {
                    res.send({ statusCode: 400, message: "Cake Type Already Exist" });
                }
            }
        });

    } catch (err) {
        res.send({ statusCode: 400, message: "Failed" });
    };
};

const UpdateCakeTypeAndSubtypeImages = async (req, res) => {
    const TypeStatus = req.body.TypeStatus;
    const Type = req.body.Type;
    const SubType = req.body.SubType;
    //Type_Image - for Type
    //SubType_Image - for Subtype
    try {
        if (TypeStatus === 'CakeType') {
            var Image = await cloudinary.uploader.upload(req.files['Type_Image'][0].path, { width: 640, height: 426, crop: "scale", format: 'webp' });
            CakeTypeModel.findOneAndUpdate({ Type: Type }, {
                $set: {
                    Type_Image: Image.url
                }
            }, function (err) {
                if (err) {
                    res.send({ statusCode: 400, message: "Failed" });
                } else {
                    res.send({ statusCode: 200, message: "Updated Successfully" });
                }
            });
        } else {
            var Image = await cloudinary.uploader.upload(req.files['SubType_Image'][0].path, { width: 640, height: 426, crop: "scale", format: 'webp' });
            CakeTypeModel.findOne({ Type: Type }, function (err, result) {
                if (err) {
                    res.send({ statusCode: 400, message: "Failed" });
                } else {
                    let Array = result.SubType
                    let Index = Array.findIndex(val => val.Name === SubType);
                    Array[Index].SubType_Image = Image.url
                    CakeTypeModel.findOneAndUpdate({ Type: Type }, {
                        $set: {
                            SubType: Array
                        }
                    }, function (err) {
                        if (err) {
                            res.send({ statusCode: 400, message: "Failed" });
                        } else {
                            res.send({ statusCode: 200, message: "Updated Successfully" });
                        }
                    });
                }
            });
        }
    } catch (err) {
        res.send({ statusCode: 400, message: "Failed" });
    }
};

const GetCakeTypeList = (req, res) => {
    try {
        CakeTypeModel.find({ IsDeleted: 'n' }, function (err, result) {
            if (err) {
                res.send({ statusCode: 400, message: "Failed" });
            } else if (result.length === 0) {
                res.send({ message: 'No Records Found' });
            } else {
                res.send(result);
            }
        })
    } catch (err) {
        res.send({ statusCode: 400, message: "Failed" });
    }
};

const DeleteCakeTypeOrCakeSubType = (req, res) => {
    const TypeStatus = req.body.TypeStatus;
    const Type = req.body.Type;
    const SubType = req.body.SubType;
    try {
        if (TypeStatus === 'Type') {
            CakeTypeModel.findOneAndDelete({ Type: Type }, function (err) {
                if (err) {
                    res.send({ statusCode: 400, message: "Failed" });
                } else {
                    res.send({ statusCode: 200, message: "Deleted Successfully" });
                }
            });
        } else {
            CakeTypeModel.findOne({ Type: Type }, function (err, result) {
                if (err) {
                    res.send({ statusCode: 400, message: "Failed" });
                } else if (result.length === 0) {
                    res.send({ message: 'No Records Found' });
                } else {
                    var Final = []
                    result.SubType.filter(val => {
                        if (val.Name !== SubType) {
                            Final.push(val);
                        }
                    });
                    CakeTypeModel.findOneAndUpdate({ Type: Type }, {
                        $set: {
                            SubType: Final
                        }
                    }, function (err) {
                        if (err) {
                            res.send({ statusCode: 400, message: "Failed" });
                        } else {
                            res.send({ statusCode: 200, message: "Deleted Successfully" });
                        }
                    });
                }
            });
        };
    } catch (err) {
        res.send({ statusCode: 400, message: "Failed" });
    }
};

const RemoveAdminNotification = (req, res) => {
    const Id = req.params.id;

    try {
        AdminNotificationModel.findOneAndDelete({ _id: Id }, function (err) {
            if (err) {
                res.send({ statusCode: 400, message: "Failed" });
            } else {
                res.send({ statusCode: 201, message: "Removed Successfully" });
            }
        })
    } catch (err) {
        res.send({ statusCode: 400, message: "Failed" });
    }
};

module.exports = {
    AddNewCakeType,
    GetCakeTypeList,
    DeleteCakeTypeOrCakeSubType,
    RemoveAdminNotification,
    UpdateCakeTypeAndSubtypeImages
}