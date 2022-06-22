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
    const BasicCakePrice = req.body.BasicCakePrice;
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
            !IsEgglessOptionAvailable || !IsTierCakePossible || !ThemeCakePossible || !ToppersPossible || !MinTimeForDeliveryOfDefaultCake || 
            !BasicCustomisationPossible || !FullCustomisationPossible || !CakeBase || !CakeCream || !BestUsedBefore || !ToBeStoredIn ||
            !KeepTheCakeInRoomTemperature || !Description || !HowGoodAreYouWithTheCake || !Tax || !Discount ||
            !HowManyTimesHaveYouBakedThisParticularCake || !VendorID || !Vendor_ID || !VendorName || !BasicCakePrice ||
            !VendorPhoneNumber1 || !VendorPhoneNumber2 || !Street || !City || !State || !Pincode) {
            res.send({ statusCode: 400, message: "*required" });
        } else {
            var SampleImages = [], FinalAdditionalCakeImages = [];
            var FinalCustomFlavourList, FinalMinWeightList, FinalCustomShapeList;
            var FinalTierCakeMinWeightAndPrice, FinalMinTimeForDeliveryFortierCake, MainCakeImage;
            // const FinalBasicFlavour = JSON.parse(BasicFlavour);
            // const FinalBasicShape = JSON.parse(BasicShape);
            // const FinalMinWeight = JSON.parse(MinWeight);
            if(CustomFlavourList !== undefined){
                FinalCustomFlavourList = (JSON.parse(CustomFlavourList));
            };
            if(MinWeightList !== undefined){
                FinalMinWeightList = JSON.parse(MinWeightList);
            };
            if(CustomShapeList !== undefined){
                FinalCustomShapeList = (JSON.parse(CustomShapeList));
            }
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
                BasicFlavour: BasicFlavour,
                BasicShape: BasicShape,
                MinWeight: MinWeight,
                BasicCakePrice: BasicCakePrice,
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
    const ToppersPossible = req.body.ToppersPossible;
    const RatingsForVendor = req.body.RatingsForVendor;
    const CakeType = req.body.CakeType;
    const CakeSubType = req.body.CakeSubType;
    const CakeCategory = req.body.CakeCategory;
    const Status_Updated_On = moment().tz('Asia/Kolkata').format("DD-MM-YYYY hh:mm A");
    try {
        cakeModel.findOneAndUpdate({ _id: Id }, {
            $set: {
                Status: Status,
                ToppersPossible: ToppersPossible,
                RatingsForVendor: RatingsForVendor,
                CakeType: CakeType,
                CakeSubType: CakeSubType,
                CakeCategory: CakeCategory,
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
const updateCake = async (req, res) => {
    
    const id = req.params.id;
    // const BasicFlavour = req.body.BasicFlavour;
    // const BasicShape = req.body.BasicShape;
    // const MinWeight = req.body.MinWeight;
    const CustomFlavourList = req.body.CustomFlavourList;
    const CustomShapeList = req.body.CustomShapeList;
    const MinWeightList = req.body.MinWeightList;
    const BasicCakePrice = req.body.BasicCakePrice;
    const BasicCustomisationPossible = req.body.BasicCustomisationPossible;
    const MinTimeForDeliveryOfA3KgCake = req.body.MinTimeForDeliveryOfA3KgCake; //optional
    const MinTimeForDeliveryOfA5KgCake = req.body.MinTimeForDeliveryOfA5KgCake; //optional
    const VendorID = req.body.VendorID;
    const Vendor_ID = req.body.Vendor_ID;
    const VendorName = req.body.VendorName;
    const VendorPhoneNumber1 = req.body.VendorPhoneNumber1;
    const VendorPhoneNumber2 = req.body.VendorPhoneNumber2;
    const Street = req.body.Street;
    const City = req.body.City;
    const State = req.body.State;
    const Pincode = req.body.Pincode;
    const Stock = req.body.Stock;
    const Modified_On = moment().tz('Asia/Kolkata').format("DD-MM-YYYY hh:mm A");
    const OldSampleImages = req.body.OldSampleImages;
    //SampleImages

    try {
        var FinalSampleImages = [], FinalCustomFlavourList = [], FinalMinWeightList = [], FinalCustomShapeList = [];

        // const FinalBasicFlavour = JSON.parse(BasicFlavour);
        // const FinalBasicShape = JSON.parse(BasicShape);
        // const FinalMinWeight = JSON.parse(MinWeight);
        if(CustomFlavourList.length > 0 || CustomFlavourList !== undefined){
            FinalCustomFlavourList = (JSON.parse(CustomFlavourList));
        };
        if(MinWeightList.length > 0 || MinWeightList !== undefined){
            FinalMinWeightList = JSON.parse(MinWeightList);
        };
        if(CustomShapeList.length > 0 || CustomShapeList !== undefined){
            FinalCustomShapeList = (JSON.parse(CustomShapeList));
        };
        
        //for sample shape images
        if (OldSampleImages === undefined || OldSampleImages === [] || OldSampleImages === null) {
            FinalSampleImages = [];
        } else {
            FinalSampleImages = OldSampleImages;
        }
        if (req.files['SampleImages'] !== undefined) {
            if (Array.isArray(OldSampleImages) === false && OldSampleImages !== undefined) {
                var FinalSampleImages = [OldSampleImages]
            } else if (Array.isArray(OldSampleImages) === false && OldSampleImages === undefined) {
                var FinalSampleImages = [];
            };
            for (let i = 0; i < req.files['SampleImages'].length; i++) {
                var NewImages = await cloudinary.uploader.upload(req.files['SampleImages'][i].path);
                FinalSampleImages.push(NewImages.url);
            }
        };

        cakeModel.findById({ _id: id }, async function (err, result) {
            if (err) {
                res.send({ statusCode: 400, message: "Failed" });
            } else if (result === null) {
                res.send({ statusCode: 400, message: "Failed" });
            } else {
                cakeModel.findOneAndUpdate({ _id: id }, {
                    $set: {
                        // BasicFlavour: BasicFlavour,
                        // BasicShape: BasicShape,
                        // MinWeight: MinWeight,
                        CustomFlavourList: FinalCustomFlavourList,
                        CustomShapeList: {
                            Info: FinalCustomShapeList,
                            SampleImages: FinalSampleImages
                        },
                        MinWeightList: FinalMinWeightList,
                        BasicCakePrice: BasicCakePrice,
                        BasicCustomisationPossible: BasicCustomisationPossible,
                        MinTimeForDeliveryOfA3KgCake: MinTimeForDeliveryOfA3KgCake, //optional
                        MinTimeForDeliveryOfA5KgCake: MinTimeForDeliveryOfA5KgCake, //optional
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
                        Stock: Stock,
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
    // const id = req.params.id;
    // const CakeName = req.body.CakeName;
    // const CakeCommonName = req.body.CakeCommonName;
    // const BasicFlavour = req.body.BasicFlavour;
    // const BasicShape = req.body.BasicShape;
    // const MinWeight = req.body.MinWeight;
    // const DefaultCakeEggOrEggless = req.body.DefaultCakeEggOrEggless;
    // const IsEgglessOptionAvailable = req.body.IsEgglessOptionAvailable;
    // const BasicEgglessCostPerKg = req.body.BasicEgglessCostPerKg; //optional
    // const CustomFlavourList = req.body.CustomFlavourList;
    // const CustomShapeList = req.body.CustomShapeList;
    // const MinWeightList = req.body.MinWeightList;
    // const IsTierCakePossible = req.body.IsTierCakePossible;
    // const TierCakeMinWeightAndPrice = req.body.TierCakeMinWeightAndPrice; //optional
    // const ThemeCakePossible = req.body.ThemeCakePossible;
    // const ToppersPossible = req.body.ToppersPossible;
    // const MinTimeForDeliveryOfDefaultCake = req.body.MinTimeForDeliveryOfDefaultCake;
    // const MinTimeForDeliveryOfA3KgCake = req.body.MinTimeForDeliveryOfA3KgCake; //optional
    // const MinTimeForDeliveryOfA5KgCake = req.body.MinTimeForDeliveryOfA5KgCake; //optional
    // const MinTimeForDeliveryFortierCake = req.body.MinTimeForDeliveryFortierCake; //optional
    // const BasicCustomisationPossible = req.body.BasicCustomisationPossible;
    // const FullCustomisationPossible = req.body.FullCustomisationPossible;
    // const CakeBase = req.body.CakeBase;
    // const CakeCream = req.body.CakeCream;
    // const BestUsedBefore = req.body.BestUsedBefore;
    // const ToBeStoredIn = req.body.ToBeStoredIn;
    // const KeepTheCakeInRoomTemperature = req.body.KeepTheCakeInRoomTemperature;
    // const OtherInstructions = req.body.OtherInstructions; //optional
    // const Description = req.body.Description;
    // const HowGoodAreYouWithTheCake = req.body.HowGoodAreYouWithTheCake;
    // const HowManyTimesHaveYouBakedThisParticularCake = req.body.HowManyTimesHaveYouBakedThisParticularCake;
    // const VendorID = req.body.VendorID;
    // const Vendor_ID = req.body.Vendor_ID;
    // const VendorName = req.body.VendorName;
    // const VendorPhoneNumber1 = req.body.VendorPhoneNumber1;
    // const VendorPhoneNumber2 = req.body.VendorPhoneNumber2;
    // const Street = req.body.Street;
    // const City = req.body.City;
    // const State = req.body.State;
    // const Pincode = req.body.Pincode;
    // const Discount = req.body.Discount;
    // const Tax = req.body.Tax;
    // const Stock = req.body.Stock;
    // const Modified_On = moment().tz('Asia/Kolkata').format("DD-MM-YYYY hh:mm A");
    // const OldAdditionalCakeImages = req.body.OldAdditionalCakeImages;
    // const OldSampleImages = req.body.OldSampleImages;
    // //MainCakeImage
    // //AdditionalCakeImages
    // //SampleImages

    // try {
    //     var FinalMainCakeImage, FinalTierCakeMinWeightAndPrice, FinalMinTimeForDeliveryFortierCake;
    //     var FinalAdditionalCakeImages = [];
    //     var FinalSampleImages = [];

    //     const FinalBasicFlavour = JSON.parse(BasicFlavour);
    //     const FinalBasicShape = JSON.parse(BasicShape);
    //     const FinalMinWeight = JSON.parse(MinWeight);
    //     const FinalCustomFlavourList = (JSON.parse(CustomFlavourList));
    //     const FinalMinWeightList = JSON.parse(MinWeightList);
    //     const FinalCustomShapeList = (JSON.parse(CustomShapeList));

    //     if (TierCakeMinWeightAndPrice !== undefined) {
    //         FinalTierCakeMinWeightAndPrice = JSON.parse(TierCakeMinWeightAndPrice);
    //     } else {
    //         FinalTierCakeMinWeightAndPrice = [];
    //     };
    //     if (MinTimeForDeliveryFortierCake !== undefined) {
    //         FinalMinTimeForDeliveryFortierCake = JSON.parse(MinTimeForDeliveryFortierCake);
    //     } else {
    //         FinalMinTimeForDeliveryFortierCake = [];
    //     };

    //     //for main cake image
    //     if (req.files['MainCakeImage'] === undefined) {
    //         const MainCakeImagePromise = new Promise((resolve, reject) => {
    //             cakeModel.findOne({ _id: id }, function (err, result) {
    //                 if (err) {
    //                     reject(err);
    //                 } else {
    //                     resolve(result.MainCakeImage);
    //                 }
    //             })
    //         });
    //         FinalMainCakeImage = await MainCakeImagePromise;
    //     } else {
    //         var uploadedProfile = await cloudinary.uploader.upload(req.files['MainCakeImage'][0].path);
    //         FinalMainCakeImage = uploadedProfile.url
    //     };
    //     //for additional cake images
    //     if (OldAdditionalCakeImages === undefined || OldAdditionalCakeImages === [] || OldAdditionalCakeImages === null) {
    //         FinalAdditionalCakeImages = [];
    //     } else {
    //         FinalAdditionalCakeImages = OldAdditionalCakeImages;
    //     }
    //     if (req.files['AdditionalCakeImages'] !== undefined) {
    //         if (Array.isArray(OldAdditionalCakeImages) === false && OldAdditionalCakeImages !== undefined) {
    //             var FinalAdditionalCakeImages = [OldAdditionalCakeImages]
    //         } else if (Array.isArray(OldAdditionalCakeImages) === false && OldAdditionalCakeImages === undefined) {
    //             var FinalAdditionalCakeImages = [];
    //         };
    //         for (let i = 0; i < req.files['AdditionalCakeImages'].length; i++) {
    //             var NewImages = await cloudinary.uploader.upload(req.files['AdditionalCakeImages'][i].path);
    //             FinalAdditionalCakeImages.push(NewImages.url);
    //         }
    //     };
    //     //for sample shape images
    //     if (OldSampleImages === undefined || OldSampleImages === [] || OldSampleImages === null) {
    //         FinalSampleImages = [];
    //     } else {
    //         FinalSampleImages = OldSampleImages;
    //     }
    //     if (req.files['SampleImages'] !== undefined) {
    //         if (Array.isArray(OldSampleImages) === false && OldSampleImages !== undefined) {
    //             var FinalSampleImages = [OldSampleImages]
    //         } else if (Array.isArray(OldSampleImages) === false && OldSampleImages === undefined) {
    //             var FinalSampleImages = [];
    //         };
    //         for (let i = 0; i < req.files['SampleImages'].length; i++) {
    //             var NewImages = await cloudinary.uploader.upload(req.files['SampleImages'][i].path);
    //             FinalSampleImages.push(NewImages.url);
    //         }
    //     };

    //     cakeModel.findById({ _id: id }, async function (err, result) {
    //         if (err) {
    //             res.send({ statusCode: 400, message: "Failed" });
    //         } else if (result === null) {
    //             res.send({ statusCode: 400, message: "Failed" });
    //         } else {
    //             cakeModel.findOneAndUpdate({ _id: id }, {
    //                 $set: {
    //                     CakeName: CakeName,
    //                     CakeCommonName: CakeCommonName,
    //                     BasicFlavour: FinalBasicFlavour,
    //                     BasicShape: FinalBasicShape,
    //                     MinWeight: FinalMinWeight,
    //                     DefaultCakeEggOrEggless: DefaultCakeEggOrEggless,
    //                     IsEgglessOptionAvailable: IsEgglessOptionAvailable,
    //                     BasicEgglessCostPerKg: BasicEgglessCostPerKg,
    //                     CustomFlavourList: FinalCustomFlavourList,
    //                     CustomShapeList: {
    //                         Info: FinalCustomShapeList,
    //                         SampleImages: FinalSampleImages
    //                     },
    //                     MinWeightList: FinalMinWeightList,
    //                     IsTierCakePossible: IsTierCakePossible,
    //                     TierCakeMinWeightAndPrice: FinalTierCakeMinWeightAndPrice, //optional
    //                     ThemeCakePossible: ThemeCakePossible,
    //                     ToppersPossible: ToppersPossible,
    //                     MinTimeForDeliveryOfDefaultCake: MinTimeForDeliveryOfDefaultCake,
    //                     MinTimeForDeliveryOfA3KgCake: MinTimeForDeliveryOfA3KgCake, //optional
    //                     MinTimeForDeliveryOfA5KgCake: MinTimeForDeliveryOfA5KgCake, //optional
    //                     MinTimeForDeliveryFortierCake: FinalMinTimeForDeliveryFortierCake, //optional
    //                     BasicCustomisationPossible: BasicCustomisationPossible,
    //                     FullCustomisationPossible: FullCustomisationPossible,
    //                     CakeBase: CakeBase,
    //                     CakeCream: CakeCream,
    //                     BestUsedBefore: BestUsedBefore,
    //                     ToBeStoredIn: ToBeStoredIn,
    //                     KeepTheCakeInRoomTemperature: KeepTheCakeInRoomTemperature,
    //                     OtherInstructions: OtherInstructions, //optional
    //                     Description: Description,
    //                     HowGoodAreYouWithTheCake: HowGoodAreYouWithTheCake,
    //                     HowManyTimesHaveYouBakedThisParticularCake: HowManyTimesHaveYouBakedThisParticularCake,
    //                     VendorID: VendorID,
    //                     Vendor_ID: Vendor_ID,
    //                     VendorName: VendorName,
    //                     VendorPhoneNumber1: VendorPhoneNumber1,
    //                     VendorPhoneNumber2: VendorPhoneNumber2,
    //                     VendorAddress: {
    //                         Street: Street,
    //                         City: City,
    //                         State: State,
    //                         Pincode: Pincode,
    //                     },
    //                     Discount: Discount,
    //                     Tax: Tax,
    //                     Stock: Stock,
    //                     MainCakeImage: FinalMainCakeImage,
    //                     AdditionalCakeImages: FinalAdditionalCakeImages,
    //                     Modified_On: Modified_On,
    //                 }
    //             }, function (err, result) {
    //                 if (err) {
    //                     res.send({ statusCode: 400, message: "Failed" });
    //                 } else {
    //                     res.send({ statusCode: 200, message: "Updated Successfully" });
    //                 }
    //             });
    //         }
    //     });
    // } catch (err) {
    //     res.send({ statusCode: 400, message: "Failed5" });
    // };
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