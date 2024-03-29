const HampersModel = require("../models/HampersModels");
const OtherProductOrdersModel = require("../models/OtherProductOrdersModels");
const AdminNotificationModel = require('../models/AdminNotificationModels');
const VendorNotificationModel = require("../models/VendorNotification");
const UserNotificationModel = require("../models/UserNotification");
const HamperOrderModel = require('../models/HamperOrdersListModels');
const OrdersListModel = require("../models/OrdersListModels");
const moment = require('moment-timezone');
const cloudinary = require("../middleware/cloudnary");

const CreateHampers = async (req, res) => {
    const VendorID = req.body.VendorID;
    const Vendor_ID = req.body.Vendor_ID;
    const VendorName = req.body.VendorName;
    const VendorPhoneNumber1 = req.body.VendorPhoneNumber1;
    const VendorPhoneNumber2 = req.body.VendorPhoneNumber2;
    const VendorAddress = req.body.VendorAddress;
    const GoogleLocation = req.body.GoogleLocation;
    const HampersName = req.body.HampersName;
    const Title = req.body.Title;
    const Occasion = req.body.Occasion;
    const Weight = req.body.Weight;
    const EggOrEggless = req.body.EggOrEggless;
    const StartDate = req.body.StartDate;
    const EndDate = req.body.EndDate;
    const DeliveryStartDate = req.body.DeliveryStartDate;
    const DeliveryEndDate = req.body.DeliveryEndDate;
    const Price = req.body.Price;
    const Product_Contains = req.body.Product_Contains;
    const Description = req.body.Description;
    const Created_On = moment().tz('Asia/Kolkata').format("DD-MM-YYYY hh:mm A");
    //file - HamperImage,AdditionalHamperImage

    try {
        if (VendorID || Vendor_ID || VendorName || VendorPhoneNumber1 || VendorAddress || GoogleLocation || HampersName
            || Price || Description || Title || Occasion || Weight || StartDate || EndDate || DeliveryStartDate|| DeliveryEndDate || EggOrEggless) {
                const Image = await cloudinary.uploader.upload(req.files['HamperImage'][0].path, { width: 640, height: 426, crop: "scale", format: 'webp' });
            let FinalAdditionalHamperImages=[];
            if (req.files['AdditionalHamperImage'] !== undefined) {
                for (let i = 0; i < req.files['AdditionalHamperImage'].length; i++) {
                    var result = await cloudinary.uploader.upload(req.files['AdditionalHamperImage'][i].path, { width: 640, height: 426, crop: "scale", format: 'webp' });
                    FinalAdditionalHamperImages.push(result.url);
                }
            } else {
                FinalAdditionalHamperImages = [];
            };
            const FinalLocation = JSON.parse(GoogleLocation);
            const FinalProduct_Contains = JSON.parse(Product_Contains);
            const FinalOccasion = Occasion;

            const NewHampers = HampersModel({
                VendorID: VendorID,
                Vendor_ID: Vendor_ID,
                VendorName: VendorName,
                VendorPhoneNumber1: VendorPhoneNumber1,
                VendorPhoneNumber2: VendorPhoneNumber2,
                VendorAddress: VendorAddress,
                GoogleLocation: FinalLocation,
                EggOrEggless: EggOrEggless,
                HampersName: HampersName?.toLowerCase().replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase()),
                Title: Title?.toLowerCase().replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase()),
                Occasion: FinalOccasion?.toLowerCase().replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase()),
                Weight: Weight,
                StartDate: StartDate,
                EndDate: EndDate,
                DeliveryStartDate: DeliveryStartDate,
                DeliveryEndDate: DeliveryEndDate,
                Price: Price,
                Product_Contains: FinalProduct_Contains,
                HamperImage: Image.url,
                AdditionalHamperImage: FinalAdditionalHamperImages,
                Description: Description?.toLowerCase().replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase()),
                Created_On: Created_On,
            });
            NewHampers.save(function (err, result) {
                if (err) {
                    res.send({ statusCode: 400, message: 'Failed' });
                } else {
                    const AddNotification = AdminNotificationModel({
                        NotificationType: 'New Hampers',
                        VendorID: result.VendorID,
                        Vendor_ID: result.Vendor_ID,
                        VendorName: result.VendorName,
                        Id: result._id,
                        Image: result.HamperImage,
                        Created_On: result.Created_On
                    });
                    AddNotification.save(function (err) {
                        if (err) {
                            res.send({ statusCode: 400, message: "Failed" });
                        } else {
                            res.send({ statusCode: 200, message: "Hamper Added Successfully" });
                        }
                    });
                }
            });
        } else {
            res.send({ statusCode: 400, message: 'required' });
        }
    } catch (err) {
        res.send({ statusCode: 400, message: 'Failed' });
    }
};

const UpdateHampers = async (req, res) => {
    const Id = req.params.id;
    const VendorID = req.body.VendorID;
    const Vendor_ID = req.body.Vendor_ID;
    const VendorName = req.body.VendorName;
    const VendorPhoneNumber1 = req.body.VendorPhoneNumber1;
    const VendorPhoneNumber2 = req.body.VendorPhoneNumber2;
    const VendorAddress = req.body.VendorAddress;
    const GoogleLocation = req.body.GoogleLocation;
    const HampersName = req.body.HampersName;
    const Title = req.body.Title;
    const Occasion = req.body.Occasion;
    const EggOrEggless = req.body.EggOrEggless;
    const Weight = req.body.Weight;
    const StartDate = req.body.StartDate;
    const EndDate = req.body.EndDate;
    const DeliveryStartDate = req.body.DeliveryStartDate;
    const DeliveryEndDate = req.body.DeliveryEndDate;
    const Price = req.body.Price;
    const Product_Contains = req.body.Product_Contains;
    const Description = req.body.Description;
    const OldAdditionalHamperImage = req.body.OldAdditionalHamperImage;
    const Modified_On = moment().tz('Asia/Kolkata').format("DD-MM-YYYY hh:mm A");
    //file - HamperImage, AdditionalHamperImage
    try {
        var Image, OldAdditionalImages = [];
        if (req.files['HamperImage'] !== undefined) {
            var ImageURL = await cloudinary.uploader.upload(req.files['HamperImage'][0].path);
            Image = ImageURL.url
        }

        if (OldAdditionalHamperImage) {
            OldAdditionalImages = JSON.parse(OldAdditionalHamperImage);
        } else {
            OldAdditionalImages = [];
        };
        if (req.files['AdditionalHamperImage'] !== undefined) {
            for (let i = 0; i < req.files['AdditionalHamperImage'].length; i++) {
                var result = await cloudinary.uploader.upload(req.files['AdditionalHamperImage'][i].path, { width: 640, height: 426, crop: "scale", format: 'webp' });
                OldAdditionalImages.push(result.url);
            }
        };
        const FinalLocation = JSON.parse(GoogleLocation);
        const FinalProduct_Contains = JSON.parse(Product_Contains);
        const FinalOccasion = Occasion;

        HampersModel.findOneAndUpdate({ _id: Id }, {
            $set: {
                VendorID: VendorID,
                Vendor_ID: Vendor_ID,
                VendorName: VendorName,
                VendorPhoneNumber1: VendorPhoneNumber1,
                VendorPhoneNumber2: VendorPhoneNumber2,
                VendorAddress: VendorAddress,
                GoogleLocation: FinalLocation,
                HampersName: HampersName?.toLowerCase().replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase()),
                Title: Title?.toLowerCase().replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase()),
                Occasion: FinalOccasion,
                EggOrEggless: EggOrEggless,
                Weight: Weight,
                StartDate: StartDate,
                EndDate: EndDate,
                DeliveryStartDate: DeliveryStartDate,
                DeliveryEndDate: DeliveryEndDate,
                Price: Price,
                Product_Contains: FinalProduct_Contains,
                HamperImage: Image,
                AdditionalHamperImage: OldAdditionalImages,
                Description: Description?.toLowerCase().replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase()),
                Modified_On: Modified_On,
                Status: 'Updated'
            }
        }, function (err, result) {
            if (err) {
                res.send({ statusCode: 400, message: 'Failed' });
            } else {
                const AddNotification = AdminNotificationModel({
                    NotificationType: 'Hamper Updated',
                    VendorID: result.VendorID,
                    Vendor_ID: result.Vendor_ID,
                    VendorName: result.VendorName,
                    Id: result._id,
                    Image: result.HamperImage,
                    Created_On: result.Created_On
                });
                AddNotification.save(function (err) {
                    if (err) {
                        res.send({ statusCode: 400, message: "Failed" });
                    } else {
                        res.send({ statusCode: 200, message: 'Hamper Updated Successfully' });
                    }
                });
            }
        });
    } catch (err) {
        res.send({ statusCode: 400, message: 'Failed' });
    }
};

const GetHampersList = (req, res) => {
    try {
        HampersModel.find({}, function (err, result) {
            if (err) {
                res.send({ statusCode: 400, message: 'Failed' });
            } else {
                if (result.length === 0) {
                    res.send({ message: 'No Records Found' });
                } else {
                    res.send(result.reverse());
                }
            }
        });
    } catch (err) {
        res.send({ statusCode: 400, message: 'Failed' });
    }
};

const GetVendorsHampersList = (req, res) => {
    const Id = req.params.id;
    try {
        HampersModel.find({ VendorID: Id }, function (err, result) {
            if (err) {
                res.send({ statusCode: 400, message: 'Failed' });
            } else {
                if (result.length === 0) {
                    res.send({ message: 'No Records Found' });
                } else {
                    res.send(result.reverse());
                }
            }
        });
    } catch (err) {
        res.send({ statusCode: 400, message: 'Failed' });
    }
};

const GetApprovedHampersList = (req, res) => {
    try {
        HampersModel.find({ Status: 'Approved' }, function (err, result) {
            if (err) {
                res.send({ statusCode: 400, message: 'Failed' });
            } else {
                if (result.length === 0) {
                    res.send({ message: 'No Records Found' });
                } else {
                    let StartArray = [], EndArray = [], FinalArray = [];
                    result.filter(val => {
                        let StartDateDiff = moment(val.StartDate, 'DD-MM-YYYY').diff(moment(new Date(), 'DD-MM-YYYY'));
                        let EndDateDiff = moment(val.EndDate, 'DD-MM-YYYY').diff(moment(new Date(), 'DD-MM-YYYY'));
                        if (StartDateDiff <= 0) {
                            StartArray.push(val)
                        };
                        if (EndDateDiff >= 0) {
                            EndArray.push(val);
                        };
                    });
                    StartArray.filter(val1 => {
                        EndArray.filter(val2 => {
                            if (val1._id.toString() === val2._id.toString()) {
                                FinalArray.push(val2)
                            }
                        });
                    });
                    if (FinalArray.length === 0) {
                        res.send({ message: 'No Records Found' });
                    } else {
                        res.send(FinalArray);
                    }
                }
            }
        });
    } catch (err) {
        res.send({ statusCode: 400, message: 'Failed' });
    }
};

const GetHamperDetailsById = (req, res) => {
    const Id = req.params.id;
    try {
        HampersModel.findOne({ _id: Id }, function (err, result) {
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

const ApproveHampers = async (req, res) => {
    const Id = req.params.id;
    const Status = req.body.Status;
    const Status_Updated_By = req.body.Status_Updated_By;
    const Status_Updated_On = moment().tz('Asia/Kolkata').format("DD-MM-YYYY hh:mm A");
    //file - ApproveImage
    try {
        if (req.file) {
            var Image;
            var ImageURL = await cloudinary.uploader.upload(req.file.path);
            Image = ImageURL.url;

            HampersModel.findOneAndUpdate({ _id: Id }, {
                $set: {
                    Status: Status,
                    ApproveImage: Image,
                    Status_Updated_By: Status_Updated_By,
                    Status_Updated_On: Status_Updated_On,
                }
            }, function (err, result) {
                if (err) {
                    res.send({ statusCode: 400, message: 'Failed' });
                } else {
                    const Notification = VendorNotificationModel({
                        HamperID: result._id,
                        Hamper_ID: result.Id,
                        Image: result.ApproveImage,
                        CakeName: result.HampersName,
                        Status: Status,
                        Status_Updated_On: Status_Updated_On,
                        VendorID: result.VendorID,
                        Vendor_ID: result.Vendor_ID,
                        For_Display: 'Your Hamper Image is Changed and Approved'
                    });
                    Notification.save(function (err) {
                        if (err) {
                            res.send({ statusCode: 400, message: "Failed" });
                        } else {
                            res.send({ statusCode: 200, message: 'Hamper Approved Successfully' });
                        }
                    });
                }
            });
        } else {
            HampersModel.findOneAndUpdate({ _id: Id }, {
                $set: {
                    Status: Status,
                    Status_Updated_By: Status_Updated_By,
                    Status_Updated_On: Status_Updated_On,
                }
            }, function (err, result) {
                if (err) {
                    res.send({ statusCode: 400, message: 'Failed' });
                } else {
                    const Notification = VendorNotificationModel({
                        HamperID: result._id,
                        Hamper_ID: result.Id,
                        Image: result.HamperImage,
                        CakeName: result.HampersName,
                        Status: Status,
                        Status_Updated_On: Status_Updated_On,
                        VendorID: result.VendorID,
                        Vendor_ID: result.Vendor_ID,
                        For_Display: 'Your Hamper is Approved'
                    });
                    Notification.save(function (err) {
                        if (err) {
                            res.send({ statusCode: 400, message: "Failed" });
                        } else {
                            res.send({ statusCode: 200, message: 'Hamper Approved Successfully' });
                        }
                    });
                }
            });
        }
    } catch (err) {
        res.send({ statusCode: 400, message: 'Failed' });
    }
};

const RemoveHampers = (req, res) => {
    const Id = req.params.id;
    try {
        HampersModel.findOneAndDelete({ _id: Id }, function (err) {
            if (err) {
                res.send({ statusCode: 400, message: 'Failed' });
            } else {
                res.send({ statusCode: 200, message: 'Hamper Deleted Successfully' });
            }
        });
    } catch (err) {
        res.send({ statusCode: 400, message: 'Failed' });
    };
};

const OrderHampers = (req, res) => {
    const HamperID = req.body.HamperID;
    const Hamper_ID = req.body.Hamper_ID;
    const HampersName = req.body.HampersName;
    const Product_Contains = req.body.Product_Contains;
    const HamperImage = req.body.HamperImage;
    const Title = req.body.Title;
    const Weight = req.body.Weight;
    const Price = req.body.Price;
    const Description = req.body.Description;
    const EggOrEggless = req.body.EggOrEggless;
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
    const DeliveryAddress = req.body.DeliveryAddress;
    const DeliveryDate = req.body.DeliveryDate;
    const DeliverySession = req.body.DeliverySession;
    const DeliveryInformation = req.body.DeliveryInformation;
    const ItemCount = req.body.ItemCount;
    const DeliveryCharge = req.body.DeliveryCharge;
    const Discount = req.body.Discount;
    const Gst = req.body.Gst;
    const Sgst = req.body.Sgst;
    const Tax = req.body.Tax;
    const Total = req.body.Total;
    const PaymentType = req.body.PaymentType;
    const PaymentStatus = req.body.PaymentStatus;
    const Created_On = moment().tz('Asia/Kolkata').format("DD-MM-YYYY hh:mm A");
    const Status_Updated_On = moment().tz('Asia/Kolkata').format("DD-MM-YYYY hh:mm A");

    try {
        if (HamperID || Hamper_ID || HampersName || Product_Contains || EggOrEggless || HamperImage || Price || Description ||
            VendorID || Vendor_ID || VendorName || VendorPhoneNumber1 || VendorAddress || GoogleLocation ||
            UserID || User_ID || UserName || UserPhoneNumber || DeliveryDate || DeliverySession ||
            DeliveryInformation || ItemCount || DeliveryCharge || Total || PaymentType || PaymentStatus ||
            Gst || Sgst || Tax || Discount) {
            const NewHamperOrder = HamperOrderModel({
                HamperID: HamperID,
                Hamper_ID: Hamper_ID,
                HampersName: HampersName,
                Product_Contains: Product_Contains,
                HamperImage: HamperImage,
                Title: Title,
                Weight: Weight,
                Price: Price,
                Description: Description,
                EggOrEggless: EggOrEggless,
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
                ItemCount: ItemCount,
                DeliveryCharge: DeliveryCharge,
                Discount: Discount,
                Gst: Gst,
                Sgst: Sgst,
                Tax: Tax,
                Total: Total,
                PaymentType: PaymentType,
                PaymentStatus: PaymentStatus,
                Created_On: Created_On,
                Status_Updated_On: Status_Updated_On,
            });
            NewHamperOrder.save(function (err, result) {
                if (err) {
                    res.send({ statusCode: 400, message: 'Failed' });
                } else {
                    const Notification = new UserNotificationModel({
                        HamperID: result._id,
                        Hamper_ID: result.Id,
                        Image: result.HamperImage,
                        CakeName: result.HampersName,
                        Status: result.Status,
                        Status_Updated_On: result.Created_On,
                        UserID: result.UserID,
                        User_ID: result.User_ID,
                        UserName: result.UserName,
                        For_Display: 'New Hamper Order Placed'
                    });
                    Notification.save(function (err) {
                        if (err) {
                            res.send({ statusCode: 400, message: "Failed" });
                        } else {
                            if (result.VendorID) {
                                const VendorNotification = new VendorNotificationModel({
                                    HamperID: result._id,
                                    Hamper_ID: result.Id,
                                    Image: result.HamperImage,
                                    CakeName: result.HampersName,
                                    Status: result.Status,
                                    Status_Updated_On: result.Created_On,
                                    VendorID: result.VendorID,
                                    Vendor_ID: result.Vendor_ID,
                                    UserName: result.UserName,
                                    For_Display: "You Got a New Hamper Order"
                                });
                                VendorNotification.save(function (err) {
                                    if (err) {
                                        res.send({ statusCode: 400, message: "Failed" });
                                    } else {
                                        const AddNotification = AdminNotificationModel({
                                            NotificationType: 'New Hamper Order',
                                            VendorID: result.VendorID,
                                            Vendor_ID: result.Vendor_ID,
                                            VendorName: result.VendorName,
                                            Id: result._id,
                                            Image: result.HamperImage,
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
                            } else {
                                res.send({ statusCode: 200, message: "Order Placed Successfully" });
                            }
                        }
                    });
                }
            });
        } else {
            res.send({ statusCode: 400, message: "required" });
        };
    } catch (err) {
        res.send({ statusCode: 400, message: 'Failed' });
    };
};

const AcceptHamperOrder = (req, res) => {
    const id = req.params.id;
    const Status_Updated_On = moment().tz('Asia/Kolkata').format("DD-MM-YYYY hh:mm A");

    try {
        HamperOrderModel.findOneAndUpdate({ _id: id }, {
            $set: {
                Status: 'Accepted',
                Status_Updated_On: Status_Updated_On
            }
        }, function (err, result) {
            if (err) {
                res.send({ statusCode: 400, message: 'Failed' });
            } else {
                const UserNotification = new UserNotificationModel({
                    HamperID: result._id,
                    Hamper_ID: result.Id,
                    Image: result.HamperImage,
                    CakeName: result.HampersName,
                    Status: 'Accepted',
                    Status_Updated_On: Status_Updated_On,
                    UserID: result.UserID,
                    User_ID: result.User_ID,
                    UserName: result.UserName,
                    For_Display: 'Your Hamper Order Accepted'
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
    } catch (err) {
        res.send({ statusCode: 400, message: 'Failed' });
    };
};

const CancelHamperOrder = (req, res) => {
    const id = req.params.id;
    const Cancelled_By = req.body.Cancelled_By;
    const ReasonForCancel = req.body.ReasonForCancel;
    const Status_Updated_On = moment().tz('Asia/Kolkata').format("DD-MM-YYYY hh:mm A");

    try {
        HamperOrderModel.findOneAndUpdate({ _id: id }, {
            $set: {
                Status: 'Cancelled',
                Cancelled_By: Cancelled_By,
                ReasonForCancel: ReasonForCancel,
                Status_Updated_On: Status_Updated_On
            }
        }, function (err, result) {
            if (err) {
                res.send({ statusCode: 400, message: 'Failed' });
            } else {
                const AddNotification = AdminNotificationModel({
                    NotificationType: 'Hamper Order Cancelled',
                    VendorID: result.VendorID,
                    Vendor_ID: result.Vendor_ID,
                    VendorName: result.VendorName,
                    Id: result._id,
                    Image: result.HamperImage,
                    Created_On: result.Status_Updated_On
                });
                AddNotification.save(function (err) {
                    if (err) {
                        res.send({ statusCode: 400, message: "Failed" });
                    } else {
                        if (Cancelled_By === 'User') {
                            const Notification = VendorNotificationModel({
                                HamperID: result._id,
                                Hamper_ID: result.Id,
                                Image: result.HamperImage,
                                CakeName: result.HampersName,
                                Status: 'Cancelled',
                                Status_Updated_On: Status_Updated_On,
                                VendorID: result.VendorID,
                                Vendor_ID: result.Vendor_ID,
                                UserName: result.UserName,
                                For_Display: "Your Hamper Order is Cancelled"
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
                                HamperID: result._id,
                                Hamper_ID: result.Id,
                                Image: result.HamperImage,
                                CakeName: result.HampersName,
                                Status: 'Cancelled',
                                Status_Updated_On: Status_Updated_On,
                                UserID: result.UserID,
                                User_ID: result.User_ID,
                                UserName: result.UserName,
                                For_Display: 'Your Hamper Order Cancelled'
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
    } catch (err) {
        res.send({ statusCode: 400, message: 'Failed' });
    };
};

const UpdateHamperOrderStatus = async (req, res) => {
    const Id = req.params.id;
    const Status = req.body.Status;
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
            HamperOrderModel.findById({ _id: Id }, function (err, result) {
                if (err) {
                    res.send({ statusCode: 400, message: "Failed" });
                } else if (result === null) {
                    res.send({ statusCode: 400, message: "Failed" });
                } else {
                    HamperOrderModel.findOneAndUpdate({ _id: Id }, {
                        $set: {
                            Status: Status,
                            PaymentStatus: PaymentStatus,
                            Status_Updated_On: Status_Updated_On
                        }
                    }, function (err) {
                        if (err) {
                            res.send({ statusCode: 400, message: "Failed" });
                        } else {
                            const Notification = new UserNotificationModel({
                                HamperID: result._id,
                                Hamper_ID: result.Id,
                                Image: result.HamperImage,
                                CakeName: result.HampersName,
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
                            })

                        }
                    });
                }
            });
        } else {
            if (req.file) {
                var result = await cloudinary.uploader.upload(req.file.path, { width: 640, height: 426, crop: "scale", format: 'webp' });
                var FinalCakeImage = result.url;
                HamperOrderModel.findOneAndUpdate({ _id: Id }, {
                    $set: {
                        Status: Status,
                        PaymentStatus: PaymentStatus,
                        FinalHamperImage: FinalCakeImage,
                        Status_Updated_On: Status_Updated_On
                    }
                }, function (err, result2) {
                    if (err) {
                        res.send({ statusCode: 400, message: "Failed" });
                    } else {
                        const Notification = new UserNotificationModel({
                            HamperID: result2._id,
                            Hamper_ID: result2.Id,
                            Image: result2.HamperImage,
                            CakeName: result2.HampersName,
                            Status: Status,
                            Status_Updated_On: Status_Updated_On,
                            UserID: result2.UserID,
                            User_ID: result2.User_ID,
                            UserName: result2.UserName,
                            For_Display: `Your order status changed into ${Status}`
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
            } else {
                res.send({ statusCode: 400, message: 'Cake Image is Mandatory' })
            }
        };
    } catch (err) {
        res.send({ statusCode: 400, message: "Failed" });
    };
};

const GetHamperOrdersList = (req, res) => {
    try {
        HamperOrderModel.find({}, function (err, result) {
            if (err) {
                res.send({ statusCode: 400, message: 'Failed' });
            } else {
                if (result.length === 0) {
                    res.send({ message: 'No Records Found' });
                } else {
                    res.send(result.reverse());
                }
            }
        });
    } catch (err) {
        res.send({ statusCode: 400, message: 'Failed' });
    }
};

const GetVendorHamperOrdersList = (req, res) => {
    const Id = req.params.id;
    try {
        HamperOrderModel.find({ VendorID: Id }, function (err, result) {
            if (err) {
                res.send({ statusCode: 400, message: 'Failed' });
            } else {
                if (result.length === 0) {
                    res.send({ message: 'No Records Found' });
                } else {
                    res.send(result.reverse());
                }
            }
        });
    } catch (err) {
        res.send({ statusCode: 400, message: 'Failed' });
    }
};

const GetHamperOrderDetailsById = (req, res) => {
    const Id = req.params.id;
    try {
        HamperOrderModel.findOne({ _id: Id }, function (err, result) {
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

const GetUserHamperOrdersList = (req, res) => {
    const Id = req.params.id;
    try {
        HamperOrderModel.find({ UserID: Id }, function (err, result) {
            if (err) {
                res.send({ statusCode: 400, message: 'Failed' });
            } else {
                if (result.length === 0) {
                    res.send({ message: 'No Records Found' });
                } else {
                    res.send(result.reverse());
                }
            }
        });
    } catch (err) {
        res.send({ statusCode: 400, message: 'Failed' });
    }


    
};

const GetUserOrderAndHamperOrder = (req, res) => {
    const Id = req.params.id;
    try {
        OrdersListModel.find({ UserID: Id }, function (err, result1) {
            if (err) {
                res.send({ statusCode: 400, message: "Failed" });
            } else {
                HamperOrderModel.find({ UserID: Id }, function (err, result2) {
                    if (err) {
                        res.send({ statusCode: 400, message: "Failed" });
                    } else {
                        OtherProductOrdersModel.find({ UserID: Id }, function (err, result3) {
                            if (err) {
                                res.send({ statusCode: 400, message: "Failed" });
                            } else {
                                const Result1 = result1;
                                var FinalList = [];
                                const ConcatResult = Result1.concat(result2);
                                const FinalResult = ConcatResult.concat(result3);
                                if (FinalResult.length === 0) {
                                    FinalList = [];
                                } else if (FinalResult.length === 1) {
                                    FinalList = FinalResult;
                                } else {
                                    const Array2 = FinalResult.map(val => {
                                        return { ...val, date: moment(val.Created_On, 'DD-MM-YYYY hh:mm A').diff(moment(new Date(), 'DD-MM-YYYY hh:mm A')) };
                                    });
                                    const NewList = Array2.sort((a, b) => { return a.date - b.date });
                                    NewList.filter(val => { FinalList.push(val._doc) });
                                }
                                if (FinalList.length === 0) {
                                    res.send({ message: "No Records Found" })
                                } else {
                                    res.send(FinalList.reverse());
                                }
                            }
                        })
                    }
                });
            }
        });
    } catch (err) {
        res.send({ statusCode: 400, message: "Failed" });
    };
};

module.exports = {
    CreateHampers,
    UpdateHampers,
    GetHampersList,
    GetHamperDetailsById,
    GetVendorsHampersList,
    ApproveHampers,
    RemoveHampers,
    OrderHampers,
    UpdateHamperOrderStatus,
    GetApprovedHampersList,
    AcceptHamperOrder,
    CancelHamperOrder,
    GetHamperOrdersList,
    GetVendorHamperOrdersList,
    GetHamperOrderDetailsById,
    GetUserHamperOrdersList,
    GetUserOrderAndHamperOrder

};