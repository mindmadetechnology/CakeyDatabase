const CustomizeCakeModel = require('../models/CustomizeCakeModels');
const moment = require('moment-timezone');
const cloudinary = require("../middleware/cloudnary");

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
    const VendorName = req.body.VendorName;
    const VendorPhoneNumber = req.body.VendorPhoneNumber;
    const VendorAddress = req.body.VendorAddress;
    const UserID = req.body.UserID;
    const UserName = req.body.UserName;
    const UserPhoneNumber = req.body.UserPhoneNumber;
    const Created_On = moment().tz('Asia/Kolkata').format("DD-MM-YYYY hh:mm A");
    //files (Optional)

    try {
        if (Weight > '5Kg' || Weight > '5kg') {
            if (TypeOfCake === undefined || EggOrEggless === undefined || Flavour === undefined ||
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
                        Above5KG : 'y',
                        UserID: UserID,
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
                        Above5KG : 'y',
                        UserID: UserID,
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
            if (TypeOfCake === undefined || EggOrEggless === undefined || Flavour === undefined ||
                Shape === undefined || Weight === undefined || DeliveryAddress === undefined || DeliveryDate === undefined ||
                DeliverySession === undefined || DeliveryInformation === undefined || VendorID === undefined ||
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
                        VendorName: VendorName,
                        VendorPhoneNumber: VendorPhoneNumber,
                        VendorAddress: VendorAddress,
                        UserID: UserID,
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
                        VendorName: VendorName,
                        VendorPhoneNumber: VendorPhoneNumber,
                        VendorAddress: VendorAddress,
                        UserID: UserID,
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

module.exports = {
    AddNewCustomizeCake
}