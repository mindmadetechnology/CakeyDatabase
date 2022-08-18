const HampersModel = require("../models/HampersModels");
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
    const StartDate = req.body.StartDate;
    const EndDate = req.body.EndDate;
    const Price = req.body.Price;
    const Product_Contains = req.body.Product_Contains;
    const Description = req.body.Description;
    const Created_On = moment().tz('Asia/Kolkata').format("DD-MM-YYYY hh:mm A");
    //file - HamperImage

    try {
        if (VendorID || Vendor_ID || VendorName || VendorPhoneNumber1 || VendorAddress || GoogleLocation || HampersName
            || Price || req.file !== undefined || Description || Title || Occasion || Weight || StartDate || EndDate) {
            const Image = await cloudinary.uploader.upload(req.file.path);
            const FinalLocation = JSON.parse(GoogleLocation);
            const FinalProduct_Contains = JSON.parse(Product_Contains);
            const FinalOccasion = JSON.parse(Occasion);

            const NewHampers = HampersModel({
                VendorID: VendorID,
                Vendor_ID: Vendor_ID,
                VendorName: VendorName,
                VendorPhoneNumber1: VendorPhoneNumber1,
                VendorPhoneNumber2: VendorPhoneNumber2,
                VendorAddress: VendorAddress,
                GoogleLocation: FinalLocation,
                HampersName: HampersName,
                Title: Title,
                Occasion: FinalOccasion,
                Weight: Weight,
                StartDate: StartDate,
                EndDate: EndDate,
                Price: Price,
                Product_Contains: FinalProduct_Contains,
                HamperImage: Image.url,
                Description: Description,
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
                            res.send({ statusCode: 200, message: "Added Successfully" });
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
    const Weight = req.body.Weight;
    const StartDate = req.body.StartDate;
    const EndDate = req.body.EndDate;
    const Price = req.body.Price;
    const Product_Contains = req.body.Product_Contains;
    const Description = req.body.Description;
    const Modified_On = moment().tz('Asia/Kolkata').format("DD-MM-YYYY hh:mm A");
    //file - HamperImage
    try {
        var Image;
        if (req.file) {
            var ImageURL = await cloudinary.uploader.upload(req.file.path);
            Image = ImageURL.url
        }
        const FinalLocation = JSON.parse(GoogleLocation);
        const FinalProduct_Contains = JSON.parse(Product_Contains);
        const FinalOccasion = JSON.parse(Occasion);

        HampersModel.findOneAndUpdate({ _id: Id }, {
            $set: {
                VendorID: VendorID,
                Vendor_ID: Vendor_ID,
                VendorName: VendorName,
                VendorPhoneNumber1: VendorPhoneNumber1,
                VendorPhoneNumber2: VendorPhoneNumber2,
                VendorAddress: VendorAddress,
                GoogleLocation: FinalLocation,
                HampersName: HampersName,
                Title: Title,
                Occasion: FinalOccasion,
                Weight: Weight,
                StartDate: StartDate,
                EndDate: EndDate,
                Price: Price,
                Product_Contains: FinalProduct_Contains,
                HamperImage: Image,
                Description: Description,
                Modified_On: Modified_On,
                Status: 'Updated'
            }
        }, function (err) {
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
                        res.send({ statusCode: 200, message: 'Updated Successfully' });
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
                            res.send({ statusCode: 200, message: 'Approved Successfully' });
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
                            res.send({ statusCode: 200, message: 'Approved Successfully' });
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
                res.send({ statusCode: 200, message: 'Deleted Successfully' });
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
    const Total = req.body.Total;
    const PaymentType = req.body.PaymentType;
    const PaymentStatus = req.body.PaymentStatus;
    const Created_On = moment().tz('Asia/Kolkata').format("DD-MM-YYYY hh:mm A");

    try {
        if (HamperID || Hamper_ID || HampersName || Product_Contains || HamperImage || Price || Description ||
            VendorID || Vendor_ID || VendorName || VendorPhoneNumber1 || VendorAddress || GoogleLocation ||
            UserID || User_ID || UserName || UserPhoneNumber || DeliveryDate || DeliverySession ||
            DeliveryInformation || ItemCount || DeliveryCharge || Total || PaymentType || PaymentStatus) {
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
                DeliveryAddress: DeliveryAddress,
                DeliveryDate: DeliveryDate,
                DeliverySession: DeliverySession,
                DeliveryInformation: DeliveryInformation,
                ItemCount: ItemCount,
                DeliveryCharge: DeliveryCharge,
                Total: Total,
                PaymentType: PaymentType,
                PaymentStatus: PaymentStatus,
                Created_On: Created_On,
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
    const Status_Updated_On = moment().tz('Asia/Kolkata').format("DD-MM-YYYY hh:mm A");

    try {
        HamperOrderModel.findOneAndUpdate({ _id: id }, {
            $set: {
                Status: 'Cancelled',
                Cancelled_By: Cancelled_By,
                Status_Updated_On: Status_Updated_On
            }
        }, function (err, result) {
            if (err) {
                res.send({ statusCode: 400, message: 'Failed' });
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
                        For_Display: "Yuor Customized Cake Order is Cancelled"
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
                        const Result1 = result1;
                        var FinalList = [];
                        const ConcatResult = Result1.concat(result2);
                        if (ConcatResult.length === 0) {
                            FinalList = [];
                        } else if (ConcatResult.length === 1) {
                            FinalList = ConcatResult;
                        } else {
                            const Array2 = ConcatResult.map(val => {
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