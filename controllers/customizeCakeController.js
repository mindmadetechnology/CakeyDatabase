const CustomizeCakeModel = require('../models/CustomizeCakeModels');
const OrdersListModel = require("../models/OrdersListModels");
const UserNotificationModel = require("../models/UserNotification");
const VendorNotificationModel = require("../models/VendorNotification");
const moment = require('moment-timezone');
const cloudinary = require("../middleware/cloudnary");

//get all customize cakes
const GetCustomizeCakeList = (req, res) => {

    try {
        CustomizeCakeModel.find({}, function (err, result) {
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
        res.send({ statusCode: 400, message: "Failed" });
    };
};

const NewCustomizedCakeList = (req, res) => {
    try {
        CustomizeCakeModel.find({ $or: [{ Status: 'New' }, { Status: 'Assigned' }] }, function (err, result) {
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
        res.send({ statusCode: 400, message: "Failed" });
    };
};

//get customized cakes list by above5kg
const GetAbove5kgCustomizeCakeList = (req, res) => {

    const Above5KG = req.params.above;
    try {
        CustomizeCakeModel.find({ Above5KG: Above5KG }, function (err, result) {
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
        res.send({ statusCode: 400, message: "Failed" });
    };
};

//get customized cakes by vendor id
const GetCustomizeCakeListByVendorId = (req, res) => {

    const VendorID = req.params.id;
    try {
        CustomizeCakeModel.find({ VendorID: VendorID }, function (err, result) {
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
        res.send({ statusCode: 400, message: "Failed" });
    };
};

//get new customized cakes list by vendor id
const GetNewCustomizeCakeListByVendorId = (req, res) => {

    const Id = req.params.id;
    const Status = req.params.status;
    try {
        CustomizeCakeModel.find({ VendorID: Id, Status: Status }, function (err, result) {
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
        console.log(err);
    };
};

//get customized cakes list by user id
const GetCustomizeCakeListByUserId = (req, res) => {

    const UserID = req.params.id;
    try {
        CustomizeCakeModel.find({ UserID: UserID }, function (err, result) {
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
        res.send({ statusCode: 400, message: "Failed" });
    };
};

//add new customized cake
const AddNewCustomizeCake = async (req, res) => {

    const CakeName = req.body.CakeName;
    const CakeType = req.body.CakeType;
    const EggOrEggless = req.body.EggOrEggless;
    const Flavour = req.body.Flavour; //multiple
    const Shape = req.body.Shape;
    const Weight = req.body.Weight;
    const MessageOnTheCake = req.body.MessageOnTheCake; //Optional
    const SpecialRequest = req.body.SpecialRequest; //Optional
    const DeliveryAddress = req.body.DeliveryAddress; //optional
    const DeliveryDate = req.body.DeliveryDate;
    const DeliverySession = req.body.DeliverySession;
    const DeliveryInformation = req.body.DeliveryInformation;
    const VendorID = req.body.VendorID;
    const Vendor_ID = req.body.Vendor_ID;
    const VendorName = req.body.VendorName;
    const VendorPhoneNumber1 = req.body.VendorPhoneNumber1;
    const VendorPhoneNumber2 = req.body.VendorPhoneNumber2;
    const VendorAddress = req.body.VendorAddress;
    const GoogleLocation = req.body.GoogleLocation;
    const UserID = req.body.UserID;
    const User_ID = req.body.User_ID;
    const UserName = req.body.UserName;
    const UserPhoneNumber = req.body.UserPhoneNumber;
    const PremiumVendor = req.body.PremiumVendor;
    const Created_On = moment().tz('Asia/Kolkata').format("DD-MM-YYYY hh:mm A");
    //files (Optional)
    try {
        var weight, NewWeight;
        if (Weight !== '500g') {
            weight = Weight.match(/([0-9.]+)(?![0-9.])|([a-z]+)(?![a-z])/gi);
            NewWeight = Weight.match(/([0-9.]+)(?![0-9.])|([a-z]+)(?![a-z])/gi)[0] + "kg";
        };
        const NewFlavour = JSON.parse(Flavour);
        var Above5KG, imageUrlList = [], FinalLocation;
        //for check weight above 5kg or not
        if(Weight === '500g'){
            Above5KG = 'n';
            NewWeight = Weight;
            FinalLocation = JSON.parse(GoogleLocation);
        }else if (JSON.parse(parseInt(weight[0])) >= 5) {
            Above5KG = 'y';
        } else {
            Above5KG = 'n';
            FinalLocation = JSON.parse(GoogleLocation);
        };

        //for check file selected or not
        if (req.files !== undefined) {
            for (let i = 0; i < req.files.length; i++) {
                var result = await cloudinary.uploader.upload(req.files[i].path, { width: 640, height: 426, crop: "scale", format: 'webp' });
                imageUrlList.push(result.url);
            };
        } else {
            imageUrlList = [];
        };

        if (CakeType === undefined || EggOrEggless === undefined || Flavour === undefined || User_ID === undefined ||
            Shape === undefined || Weight === undefined || DeliveryDate === undefined ||
            DeliverySession === undefined || DeliveryInformation === undefined || UserID === undefined ||
            UserName === undefined || UserPhoneNumber === undefined) {
            res.send({ statusCode: 400, message: "*required" });
        } else {
            const CustomizeCake = new CustomizeCakeModel({
                CakeName: CakeName,
                CakeType: CakeType,
                EggOrEggless: EggOrEggless,
                Flavour: NewFlavour,
                Shape: Shape,
                Weight: NewWeight,
                Images: imageUrlList,
                MessageOnTheCake: MessageOnTheCake,
                SpecialRequest: SpecialRequest,
                DeliveryAddress: DeliveryAddress,
                DeliveryDate: DeliveryDate,
                DeliverySession: DeliverySession,
                DeliveryInformation: DeliveryInformation,
                Above5KG: Above5KG,
                UserID: UserID,
                User_ID: User_ID,
                UserName: UserName,
                UserPhoneNumber: UserPhoneNumber,
                VendorID: VendorID,
                Vendor_ID: Vendor_ID,
                VendorName: VendorName,
                VendorPhoneNumber1: VendorPhoneNumber1,
                VendorPhoneNumber2: VendorPhoneNumber2,
                VendorAddress: VendorAddress,
                GoogleLocation: FinalLocation,
                PremiumVendor: PremiumVendor,
                Created_On: Created_On
            });
            CustomizeCake.save(function (err, result) {
                if (err) {
                    res.send({ statusCode: 400, message: "Failed1" });
                } else {
                    const Notification = new UserNotificationModel({
                        CustomizedCakeID: result._id,
                        CustomizedCake_ID: result.Id,
                        Image: result.Images[0],
                        CakeName: result.CakeName,
                        Status: result.Status,
                        Status_Updated_On: result.Created_On,
                        UserID: result.UserID,
                        User_ID: result.User_ID,
                        UserName: result.UserName,
                        CustomizedCake: 'y'
                    });
                    Notification.save(function (err) {
                        if (err) {
                            res.send({ statusCode: 400, message: "Failed" });
                        } else {
                            if (result.VendorID) {
                                const VendorNotification = new VendorNotificationModel({
                                    CustomizedCakeID: result._id,
                                    CustomizedCake_ID: result.Id,
                                    Image: result.Images[0],
                                    CakeName: result.CakeName,
                                    Status: result.Status,
                                    Status_Updated_On: result.Created_On,
                                    VendorID: result.VendorID,
                                    Vendor_ID: result.Vendor_ID,
                                    UserName: result.UserName,
                                    CustomizedCake: 'y'
                                });
                                VendorNotification.save(function (err) {
                                    if (err) {
                                        res.send({ statusCode: 400, message: "Failed" });
                                    } else {
                                        res.send({ statusCode: 200, message: "Added Successfully" });
                                    }
                                });
                            } else {
                                res.send({ statusCode: 200, message: "Added Successfully" });
                            }
                        }
                    });
                }
            });
        };
    } catch (err) {
        res.send({ statusCode: 400, message: "Failed2", error: err });
    };
};

//assign above 5kg customized cake to vendors
const AssignCustomizecake = (req, res) => {

    const Id = req.params.id;
    const VendorID = req.body.VendorID;
    const Vendor_ID = req.body.Vendor_ID;
    const VendorName = req.body.VendorName;
    const VendorPhoneNumber1 = req.body.VendorPhoneNumber1;
    const VendorPhoneNumber2 = req.body.VendorPhoneNumber2;
    const VendorAddress = req.body.VendorAddress;
    const GoogleLocation = req.body.GoogleLocation;
    const Status = req.body.Status;
    const Status_Updated_By = req.body.Status_Updated_By;
    const Status_Updated_On = moment().tz('Asia/Kolkata').format("DD-MM-YYYY hh:mm A");
    try {
        if (!VendorID || !Vendor_ID || !VendorName || !VendorPhoneNumber1 || !VendorPhoneNumber2 || !VendorAddress || !Status || !Status_Updated_By || !GoogleLocation) {
            res.send({ statusCode: 400, message: '*required' });
        } else {
            CustomizeCakeModel.findOneAndUpdate({ _id: Id }, {
                $set: {
                    VendorID: VendorID,
                    Vendor_ID: Vendor_ID,
                    VendorName: VendorName,
                    VendorPhoneNumber1: VendorPhoneNumber1,
                    VendorPhoneNumber2: VendorPhoneNumber2,
                    VendorAddress: VendorAddress,
                    GoogleLocation: GoogleLocation,
                    Status: Status,
                    Status_Updated_By: Status_Updated_By,
                    Status_Updated_On: Status_Updated_On
                }
            }, function (err, result) {
                if (err) {
                    res.send({ statusCode: 400, message: 'Failed' });
                } else {
                    const VendorNotification = new VendorNotificationModel({
                        CustomizedCakeID: result._id,
                        CustomizedCake_ID: result.Id,
                        Image: result.Images[0],
                        CakeName: result.CakeName,
                        Status: Status,
                        Status_Updated_On: Status_Updated_On,
                        VendorID: VendorID,
                        Vendor_ID: Vendor_ID,
                        UserName: result.UserName,
                        CustomizedCake: 'y'
                    });
                    VendorNotification.save(function (err) {
                        if (err) {
                            res.send({ statusCode: 400, message: "Failed" });
                        } else {
                            res.send({ statusCode: 200, message: 'Assigned successfully' });
                        }
                    });
                }
            });
        }
    } catch (err) {
        res.send({ statusCode: 400, message: 'Failed' });
    };
};

//send price invoice to users by vendors
const CustomizeCakePriceInvoice = (req, res) => {

    const Id = req.params.id;
    const CakeType = req.body.CakeType;
    const EggOrEggless = req.body.EggOrEggless;
    const Flavour = req.body.Flavour; //multiple //array of object
    const Shape = req.body.Shape;
    // const Article = req.body.Article; //Optional //object
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
    const VendorPhoneNumber1 = req.body.VendorPhoneNumber1;
    const VendorPhoneNumber2 = req.body.VendorPhoneNumber2;
    const VendorAddress = req.body.VendorAddress;
    const GoogleLocation = req.body.GoogleLocation;
    const UserID = req.body.UserID;
    const User_ID = req.body.User_ID;
    const UserName = req.body.UserName;
    const UserPhoneNumber = req.body.UserPhoneNumber;
    const Status = req.body.Status;
    const Notification = req.body.Notification;
    const Price = req.body.Price;
    const Discount = req.body.Discount; //Optional
    const Gst = req.body.Gst;
    const Sgst = req.body.Sgst;
    const Total = req.body.Total;
    const ExtraCharges = req.body.ExtraCharges; //Optional
    const Tax = req.body.Tax;
    const Invoice_Sent_By = req.body.Invoice_Sent_By;
    const Invoice_Sent_On = moment().tz('Asia/Kolkata').format("DD-MM-YYYY hh:mm A");
    try {
        CustomizeCakeModel.findOneAndUpdate({ _id: Id }, {
            $set: {
                CakeType: CakeType,
                EggOrEggless: EggOrEggless,
                Flavour: Flavour,
                Shape: Shape,
                Weight: Weight,
                MessageOnTheCake: MessageOnTheCake,
                SpecialRequest: SpecialRequest,
                DeliveryAddress: DeliveryAddress,
                DeliveryDate: DeliveryDate,
                DeliverySession: DeliverySession,
                DeliveryInformation: DeliveryInformation,
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
                Status: Status,
                Notification: Notification,
                Price: Price,
                Discount: Discount,
                Gst: Gst,
                Sgst: Sgst,
                Tax: Tax,
                Total: Total,
                ExtraCharges: ExtraCharges,
                Invoice_Sent_By: Invoice_Sent_By,
                Invoice_Sent_On: Invoice_Sent_On,
            }
        }, function (err, result) {
            if (err) {
                res.send({ statusCode: 400, message: 'Failed' });
            } else {
                const Notification = new UserNotificationModel({
                    CustomizedCakeID: result._id,
                    CustomizedCake_ID: result.Id,
                    Image: result.Images[0],
                    CakeName: result.CakeName,
                    Status: Status,
                    Status_Updated_On: Invoice_Sent_On,
                    UserID: result.UserID,
                    User_ID: result.User_ID,
                    UserName: result.UserName,
                    CustomizedCake: 'y'
                });
                Notification.save(function (err) {
                    if (err) {
                        res.send({ statusCode: 400, message: "Failed" });
                    } else {
                        res.send({ statusCode: 200, message: 'Invoice Sent Successfully' });
                    }
                });

            }
        });
    } catch (err) {
        res.send({ statusCode: 400, message: 'Failed' });
    };
};

//confirm order
const CustomizeCakeConfirmOrder = (req, res) => {

    const Id = req.params.id;
    const PaymentType = req.body.PaymentType;
    const PaymentStatus = req.body.PaymentStatus;
    const DeliveryCharge = req.body.DeliveryCharge;
    const Discount = req.body.Discount;
    const Gst = req.body.Gst;
    const Sgst = req.body.Sgst;
    const Total = req.body.Total;
    const ExtraCharges = req.body.ExtraCharges;
    const Created_On = moment().tz('Asia/Kolkata').format("DD-MM-YYYY hh:mm A");
    try {
        CustomizeCakeModel.findOne({ _id: Id }, function (err, result) {
            if (err) {
                res.send({ statusCode: 400, message: 'Failed' });
            } else {
                var CakeImage, FinalShape;
                if (result.Images.length !== 0) {
                    CakeImage = result.Images[0]
                };
                FinalShape = {
                    Name: result.Shape, Price: "0"
                };
                const OrderList = new OrdersListModel({
                    CakeID: result._id.toString(),
                    Cake_ID: result.Id,
                    TypeOfCake: result.TypeOfCake,
                    Images: CakeImage,
                    EggOrEggless: result.EggOrEggless,
                    Price: result.Price,
                    Flavour: result.Flavour, //array
                    Shape: FinalShape,
                    MessageOnTheCake: result.MessageOnTheCake,
                    SpecialRequest: result.SpecialRequest,
                    Weight: result.Weight,
                    UserID: result.UserID,
                    User_ID: result.User_ID,
                    UserName: result.UserName,
                    UserPhoneNumber: result.UserPhoneNumber,
                    VendorID: result.VendorID,
                    Vendor_ID: result.Vendor_ID,
                    VendorName: result.VendorName,
                    VendorPhoneNumber: result.VendorPhoneNumber,
                    VendorAddress: result.VendorAddress,
                    GoogleLocation: result.GoogleLocation,
                    DeliveryAddress: result.DeliveryAddress,
                    DeliveryDate: result.DeliveryDate,
                    DeliverySession: result.DeliverySession,
                    ItemCount: 1,
                    Total: Total,
                    DeliveryCharge: DeliveryCharge,
                    PaymentType: PaymentType,
                    PaymentStatus: PaymentStatus,
                    Discount: Discount,
                    DeliveryInformation: result.DeliveryInformation,
                    Gst: Gst,
                    Sgst: Sgst,
                    Tax: result.Tax,
                    ExtraCharges: ExtraCharges,
                    CustomizeCake: 'y',
                    Created_On: Created_On
                });
                OrderList.save(function (err, result) {
                    if (err) {
                        res.send({ statusCode: 400, message: 'Failed' });
                    } else {
                        CustomizeCakeModel.findOneAndUpdate({ _id: Id }, {
                            $set: {
                                Status: 'Ordered',
                                Status_Updated_On: Created_On
                            }
                        }, function (err) {
                            if (err) {
                                res.send({ statusCode: 400, message: 'Failed' });
                            } else {
                                const Notification = new UserNotificationModel({
                                    OrderID: result._id,
                                    Order_ID: result.Id,
                                    Image: result.Image,
                                    CakeName: result.CakeName,
                                    Status: result.Status,
                                    Status_Updated_On: result.Created_On,
                                    UserID: result.UserID,
                                    User_ID: result.User_ID,
                                    UserName: result.UserName,
                                    CustomizedCake: 'y'
                                });
                                Notification.save(function (err) {
                                    if (err) {
                                        res.send({ statusCode: 400, message: "Failed" });
                                    } else {
                                        const VendorNotification = new VendorNotificationModel({
                                            OrderID: result._id,
                                            Order_ID: result.Id,
                                            Image: result.Image,
                                            CakeName: result.CakeName,
                                            Status: result.Status,
                                            Status_Updated_On: result.Created_On,
                                            VendorID: result.VendorID,
                                            Vendor_ID: result.Vendor_ID,
                                            UserName: result.UserName,
                                            CustomizedCake: 'y'
                                        });
                                        VendorNotification.save(function (err) {
                                            if (err) {
                                                res.send({ statusCode: 400, message: "Failed" });
                                            } else {
                                                res.send({ statusCode: 200, message: 'Assigned successfully' });
                                            }
                                        });
                                        // res.send({ statusCode: 200, message: 'Order Placed Successfully' });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    } catch (err) {
        res.send({ statusCode: 400, message: 'Failed' });
    };
};

//update customized cakes notification status
const ChangeNotificationStatus = (req, res) => {

    const Id = req.params.id;
    const Notification_Updated_On = moment().tz('Asia/Kolkata').format("DD-MM-YYYY hh:mm A");
    try {
        CustomizeCakeModel.findOneAndUpdate({ _id: Id }, {
            $set: {
                Notification: 'seen',
                Notification_Updated_On: Notification_Updated_On
            }
        }, function (err, result) {
            if (err) {
                res.send({ statusCode: 400, message: 'Failed' });
            } else {
                res.send({ statusCode: 200, message: 'Notification Updated Successfully' });
            }
        });
    } catch (err) {
        res.send({ statusCode: 400, message: 'Failed' });
    };
};

const CancelCustomizedCakeOrder = (req, res) => {
    const id = req.params.id;
    const Cancelled_By = req.body.Cancelled_By;
    const Status_Updated_By = req.body.Status_Updated_By;
    const Status_Updated_On = moment().tz('Asia/Kolkata').format("DD-MM-YYYY hh:mm A");

    try {
        CustomizeCakeModel.findOneAndUpdate({ _id: id }, {
            $set: {
                Status: 'Cancelled',
                Cancelled_By: Cancelled_By,
                Status_Updated_By: Status_Updated_By,
                Status_Updated_On: Status_Updated_On
            }
        }, function (err, result) {
            if (err) {
                res.send({ statusCode: 400, message: 'Failed' });
            } else {
                res.send({ statusCode: 200, message: 'Order Cancelled' });
            }
        })
    } catch (err) {
        res.send({ statusCode: 400, message: 'Failed' });
    }

};

module.exports = {

    AddNewCustomizeCake,
    GetCustomizeCakeList,
    NewCustomizedCakeList,
    GetAbove5kgCustomizeCakeList,
    GetCustomizeCakeListByVendorId,
    GetCustomizeCakeListByUserId,
    GetNewCustomizeCakeListByVendorId,
    AssignCustomizecake,
    CustomizeCakePriceInvoice,
    CustomizeCakeConfirmOrder,
    ChangeNotificationStatus,
    CancelCustomizedCakeOrder

}