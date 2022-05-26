const CustomizeCakeModel = require('../models/CustomizeCakeModels');
const OrdersListModel = require("../models/OrdersListModels");
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
        const weight = Weight.match(/([0-9.]+)(?![0-9.])|([a-z]+)(?![a-z])/gi);
        const NewFlavour = JSON.parse(Flavour);
        const NewArticle = JSON.parse(Article);

        if (JSON.parse(parseInt(weight[0])) >= 5) {
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
                        Flavour: NewFlavour,
                        Shape: Shape,
                        Weight: Weight,
                        Article: NewArticle,
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
                        Flavour: NewFlavour,
                        Shape: Shape,
                        Weight: Weight,
                        Article: NewArticle,
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
        }
        else {
            if (TypeOfCake === undefined || EggOrEggless === undefined || Flavour === undefined || Vendor_ID === undefined ||
                Shape === undefined || Weight === undefined || DeliveryAddress === undefined || DeliveryDate === undefined ||
                DeliverySession === undefined || DeliveryInformation === undefined || VendorID === undefined || User_ID === undefined ||
                VendorName === undefined || VendorPhoneNumber === undefined || VendorAddress === undefined || UserID === undefined ||
                UserName === undefined || UserPhoneNumber === undefined) {
                res.send({ statusCode: 400, message: "*required" });
            } else {
                if (req.files === undefined) {
                    console.log(NewFlavour)
                    const CustomizeCake = new CustomizeCakeModel({
                        TypeOfCake: TypeOfCake,
                        EggOrEggless: EggOrEggless,
                        Flavour: NewFlavour,
                        Shape: Shape,
                        Weight: Weight,
                        Article: NewArticle,
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
                        Flavour: NewFlavour,
                        Shape: Shape,
                        Weight: Weight,
                        Article: NewArticle,
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
    const VendorID = req.body.VendorID;
    const Vendor_ID = req.body.Vendor_ID;
    const VendorName = req.body.VendorName;
    const VendorPhoneNumber = req.body.VendorPhoneNumber;
    const VendorAddress = req.body.VendorAddress;
    const Status = req.body.Status;
    const Status_Updated_By = req.body.Status_Updated_By;
    const Status_Updated_On = moment().tz('Asia/Kolkata').format("DD-MM-YYYY hh:mm A");

    try {
        if (!VendorID || !Vendor_ID || !VendorName || !VendorPhoneNumber || !VendorAddress || !Status || !Status_Updated_By) {
            res.send({ statusCode: 400, message: '*required' });
        } else {
            CustomizeCakeModel.findOneAndUpdate({ _id: Id }, {
                $set: {
                    VendorID: VendorID,
                    Vendor_ID: Vendor_ID,
                    VendorName: VendorName,
                    VendorPhoneNumber: VendorPhoneNumber,
                    VendorAddress: VendorAddress,
                    Status: Status,
                    Status_Updated_By: Status_Updated_By,
                    Status_Updated_On: Status_Updated_On
                }
            }, function (err, result) {
                if (err) {
                    res.send({ statusCode: 400, message: 'Failed' });
                } else {
                    res.send({ statusCode: 200, message: 'Assigned successfully' });
                }
            });
        }
    } catch (err) {
        res.send({ statusCode: 400, message: 'Failed' });
    }
};

const CustomizeCakePriceInvoice = (req, res) => {
    const Id = req.params.id;
    const TypeOfCake = req.body.TypeOfCake;
    const EggOrEggless = req.body.EggOrEggless;
    const Flavour = req.body.Flavour; //multiple //array of object
    const Shape = req.body.Shape;
    const Article = req.body.Article; //Optional //object
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
    const Status = req.body.Status;
    const Notification = req.body.Notification;
    const Price = req.body.Price;
    const Discount = req.body.Discount; //Optional
    const Gst = req.body.Gst;
    const Sgst = req.body.Sgst;
    const Total = req.body.Total;
    const ExtraCharges = req.body.ExtraCharges; //Optional
    const Invoice_Sent_By = req.body.Invoice_Sent_By;
    const Invoice_Sent_On = moment().tz('Asia/Kolkata').format("DD-MM-YYYY hh:mm A");

    try {
        CustomizeCakeModel.findOneAndUpdate({ _id: Id }, {
            $set: {
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
                Status: Status,
                Notification: Notification,
                Price: Price,
                Discount: Discount,
                Gst: Gst,
                Sgst: Sgst,
                Total: Total,
                ExtraCharges: ExtraCharges,
                Invoice_Sent_By: Invoice_Sent_By,
                Invoice_Sent_On: Invoice_Sent_On,
            }
        }, function (err, result) {
            if (err) {
                res.send({ statusCode: 400, message: 'Failed' });
            } else {
                res.send({ statusCode: 200, message: 'Invoice Sent Successfully' });
            }
        })
    } catch (err) {
        res.send({ statusCode: 400, message: 'Failed' });
    }

};

const CustomizeCakeConfirmOrder = (req, res) => {
    const Id = req.params.id;
    const PaymentType = req.body.PaymentType;
    const PaymentStatus = req.body.PaymentStatus;
    const DeliveryCharge = req.body.DeliveryCharge;
    const Price = req.body.Price;
    const Created_On = moment().tz('Asia/Kolkata').format("DD-MM-YYYY hh:mm A");

    try {
        CustomizeCakeModel.findOne({ _id: Id }, function (err, result) {
            if (err) {
                res.send({ statusCode: 400, message: 'Failed' });
            } else {
                const OrderList = new OrdersListModel({
                    CakeID: result._id.toString(),
                    Cake_ID: result.Id,
                    TypeOfCake: result.TypeOfCake,
                    Images: result.Images[0],
                    EggOrEggless: result.EggOrEggless,
                    Price: Price,
                    Flavour: result.Flavour, //array
                    Shape: result.Shape,
                    Article: result.Article, //Object
                    MessageOnTheCake: result.MessageOnTheCake,
                    SpecialRequest: result.SpecialRequest,
                    Weight: result.Weight,
                    UserID: result.UserID,
                    User_ID: result.User_ID,
                    UserName: result.UserName,
                    UserPhoneNumber: result.UserPhoneNumber,
                    DeliveryAddress: result.DeliveryAddress,
                    DeliveryDate: result.DeliveryDate,
                    DeliverySession: result.DeliverySession,
                    ItemCount: 1,
                    Total: result.Total,
                    DeliveryCharge: DeliveryCharge,
                    PaymentType: PaymentType,
                    PaymentStatus: PaymentStatus,
                    Discount: result.Discount,
                    DeliveryInformation: result.DeliveryInformation,
                    Gst: result.Gst,
                    Sgst: result.Sgst,
                    ExtraCharges: result.ExtraCharges,
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
                        }, function (err, result) {
                            res.send({ statusCode: 200, message: 'Order Placed Successfully' });
                        })
                    }
                })
            }
        })
    } catch (err) {
        res.send({ statusCode: 400, message: 'Failed' });
    }
};

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
        })
    } catch (err) {
        res.send({ statusCode: 400, message: 'Failed' });
    }
};

module.exports = {
    AddNewCustomizeCake,
    GetCustomizeCakeList,
    GetAbove5kgCustomizeCakeList,
    GetCustomizeCakeListByVendorId,
    GetCustomizeCakeListByUserId,
    GetNewCustomizeCakeListByVendorId,
    AssignCustomizecake,
    CustomizeCakePriceInvoice,
    CustomizeCakeConfirmOrder,
    ChangeNotificationStatus
}