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
    const MinWeightPerUnit = req.body.MinWeightPerUnit; //array -> Weight, MinCount, PricePerUnit
    const MinWeightPerBox = req.body.MinWeightPerBox; // array -> Piece, MinCount, PricePerBox
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

    try {
        if (CakeSubType || ProductName || ProductCommonName || Flavour || Type || MinTimeForDelivery || Description ||
            HowGoodAreYouWithTheCake || HowManyTimesHaveYouBakedThisParticularCake || VendorID || Vendor_ID || VendorName ||
            VendorPhoneNumber1 || VendorAddress || GoogleLocation || Discount || req.files['ProductImage'] !== undefined) {
            let FinalMinWeightPerKg, FinalMinWeightPerUnit = [], FinalMinWeightPerBox = [], FinalProductImage = [];
            const FinalFlavour = JSON.parse(Flavour);
            const FinalGoogleLocation = JSON.parse(GoogleLocation);
            if (Type === 'Kg') {
                FinalMinWeightPerKg = JSON.parse(MinWeightPerKg);
            } else if (Type === 'Unit') {
                FinalMinWeightPerUnit = JSON.parse(MinWeightPerUnit);
            } else if (Type === 'Box') {
                FinalMinWeightPerBox = JSON.parse(MinWeightPerBox);
            };
            for (let i = 0; i < req.files['ProductImage'].length; i++) {
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
            NewOtherProduct.save(function (err, result) {
                if (err) {
                    res.send({ statusCode: 400, message: 'Failed1' });
                } else {
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
        } else {
            res.send({ statusCode: 400, message: 'required' })
        }
    } catch (err) {
        res.send({ statusCode: 400, message: 'Failed' });
    };
};

const ApproveOtherProduct = (req, res) => {
    const Id = req.params.id;
    const Status = req.body.Status;
    const RatingsForVendor = req.body.RatingsForVendor;
    const CakeCategory = req.body.CakeCategory;
    const Status_Updated_On = moment().tz('Asia/Kolkata').format("DD-MM-YYYY hh:mm A");
    try {
        OtherProductModel.findOneAndUpdate({ _id: Id }, {
            $set: {
                Status: Status,
                RatingsForVendor: RatingsForVendor,
                CakeCategory: CakeCategory,
                Status_Updated_On: Status_Updated_On
            }
        }, function (err, result) {
            if (err) {
                res.send({ statusCode: 400, message: "Failed" });
            } else {
                const Notification = VendorNotificationModel({
                    Other_ProductID: result._id,
                    Other_Product_ID: result.Id,
                    Image: result.ProductImage[0],
                    CakeName: result.ProductName,
                    Status: Status,
                    Status_Updated_On: Status_Updated_On,
                    VendorID: result.VendorID,
                    Vendor_ID: result.Vendor_ID,
                    For_Display: 'Your Product is Approved'
                });
                Notification.save(function (err) {
                    if (err) {
                        res.send({ statusCode: 400, message: "Failed" });
                    } else {
                        res.send({ statusCode: 200, message: "Updated Successfully" });
                    }
                });
            }
        });
    } catch (err) {
        res.send({ statusCode: 400, message: "Failed" });
    };
};

const UpdateOtherProduct = (req, res) => {
    const Id = req.params.id;
    const Flavour = req.body.Flavour;
    const MinWeightPerKg = req.body.MinWeightPerKg;
    const MinWeightPerBox = req.body.MinWeightPerBox;
    const MinWeightPerUnit = req.body.MinWeightPerUnit;
    const Stock = req.body.Stock;
    const Modified_On = moment().tz('Asia/Kolkata').format("DD-MM-YYYY hh:mm A");
    try {
        OtherProductModel.findOneAndUpdate({ _id: Id }, {
            $set: {
                Flavour: Flavour,
                MinWeightPerKg: MinWeightPerKg,
                MinWeightPerBox: MinWeightPerBox,
                MinWeightPerUnit: MinWeightPerUnit,
                Stock: Stock,
                Status: 'Updated',
                Modified_On: Modified_On
            }
        }, function (err, result) {
            if (err) {
                res.send({ statusCode: 400, message: "Failed" });
            } else {
                const AddNotification = AdminNotificationModel({
                    NotificationType: 'Other Product Updated',
                    Image: result.ProductImage[0],
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
                        res.send({ statusCode: 200, message: "Updated Successfully" });
                    }
                });
            }
        })
    } catch (err) {
        res.send({ statusCode: 400, message: "Failed" });
    }
};

const DeleteOtherProduct = (req, res) => {
    const Id = req.params.id;
    try {
        OtherProductModel.findOneAndDelete({ _id: Id }, function (err) {
            if (err) {
                res.send({ statusCode: 400, message: "Failed" });
            } else {
                res.send({ statusCode: 200, message: "Deleted Successfully" });
            }
        });
    } catch (err) {
        res.send({ statusCode: 400, message: "Failed" });
    }
};

const OtherProductSendInformation = (req, res) => {
    const Id = req.params.id;
    const Information = req.body.Information;
    const Created_On = moment().tz('Asia/Kolkata').format("DD-MM-YYYY hh:mm A");
    const Created_By = req.body.Created_By;

    try {
        OtherProductModel.findOne({ _id: Id }, function (err, result) {
            if (err) {
                res.send({ statusCode: 400, message: "Failed" })
            } else if (result === null) {
                res.send({ statusCode: 400, message: "No Records Found" })
            } else {
                var InformationArray = [];
                var data = {
                    Information: Information,
                    Created_On: Created_On,
                    Created_By: Created_By
                }
                if (result.SendInformation.length === 0) {
                    InformationArray.push(data)
                } else {
                    const Result = result.SendInformation;
                    InformationArray = Result.concat(data);
                }

                OtherProductModel.findOneAndUpdate({ _id: Id }, {
                    $set: {
                        SendInformation: InformationArray
                    }
                }, function (err, result) {
                    if (err) {
                        res.send({ statusCode: 400, message: "Failed" })
                    } else {
                        const Notification = VendorNotificationModel({
                            Other_ProductID: result._id,
                            Other_Product_ID: result.Id,
                            Image: result.ProductImage[0],
                            CakeName: result.ProductName,
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
};

const GetAllOtherProductsList = (req, res) => {
    try {
        OtherProductModel.find({}, function (err, result) {
            if (err) {
                res.send({ statusCode: 400, message: "Failed" });
            } else if (result.length === 0) {
                res.send({ message: "No Redords Found" });
            } else {
                res.send(result.reverse());
            }
        });
    } catch (err) {
        res.send({ statusCode: 400, message: "Failed" });
    }
};

const GetVendorsOtherProductsList = (req, res) => {
    const Id = req.params.id;
    try {
        OtherProductModel.find({ VendorID: Id }, function (err, result) {
            if (err) {
                res.send({ statusCode: 400, message: "Failed" });
            } else if (result.length === 0) {
                res.send({ message: "No Redords Found" });
            } else {
                res.send(result.reverse());
            }
        });
    } catch (err) {
        res.send({ statusCode: 400, message: "Failed" });
    };
};

const GetApprovedOtherProductsList = (req, res) => {
    try {
        OtherProductModel.find({ Status: 'Approved' }, function (err, result) {
            if (err) {
                res.send({ statusCode: 400, message: "Failed" });
            } else if (result.length === 0) {
                res.send({ message: "No Redords Found" });
            } else {
                res.send(result.reverse());
            }
        });
    } catch (err) {
        res.send({ statusCode: 400, message: "Failed" });
    };
};

const GetOtherProductListByStatus = (req, res) => {
    const Status = req.params.status;
    try {
        OtherProductModel.find({ Status: Status }, function (err, result) {
            if (err) {
                res.send({ statusCode: 400, message: "Failed" });
            } else if (result.length === 0) {
                res.send({ message: "No Redords Found" });
            } else {
                res.send(result.reverse());
            }
        });
    } catch (err) {
        res.send({ statusCode: 400, message: "Failed" });
    };
};

const GetNewAndUpdatedOtherProductsList = (req, res) => {
    try {
        OtherProductModel.find({ $or: [{ Status: 'New' }, { Status: 'Updated' }] }, function (err, result) {
            if (err) {
                res.send({ statusCode: 400, message: "Failed" });
            } else if (result.length === 0) {
                res.send({ message: "No Redords Found" });
            } else {
                res.send(result.reverse());
            }
        });
    } catch (err) {
        res.send({ statusCode: 400, message: "Failed" });
    };
};

const GetOtherProductDetails = (req, res) => {
    const Id = req.params.id;
    try {
        OtherProductModel.findOne({ _id: Id }, function (err, result) {
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

module.exports = {
    CreateOtherProduct,
    ApproveOtherProduct,
    GetAllOtherProductsList,
    GetVendorsOtherProductsList,
    GetApprovedOtherProductsList,
    OtherProductSendInformation,
    UpdateOtherProduct,
    DeleteOtherProduct,
    GetOtherProductListByStatus,
    GetNewAndUpdatedOtherProductsList,
    GetOtherProductDetails
};

