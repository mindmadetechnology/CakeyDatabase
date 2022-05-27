const OrdersListModel = require("../models/OrdersListModels");
const CustomizeCakeModel = require('../models/CustomizeCakeModels');
const moment = require('moment-timezone');
const moments = require('moment');

//get all orders
const getOrdersList = (req, res) => {

    try {
        OrdersListModel.find({}, function (err, result) {
            if (err) {
                res.send({ statusCode: 400, message: "There  is was a problem adding the information to the database." });
            } else {
                if (result.length === 0) {
                    res.send({ message: "No Orders" })
                } else {
                    res.send(result)
                }
            }
        });
    } catch (err) {
        res.send({ statusCode: 400, message: 'Failed' });
    }
};

//get order list based on orderId
const getOrdersListById = (req, res) => {

    const Id = req.params.id;

    try {
        OrdersListModel.findById({ _id: Id }, function (err, result) {
            if (err) {
                res.send({ statusCode: 400, message: "There  is was a problem adding the information to the database." });
            } else {
                res.send(result);
            }
        });
    } catch (err) {
        res.send({ statusCode: 400, message: 'Failed' });
    }
};

//get order list based on userId
const getOrdersListByUserID = (req, res) => {

    const Id = req.params.userid;

    try {
        OrdersListModel.find({ UserID: Id }, function (err, result) {
            if (err) {
                res.send({ statusCode: 400, message: "There  is was a problem adding the information to the database." });
            } else {
                if (result.length === 0) {
                    res.send({ message: "No Orders" })
                } else {
                    res.send(result)
                }
            }
        });
    } catch (err) {
        res.send({ statusCode: 400, message: "Failed" });
    }
};

//get order list based on vendorId
const getOrdersListByVendorId = (req, res) => {

    const Id = req.params.vendorid;

    try {
        OrdersListModel.find({ VendorID: Id }, function (err, result) {
            if (err) {
                res.send({ statusCode: 400, message: "There  is was a problem adding the information to the database." });
            } else {
                if (result.length === 0) {
                    res.send({ message: "No Orders" })
                } else {
                    res.send(result)
                }
            }
        });
    } catch (err) {
        res.send({ statusCode: 400, message: 'Failed' });
    }
};

//Place new order
const newOrder = (req, res) => {

    const CakeID = req.body.CakeID;
    const Cake_ID = req.body.Cake_ID;
    const Title = req.body.Title;
    const Description = req.body.Description;
    const TypeOfCake = req.body.TypeOfCake;
    const Images = req.body.Images;
    const EggOrEggless = req.body.EggOrEggless;
    const Price = req.body.Price;
    const Flavour = req.body.Flavour; //Array
    const Shape = req.body.Shape;
    const Theme = req.body.Theme; //Optional //Array
    const Article = req.body.Article; //Optional
    const Weight = req.body.Weight;
    const VendorID = req.body.VendorID;
    const Vendor_ID = req.body.Vendor_ID;
    const VendorName = req.body.VendorName;
    const VendorPhoneNumber = req.body.VendorPhoneNumber;
    const UserID = req.body.UserID;
    const User_ID = req.body.User_ID;
    const UserName = req.body.UserName;
    const UserPhoneNumber = req.body.UserPhoneNumber;
    const DeliveryAddress = req.body.DeliveryAddress;
    const DeliveryDate = req.body.DeliveryDate;
    const DeliverySession = req.body.DeliverySession;
    const VendorAddress = req.body.VendorAddress;
    const ItemCount = req.body.ItemCount;
    const Total = req.body.Total;
    const DeliveryCharge = req.body.DeliveryCharge;
    const PaymentType = req.body.PaymentType;
    const PaymentStatus = req.body.PaymentStatus;
    const MessageOnTheCake = req.body.MessageOnTheCake; //Optional
    const SpecialRequest = req.body.SpecialRequest; //Optional
    const Discount = req.body.Discount;
    const DeliveryInformation = req.body.DeliveryInformation;
    const Gst = req.body.Gst;
    const Sgst = req.body.Sgst;
    const ExtraCharges = req.body.ExtraCharges;
    // const Above5KG = req.body.Above5KG; //if cake weight above 5kg
    const Created_On = moment().tz('Asia/Kolkata').format("DD-MM-YYYY hh:mm A");

    try {
        const weight = Weight.match(/([0-9.]+)(?![0-9.])|([a-z]+)(?![a-z])/gi);
        if (JSON.parse(parseInt(weight[0])) >= 5) {
            if (CakeID === undefined || Cake_ID === undefined || Images === undefined || Title === undefined || Description === undefined || TypeOfCake === undefined ||
                EggOrEggless === undefined || Price === undefined || Flavour === undefined || Shape === undefined || DeliveryDate === undefined ||
                Weight === undefined || UserID === undefined || UserName === undefined || UserPhoneNumber === undefined || DeliveryAddress === undefined || ItemCount === undefined ||
                Total === undefined || DeliveryCharge === undefined || PaymentType === undefined || PaymentStatus === undefined || DeliverySession === undefined ||
                Discount === undefined || DeliveryInformation === undefined || Gst === undefined || Sgst === undefined || ExtraCharges === undefined || User_ID === undefined) {
                res.send({ statusCode: 400, message: "*required" });
            } else {
                // const NewFlavourList = JSON.parse(Flavour)
                // const NewArticleList = JSON.parse(Article);
                const OrderList = new OrdersListModel({
                    CakeID: CakeID,
                    Cake_ID: Cake_ID,
                    Title: Title,
                    Description: Description,
                    TypeOfCake: TypeOfCake,
                    Images: Images,
                    EggOrEggless: EggOrEggless,
                    Price: Price,
                    Flavour: Flavour, //array
                    Shape: Shape,
                    Theme: Theme,
                    Article: Article, //Object
                    MessageOnTheCake: MessageOnTheCake,
                    SpecialRequest: SpecialRequest,
                    Weight: Weight,
                    UserID: UserID,
                    User_ID: User_ID,
                    UserName: UserName,
                    UserPhoneNumber: UserPhoneNumber,
                    DeliveryAddress: DeliveryAddress,
                    DeliveryDate: DeliveryDate,
                    DeliverySession: DeliverySession,
                    ItemCount: ItemCount,
                    Total: Total,
                    DeliveryCharge: DeliveryCharge,
                    PaymentType: PaymentType,
                    PaymentStatus: PaymentStatus,
                    Discount: Discount,
                    DeliveryInformation: DeliveryInformation,
                    Gst: Gst,
                    Sgst: Sgst,
                    ExtraCharges: ExtraCharges,
                    Above5KG: 'y',
                    Created_On: Created_On

                });
                OrderList.save(function (err, result) {
                    if (err) {
                        res.send({ statusCode: 400, message: "Failed", error: err });
                    } else {
                        res.send({ statusCode: 200, message: "Added Successfully" })
                    }
                });
            }
        } else {
            if (CakeID === undefined || Cake_ID === undefined || Images === undefined || Title === undefined || Description === undefined || TypeOfCake === undefined ||
                EggOrEggless === undefined || Price === undefined || Flavour === undefined || Shape === undefined || DeliveryDate === undefined ||
                Weight === undefined || VendorID === undefined || VendorName === undefined || VendorPhoneNumber === undefined || UserID === undefined ||
                UserName === undefined || UserPhoneNumber === undefined || DeliveryAddress === undefined || VendorAddress === undefined || ItemCount === undefined ||
                Total === undefined || DeliveryCharge === undefined || PaymentType === undefined || PaymentStatus === undefined || DeliverySession === undefined ||
                Discount === undefined || DeliveryInformation === undefined || Gst === undefined || Sgst === undefined || ExtraCharges === undefined ||
                Vendor_ID === undefined || User_ID === undefined) {
                res.send({ statusCode: 400, message: "*required" });
            } else {
                // const NewFlavourList = JSON.parse(Flavour)
                // const NewArticleList = JSON.parse(Article);
                const OrderList = new OrdersListModel({
                    CakeID: CakeID,
                    Cake_ID: Cake_ID,
                    Title: Title,
                    Description: Description,
                    TypeOfCake: TypeOfCake,
                    Images: Images,
                    EggOrEggless: EggOrEggless,
                    Price: Price,
                    Flavour: Flavour, //array
                    Shape: Shape,
                    Theme: Theme,
                    Article: Article, //Object
                    MessageOnTheCake: MessageOnTheCake,
                    SpecialRequest: SpecialRequest,
                    Weight: Weight,
                    VendorID: VendorID,
                    Vendor_ID: Vendor_ID,
                    VendorName: VendorName,
                    VendorPhoneNumber: VendorPhoneNumber,
                    UserID: UserID,
                    User_ID: User_ID,
                    UserName: UserName,
                    UserPhoneNumber: UserPhoneNumber,
                    DeliveryAddress: DeliveryAddress,
                    DeliveryDate: DeliveryDate,
                    DeliverySession: DeliverySession,
                    VendorAddress: VendorAddress,
                    ItemCount: ItemCount,
                    Total: Total,
                    DeliveryCharge: DeliveryCharge,
                    PaymentType: PaymentType,
                    PaymentStatus: PaymentStatus,
                    Discount: Discount,
                    DeliveryInformation: DeliveryInformation,
                    Gst: Gst,
                    Sgst: Sgst,
                    ExtraCharges: ExtraCharges,
                    Created_On: Created_On

                });
                OrderList.save(function (err, result) {
                    if (err) {
                        res.send({ statusCode: 400, message: "Failed", error: err });
                    } else {
                        res.send({ statusCode: 200, message: "Added Successfully" })
                    }
                });
            }
        }
    } catch (err) {
        return err;
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
        return err;
    };

};

//update order status
const updateOrderStatus = (req, res) => {

    const Id = req.params.id;
    const Status = req.body.Status;
    const Status_Updated_By = req.body.Status_Updated_By;
    const Status_Updated_On = moment().tz('Asia/Kolkata').format("DD-MM-YYYY hh:mm A");

    try {

        OrdersListModel.findById({ _id: Id }, function (err, result) {
            if (err) {
                res.send({ statusCode: 400, message: "Failed" });
            } else if (result === null) {
                res.send({ statusCode: 400, message: "Failed" });
            } else {
                OrdersListModel.findOneAndUpdate({ _id: Id }, {
                    $set: {
                        Status: Status,
                        Status_Updated_On: Status_Updated_On,
                        Status_Updated_By: Status_Updated_By
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
        return err;
    };
};

const getOrdersListByStatus = (req, res) => {
    const Status = req.params.status;

    try {
        OrdersListModel.find({ Status: Status }, function (err, result) {
            if (err) {
                res.send({ statusCode: 400, message: "Failed" });
            } else {
                if (result.length === 0) {
                    res.send({ message: "No Orders" })
                } else {
                    res.send(result)
                }
            }
        });
    } catch (err) {
        res.send({ statusCode: 400, message: "Failed" });
    }
};

const getOrdersListByStatusAndAbove5Kg = (req, res) => {
    // const Status = req.params.status;
    const Above5KG = req.params.above;

    try {
        OrdersListModel.find({ Above5KG: Above5KG }, function (err, result) {
            if (err) {
                res.send({ statusCode: 400, message: "Failed" });
            } else {
                if (result.length === 0) {
                    res.send({ message: "No Orders" })
                } else {
                    res.send(result)
                }
            }
        });
    } catch (err) {
        res.send({ statusCode: 400, message: "Failed" });
    }
};

const getVendorOrdersListByStatus = (req, res) => {

    const id = req.params.id;
    const Status = req.params.status;

    try {
        OrdersListModel.find({ VendorID: id, Status: Status }, function (err, result) {
            if (err) {
                res.send({ statusCode: 400, message: "Failed" });
            } else {
                if (result.length === 0) {
                    res.send({ message: "No Orders" })
                } else {
                    res.send(result)
                }
            }
        });
    } catch (err) {
        res.send({ statusCode: 400, message: "Failed" });
    }
};

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
                                })
                            }
                        })
                    }
                })
            }
        });
    } catch (err) {
        res.send({ statusCode: 400, message: "Failed" });
    }
};

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
    }
};

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
                })
            }
        })
    } catch (err) {
        res.send({ statusCode: 400, message: 'Failed' });
    }
};

const GetAbove5kgOrdersList = (req, res) => {
    const Above5KG = req.params.above;

    OrdersListModel.find({ Above5KG: Above5KG, CustomizeCake: 'n' }, function (err, result) {
        if (err) {
            res.send({ statusCode: 400, message: 'Failed' });
        } else {
            if (result.length === 0) {
                res.send({ message: "No Orders" })
            } else {
                res.send(result)
            }
        }
    })
};

const Above5KGOrderAssign = (req, res) => {

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
            OrdersListModel.findOneAndUpdate({ _id: Id }, {
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

const UpdateOrderResponse = (req, res) => {

    try {
        setInterval(() => {
            OrdersListModel.find({ Vendor_Response_Status: 'unseen' }, function (err, result) {
                if (!err) {
                    if (result !== null) {
                        result.map((val) => {
                            var today = moment(new Date()).format("DD-MM-YYYY hh:mm A");
                            const ms = moment(today, "DD-MM-YYYY HH:mm A").diff(moment(val.Created_On, "DD-MM-YYYY HH:mm A"));
                            var d = moment.duration(ms);
                            var s = Math.floor(d.asHours()) + moment.utc(ms).format(":mm:ss");
                            var a = s.split(':');
                            var seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);
                            if (seconds === 300 || seconds > 300) {
                                OrdersListModel.findOneAndUpdate({ _id: val._id }, {
                                    $set: {
                                        Vendor_Response_Status: 'no response'
                                    }
                                }, function (err, result) {
                                    if (err) {
                                        res.send({ statusCode: 400, message: 'Failed' });
                                    } else {
                                        res.send({ statusCode: 200, message: 'Updated Successfully' })
                                    }
                                });
                            }
                        });
                    } else {
                        return null;
                    }
                }
            })
        }, 5000);

    } catch (err) {
        res.send({ statusCode: 400, message: 'Failed' });
    }
};

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
    }
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
    UpdateOrderResponse,
    UpdateOrderResponsebyVendor

};