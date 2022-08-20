const OtherProductModel = require('../models/OtherProductsModels');
const AdminNotificationModel = require("../models/AdminNotificationModels");
const VendorNotificationModel = require('../models/VendorNotification');
const moment = require('moment-timezone');
const cloudinary = require("../middleware/cloudnary");

const CreateOtherProduct = async (req, res) => {
    const CakeSubType = req.body.CakeSubType;
    const ProductName = req.body.ProductName;
    const ProductCommonName = req.body.ProductCommonName;
    const Flavour = req.body.Flavour; //multiple
    const Shape = req.body.Shape;
    const Type = req.body.Type; //Kg, Unit, Box
    const MinWeightPerKg = req.body.MinWeightPerKg; //object -> Weight, PricePerKg
    const MinWeightPerUnit  = req.body.MinWeightPerUnit; //array -> Weight, MinCount, PricePerUnit
    const MinWeightPerBox = req.body.MinWeightPerBox; // array -> Weight, MinCount, PricePerUnit
    const EggOrEggless = req.body.EggOrEggless;
    const ToppersPossible = req.body.ToppersPossible;
    const MinTimeForDelivery = req.body.MinTimeForDelivery;
    const CakeBase = req.body.CakeBase;
    const BestUsedBefore = req.body.BestUsedBefore;
    const ToBeStoredIn = req.body.ToBeStoredIn;
    const KeepTheCakeInRoomTemperature = req.body.KeepTheCakeInRoomTemperature;
    const Description = req.body.Description;
    const HowGoodAreYouWithTheCake = req.body.HowGoodAreYouWithTheCake;
    const HowManyTimesHaveYouBakedThisParticularCake = req.body.HowManyTimesHaveYouBakedThisParticularCake;
    const VendorID = req.body.VendorID;
    const Vendor_ID = req.body.Vendor_ID;
    const VendorName = req.body.VendorName;
    const VendorPhoneNumber1 = req.body.VendorPhoneNumber1;
    const VendorPhoneNumber2 = req.body.VendorPhoneNumber2;
    const VendorAddress = req.body.VendorAddress;
    const GoogleLocation = req.body.GoogleLocation; //object
    const Discount = req.body.Discount;
    const Created_On = moment().tz('Asia/Kolkata').format("DD-MM-YYYY hh:mm A");
    //ProductImage - array

    try{
        if(CakeSubType || ProductName || ProductCommonName || Flavour || Type || MinTimeForDelivery || Description || 
            HowGoodAreYouWithTheCake ||  HowManyTimesHaveYouBakedThisParticularCake || VendorID || Vendor_ID || VendorName || 
            VendorPhoneNumber1 || VendorAddress || GoogleLocation ||  Discount || req.files['ProductImage'] !== undefined){
                let FinalMinWeightPerKg, FinalMinWeightPerUnit=[], FinalMinWeightPerBox=[], FinalProductImage=[];
                const FinalFlavour= JSON.parse(Flavour);
                const FinalGoogleLocation = JSON.parse(GoogleLocation);
                if(Type === 'Kg'){
                    FinalMinWeightPerKg = JSON.parse(MinWeightPerKg);
                }else if(Type === 'Unit'){
                    FinalMinWeightPerUnit= JSON.parse(MinWeightPerUnit);
                }else if(Type === 'Box'){
                    FinalMinWeightPerBox = JSON.parse(MinWeightPerBox);
                };
                for(let i=0; i<req.files['ProductImage'].length; i++){
                    var result = await cloudinary.uploader.upload(req.files['ProductImage'][i].path, { width: 640, height: 426, crop: "scale", format: 'webp' });
                    FinalProductImage.push(result.url);
                };
                const NewOtherProduct = OtherProductModel({
                    CakeSubType: CakeSubType,
                    ProductName: ProductName,
                    ProductCommonName: ProductCommonName,
                    Flavour: FinalFlavour,
                    Shape: Shape,
                    Type: Type,
                    MinWeightPerKg: FinalMinWeightPerKg,
                    MinWeightPerUnit: FinalMinWeightPerUnit,
                    MinWeightPerBox: FinalMinWeightPerBox,
                    EggOrEggless: EggOrEggless,
                    ToppersPossible: ToppersPossible,
                    MinTimeForDelivery: MinTimeForDelivery,
                    CakeBase: CakeBase,
                    BestUsedBefore: BestUsedBefore,
                    ToBeStoredIn: ToBeStoredIn,
                    KeepTheCakeInRoomTemperature: KeepTheCakeInRoomTemperature,
                    Description: Description,
                    HowGoodAreYouWithTheCake: HowGoodAreYouWithTheCake,
                    HowManyTimesHaveYouBakedThisParticularCake: HowManyTimesHaveYouBakedThisParticularCake,
                    VendorID: VendorID,
                    Vendor_ID: Vendor_ID,
                    VendorName: VendorName,
                    VendorPhoneNumber1: VendorPhoneNumber1,
                    VendorPhoneNumber2: VendorPhoneNumber2,
                    GoogleLocation: FinalGoogleLocation,
                    Discount: Discount,
                    ProductImage: FinalProductImage,
                    Created_On: Created_On,
                });
                NewOtherProduct.save(function(err, result){
                    if(err){
                        res.send({ statusCode: 400, message: 'Failed1' });
                    }else{
                        const AddNotification = AdminNotificationModel({
                            NotificationType: 'New Other Product',
                            Image: result.ProductImage[0],
                            VendorID: result.VendorID,
                            Vendor_ID: result.Vendor_ID,
                            VendorName: result.VendorName,
                            Id: result._id,
                            Created_On: result.Created_On
                        });
                        AddNotification.save(function (err) {
                            if (err) {
                                res.send({ statusCode: 400, message: "Failed" });
                            } else {
                                res.send({ statusCode: 200, message: "Added Successfully" });
                            }
                        });
                    };
                });
            }else{
                res.send({ statusCode:400, message: 'required'})
            }
    }catch(err){
        res.send({ statusCode: 400, message: 'Failed' });
    };
};

const ApproveOtherProduct = (req, res) => {

};

const UpdateOtherProduct = (req, res) => {

};

const DeleteOtherProduct = (req, res) => {

};

const OtherProductSendInformation = (req, res) => {

};

const GetAllOtherProductsList = (req, res) => {

};

const GetVendorsOtherProductsList = (req, res) => {

};

const GetApprovedOtherProductsList = (req, res) => {

};

module.exports = {
    CreateOtherProduct,
};

