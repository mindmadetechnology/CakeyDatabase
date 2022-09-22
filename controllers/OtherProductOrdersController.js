const OtherProductOrdersModel = require("../models/OtherProductOrdersModels");
const UserNotificationModel = require("../models/UserNotification");
const VendorNotificationModel = require("../models/VendorNotification");
const AdminNotificationModel = require("../models/AdminNotificationModels");
const moment = require('moment-timezone');
const cloudinary = require("../middleware/cloudnary");

const NewOtherProductOrder = (req, res) => {
    const Other_ProductID = req.body.Other_ProductID;
    const Other_Product_ID = req.body.Other_Product_ID;
    const ProductName = req.body.ProductName;
    const ProductCommonName = req.body.ProductCommonName;
    const CakeType = req.body.CakeType;
    const CakeSubType = req.body.CakeSubType;
    const Image = req.body.Image; //ProductImage[0]
    const EggOrEggless = req.body.EggOrEggless; //optional
    const Flavour = req.body.Flavour; //array
    const Shape = req.body.Shape; //optional
    const ProductMinWeightPerKg = req.body.ProductMinWeightPerKg; //Weight - Kg
    const ProductMinWeightPerUnit = req.body.ProductMinWeightPerUnit; //Weight - Unit
    const ProductMinWeightPerBox = req.body.ProductMinWeightPerBox; //Weight- Box
    const TopperId = req.body.TopperId; //for Brownie have TopperPossible - y
    const TopperName = req.body.TopperName; //for Brownie have TopperPossible - y
    const TopperImage = req.body.TopperImage; //for Brownie have TopperPossible - y
    const TopperPrice = req.body.TopperPrice; //for Brownie have TopperPossible - y
    const Description = req.body.Description;
    const VendorID = req.body.VendorID;
    const Vendor_ID = req.body.Vendor_ID;
    const VendorName = req.body.VendorName;
    const VendorPhoneNumber1 = req.body.VendorPhoneNumber1;
    const VendorPhoneNumber2 = req.body.VendorPhoneNumber2; //optional
    const VendorAddress = req.body.VendorAddress;
    const GoogleLocation = req.body.GoogleLocation;
    const UserID = req.body.UserID;
    const User_ID = req.body.User_ID;
    const UserName = req.body.UserName;
    const UserPhoneNumber = req.body.UserPhoneNumber;
    const DeliveryAddress = req.body.DeliveryAddress; //optional
    const DeliveryDate = req.body.DeliveryDate;
    const DeliverySession = req.body.DeliverySession;
    const DeliveryInformation = req.body.DeliveryInformation;
    const Discount = req.body.Discount;
    const DeliveryCharge = req.body.DeliveryCharge;
    const ItemCount = req.body.ItemCount;
    const Total = req.body.Total;
    const PaymentType = req.body.PaymentType;
    const PaymentStatus = req.body.PaymentStatus;
    const Created_On = moment().tz('Asia/Kolkata').format("DD-MM-YYYY hh:mm A");
    const Status_Updated_On = moment().tz('Asia/Kolkata').format("DD-MM-YYYY hh:mm A");

    try {
        if (Other_ProductID || Other_Product_ID || ProductName || ProductCommonName || CakeType || CakeSubType ||
            Image || Flavour.length > 0 || Description || VendorID || Vendor_ID || VendorName || VendorPhoneNumber1 ||
            VendorAddress || GoogleLocation || UserID || User_ID || UserName || UserPhoneNumber || DeliveryDate ||
            DeliverySession || DeliveryInformation || JSON.stringify(Discount) || Total || PaymentType || PaymentStatus) {
            const NewOtherProductOrder = OtherProductOrdersModel({
                Other_ProductID: Other_ProductID,
                Other_Product_ID: Other_Product_ID,
                ProductName: ProductName,
                ProductCommonName: ProductCommonName,
                CakeType: CakeType,
                CakeSubType: CakeSubType,
                Image: Image,
                EggOrEggless: EggOrEggless,
                Flavour: Flavour,
                Shape: Shape,
                ProductMinWeightPerKg: ProductMinWeightPerKg,
                ProductMinWeightPerUnit: ProductMinWeightPerUnit,
                ProductMinWeightPerBox: ProductMinWeightPerBox,
                Toppers: {
                    TopperId: TopperId,
                    TopperName: TopperName,
                    TopperImage: TopperImage,
                    TopperPrice: TopperPrice,
                },
                Description: Description,
                VendorID: VendorID,
                Vendor_ID: Vendor_ID,
                VendorName: VendorName,
                VendorPhoneNumber1: VendorPhoneNumber1,
                VendorPhoneNumber2: VendorPhoneNumber2,
                VendorAddress: VendorAddress,
                GoogleLocation: GoogleLocation,
                UserID: UserID,
                User_ID: User_ID,
                UserName: UserName,
                UserPhoneNumber: UserPhoneNumber,
                DeliveryAddress: DeliveryAddress?.toLowerCase().replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase()),
                DeliveryDate: DeliveryDate,
                DeliverySession: DeliverySession,
                DeliveryInformation: DeliveryInformation,
                Discount: Discount,
                DeliveryCharge: DeliveryCharge,
                ItemCount: ItemCount,
                Total: Total,
                PaymentType: PaymentType,
                PaymentStatus: PaymentStatus,
                Created_On: Created_On,
                Status_Updated_On: Status_Updated_On,
            });
            NewOtherProductOrder.save(function (err, result) {
                if (err) {
                    res.send({ statusCode: 400, message: 'Failed' });
                } else {
                    const Notification = new UserNotificationModel({
                        Other_ProductID: result._id,
                        Other_Product_ID: result.Id,
                        Image: result.Image,
                        CakeName: result.ProductName,
                        Status: result.Status,
                        Status_Updated_On: result.Created_On,
                        UserID: result.UserID,
                        User_ID: result.User_ID,
                        UserName: result.UserName,
                        For_Display: 'New Product Order Placed'
                    });
                    Notification.save(function (err) {
                        if (err) {
                            res.send({ statusCode: 400, message: "Failed" });
                        } else {
                            const VendorNotification = new VendorNotificationModel({
                                Other_ProductID: result._id,
                                Other_Product_ID: result.Id,
                                Image: result.Image,
                                CakeName: result.ProductName,
                                Status: result.Status,
                                Status_Updated_On: result.Created_On,
                                VendorID: result.VendorID,
                                Vendor_ID: result.Vendor_ID,
                                UserName: result.UserName,
                                For_Display: "You Got a New Product Order"
                            });
                            VendorNotification.save(function (err) {
                                if (err) {
                                    res.send({ statusCode: 400, message: "Failed" });
                                } else {
                                    const AddNotification = AdminNotificationModel({
                                        NotificationType: 'New Other Product Order',
                                        VendorID: result.VendorID,
                                        Vendor_ID: result.Vendor_ID,
                                        VendorName: result.VendorName,
                                        Id: result._id,
                                        Image: result.Image,
                                        Created_On: result.Created_On
                                    });
                                    AddNotification.save(function (err) {
                                        if (err) {
                                            res.send({ statusCode: 400, message: "Failed" });
                                        } else {
                                            res.send({ statusCode: 200, message: "Order Placed Successfully" });
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        } else {
            res.send({ statusCode: 400, message: 'required' });
        };
    } catch (err) {
        res.send({ statusCode: 400, message: 'Failed' });
    }
};

const GetAllOtherProductList = (req, res) => {
    try {
        OtherProductOrdersModel.find({}, function (err, result) {
            if (err) {
                res.send({ statusCode: 400, message: 'Failed' });
            } else if (result.length === 0) {
                res.send({ message: 'No Records Found' });
            } else {
                res.send(result.reverse());
            }
        });
    } catch (err) {
        res.send({ statusCode: 400, message: 'Failed' });
    }
};

const GetVendorOtherProductOrderList = (req, res) => {
    const Id = req.params.id;
    try {
        OtherProductOrdersModel.find({ VendorID: Id }, function (err, result) {
            if (err) {
                res.send({ statusCode: 400, message: 'Failed' });
            } else if (result.length === 0) {
                res.send({ message: 'No Records Found' });
            } else {
                res.send(result.reverse());
            }
        });
    } catch (err) {
        res.send({ statusCode: 400, message: 'Failed' });
    }
};

const GetOtherProductOrderDetails = (req, res) => {
    const Id = req.params.id;
    try {
        OtherProductOrdersModel.findOne({ _id: Id }, function (err, result) {
            if (err) {
                res.send({ statusCode: 400, message: 'Failed' });
            } else {
                res.send(result);
            }
        });
    } catch (err) {
        res.send({ statusCode: 400, message: 'Failed' });
    }
};

const UpdateOtherProductOrderStatus = async (req, res) => {
    const Id = req.params.id;
    const Status = req.body.Status;
    const Status_Updated_By = req.body.Status_Updated_By;
    const Status_Updated_On = moment().tz('Asia/Kolkata').format("DD-MM-YYYY hh:mm A");
    //file
    try {
        var PaymentStatus;
        if (Status === 'Delivered') {
            PaymentStatus = 'Paid'
        } else {
            PaymentStatus = 'Cash on delivery'
        };
        if (Status === 'Preparing' || Status === 'Out For Delivery' || Status === 'Delivered') {
            OtherProductOrdersModel.findById({ _id: Id }, function (err, result) {
                if (err) {
                    res.send({ statusCode: 400, message: "Failed" });
                } else if (result === null) {
                    res.send({ statusCode: 400, message: "Failed" });
                } else {
                    OtherProductOrdersModel.findOneAndUpdate({ _id: Id }, {
                        $set: {
                            Status: Status,
                            PaymentStatus: PaymentStatus,
                            Status_Updated_On: Status_Updated_On,
                            Status_Updated_By: Status_Updated_By
                        }
                    }, function (err) {
                        if (err) {
                            res.send({ statusCode: 400, message: "Failed" });
                        } else {
                            const Notification = new UserNotificationModel({
                                Other_ProductID: result._id,
                                Other_Product_ID: result.Id,
                                Image: result.Image,
                                CakeName: result.ProductName,
                                Status: Status,
                                Status_Updated_On: Status_Updated_On,
                                UserID: result.UserID,
                                User_ID: result.User_ID,
                                UserName: result.UserName,
                                For_Display: `Your prduct order status changed into ${Status}`
                            });
                            Notification.save(function (err) {
                                if (err) {
                                    res.send({ statusCode: 400, message: "Failed" });
                                } else {
                                    res.send({ statusCode: 200, message: "Updated Successfully" });
                                }
                            })

                        }
                    });
                }
            });
        } else {
            if (req.file) {
                var result = await cloudinary.uploader.upload(req.file.path, { width: 640, height: 426, crop: "scale", format: 'webp' });
                var FinalCakeImage = result.url;
                OtherProductOrdersModel.findOneAndUpdate({ _id: Id }, {
                    $set: {
                        Status: Status,
                        PaymentStatus: PaymentStatus,
                        FinalProductImage: FinalCakeImage,
                        Status_Updated_On: Status_Updated_On,
                        Status_Updated_By: Status_Updated_By
                    }
                }, function (err) {
                    if (err) {
                        res.send({ statusCode: 400, message: "Failed" });
                    } else {
                        const Notification = new UserNotificationModel({
                            Other_ProductID: result._id,
                            Other_Product_ID: result.Id,
                            Image: result.Image,
                            CakeName: result.ProductName,
                            Status: Status,
                            Status_Updated_On: Status_Updated_On,
                            UserID: result.UserID,
                            User_ID: result.User_ID,
                            UserName: result.UserName,
                            For_Display: `Your order status changed into ${Status}`
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
            } else {
                res.send({ statusCode: 400, message: 'Cake Image is Mandatory' })
            }
        };
    } catch (err) {
        res.send({ statusCode: 400, message: "Failed" });
    };
};

const AcceptOrCancelOrder = (req, res) => {
    const id = req.params.id;
    const Status = req.body.Status;
    const ReasonForCancel = req.body.ReasonForCancel;
    const Cancelled_By = req.body.Cancelled_By;
    const Status_Updated_By = req.body.Status_Updated_By;
    const Status_Updated_On = moment().tz('Asia/Kolkata').format("DD-MM-YYYY hh:mm A");
    try {
        if (Status === 'Accepted') {
            OtherProductOrdersModel.findOneAndUpdate({ _id: id }, {
                $set: {
                    Status: Status,
                    Status_Updated_On: Status_Updated_On
                }
            }, function (err, result) {
                if (err) {
                    res.send({ statusCode: 400, message: 'Failed' });
                } else {
                    const UserNotification = new UserNotificationModel({
                        Other_ProductID: result._id,
                        Other_Product_ID: result.Id,
                        Image: result.Image,
                        CakeName: result.ProductName,
                        Status: result.Status,
                        Status_Updated_On: Status_Updated_On,
                        UserID: result.UserID,
                        User_ID: result.User_ID,
                        UserName: result.UserName,
                        For_Display: 'Your Product Order is Accepted'
                    });
                    UserNotification.save(function (err) {
                        if (err) {
                            res.send({ statusCode: 400, message: "Failed" });
                        } else {
                            res.send({ statusCode: 200, message: 'Order Accepted' });
                        }
                    });
                }
            });
        } else {
            OtherProductOrdersModel.findOneAndUpdate({ _id: id }, {
                $set: {
                    Status: Status,
                    ReasonForCancel: ReasonForCancel,
                    Cancelled_By: Cancelled_By,
                    Status_Updated_By: Status_Updated_By,
                    Status_Updated_On: Status_Updated_On
                }
            }, function (err, result) {
                if (err) {
                    res.send({ statusCode: 400, message: 'Failed' });
                } else {
                    const AddNotification = AdminNotificationModel({
                        NotificationType: 'Other Product Order Rejected',
                        VendorID: result.VendorID,
                        Vendor_ID: result.Vendor_ID,
                        VendorName: result.VendorName,
                        Id: result._id,
                        Image: result.Image,
                        Created_On: result.Created_On
                    });
                    AddNotification.save(function (err) {
                        if (err) {
                            res.send({ statusCode: 400, message: "Failed" });
                        } else {
                            if (Cancelled_By === 'User') {
                                const Notification = VendorNotificationModel({
                                    Other_ProductID: result._id,
                                    Other_Product_ID: result.Id,
                                    Image: result.Image,
                                    CakeName: result.ProductName,
                                    Status: result.Status,
                                    Status_Updated_On: Status_Updated_On,
                                    VendorID: result.VendorID,
                                    Vendor_ID: result.Vendor_ID,
                                    UserName: result.UserName,
                                    For_Display: "Your Product Order is Cancelled"
                                });
                                Notification.save(function (err) {
                                    if (err) {
                                        res.send({ statusCode: 400, message: "Failed" });
                                    } else {
                                        res.send({ statusCode: 200, message: 'Order Cancelled' });
                                    }
                                });
                            } else {
                                const UserNotification = new UserNotificationModel({
                                    Other_ProductID: result._id,
                                    Other_Product_ID: result.Id,
                                    Image: result.Image,
                                    CakeName: result.ProductName,
                                    Status: result.Status,
                                    Status_Updated_On: Status_Updated_On,
                                    UserID: result.UserID,
                                    User_ID: result.User_ID,
                                    UserName: result.UserName,
                                    For_Display: 'Your Product Order is Cancelled'
                                });
                                UserNotification.save(function (err) {
                                    if (err) {
                                        res.send({ statusCode: 400, message: "Failed" });
                                    } else {
                                        res.send({ statusCode: 200, message: 'Order Cancelled' });
                                    }
                                });
                            }
                        }
                    });

                }
            })
        }
    } catch (err) {
        res.send({ statusCode: 400, message: "Failed" });
    };
};

module.exports = {
    NewOtherProductOrder,
    GetAllOtherProductList,
    GetVendorOtherProductOrderList,
    GetOtherProductOrderDetails,
    UpdateOtherProductOrderStatus,
    AcceptOrCancelOrder,
}