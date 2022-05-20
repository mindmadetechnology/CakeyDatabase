const CustomizeCakeModel = require('../models/CustomizeCakeModels');
const moment = require('moment-timezone');
const cloudinary = require("../middleware/cloudnary");

const GetCustomizeCakeList = (req, res) => {

    CustomizeCakeModel.find({}, function (err, result) {
        if (err) {
            res.send({ statusCode: 400, message: "There  is was a problem adding the information to the database." });
        } else {
            if (result.length === 0) {
                res.send({ message: "No Records Found" })
            } else {
                res.send(result)
            }
        }
    });

};

const GetAbove5kgCustomizeCakeList = (req, res) => {

    const Above5KG = req.params.above;

    CustomizeCakeModel.find({ Above5KG: Above5KG }, function (err, result) {
        if (err) {
            res.send({ statusCode: 400, message: "There  is was a problem adding the information to the database." });
        } else {
            if (result.length === 0) {
                res.send({ message: "No Records Found" })
            } else {
                res.send(result)
            }
        }
    });

};

const GetCustomizeCakeListByVendorId = (req, res) => {

    const VendorID = req.params.id;

    CustomizeCakeModel.find({ VendorID: VendorID }, function (err, result) {
        if (err) {
            res.send({ statusCode: 400, message: "There  is was a problem adding the information to the database." });
        } else {
            if (result.length === 0) {
                res.send({ message: "No Records Found" })
            } else {
                res.send(result)
            }
        }
    });

};

const GetNewCustomizeCakeListByVendorId = (req, res) => {

    const Id = req.params.id;
    const Status = req.params.status;

    try {
        CustomizeCakeModel.find({ VendorID: Id, Status: Status }, function (err, result) {
            if (err) {
                res.send({ statusCode: 400, message: "Failed" });
            } else {
                if (result.length === 0) {
                    res.send({ message: "No Records Found" })
                } else {
                    res.send(result)
                }
            }
        })
    } catch (err) {
        console.log(err);
    }
};

const GetCustomizeCakeListByUserId = (req, res) => {

    const UserID = req.params.id;

    CustomizeCakeModel.find({ UserID: UserID }, function (err, result) {
        if (err) {
            res.send({ statusCode: 400, message: "There  is was a problem adding the information to the database." });
        } else {
            if (result.length === 0) {
                res.send({ message: "No Records Found" })
            } else {
                res.send(result)
            }
        }
    });

};

const AddNewCustomizeCake = async (req, res) => {

    const TypeOfCake = req.body.TypeOfCake;
    const EggOrEggless = req.body.EggOrEggless;
    const Flavour = req.body.Flavour; //multiple
    const Shape = req.body.Shape;
    const Article = req.body.Article; //Optional
    const Weight = req.body.Weight;
    const MessageOnTheCake = req.body.MessageOnTheCake; //Optional
    const SpecialRequest = req.body.SpecialRequest; //Optional
    const DeliveryAddress = req.body.DeliveryAddress;
    const DeliveryDate = req.body.DeliveryDate;
    const DeliverySession = req.body.DeliverySession;
    const DeliveryInformation = req.body.DeliveryInformation;
    const VendorID = req.body.VendorID;
    const Vendor_ID = req.body.Vendor_ID;
    const VendorName = req.body.VendorName;
    const VendorPhoneNumber = req.body.VendorPhoneNumber;
    const VendorAddress = req.body.VendorAddress;
    const UserID = req.body.UserID;
    const User_ID = req.body.User_ID;
    const UserName = req.body.UserName;
    const UserPhoneNumber = req.body.UserPhoneNumber;
    const Created_On = moment().tz('Asia/Kolkata').format("DD-MM-YYYY hh:mm A");
    //files (Optional)

    try {
        if (Weight > '5Kg' || Weight > '5kg') {
            if (TypeOfCake === undefined || EggOrEggless === undefined || Flavour === undefined || User_ID === undefined ||
                Shape === undefined || Weight === undefined || DeliveryAddress === undefined || DeliveryDate === undefined ||
                DeliverySession === undefined || DeliveryInformation === undefined || UserID === undefined ||
                UserName === undefined || UserPhoneNumber === undefined) {
                res.send({ statusCode: 400, message: "*required" });
            } else {
                if (req.files === undefined) {
                    const CustomizeCake = new CustomizeCakeModel({
                        TypeOfCake: TypeOfCake,
                        EggOrEggless: EggOrEggless,
                        Flavour: Flavour,
                        Shape: Shape,
                        Weight: Weight,
                        Article: Article,
                        MessageOnTheCake: MessageOnTheCake,
                        SpecialRequest: SpecialRequest,
                        DeliveryAddress: DeliveryAddress,
                        DeliveryDate: DeliveryDate,
                        DeliverySession: DeliverySession,
                        DeliveryInformation: DeliveryInformation,
                        Above5KG: 'y',
                        UserID: UserID,
                        User_ID: User_ID,
                        UserName: UserName,
                        UserPhoneNumber: UserPhoneNumber,
                        Created_On: Created_On
                    });

                    CustomizeCake.save(function (err, result) {
                        if (err) {
                            res.send({ statusCode: 400, message: "Failed" });
                        } else {
                            res.send({ statusCode: 200, message: "Added Successfully" });
                        }
                    });
                } else {
                    var imageUrlList = [];
                    for (let i = 0; i < req.files.length; i++) {
                        var result = await cloudinary.uploader.upload(req.files[i].path, { width: 640, height: 426, crop: "scale", format: 'webp' });
                        imageUrlList.push(result.url);
                    };

                    const CustomizeCake = new CustomizeCakeModel({
                        TypeOfCake: TypeOfCake,
                        Images: imageUrlList,
                        EggOrEggless: EggOrEggless,
                        Flavour: Flavour,
                        Shape: Shape,
                        Weight: Weight,
                        Article: Article,
                        MessageOnTheCake: MessageOnTheCake,
                        SpecialRequest: SpecialRequest,
                        DeliveryAddress: DeliveryAddress,
                        DeliveryDate: DeliveryDate,
                        DeliverySession: DeliverySession,
                        DeliveryInformation: DeliveryInformation,
                        Above5KG: 'y',
                        UserID: UserID,
                        User_ID: User_ID,
                        UserName: UserName,
                        UserPhoneNumber: UserPhoneNumber,
                        Created_On: Created_On
                    });

                    CustomizeCake.save(function (err, result) {
                        if (err) {
                            res.send({ statusCode: 400, message: "Failed" });
                        } else {
                            res.send({ statusCode: 200, message: "Added Successfully" });
                        }
                    });
                }
            }
        } else {
            if (TypeOfCake === undefined || EggOrEggless === undefined || Flavour === undefined || Vendor_ID === undefined ||
                Shape === undefined || Weight === undefined || DeliveryAddress === undefined || DeliveryDate === undefined ||
                DeliverySession === undefined || DeliveryInformation === undefined || VendorID === undefined || User_ID === undefined ||
                VendorName === undefined || VendorPhoneNumber === undefined || VendorAddress === undefined || UserID === undefined ||
                UserName === undefined || UserPhoneNumber === undefined) {
                res.send({ statusCode: 400, message: "*required" });
            } else {
                if (req.files === undefined) {
                    const CustomizeCake = new CustomizeCakeModel({
                        TypeOfCake: TypeOfCake,
                        EggOrEggless: EggOrEggless,
                        Flavour: Flavour,
                        Shape: Shape,
                        Weight: Weight,
                        Article: Article,
                        MessageOnTheCake: MessageOnTheCake,
                        SpecialRequest: SpecialRequest,
                        DeliveryAddress: DeliveryAddress,
                        DeliveryDate: DeliveryDate,
                        DeliverySession: DeliverySession,
                        DeliveryInformation: DeliveryInformation,
                        VendorID: VendorID,
                        Vendor_ID: Vendor_ID,
                        VendorName: VendorName,
                        VendorPhoneNumber: VendorPhoneNumber,
                        VendorAddress: VendorAddress,
                        UserID: UserID,
                        User_ID: User_ID,
                        UserName: UserName,
                        UserPhoneNumber: UserPhoneNumber,
                        Created_On: Created_On
                    });

                    CustomizeCake.save(function (err, result) {
                        if (err) {
                            res.send({ statusCode: 400, message: "Failed" });
                        } else {
                            res.send({ statusCode: 200, message: "Added Successfully" });
                        }
                    });
                } else {
                    var imageUrlList = [];
                    for (let i = 0; i < req.files.length; i++) {
                        var result = await cloudinary.uploader.upload(req.files[i].path, { width: 640, height: 426, crop: "scale", format: 'webp' });
                        imageUrlList.push(result.url);
                    };

                    const CustomizeCake = new CustomizeCakeModel({
                        TypeOfCake: TypeOfCake,
                        Images: imageUrlList,
                        EggOrEggless: EggOrEggless,
                        Flavour: Flavour,
                        Shape: Shape,
                        Weight: Weight,
                        Article: Article,
                        MessageOnTheCake: MessageOnTheCake,
                        SpecialRequest: SpecialRequest,
                        DeliveryAddress: DeliveryAddress,
                        DeliveryDate: DeliveryDate,
                        DeliverySession: DeliverySession,
                        DeliveryInformation: DeliveryInformation,
                        VendorID: VendorID,
                        Vendor_ID: Vendor_ID,
                        VendorName: VendorName,
                        VendorPhoneNumber: VendorPhoneNumber,
                        VendorAddress: VendorAddress,
                        UserID: UserID,
                        User_ID: User_ID,
                        UserName: UserName,
                        UserPhoneNumber: UserPhoneNumber,
                        Created_On: Created_On
                    });

                    CustomizeCake.save(function (err, result) {
                        if (err) {
                            res.send({ statusCode: 400, message: "Failed" });
                        } else {
                            res.send({ statusCode: 200, message: "Added Successfully" });
                        }
                    });
                }
            }
        }
    } catch (err) {
        return err;
    };

};

const AssignCustomizecake = (req, res) => {
    const Id = req.params.id;
    const VendorID =req.body.VendorID;
    const Vendor_ID =req.body.Vendor_ID;
    const VendorName =req.body.VendorName;
    const VendorPhoneNumber =req.body.VendorPhoneNumber;
    const VendorAddress =req.body.VendorAddress;
    const Status = req.body.Status;
    const Status_Updated_By = req.body.Status_Updated_By;
    const Status_Updated_On = moment().tz('Asia/Kolkata').format("DD-MM-YYYY hh:mm A");

    try {
        if(!VendorID || !Vendor_ID || !VendorName || !VendorPhoneNumber || !VendorAddress || !Status || !Status_Updated_By){
            res.send({ statusCode : 400, message : '*required' });
        }else{
            CustomizeCakeModel.findOneAndUpdate({_id : Id},{
                $set : {
                    VendorID : VendorID,
                    Vendor_ID : Vendor_ID,
                    VendorName : VendorName,
                    VendorPhoneNumber : VendorPhoneNumber,
                    VendorAddress : VendorAddress,
                    Status : Status,
                    Status_Updated_By : Status_Updated_By,
                    Status_Updated_On : Status_Updated_On
                }
            }, function(err, result){
                if(err) { 
                    res.send({ statusCode : 400, message : 'Failed'});
                }else{
                    res.send({ statusCode : 200, message : 'Assigned successfully'});
                }
            });
        }
    }catch(err) {
        res.send({ statusCode : 400, message : 'Failed'});
    }
};

module.exports = {
    AddNewCustomizeCake,
    GetCustomizeCakeList,
    GetAbove5kgCustomizeCakeList,
    GetCustomizeCakeListByVendorId,
    GetCustomizeCakeListByUserId,
    GetNewCustomizeCakeListByVendorId,
    AssignCustomizecake
}