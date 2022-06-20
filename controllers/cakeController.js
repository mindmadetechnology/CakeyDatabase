const cakeModel = require("../models/CakeModels");
const moment = require('moment-timezone');
const cloudinary = require("../middleware/cloudnary");

// get cake list
const getcakelist = (req, res) => {

    try {
        cakeModel.find({ IsDeleted: 'n', Status: 'Approved' }, function (err, result) {
            if (err) {
                res.send({ statusCode: 400, message: "Failed" });
            } else {
                if (result.length === 0) {
                    res.send({ message: "No Records Found" });
                } else {
                    res.send(result);
                }
            }
        });
    } catch (err) {
        res.send({ statusCode: 400, message: 'Failed' });
    };
};

//get cake list based on status
const getCakeListByStatus = (req, res) => {

    const Status = req.params.status;
    try {
        cakeModel.find({ Status: Status }, function (err, result) {
            if (err) {
                res.send({ statusCode: 400, message: "Failed" });
            } else {
                if (result.length === 0) {
                    res.send({ message: "No Records Found" });
                } else {
                    res.send(result);
                }
            }
        });
    } catch (err) {
        res.send({ statusCode: 400, message: 'Failed' });
    };
};

// get cake list based on vendoename
const getcakelistByVendorName = (req, res) => {

    const VendorName = req.params.VendorName;
    try {
        cakeModel.find({ VendorName: VendorName, IsDeleted: 'n' }, function (err, result) {
            if (err) {
                res.send({ statusCode: 400, message: "Failed" });
            } else {
                if (result.length === 0) {
                    res.send({ message: "No Records Found" });
                } else {
                    res.send(result);
                }
            }
        });
    } catch (err) {
        res.send({ statusCode: 400, message: 'Failed' });
    };
};

//get cakes list by vendor id
const getcakelistByVendorId = (req, res) => {

    const VendorId = req.params.VendorId;
    try {
        cakeModel.find({ VendorID: VendorId, IsDeleted: 'n' }, function (err, result) {
            if (err) {
                res.send({ statusCode: 400, message: "Failed" });
            } else {
                if (result.length === 0) {
                    res.send({ message: "No Records Found" });
                } else {
                    res.send(result);
                }
            }
        });
    } catch (err) {
        res.send({ statusCode: 400, message: 'Failed' });
    };
};

// get single cake's detail using id
const getCakeDetails = (req, res) => {

    const id = req.params.id;
    try {
        cakeModel.findById({ _id: id }, function (err, result) {
            if (err) {
                res.send({ statusCode: 400, message: "Failed" });
            } else {
                res.send(result);
            }
        });
    } catch (err) {
        res.send({ statusCode: 400, message: "Failed" });
    };
};

//Add new cake
const addCake = async (req, res) => {

    const CakeName = req.body.CakeName;
    const CakeCommonName = req.body.CakeCommonName;
    const BasicFlavour = req.body.BasicFlavour;
    const BasicShape = req.body.BasicShape;
    const MinWeight = req.body.MinWeight;
    const DefaultCakeEggOrEggless = req.body.DefaultCakeEggOrEggless;
    const IsEgglessOptionAvailable = req.body.IsEgglessOptionAvailable;
    const BasicEgglessCostPerKg = req.body.BasicEgglessCostPerKg; //optional
    const CustomFlavourList = req.body.CustomFlavourList;
    const CustomShapeList = req.body.CustomShapeList;
    const MinWeightList = req.body.MinWeightList;
    const IsTierCakePossible = req.body.IsTierCakePossible;
    const TierCakeMinWeightAndPrice = req.body.TierCakeMinWeightAndPrice; //optional
    const ThemeCakePossible = req.body.ThemeCakePossible;
    const ToppersPossible = req.body.ToppersPossible;
    const MinTimeForDeliveryOfDefaultCake = req.body.MinTimeForDeliveryOfDefaultCake;
    const MinTimeForDeliveryOfA3KgCake = req.body.MinTimeForDeliveryOfA3KgCake; //optional
    const MinTimeForDeliveryOfA5KgCake = req.body.MinTimeForDeliveryOfA5KgCake; //optional
    const MinTimeForDeliveryFortierCake = req.body.MinTimeForDeliveryFortierCake; //optional
    const BasicCustomisationPossible = req.body.BasicCustomisationPossible;
    const FullCustomisationPossible = req.body.FullCustomisationPossible;
    const CakeBase = req.body.CakeBase;
    const CakeCream = req.body.CakeCream;
    const BestUsedBefore = req.body.BestUsedBefore;
    const ToBeStoredIn = req.body.ToBeStoredIn;
    const KeepTheCakeInRoomTemperature = req.body.KeepTheCakeInRoomTemperature;
    const OtherInstructions = req.body.OtherInstructions; //optional
    const Description = req.body.Description;
    const HowGoodAreYouWithTheCake = req.body.HowGoodAreYouWithTheCake;
    const HowManyTimesHaveYouBakedThisParticularCake = req.body.HowManyTimesHaveYouBakedThisParticularCake;
    const VendorID = req.body.VendorID;
    const Vendor_ID = req.body.Vendor_ID;
    const VendorName = req.body.VendorName;
    const VendorPhoneNumber1 = req.body.VendorPhoneNumber1;
    const VendorPhoneNumber2 = req.body.VendorPhoneNumber2;
    const Street = req.body.Street;
    const City = req.body.City;
    const State = req.body.State;
    const Pincode = req.body.Pincode;
    const Discount = req.body.Discount;
    const Tax = req.body.Tax;
    // const Stock = req.body.Stock;
    const Created_On = moment().tz('Asia/Kolkata').format("DD-MM-YYYY hh:mm A");
    //MainCakeImage
    //AdditionalCakeImages
    //SampleImages
    try {
        if (!CakeName || !CakeCommonName || !BasicFlavour || !BasicShape || !MinWeight || !DefaultCakeEggOrEggless ||
            !IsEgglessOptionAvailable || !CustomFlavourList || !CustomShapeList || !MinWeightList || !IsTierCakePossible ||
            !ThemeCakePossible || !ToppersPossible || !MinTimeForDeliveryOfDefaultCake || !BasicCustomisationPossible ||
            !FullCustomisationPossible || !CakeBase || !CakeCream || !BestUsedBefore || !ToBeStoredIn ||
            !KeepTheCakeInRoomTemperature || !Description || !HowGoodAreYouWithTheCake || !Tax || !Discount ||
            !HowManyTimesHaveYouBakedThisParticularCake || !VendorID || !Vendor_ID || !VendorName ||
            !VendorPhoneNumber1 || !VendorPhoneNumber2 || !Street || !City || !State || !Pincode) {
            res.send({ statusCode: 400, message: "*required" });
        } else {
            var SampleImages = [];
            var FinalAdditionalCakeImages = [];
            var FinalTierCakeMinWeightAndPrice, FinalMinTimeForDeliveryFortierCake, MainCakeImage;
            const FinalBasicFlavour = JSON.parse(BasicFlavour);
            const FinalBasicShape = JSON.parse(BasicShape);
            const FinalMinWeight = JSON.parse(MinWeight);
            const FinalCustomFlavourList = (JSON.parse(CustomFlavourList));
            const FinalMinWeightList = JSON.parse(MinWeightList);
            const FinalCustomShapeList = (JSON.parse(CustomShapeList));
            if (req.files['SampleImages'] !== undefined) {
                for (let i = 0; i < req.files['SampleImages'].length; i++) {
                    var result = await cloudinary.uploader.upload(req.files['SampleImages'][i].path, { width: 640, height: 426, crop: "scale", format: 'webp' });
                    SampleImages.push(result.url);
                }
            };
            if (TierCakeMinWeightAndPrice !== undefined) {
                FinalTierCakeMinWeightAndPrice = JSON.parse(TierCakeMinWeightAndPrice);
            } else {
                FinalTierCakeMinWeightAndPrice = [];
            };
            if (MinTimeForDeliveryFortierCake !== undefined) {
                FinalMinTimeForDeliveryFortierCake = JSON.parse(MinTimeForDeliveryFortierCake);
            } else {
                FinalMinTimeForDeliveryFortierCake = [];
            };
            if (req.files['MainCakeImage'] !== undefined) {
                var result = await cloudinary.uploader.upload(req.files['MainCakeImage'][0].path, { width: 640, height: 426, crop: "scale", format: 'webp' });
                MainCakeImage = result.url;
            };
            if (req.files['AdditionalCakeImages'] !== undefined) {
                for (let i = 0; i < req.files['AdditionalCakeImages'].length; i++) {
                    var result = await cloudinary.uploader.upload(req.files['AdditionalCakeImages'][i].path, { width: 640, height: 426, crop: "scale", format: 'webp' });
                    FinalAdditionalCakeImages.push(result.url);
                }
            } else {
                FinalAdditionalCakeImages = [];
            };
            const vendorValidate = new cakeModel({
                CakeName: CakeName,
                CakeCommonName: CakeCommonName,
                BasicFlavour: FinalBasicFlavour,
                BasicShape: FinalBasicShape,
                MinWeight: FinalMinWeight,
                DefaultCakeEggOrEggless: DefaultCakeEggOrEggless,
                IsEgglessOptionAvailable: IsEgglessOptionAvailable,
                BasicEgglessCostPerKg: BasicEgglessCostPerKg,
                CustomFlavourList: FinalCustomFlavourList,
                CustomShapeList: {
                    Info: FinalCustomShapeList,
                    SampleImages: SampleImages
                },
                MinWeightList: FinalMinWeightList,
                IsTierCakePossible: IsTierCakePossible,
                TierCakeMinWeightAndPrice: FinalTierCakeMinWeightAndPrice, //optional
                ThemeCakePossible: ThemeCakePossible,
                ToppersPossible: ToppersPossible,
                MinTimeForDeliveryOfDefaultCake: MinTimeForDeliveryOfDefaultCake,
                MinTimeForDeliveryOfA3KgCake: MinTimeForDeliveryOfA3KgCake, //optional
                MinTimeForDeliveryOfA5KgCake: MinTimeForDeliveryOfA5KgCake, //optional
                MinTimeForDeliveryFortierCake: FinalMinTimeForDeliveryFortierCake, //optional
                BasicCustomisationPossible: BasicCustomisationPossible,
                FullCustomisationPossible: FullCustomisationPossible,
                CakeBase: CakeBase,
                CakeCream: CakeCream,
                BestUsedBefore: BestUsedBefore,
                ToBeStoredIn: ToBeStoredIn,
                KeepTheCakeInRoomTemperature: KeepTheCakeInRoomTemperature,
                OtherInstructions: OtherInstructions, //optional
                Description: Description,
                HowGoodAreYouWithTheCake: HowGoodAreYouWithTheCake,
                HowManyTimesHaveYouBakedThisParticularCake: HowManyTimesHaveYouBakedThisParticularCake,
                VendorID: VendorID,
                Vendor_ID: Vendor_ID,
                VendorName: VendorName,
                VendorPhoneNumber1: VendorPhoneNumber1,
                VendorPhoneNumber2: VendorPhoneNumber2,
                VendorAddress: {
                    Street: Street,
                    City: City,
                    State: State,
                    Pincode: Pincode,
                },
                Discount: Discount,
                Tax: Tax,
                MainCakeImage: MainCakeImage,
                AdditionalCakeImages: FinalAdditionalCakeImages,
                Created_On: Created_On,
            });
            vendorValidate.save(function (err, result) {
                if (err) {
                    res.send({ statusCode: 400, message: "Failed", error: err });
                } else {
                    res.send({ statusCode: 200, message: "Added Successfully" });
                }
            });
        };
    } catch (err) {
        return err;
    };
};

//cake approval
const ApproveCake = (req, res) => {

    const Id = req.params.id;
    const Status = req.body.Status;
    const Status_Updated_On = moment().tz('Asia/Kolkata').format("DD-MM-YYYY hh:mm A");
    try {
        cakeModel.findOneAndUpdate({ _id: Id }, {
            $set: {
                Status: Status,
                Status_Updated_On: Status_Updated_On
            }
        }, function (err, result) {
            if (err) {
                res.send({ statusCode: 400, message: "Failed" });
            } else {
                res.send({ statusCode: 200, message: "Updated Successfully" });
            }
        });
    } catch (err) {
        res.send({ statusCode: 400, message: "Failed" });
    };
};

//Update cake's details
const updateCake = (req, res) => {

    const id = req.params.id;
    const Title = req.body.Title;
    const Category = req.body.Category;
    const SubCategory = req.body.SubCategory;
    const Description = req.body.Description;
    const TypeOfCake = req.body.TypeOfCake;
    const Images = req.body.Images;
    const EggOrEggless = req.body.EggOrEggless;
    const Price = req.body.Price;
    const Discount = req.body.Discount;
    const FlavourList = req.body.FlavourList;
    const ShapeList = req.body.ShapeList;
    const ArticleList = req.body.ArticleList;
    const WeightList = req.body.WeightList;
    const Stock = req.body.Stock;
    const Tax = req.body.Tax;
    const Modified_On = moment().tz('Asia/Kolkata').format("DD-MM-YYYY hh:mm A");
    try {
        cakeModel.findById({ _id: id }, async function (err, result) {
            if (err) {
                res.send({ statusCode: 400, message: "Failed" });
            } else if (result === null) {
                res.send({ statusCode: 400, message: "Failed" });
            } else {
                if (Images === null || Images === undefined || Images === []) {
                    var imageUrlList = [];
                } else {
                    var imageUrlList = Images;
                }
                if (req.files !== undefined || req.files !== null) {
                    if (Array.isArray(Images) === false && Images !== undefined) {
                        var imageUrlList = [Images]
                    } else if (Array.isArray(Images) === false && Images === undefined) {
                        var imageUrlList = [];
                    };
                    for (let i = 0; i < req.files.length; i++) {
                        await cloudinary.uploader.upload(req.files[i].path, { width: 640, height: 426, crop: "scale", format: 'webp' }, function (err, result) {
                            imageUrlList.push(result.url);
                        });
                    };
                }
                const NewFlavourList = JSON.parse(FlavourList);
                const NewArticleList = JSON.parse(ArticleList);
                cakeModel.findOneAndUpdate({ _id: id }, {
                    $set: {
                        Title: Title,
                        Description: Description,
                        TypeOfCake: TypeOfCake,
                        Images: imageUrlList,
                        EggOrEggless: EggOrEggless,
                        Price: Price,
                        Discount: Discount,
                        Category: Category,
                        SubCategory: SubCategory,
                        FlavourList: NewFlavourList,
                        ShapeList: ShapeList,
                        ArticleList: NewArticleList,
                        WeightList: WeightList,
                        Stock: Stock,
                        Tax: Tax,
                        Modified_On: Modified_On,
                    }
                }, function (err, result) {
                    if (err) {
                        res.send({ statusCode: 400, message: "Failed" });
                    } else {
                        res.send({ statusCode: 200, message: "Updated Successfully" });
                    }
                });
            }
        });
    } catch (err) {
        res.send({ statusCode: 400, message: "Failed5" });
    };
};

//delete cake
const deleteCake = (req, res) => {

    const id = req.params.id;
    const IsDeleted = 'y';
    const Modified_On = moment().tz('Asia/Kolkata').format("DD-MM-YYYY hh:mm A");
    try {
        cakeModel.findOneAndUpdate({ _id: id }, {
            $set: {
                IsDeleted: IsDeleted,
                Modified_On: Modified_On
            }
        }, function (err, result) {
            if (err) {
                res.send({ statusCode: 400, message: "Failed" });
            } else {
                res.send({ statusCode: 200, message: "Deleted Successfully" });
            }
        });
    } catch (err) {
        res.send({ statusCode: 400, message: "Failed" });
    };
};

module.exports = {

    addCake,
    updateCake,
    deleteCake,
    getcakelist,
    getCakeDetails,
    getcakelistByVendorName,
    getcakelistByVendorId,
    getCakeListByStatus,
    ApproveCake

};