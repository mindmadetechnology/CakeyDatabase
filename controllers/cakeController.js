const cakeModel = require("../models/CakeModels");
const vendorModel = require("../models/vendorModels");
const AdminNotificationModel = require("../models/AdminNotificationModels");
const VendorNotificationModel = require('../models/VendorNotification');
const moment = require('moment-timezone');
const cloudinary = require("../middleware/cloudnary");

// get cake list
const getcakelist = (req, res) => {

    try {
        cakeModel.find({ IsDeleted: 'n', Status: 'Approved', Stock: 'InStock' }, function (err, result1) {
            if (err) {
                res.send({ statusCode: 400, message: "Failed" });
            } else {
                vendorModel.find({ Status: 'Approved' }, function (err, result2) {
                    if (err) {
                        res.send({ statusCode: 400, message: "Failed" });
                    } else {
                        var NewResult = [];
                        result1.filter(val1 => {
                            result2.filter(val2 => {
                                if (val1.VendorID === val2._id.toString()) {
                                    NewResult.push(val1);
                                }
                            });
                        });
                        if (NewResult.length === 0) {
                            res.send({ message: "No Records Found" });
                        } else {
                            res.send(NewResult);
                        }
                    }
                });
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
                    res.send(result.reverse());
                }
            }
        });
    } catch (err) {
        res.send({ statusCode: 400, message: 'Failed' });
    };
};

const getCakeListforAdmin = (req, res) => {

    try {
        cakeModel.find({ $nor: [{ Status: 'New' }, { Status: 'Updated' }] }, function (err, result) {
            if (err) {
                res.send({ statusCode: 400, message: "Failed" });
            } else {
                if (result.length === 0) {
                    res.send({ message: "No Records Found" });
                } else {
                    res.send(result.reverse());
                }
            }
        });
    } catch (err) {
        res.send({ statusCode: 400, message: 'Failed' });
    };
};

const GetCakeListOfNewAndUpdated = (req, res) => {
    try {
        cakeModel.find({ $or: [{ Status: 'New' }, { Status: 'Updated' }] }, function (err, result) {
            if (err) {
                res.send({ statusCode: 400, message: "Failed" });
            } else {
                if (result.length === 0) {
                    res.send({ message: "No Records Found" });
                } else {
                    res.send(result.reverse());
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
                    res.send(result.reverse());
                }
            }
        });
    } catch (err) {
        res.send({ statusCode: 400, message: 'Failed' });
    };
};

const getcakelistByVendorIdforVendors = (req, res) => {

    const VendorId = req.params.VendorId;
    try {
        cakeModel.find({ VendorID: VendorId }, function (err, result) {
            if (err) {
                res.send({ statusCode: 400, message: "Failed" });
            } else {
                if (result.length === 0) {
                    res.send({ message: "No Records Found" });
                } else {
                    res.send(result.reverse());
                }
            }
        });
    } catch (err) {
        res.send({ statusCode: 400, message: 'Failed' });
    };
};

//get cakes list by vendor id and status
const getcakelistByVendorIdAndStatus = (req, res) => {

    const VendorId = req.params.VendorId;
    try {
        vendorModel.findOne({ _id: VendorId }, function (err, result2) {
            if (err) {
                res.send({ statusCode: 400, message: "Failed" });
            } else if (result2.Status === 'Approved') {
                cakeModel.find({ VendorID: VendorId, IsDeleted: 'n', Status: 'Approved' }, function (err, result) {
                    if (err) {
                        res.send({ statusCode: 400, message: "Failed" });
                    } else {
                        if (result.length === 0) {
                            res.send({ message: "No Records Found" });
                        } else {
                            res.send(result.reverse());
                        }
                    }
                });
            } else {
                res.send({ message: 'No Records Found' });
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

    const CakeType = req.body.CakeType;
    const CakeSubType = req.body.CakeSubType;
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
    const CustomShapeList = req.body.CustomShapeList; //Name,MinWeight,Price
    const MinWeightList = req.body.MinWeightList;
    const IsTierCakePossible = req.body.IsTierCakePossible;
    // const TierCakeMinWeightAndPrice = req.body.TierCakeMinWeightAndPrice; //optional
    const ThemeCakePossible = req.body.ThemeCakePossible;
    const ToppersPossible = req.body.ToppersPossible;
    const MinTimeForDeliveryOfDefaultCake = req.body.MinTimeForDeliveryOfDefaultCake;
    const MinTimeForDeliveryOfABelow2KgCake = req.body.MinTimeForDeliveryOfABelow2KgCake;
    const MinTimeForDeliveryOfA2to4KgCake = req.body.MinTimeForDeliveryOfA2to4KgCake;
    const MinTimeForDeliveryOfA4to5KgCake = req.body.MinTimeForDeliveryOfA4to5KgCake; //optional
    const MinTimeForDeliveryOfAAbove5KgCake = req.body.MinTimeForDeliveryOfAAbove5KgCake; //optional
    // const MinTimeForDeliveryFortierCake = req.body.MinTimeForDeliveryFortierCake; //optional
    const BasicCustomisationPossible = req.body.BasicCustomisationPossible;
    const FullCustomisationPossible = req.body.FullCustomisationPossible;
    const CakeBase = req.body.CakeBase;
    const CakeCream = req.body.CakeCream;
    const ButterCreamType = req.body.ButterCreamType;
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
    const VendorAddress = req.body.VendorAddress;
    const GoogleLocation = req.body.GoogleLocation;
    // const Street = req.body.Street;
    // const City = req.body.City;
    // const State = req.body.State;
    // const Pincode = req.body.Pincode;
    const Discount = req.body.Discount;
    const Tax = req.body.Tax;
    const Created_On = moment().tz('Asia/Kolkata').format("DD-MM-YYYY hh:mm A");
    //MainCakeImage
    //AdditionalCakeImages
    //SampleImages
    try {
        if (!CakeType || !CakeName || !CakeCommonName || !BasicFlavour || !BasicShape || !MinWeight || !DefaultCakeEggOrEggless ||
            !IsTierCakePossible || !ThemeCakePossible || !ToppersPossible || !MinTimeForDeliveryOfDefaultCake ||
            !MinTimeForDeliveryOfABelow2KgCake || !MinTimeForDeliveryOfA2to4KgCake || !MinTimeForDeliveryOfA4to5KgCake ||
            !MinTimeForDeliveryOfAAbove5KgCake ||
            !BasicCustomisationPossible || !FullCustomisationPossible || !CakeBase || !CakeCream || !BestUsedBefore || !ToBeStoredIn ||
            !KeepTheCakeInRoomTemperature || !Description || !HowGoodAreYouWithTheCake || !Tax || !Discount ||
            !HowManyTimesHaveYouBakedThisParticularCake || !VendorID || !Vendor_ID || !VendorName || !BasicCakePrice ||
            !VendorPhoneNumber1 || !VendorAddress || !GoogleLocation) {
            res.send({ statusCode: 400, message: "*required" });
        } else {
            var SampleShapeImages = [], FinalAdditionalCakeImages = [];
            var FinalCustomFlavourList, FinalCustomShapeList, FinalCakeSubType, FinalMinWeightList, MainCakeImage;
            // var FinalTierCakeMinWeightAndPrice, FinalMinTimeForDeliveryFortierCake ;
            // const FinalBasicFlavour = JSON.parse(BasicFlavour);
            // const FinalBasicShape = JSON.parse(BasicShape);
            // const FinalMinWeight = JSON.parse(MinWeight);
            const FinalLocation = JSON.parse(GoogleLocation);
            const FinalCakeType = JSON.parse(CakeType);
            if (CakeSubType) {
                FinalCakeSubType = JSON.parse(CakeSubType);
            };
            if (CustomFlavourList) {
                FinalCustomFlavourList = JSON.parse(CustomFlavourList);
            };
            if (CustomShapeList) {
                FinalCustomShapeList = JSON.parse(CustomShapeList);
            }
            if (MinWeightList) {
                FinalMinWeightList = JSON.parse(MinWeightList);
            }
            if (req.files['SampleImages'] !== undefined) {
                for (let i = 0; i < req.files['SampleImages'].length; i++) {
                    var result = await cloudinary.uploader.upload(req.files['SampleImages'][i].path, { width: 640, height: 426, crop: "scale", format: 'webp' });
                    SampleShapeImages.push(result.url);
                }
            } else {
                SampleShapeImages = [];
            }
            // if (TierCakeMinWeightAndPrice) {
            //     FinalTierCakeMinWeightAndPrice = JSON.parse(TierCakeMinWeightAndPrice);
            // } else {
            //     FinalTierCakeMinWeightAndPrice = [];
            // };
            // if (MinTimeForDeliveryFortierCake) {
            //     FinalMinTimeForDeliveryFortierCake = JSON.parse(MinTimeForDeliveryFortierCake);
            // } else {
            //     FinalMinTimeForDeliveryFortierCake = [];
            // };
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
                CakeName: CakeName?.toLowerCase().replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase()),
                CakeType: FinalCakeType,
                CakeSubType: FinalCakeSubType,
                CakeCommonName: CakeCommonName?.toLowerCase().replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase()),
                BasicFlavour: BasicFlavour?.toLowerCase().replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase()),
                BasicShape: BasicShape?.toLowerCase().replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase()),
                MinWeight: MinWeight,
                BasicCakePrice: BasicCakePrice,
                DefaultCakeEggOrEggless: DefaultCakeEggOrEggless,
                IsEgglessOptionAvailable: IsEgglessOptionAvailable,
                BasicEgglessCostPerKg: BasicEgglessCostPerKg,
                CustomFlavourList: FinalCustomFlavourList, // list //
                CustomShapeList: {
                    Info: FinalCustomShapeList,
                    SampleImages: SampleShapeImages
                },
                MinWeightList: FinalMinWeightList, // list //
                IsTierCakePossible: IsTierCakePossible,
                // TierCakeMinWeightAndPrice: FinalTierCakeMinWeightAndPrice, //optional
                ThemeCakePossible: ThemeCakePossible,
                ToppersPossible: ToppersPossible,
                MinTimeForDeliveryOfDefaultCake: MinTimeForDeliveryOfDefaultCake,
                MinTimeForDeliveryOfABelow2KgCake: MinTimeForDeliveryOfABelow2KgCake,
                MinTimeForDeliveryOfA2to4KgCake: MinTimeForDeliveryOfA2to4KgCake,
                MinTimeForDeliveryOfA4to5KgCake: MinTimeForDeliveryOfA4to5KgCake, //optional
                MinTimeForDeliveryOfAAbove5KgCake: MinTimeForDeliveryOfAAbove5KgCake, //optional
                // MinTimeForDeliveryFortierCake: FinalMinTimeForDeliveryFortierCake, //optional
                BasicCustomisationPossible: BasicCustomisationPossible,
                FullCustomisationPossible: FullCustomisationPossible,
                CakeBase: CakeBase,
                CakeCream: CakeCream?.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase()),
                ButterCreamType: ButterCreamType?.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase()),
                BestUsedBefore: BestUsedBefore,
                ToBeStoredIn: ToBeStoredIn,
                KeepTheCakeInRoomTemperature: KeepTheCakeInRoomTemperature,
                OtherInstructions: OtherInstructions?.toLowerCase().replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase()), //optional
                Description: Description?.toLowerCase().replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase()),
                HowGoodAreYouWithTheCake: HowGoodAreYouWithTheCake,
                HowManyTimesHaveYouBakedThisParticularCake: HowManyTimesHaveYouBakedThisParticularCake,
                VendorID: VendorID,
                Vendor_ID: Vendor_ID,
                VendorName: VendorName,
                VendorPhoneNumber1: VendorPhoneNumber1,
                VendorPhoneNumber2: VendorPhoneNumber2,
                VendorAddress: VendorAddress,
                GoogleLocation: FinalLocation,
                Discount: Discount,
                Tax: Tax,
                MainCakeImage: MainCakeImage,
                AdditionalCakeImages: FinalAdditionalCakeImages,
                Created_On: Created_On,
            });
            vendorValidate.save(function (err, result) {
                if (err) {
                    res.send({ statusCode: 400, message: "Failed" });
                } else {
                    const AddNotification = AdminNotificationModel({
                        NotificationType: 'New Cake',
                        Image: result.MainCakeImage,
                        VendorID: result.VendorID,
                        Vendor_ID: result.Vendor_ID,
                        VendorName: result.VendorName,
                        Id: result._id,
                        Created_On: result.Created_On
                    });
                    AddNotification.save(function (err) {
                        if (err) {
                            res.send({ statusCode: 400, message: "Failed", err: err });
                        } else {
                            res.send({ statusCode: 200, message: "Cake Added Successfully" });
                        }
                    });
                }
            });
        };
    } catch (err) {
        res.send({ statusCode: 400, message: "Failed" });
    };
};

//cake approval
const ApproveCake = (req, res) => {

    const Id = req.params.id;
    const Status = req.body.Status;
    // const ToppersPossible = req.body.ToppersPossible;
    const RatingsForVendor = req.body.RatingsForVendor;
    // const CakeType = req.body.CakeType;
    // const CakeSubType = req.body.CakeSubType;
    const CakeCategory = req.body.CakeCategory;
    const Status_Updated_On = moment().tz('Asia/Kolkata').format("DD-MM-YYYY hh:mm A");
    try {
        cakeModel.findOneAndUpdate({ _id: Id }, {
            $set: {
                Status: Status,
                // ToppersPossible: ToppersPossible,
                RatingsForVendor: RatingsForVendor?.toLowerCase().replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase()),
                // CakeType: CakeType,
                // CakeSubType: CakeSubType,
                CakeCategory: CakeCategory?.toLowerCase().replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase()),
                Status_Updated_On: Status_Updated_On
            }
        }, function (err, result) {
            if (err) {
                res.send({ statusCode: 400, message: "Failed" });
            } else {
                const Notification = VendorNotificationModel({
                    CakeID: result._id,
                    Cake_ID: result.Id,
                    CakeNotificationType: 'New Cake Approve',
                    Image: result.MainCakeImage,
                    CakeName: result.CakeName,
                    Status: Status,
                    Status_Updated_On: Status_Updated_On,
                    VendorID: result.VendorID,
                    Vendor_ID: result.Vendor_ID,
                    For_Display: 'Your Cake is Approved'
                });
                Notification.save(function (err) {
                    if (err) {
                        res.send({ statusCode: 400, message: "Failed" });
                    } else {
                        res.send({ statusCode: 200, message: "Cake Approved Successfully" });
                    }
                });
            }
        });
    } catch (err) {
        res.send({ statusCode: 400, message: "Failed" });
    };
};

const ApproveUpdatedCake = (req, res) => {
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
                const Notification = VendorNotificationModel({
                    CakeID: result._id,
                    Cake_ID: result.Id,
                    CakeNotificationType: 'Updated Cake Approve',
                    Image: result.MainCakeImage,
                    CakeName: result.CakeName,
                    Status: Status,
                    Status_Updated_On: Status_Updated_On,
                    VendorID: result.VendorID,
                    Vendor_ID: result.Vendor_ID,
                    For_Display: "Your Cake's Updates are Approved"
                });
                Notification.save(function (err) {
                    if (err) {
                        res.send({ statusCode: 400, message: "Failed" });
                    } else {
                        res.send({ statusCode: 200, message: "Cake Approved Successfully" });
                    }
                });
            }
        });
    } catch (err) {
        res.send({ statusCode: 400, message: "Failed" });
    };
}

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
    const BasicEgglessCostPerKg = req.body.BasicEgglessCostPerKg; //optional
    const Discount = req.body.Discount;
    // const BasicCustomisationPossible = req.body.BasicCustomisationPossible;
    // const MinTimeForDeliveryOfA3KgCake = req.body.MinTimeForDeliveryOfA3KgCake; //optional
    // const MinTimeForDeliveryOfA5KgCake = req.body.MinTimeForDeliveryOfA5KgCake; //optional
    const VendorID = req.body.VendorID;
    const Vendor_ID = req.body.Vendor_ID;
    const VendorName = req.body.VendorName;
    const VendorPhoneNumber1 = req.body.VendorPhoneNumber1;
    const VendorPhoneNumber2 = req.body.VendorPhoneNumber2;
    const VendorAddress = req.body.VendorAddress;
    const GoogleLocation = req.body.GoogleLocation;
    // const Street = req.body.Street;
    // const City = req.body.City;
    // const State = req.body.State;
    // const Pincode = req.body.Pincode;
    const Stock = req.body.Stock;
    const Modified_On = moment().tz('Asia/Kolkata').format("DD-MM-YYYY hh:mm A");
    const OldSampleImages = req.body.OldSampleImages;
    const OldMainImages = req.body.OldMainImages;
    const OldCakeAdditionalImages = req.body.OldCakeAdditionalImages;

    try {

        //SampleImages
        var FinalmainImage = ""
        var FinalCakeAdditionalImage = []
        var FinalSampleImages = [], FinalCustomFlavourList = [], FinalMinWeightList = [], FinalCustomShapeList = [];
        // const FinalBasicFlavour = JSON.parse(BasicFlavour);
        // const FinalBasicShape = JSON.parse(BasicShape);
        // const FinalMinWeight = JSON.parse(MinWeight);
        const FinalLocation = JSON.parse(GoogleLocation);
        if (CustomFlavourList !== undefined) {
            FinalCustomFlavourList = (JSON.parse(CustomFlavourList));
        };
        if (CustomShapeList !== undefined) {
            FinalCustomShapeList = (JSON.parse(CustomShapeList));
        };
        if (MinWeightList !== undefined) {
            FinalMinWeightList = (JSON.parse(MinWeightList));
        };

        if (OldMainImages) {
            FinalmainImage = OldMainImages
        } else {
            var NewMainImages = await cloudinary.uploader.upload(req.files['NewMainCakeImage'][0].path);
            FinalmainImage = NewMainImages.url
        }
        // Cake Additional Images Change condition
        if (OldCakeAdditionalImages && OldCakeAdditionalImages.length !== 0) {
            FinalCakeAdditionalImage = JSON.parse(OldCakeAdditionalImages)
        }
        if (req.files['NewCakeAdditionalImages'] && req.files['NewCakeAdditionalImages'].length !== 0) {
            for (let i = 0; i < req.files['NewCakeAdditionalImages'].length; i++) {
                var tempimage = await cloudinary.uploader.upload(req.files['NewCakeAdditionalImages'][i].path);
                FinalCakeAdditionalImage.push(tempimage.url);
            }
        }
        //for sample shape images
        if (OldSampleImages) {

            FinalSampleImages = JSON.parse(OldSampleImages);
        }
        if (req.files['SampleImages'] !== undefined) {

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
                        MinWeightList: FinalMinWeightList, // List //
                        BasicCakePrice: BasicCakePrice,
                        BasicEgglessCostPerKg: BasicEgglessCostPerKg,
                        Discount: Discount,
                        VendorID: VendorID,
                        Vendor_ID: Vendor_ID,
                        VendorName: VendorName,
                        VendorPhoneNumber1: VendorPhoneNumber1,
                        VendorPhoneNumber2: VendorPhoneNumber2,
                        VendorAddress: VendorAddress,
                        GoogleLocation: FinalLocation,
                        Stock: Stock,
                        Status: 'Updated',
                        Modified_On: Modified_On,
                        MainCakeImage: FinalmainImage,
                        AdditionalCakeImages: FinalCakeAdditionalImage, // List//
                    }
                }, function (err, result) {
                    if (err) {
                        res.send({ statusCode: 400, message: "Failed" });
                    } else {
                        const AddNotification = AdminNotificationModel({
                            NotificationType: 'Cake Updated',
                            Image: result.MainCakeImage,
                            VendorID: result.VendorID,
                            Vendor_ID: result.Vendor_ID,
                            VendorName: result.VendorName,
                            Id: result._id,
                            Created_On: result.Modified_On
                        });
                        AddNotification.save(function (err) {
                            if (err) {
                                res.send({ statusCode: 400, message: "Failed" });
                            } else {
                                res.send({ statusCode: 200, message: "Cake Updated Successfully" });
                            }
                        });
                    }
                });
            }
        });
    } catch (err) {
        res.send({ statusCode: 400, message: "Failed5" });
    };
};


// Admin Update cake's details
const AdminupdateCake = async (req, res) => {

    const id = req.params.id;

    const CakeName = req.body.CakeName
    const CakeCommonName = req.body.CakeCommonName
    const CakeType = req.body.CakeType
    const CakeSubType = req.body.CakeSubType;
    const DefaultCakeEggOrEggless = req.body.DefaultCakeEggOrEggless
    const IsEgglessOptionAvailable = req.body.IsEgglessOptionAvailable
    const BasicFlavour = req.body.BasicFlavour
    const BasicShape = req.body.BasicShape
    const MinWeight = req.body.MinWeight
    const MinTimeForDeliveryOfDefaultCake = req.body.MinTimeForDeliveryOfDefaultCake
    const MinTimeForDeliveryOfABelow2KgCake = req.body.MinTimeForDeliveryOfABelow2KgCake
    const MinTimeForDeliveryOfA2to4KgCake = req.body.MinTimeForDeliveryOfA2to4KgCake
    const MinTimeForDeliveryOfA4to5KgCake = req.body.MinTimeForDeliveryOfA4to5KgCake
    const MinTimeForDeliveryOfAAbove5KgCake = req.body.MinTimeForDeliveryOfAAbove5KgCake
    const CakeBase = req.body.CakeBase
    const CakeCream = req.body.CakeCream
    const Discount = req.body.Discount
    const Tax = req.body.Tax
    const Status = req.body.Status
    const BestUsedBefore = req.body.BestUsedBefore
    const ToBeStoredIn = req.body.ToBeStoredIn
    const KeepTheCakeInRoomTemperature = req.body.KeepTheCakeInRoomTemperature
    const ThemeCakePossible = req.body.ThemeCakePossible
    const ToppersPossible = req.body.ToppersPossible
    const BasicCustomisationPossible = req.body.BasicCustomisationPossible
    const FullCustomisationPossible = req.body.FullCustomisationPossible
    const HowGoodAreYouWithTheCake = req.body.HowGoodAreYouWithTheCake
    const HowManyTimesHaveYouBakedThisParticularCake = req.body.HowManyTimesHaveYouBakedThisParticularCake
    const IsTierCakePossible = req.body.IsTierCakePossible
    const OtherInstructions = req.body.OtherInstructions
    const Description = req.body.Description
    const CustomFlavourList = req.body.CustomFlavourList;
    const CustomShapeList = req.body.CustomShapeList;
    const MinWeightList = req.body.MinWeightList;
    const BasicCakePrice = req.body.BasicCakePrice;
    const BasicEgglessCostPerKg = req.body.BasicEgglessCostPerKg; //optional
    const Stock = req.body.Stock;
    const Modified_On = moment().tz('Asia/Kolkata').format("DD-MM-YYYY hh:mm A");
    const OldSampleImages = req.body.OldSampleImages; // list //
    const OldMainImages = req.body.OldMainImages;
    const OldCakeAdditionalImages = req.body.OldCakeAdditionalImages; // list //
    //SampleImages



    try {

        var FinalmainImage = ""
        var FinalCakeAdditionalImage = []
        var FinalSampleImages = [], FinalCustomFlavourList = [], FinalMinWeightList = [], FinalCustomShapeList = [];
        // const FinalBasicFlavour = JSON.parse(BasicFlavour);
        // const FinalBasicShape = JSON.parse(BasicShape);
        // const FinalMinWeight = JSON.parse(MinWeight);

        if (CustomFlavourList) {
            FinalCustomFlavourList = (JSON.parse(CustomFlavourList));
        };
        if (CustomShapeList) {
            FinalCustomShapeList = (JSON.parse(CustomShapeList));
        };
        if (MinWeightList) {
            FinalMinWeightList = (JSON.parse(MinWeightList));
        };

        //Main Image Change condition
        if (OldMainImages) {
            FinalmainImage = OldMainImages
        } else {
            var NewMainImages = await cloudinary.uploader.upload(req.files['NewMainCakeImage'][0].path);
            FinalmainImage = NewMainImages.url
        }
        // Cake Additional Images Change condition
        if (OldCakeAdditionalImages && OldCakeAdditionalImages.length !== 0) {
            FinalCakeAdditionalImage = JSON.parse(OldCakeAdditionalImages)
        }
        if (req.files['NewCakeAdditionalImages'] && req.files['NewCakeAdditionalImages'].length !== 0) {
            for (let i = 0; i < req.files['NewCakeAdditionalImages'].length; i++) {
                var tempimage = await cloudinary.uploader.upload(req.files['NewCakeAdditionalImages'][i].path);
                FinalCakeAdditionalImage.push(tempimage.url);
            }
        }
        //for sample shape images
        if (OldSampleImages) {

            FinalSampleImages = JSON.parse(OldSampleImages);
        }
        if (req.files['SampleImages'] !== undefined) {

            for (let i = 0; i < req.files['SampleImages'].length; i++) {
                var NewImages = await cloudinary.uploader.upload(req.files['SampleImages'][i].path);
                FinalSampleImages.push(NewImages.url);
            }
        };
        let tempdata = {
            CakeName: CakeName,
            CakeCommonName: CakeCommonName,
            CakeType: JSON.parse(CakeType),
            CakeSubType: CakeSubType ? JSON.parse(CakeSubType) : [],
            DefaultCakeEggOrEggless: DefaultCakeEggOrEggless,
            IsEgglessOptionAvailable: IsEgglessOptionAvailable, //"Y/N"//
            BasicEgglessCostPerKg: BasicEgglessCostPerKg,
            Discount: Discount,
            Tax: Tax,
            Status: Status,
            Stock: Stock,
            BasicFlavour: BasicFlavour,
            BasicShape: BasicShape,
            MinWeight: MinWeight,
            MinTimeForDeliveryOfDefaultCake: MinTimeForDeliveryOfDefaultCake,
            MinTimeForDeliveryOfABelow2KgCake: MinTimeForDeliveryOfABelow2KgCake,
            MinTimeForDeliveryOfA2to4KgCake: MinTimeForDeliveryOfA2to4KgCake,
            MinTimeForDeliveryOfA4to5KgCake: MinTimeForDeliveryOfA4to5KgCake,
            MinTimeForDeliveryOfAAbove5KgCake: MinTimeForDeliveryOfAAbove5KgCake,
            CakeBase: CakeBase,
            CakeCream: CakeCream,
            BestUsedBefore: BestUsedBefore,
            ToBeStoredIn: ToBeStoredIn,
            KeepTheCakeInRoomTemperature: KeepTheCakeInRoomTemperature,
            ThemeCakePossible: ThemeCakePossible,
            ToppersPossible: ToppersPossible,
            BasicCustomisationPossible: BasicCustomisationPossible,
            FullCustomisationPossible: FullCustomisationPossible,
            HowGoodAreYouWithTheCake: HowGoodAreYouWithTheCake,
            HowManyTimesHaveYouBakedThisParticularCake: HowManyTimesHaveYouBakedThisParticularCake,
            IsTierCakePossible: IsTierCakePossible,
            OtherInstructions: OtherInstructions,
            Description: Description,
            BasicCakePrice: BasicCakePrice,
            CustomFlavourList: FinalCustomFlavourList,  // List//
            CustomShapeList: {
                Info: FinalCustomShapeList, // List//
                SampleImages: FinalSampleImages // List//
            },
            MinWeightList: FinalMinWeightList, // List//
            MainCakeImage: FinalmainImage,
            AdditionalCakeImages: FinalCakeAdditionalImage, // List//
            Modified_On: Modified_On,

        }

        cakeModel.findById({ _id: id }, async function (err, result) {
            if (err) {
                res.send({ statusCode: 400, message: "Failed" });
            } else if (result === null) {
                res.send({ statusCode: 400, message: "Failed" });
            } else {

                cakeModel.findOneAndUpdate({ _id: id }, {
                    $set: tempdata
                }, function (err, result) {
                    if (err) {
                        res.send({ statusCode: 400, message: "Failed" });
                    } else {
                        const AddNotification = AdminNotificationModel({
                            NotificationType: 'Cake Updated',
                            Image: result.MainCakeImage,
                            VendorID: result.VendorID,
                            Vendor_ID: result.Vendor_ID,
                            VendorName: result.VendorName,
                            Id: result._id,
                            Created_On: result.Modified_On
                        });
                        AddNotification.save(function (err) {
                            if (err) {
                                res.send({ statusCode: 400, message: "Failed" });
                            } else {
                                res.send({ statusCode: 200, message: "Cake Updated Successfully" });
                            }
                        });
                    }
                });
            }
        });
    } catch (err) {
        res.send({ statusCode: 400, message: "failed" });
    };
};


//Admin send Information to Vendor
const SendInformationToVendor = (req, res) => {
    const CakeId = req.params.CakeId;
    const Information = req.body.Information;
    const Created_On = moment().tz('Asia/Kolkata').format("DD-MM-YYYY hh:mm A");
    const Created_By = req.body.Created_By;

    try {
        cakeModel.findOne({ _id: CakeId }, function (err, result) {
            if (err) {
                res.send({ statusCode: 400, message: "Failed" })
            } else if (result === null) {
                res.send({ statusCode: 400, message: "No Records Found" })
            } else {
                var InformationArray = [];
                var data = {
                    Information: Information?.toLowerCase().replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase()),
                    Created_On: Created_On,
                    Created_By: Created_By
                }
                if (result.SendInformation.length === 0) {
                    InformationArray.push(data)
                } else {
                    const Result = result.SendInformation;
                    InformationArray = Result.concat(data);
                }

                cakeModel.findOneAndUpdate({ _id: CakeId }, {
                    $set: {
                        SendInformation: InformationArray
                    }
                }, function (err, result) {
                    if (err) {
                        res.send({ statusCode: 400, message: "Failed" })
                    } else {
                        const Notification = VendorNotificationModel({
                            CakeID: result._id,
                            Cake_ID: result.Id,
                            CakeNotificationType: 'Information',
                            Image: result.MainCakeImage,
                            CakeName: result.CakeName,
                            Status: result.Status,
                            Status_Updated_On: Created_On,
                            VendorID: result.VendorID,
                            Vendor_ID: result.Vendor_ID,
                            For_Display: "Information from Admin"
                        });
                        Notification.save(function (err) {
                            if (err) {
                                res.send({ statusCode: 400, message: "Failed" });
                            } else {
                                res.send({ statusCode: 200, message: "Information sent Successfully" })
                            }
                        });
                    }
                })
            }
        })

    } catch (err) {
        res.send({ statusCode: 400, message: "Catch Err" })
    }

}

//delete cake
const deleteCake = (req, res) => {

    const id = req.params.id;
    const ReasonForSuspend = req.body.ReasonForSuspend;
    const IsDeleted = 'y';
    const Modified_On = moment().tz('Asia/Kolkata').format("DD-MM-YYYY hh:mm A");
    try {
        cakeModel.findOneAndUpdate({ _id: id }, {
            $set: {
                IsDeleted: IsDeleted,
                Status: 'Suspended',
                ReasonForSuspend: ReasonForSuspend,
                Modified_On: Modified_On
            }
        }, function (err, result) {
            if (err) {
                res.send({ statusCode: 400, message: "Failed" });
            } else {
                const AddNotification = AdminNotificationModel({
                    NotificationType: 'Cake Suspended',
                    Image: result.MainCakeImage,
                    VendorID: result.VendorID,
                    Vendor_ID: result.Vendor_ID,
                    VendorName: result.VendorName,
                    Id: result._id,
                    Created_On: Modified_On
                });
                AddNotification.save(function (err) {
                    if (err) {
                        res.send({ statusCode: 400, message: "Failed" });
                    } else {
                        res.send({ statusCode: 200, message: "Cake Suspended Successfully" });
                    }
                });
            }
        });
    } catch (err) {
        res.send({ statusCode: 400, message: "Failed" });
    };
};

module.exports = {
    AdminupdateCake,
    addCake,
    updateCake,
    deleteCake,
    getcakelist,
    getCakeDetails,
    getcakelistByVendorName,
    getcakelistByVendorId,
    getcakelistByVendorIdforVendors,
    getCakeListByStatus,
    ApproveCake,
    getcakelistByVendorIdAndStatus,
    GetCakeListOfNewAndUpdated,
    ApproveUpdatedCake,
    SendInformationToVendor,
    getCakeListforAdmin

};