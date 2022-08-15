const OrdersListModel = require("../models/OrdersListModels");
const CustomizeCakeModel = require('../models/CustomizeCakeModels');
const UserNotificationModel = require("../models/UserNotification");
const VendorNotificationModel = require("../models/VendorNotification");
const AdminNotificationModel = require("../models/AdminNotificationModels");
const moment = require('moment-timezone');
const cloudinary = require("../middleware/cloudnary");

//get all orders
const getOrdersList = (req, res) => {

    try {
        OrdersListModel.find({}, function (err, result) {
            if (err) {
                res.send({ statusCode: 400, message: "Failed" });
            } else {
                if (result.length === 0) {
                    res.send({ message: "No Orders" });
                } else {
                    res.send(result.reverse());
                }
            }
        });
    } catch (err) {
        res.send({ statusCode: 400, message: 'Failed' });
    };
};

//get order list based on orderId
const getOrdersListById = (req, res) => {

    const Id = req.params.id;
    try {
        OrdersListModel.findById({ _id: Id }, function (err, result) {
            if (err) {
                res.send({ statusCode: 400, message: "Failed" });
            } else {
                res.send(result);
            }
        });
    } catch (err) {
        res.send({ statusCode: 400, message: 'Failed' });
    };
};

//get order list based on userId
const getOrdersListByUserID = (req, res) => {

    const Id = req.params.userid;
    try {
        OrdersListModel.find({ UserID: Id }, function (err, result) {
            if (err) {
                res.send({ statusCode: 400, message: "Failed" });
            } else {
                if (result.length === 0) {
                    res.send({ message: "No Orders" });
                } else {
                    res.send(result);
                }
            }
        });
    } catch (err) {
        res.send({ statusCode: 400, message: "Failed" });
    };
};

//get order list based on vendorId
const getOrdersListByVendorId = (req, res) => {

    const Id = req.params.vendorid;
    try {
        OrdersListModel.find({ VendorID: Id }, function (err, result) {
            if (err) {
                res.send({ statusCode: 400, message: "Failed" });
            } else {
                if (result.length === 0) {
                    res.send({ message: "No Orders" });
                } else {
                    res.send(result.reverse());
                }
            }
        });
    } catch (err) {
        res.send({ statusCode: 400, message: 'Failed' });
    };
};

//Place new order
const newOrder = (req, res) => {

    const CakeID = req.body.CakeID;
    const Cake_ID = req.body.Cake_ID;
    const CakeName = req.body.CakeName;
    const CakeCommonName = req.body.CakeCommonName;
    const CakeType = req.body.CakeType;
    const CakeSubType = req.body.CakeSubType;
    const Image = req.body.Image;
    const EggOrEggless = req.body.EggOrEggless;
    const Flavour = req.body.Flavour; //Array
    const Shape = req.body.Shape; //Array
    const Weight = req.body.Weight;
    // const Theme = req.body.Theme; //Optional  
    // const Tier = req.body.Tier; //Optional  
    // const Article = req.body.Article; //Optional
    const MessageOnTheCake = req.body.MessageOnTheCake; //Optional
    const SpecialRequest = req.body.SpecialRequest; //Optional
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
    const DeliveryAddress = req.body.DeliveryAddress; //optional
    const DeliveryDate = req.body.DeliveryDate;
    const DeliverySession = req.body.DeliverySession;
    const DeliveryInformation = req.body.DeliveryInformation;
    const Price = req.body.Price;
    const ItemCount = req.body.ItemCount;
    const Discount = req.body.Discount;
    const ExtraCharges = req.body.ExtraCharges;
    const DeliveryCharge = req.body.DeliveryCharge;
    const Gst = req.body.Gst;
    const Sgst = req.body.Sgst;
    const Tax = req.body.Tax;
    const Total = req.body.Total;
    const PaymentType = req.body.PaymentType;
    const PaymentStatus = req.body.PaymentStatus;
    const PremiumVendor = req.body.PremiumVendor;
    const TopperId = req.body.TopperId;
    const TopperName = req.body.TopperName;
    const TopperImage = req.body.TopperImage;
    const TopperPrice = req.body.TopperPrice;
    // const Above5KG = req.body.Above5KG; 
    const Created_On = moment().tz('Asia/Kolkata').format("DD-MM-YYYY hh:mm A");
    //file for ThemeSampleImage

    try {

        if (!CakeID || !Cake_ID || !CakeName || !CakeCommonName || !CakeType || !Image ||
            !EggOrEggless || !Flavour || !Shape || !Weight || !Description || !UserID || !User_ID ||
            !UserName || !UserPhoneNumber || !DeliveryDate || !DeliverySession ||
            !DeliveryInformation || !Price || !ItemCount || !JSON.stringify(Discount) || !DeliveryCharge || !ExtraCharges ||
            !Gst || !Sgst || !Tax || !Total || !PaymentType || !PaymentStatus) {
            res.send({ statusCode: 400, message: "*required" });
        } else {
            var weight, Above5KG;
            if (Weight !== '0.5kg') {
                weight = Weight.match(/([0-9.]+)(?![0-9.])|([a-z]+)(?![a-z])/gi);
            };
            if (Weight === '0.5kg') {
                Above5KG = 'n'
                // FinalLocation = JSON.parse(GoogleLocation);
            } else if (JSON.parse(parseInt(weight[0])) >= 5) {
                Above5KG = 'y'
            } else {
                Above5KG = 'n'
                // FinalLocation = JSON.parse(GoogleLocation);
            }
            // if (req.file !== undefined) {
            //     var result = await cloudinary.uploader.upload(req.file.path, { width: 640, height: 426, crop: "scale", format: 'webp' });
            //     ThemeSampleImage = result.url;
            // };
            // var FinalFlavour = JSON.parse(Flavour);
            // var FinalShape = JSON.parse(Shape);

            const OrderList = new OrdersListModel({
                CakeID: CakeID,
                Cake_ID: Cake_ID,
                CakeName: CakeName,
                CakeCommonName: CakeCommonName,
                CakeType: CakeType,
                CakeSubType: CakeSubType,
                Image: Image,
                EggOrEggless: EggOrEggless,
                Flavour: Flavour,
                Shape: Shape,
                Weight: Weight,
                // Theme: Theme,
                // Tier: Tier,
                Toppers: {
                    TopperId: TopperId,
                    TopperName: TopperName,
                    TopperImage: TopperImage,
                    TopperPrice: TopperPrice,
                },
                // ThemeSampleImage: ThemeSampleImage,
                MessageOnTheCake: MessageOnTheCake,
                SpecialRequest: SpecialRequest,
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
                Price: Price,
                ItemCount: ItemCount,
                Discount: Discount,
                ExtraCharges: ExtraCharges,
                DeliveryCharge: DeliveryCharge,
                Gst: Gst,
                Sgst: Sgst,
                Tax: Tax,
                Total: Total,
                PaymentType: PaymentType,
                PaymentStatus: PaymentStatus,
                PremiumVendor: PremiumVendor,
                Above5KG: Above5KG,
                Created_On: Created_On,
                Status_Updated_On: Created_On
            });
            OrderList.save(function (err, result) {
                if (err) {
                    res.send({ statusCode: 400, message: "Failed" });
                } else {
                    const AddNotification = AdminNotificationModel({
                        NotificationType: 'New Order',
                        VendorID: result.VendorID,
                        Vendor_ID: result.Vendor_ID,
                        VendorName: result.VendorName,
                        Id: result._id
                    });
                    AddNotification.save(function (err) {
                        if (err) {
                            res.send({ statusCode: 400, message: "Failed" });
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
                            });
                            Notification.save(function (err) {
                                if (err) {
                                    res.send({ statusCode: 400, message: "Failed" });
                                } else {
                                    if (result.VendorID) {
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
                                            For_Display: "You Got a New Order"
                                        });
                                        VendorNotification.save(function (err) {
                                            if (err) {
                                                res.send({ statusCode: 400, message: "Failed" });
                                            } else {
                                                res.send({ statusCode: 200, message: "Order Placed Successfully" });
                                            }
                                        });
                                    } else {
                                        res.send({ statusCode: 200, message: "Order Placed Successfully" });
                                    }
                                }
                            });
                        }
                    });
                }
            });
        }
    } catch (err) {
        res.send({ statusCode: 400, message: "Failed", error: err });
    };
};

//update order details (UserPhoenumber & DeliveryAddress only have edit option)
const updateOrder = (req, res) => {

    const Id = req.params.id;
    const UserPhoneNumber = req.body.UserPhoneNumber;
    const DeliveryAddress = req.body.DeliveryAddress;
    const Modified_On = moment().tz('Asia/Kolkata').format("DD-MM-YYYY hh:mm A");
    try {
        OrdersListModel.findById({ _id: Id }, function (err, result) {
            if (err) {
                res.send({ statusCode: 400, message: "Failed" });
            } else if (result === null) {
                res.send({ statusCode: 400, message: "Failed" });
            } else {
                OrdersListModel.findOneAndUpdate({ _id: Id }, {
                    $set: {
                        UserPhoneNumber: UserPhoneNumber,
                        DeliveryAddress: DeliveryAddress,
                        Modified_On: Modified_On
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
        res.send({ statusCode: 400, message: "Failed" });
    };
};

//update order status
const updateOrderStatus = (req, res) => {

    const Id = req.params.id;
    const Status = req.body.Status;
    const Status_Updated_By = req.body.Status_Updated_By;
    const Status_Updated_On = moment().tz('Asia/Kolkata').format("DD-MM-YYYY hh:mm A");
    try {
        var PaymentStatus;
        if (Status === 'Delivered') {
            PaymentStatus = 'Paid'
        } else {
            PaymentStatus = 'Cash on delivery'
        };
        OrdersListModel.findById({ _id: Id }, function (err, result) {
            if (err) {
                res.send({ statusCode: 400, message: "Failed" });
            } else if (result === null) {
                res.send({ statusCode: 400, message: "Failed" });
            } else {
                OrdersListModel.findOneAndUpdate({ _id: Id }, {
                    $set: {
                        Status: Status,
                        PaymentStatus: PaymentStatus,
                        Vendor_Response_Status: 'seen',
                        Status_Updated_On: Status_Updated_On,
                        Status_Updated_By: Status_Updated_By
                    }
                }, function (err) {
                    if (err) {
                        res.send({ statusCode: 400, message: "Failed" });
                    } else {
                        const Notification = new UserNotificationModel({
                            OrderID: result._id,
                            Order_ID: result.Id,
                            Image: result.Image,
                            CakeName: result.CakeName,
                            Status: Status,
                            Status_Updated_On: Status_Updated_On,
                            UserID: result.UserID,
                            User_ID: result.User_ID,
                            UserName: result.UserName,
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
    } catch (err) {
        res.send({ statusCode: 400, message: "Failed" });
    };
};

//get orders list by status
const getOrdersListByStatus = (req, res) => {

    const Status = req.params.status;
    try {
        OrdersListModel.find({ Status: Status }, function (err, result) {
            if (err) {
                res.send({ statusCode: 400, message: "Failed" });
            } else {
                if (result.length === 0) {
                    res.send({ message: "No Orders" });
                } else {
                    res.send(result.reverse());
                }
            }
        });
    } catch (err) {
        res.send({ statusCode: 400, message: "Failed" });
    };
};

//get orders list by above 5kg
const getOrdersListByStatusAndAbove5Kg = (req, res) => {

    const Above5KG = req.params.above;
    try {
        if (Above5KG === 'y') {
            OrdersListModel.find({ $or: [{ PremiumVendor: 'y' }, { Above5KG: 'y' }] }, function (err, result) {
                if (err) {
                    res.send({ statusCode: 400, message: "Failed" });
                } else {
                    if (result.length === 0) {
                        res.send({ message: "No Orders" });
                    } else {
                        res.send(result.reverse());
                    }
                }
            });
        } else {
            OrdersListModel.find({ Above5KG: Above5KG, PremiumVendor: 'n' }, function (err, result) {
                if (err) {
                    res.send({ statusCode: 400, message: "Failed" });
                } else {
                    if (result.length === 0) {
                        res.send({ message: "No Orders" });
                    } else {
                        res.send(result);
                    }
                }
            });
        }
    } catch (err) {
        res.send({ statusCode: 400, message: "Failed" });
    };
};

// get vendors orders list by status
const getVendorOrdersListByStatus = (req, res) => {

    const id = req.params.id;
    const Status = req.params.status;
    try {
        OrdersListModel.find({ VendorID: id, Status: Status }, function (err, result) {
            if (err) {
                res.send({ statusCode: 400, message: "Failed" });
            } else {
                if (result.length === 0) {
                    res.send({ message: "No Orders" });
                } else {
                    res.send(result.reverse());
                }
            }
        });
    } catch (err) {
        res.send({ statusCode: 400, message: "Failed" });
    };
};

// get orders status count
const getOrdersStatusCount = (req, res) => {

    try {
        OrdersListModel.count({}, function (err, count1) {
            if (err) {
                res.send({ statusCode: 400, message: "Failed" });
            } else {
                OrdersListModel.count({ Status: 'New' }, function (err, count2) {
                    if (err) {
                        res.send({ statusCode: 400, message: "Failed" });
                    } else {
                        OrdersListModel.count({ Status: 'Preparing' }, function (err, count3) {
                            if (err) {
                                res.send({ statusCode: 400, message: "Failed" });
                            } else {
                                OrdersListModel.count({ Status: 'Delivered' }, function (err, count4) {
                                    if (err) {
                                        res.send({ statusCode: 400, message: "Failed" });
                                    } else {
                                        res.send({
                                            Total: count1.toString(),
                                            New: count2.toString(),
                                            Preparing: count3.toString(),
                                            Delivered: count4.toString()
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    } catch (err) {
        res.send({ statusCode: 400, message: "Failed" });
    };
};

//get vendor orders status count
const getVendorOrdersStatusCount = (req, res) => {

    const id = req.params.id;
    try {
        OrdersListModel.count({ VendorID: id }, function (err, count1) {
            if (err) {
                res.send({ statusCode: 400, message: "Failed" });
            } else {
                OrdersListModel.count({ Status: 'New', VendorID: id }, function (err, count2) {
                    if (err) {
                        res.send({ statusCode: 400, message: "Failed" });
                    } else {
                        OrdersListModel.count({ Status: 'Preparing', VendorID: id }, function (err, count3) {
                            if (err) {
                                res.send({ statusCode: 400, message: "Failed" });
                            } else {
                                OrdersListModel.count({ Status: 'Delivered', VendorID: id }, function (err, count4) {
                                    if (err) {
                                        res.send({ statusCode: 400, message: "Failed" });
                                    } else {
                                        OrdersListModel.count({ Status: 'Cancelled', VendorID: id }, function (err, count5) {
                                            if (err) {
                                                res.send({ statusCode: 400, message: "Failed" });
                                            } else {

                                                CustomizeCakeModel.count({ Status: 'New', VendorID: id }, function (err, count6) {
                                                    if (err) {
                                                        res.send({ statusCode: 400, message: "Failed" });
                                                    } else {
                                                        CustomizeCakeModel.count({ VendorID: id }, function (err, count7) {
                                                            if (err) {
                                                                res.send({ statusCode: 400, message: "Failed" });
                                                            } else {
                                                                res.send({
                                                                    Total: count1.toString(),
                                                                    New: count2.toString(),
                                                                    Preparing: count3.toString(),
                                                                    Delivered: count4.toString(),
                                                                    Cancelled: count5.toString(),
                                                                    NewCustomizeCakes: count6.toString(),
                                                                    TotalCustomizeCakes: count7.toString()
                                                                });
                                                            }
                                                        });
                                                    }
                                                });
                                            }
                                        });
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

//get order and customized cake orders notification
const OrderandCustomizecakeNotification = (req, res) => {

    const Id = req.params.id;
    try {
        CustomizeCakeModel.find({ UserID: Id }, function (err, result1) {
            if (err) {
                res.send({ statusCode: 400, message: 'Failed' });
            } else {
                OrdersListModel.find({ UserID: Id }, function (err, result2) {
                    if (err) {
                        res.send({ statusCode: 400, message: 'Failed' });
                    } else {
                        res.send({ CustomizeCakesList: result1, OrdersList: result2 });
                    }
                });
            }
        });
    } catch (err) {
        res.send({ statusCode: 400, message: 'Failed' });
    };
};

//get above 5kg orders list
const GetAbove5kgOrdersList = (req, res) => {

    const Above5KG = req.params.above;
    try {
        OrdersListModel.find({ Above5KG: Above5KG, CustomizeCake: 'n' }, function (err, result) {
            if (err) {
                res.send({ statusCode: 400, message: 'Failed' });
            } else {
                if (result.length === 0) {
                    res.send({ message: "No Orders" });
                } else {
                    res.send(result);
                }
            }
        });
    } catch (err) {
        res.send({ statusCode: 400, message: 'Failed' });
    };
};

//assign above 5kg orders to vendors
const Above5KGOrderAssign = (req, res) => {

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
            OrdersListModel.findOneAndUpdate({ _id: Id }, {
                $set: {
                    VendorID: VendorID,
                    Vendor_ID: Vendor_ID,
                    VendorName: VendorName,
                    VendorPhoneNumber1: VendorPhoneNumber1,
                    VendorPhoneNumber2: VendorPhoneNumber2,
                    VendorAddress: VendorAddress,
                    GoogleLocation: GoogleLocation,
                    Status: Status,
                    Vendor_Response_Status: 'unseen',
                    Status_Updated_By: Status_Updated_By,
                    Status_Updated_On: Status_Updated_On
                }
            }, function (err, result) {
                if (err) {
                    res.send({ statusCode: 400, message: 'Failed' });
                } else {
                    const VendorNotification = new VendorNotificationModel({
                        OrderID: result._id,
                        Order_ID: result.Id,
                        Image: result.Image,
                        CakeName: result.CakeName,
                        Status: Status,
                        Status_Updated_On: Status_Updated_On,
                        VendorID: VendorID,
                        Vendor_ID: Vendor_ID,
                        UserName: result.UserName,
                        For_Display: "You Got a New Order"
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

//update order response by vendor
const UpdateOrderResponsebyVendor = (req, res) => {

    const Id = req.params.id;
    const Response = req.params.response;
    try {
        OrdersListModel.findOneAndUpdate({ _id: Id }, {
            $set: {
                Vendor_Response_Status: Response
            }
        }, function (err, result) {
            if (err) {
                res.send({ statusCode: 400, message: 'Failed' });
            } else {
                res.send({ statusCode: 200, message: 'Updated Successfully' });
            }
        });
    } catch (err) {
        res.send({ statusCode: 400, message: 'Failed' });
    };
};

//get not respond orders
const GetNotRespondOrders = (req, res) => {

    try {
        OrdersListModel.find({ Vendor_Response_Status: 'no response', Status: 'New' }, function (err, result) {
            if (err) {
                res.send({ statusCode: 400, message: 'Failed' });
            } else {
                if (result.length === 0) {
                    res.send({ message: "No Orders" });
                } else {
                    res.send(result.reverse());
                }
            }
        });
    } catch (err) {
        res.send({ statusCode: 400, message: 'Failed' });
    };
};


const CancelOrder = (req, res) => {
    const id = req.params.id;
    const Cancelled_By = req.body.Cancelled_By;
    const Status_Updated_By = req.body.Status_Updated_By;
    const Status_Updated_On = moment().tz('Asia/Kolkata').format("DD-MM-YYYY hh:mm A");

    try {
        OrdersListModel.findOneAndUpdate({ _id: id }, {
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
                if(Cancelled_By === 'User'){
                    const Notification = VendorNotificationModel({
                        OrderID: result._id,
                        Order_ID: result.Id,
                        Image: result.Image,
                        CakeName: result.CakeName,
                        Status: Status,
                        Status_Updated_On: Status_Updated_On,
                        VendorID: VendorID,
                        Vendor_ID: Vendor_ID,
                        UserName: result.UserName,
                        For_Display: "Yuor Customized Cake Order is Cancelled"
                    });
                    Notification.save(function(err){
                        if(err){
                            res.send({ statusCode: 400, message: "Failed" });
                        }else{
                            res.send({ statusCode: 200, message: 'Order Cancelled' });
                        }
                    });
                }else{
                    const UserNotification = new UserNotificationModel({
                        OrderID: result._id,
                            Order_ID: result.Id,
                            Image: result.Image,
                            CakeName: result.CakeName,
                            Status: Status,
                            Status_Updated_On: Status_Updated_On,
                            UserID: result.UserID,
                            User_ID: result.User_ID,
                            UserName: result.UserName,
                    });
                    UserNotification.save(function(err){
                        if(err){
                            res.send({ statusCode: 400, message: "Failed" });
                        }else{
                            res.send({ statusCode: 200, message: 'Order Cancelled' });
                        }
                    });
                }  
            }
        })
    } catch (err) {
        res.send({ statusCode: 400, message: 'Failed' });
    }

};

const Above5KGOrderPriceInvoice = (req, res) => {
    // const CakeID = req.body.CakeID;
    // const Cake_ID = req.body.Cake_ID;
    // const Title = req.body.Title;
    // const Description = req.body.Description;
    // const TypeOfCake = req.body.TypeOfCake;
    // const Images = req.body.Images;
    // const EggOrEggless = req.body.EggOrEggless;
    // const Flavour = req.body.Flavour; //Array
    // const Shape = req.body.Shape;
    // const Theme = req.body.Theme; //Optional //Array
    // const Article = req.body.Article; //Optional
    // const Weight = req.body.Weight;
    // const VendorID = req.body.VendorID;
    // const Vendor_ID = req.body.Vendor_ID;
    // const VendorName = req.body.VendorName;
    // const VendorPhoneNumber = req.body.VendorPhoneNumber;
    // const UserID = req.body.UserID;
    // const User_ID = req.body.User_ID;
    // const UserName = req.body.UserName;
    // const UserPhoneNumber = req.body.UserPhoneNumber;
    // const DeliveryAddress = req.body.DeliveryAddress;
    // const DeliveryDate = req.body.DeliveryDate;
    // const DeliverySession = req.body.DeliverySession;
    // const VendorAddress = req.body.VendorAddress;
    // const ItemCount = req.body.ItemCount;
    // const PaymentType = req.body.PaymentType;
    // const PaymentStatus = req.body.PaymentStatus;
    // const MessageOnTheCake = req.body.MessageOnTheCake; //Optional
    // const SpecialRequest = req.body.SpecialRequest; //Optional
    // const DeliveryInformation = req.body.DeliveryInformation;
    // // const Above5KG = req.body.Above5KG; //if cake weight above 5kg
    // const Created_On = moment().tz('Asia/Kolkata').format("DD-MM-YYYY hh:mm A");
    // const Price = req.body.Price;
    // const Total = req.body.Total;
    // const DeliveryCharge = req.body.DeliveryCharge;
    // const Discount = req.body.Discount;
    // const Gst = req.body.Gst;
    // const Sgst = req.body.Sgst;
    // const ExtraCharges = req.body.ExtraCharges;
};

module.exports = {

    getOrdersList,
    getOrdersListById,
    getOrdersListByUserID,
    getOrdersListByVendorId,
    newOrder,
    updateOrder,
    updateOrderStatus,
    getOrdersListByStatusAndAbove5Kg,
    getOrdersListByStatus,
    getVendorOrdersListByStatus,
    getOrdersStatusCount,
    getVendorOrdersStatusCount,
    OrderandCustomizecakeNotification,
    GetAbove5kgOrdersList,
    Above5KGOrderAssign,
    Above5KGOrderPriceInvoice,
    UpdateOrderResponsebyVendor,
    GetNotRespondOrders,
    CancelOrder

};