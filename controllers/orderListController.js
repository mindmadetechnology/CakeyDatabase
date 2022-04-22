const OrdersListModel = require("../models/OrdersListModels");
const moment = require('moment-timezone');

//get all orders
const getOrdersList = (req, res) => {

    OrdersListModel.find({}, function (err, result) {
        if (err) {
            res.send({ statusCode: 400, message: "There  is was a problem adding the information to the database." });
        } else {
            if(result.length === 0){
                res.send({message : "No Orders"})
            }else{
                res.send(result)
            }
        }
    });

};

//get order list based on orderId
const getOrdersListById = (req, res) => {

    const Id = req.params.id;

    OrdersListModel.findById({ _id: Id }, function (err, result) {
        if (err) {
            res.send({ statusCode: 400, message: "There  is was a problem adding the information to the database." });
        } else {
            res.send(result);
        }
    });

};

//get order list based on userId
const getOrdersListByUserID = (req, res) => {

    const Id = req.params.userid;

    OrdersListModel.find({ UserID: Id }, function (err, result) {
        if (err) {
            res.send({ statusCode: 400, message: "There  is was a problem adding the information to the database." });
        } else {
            if(result.length === 0){
                res.send({message : "No Orders"})
            }else{
                res.send(result)
            }
        }
    });

};

//get order list based on vendorId
const getOrdersListByVendorId = (req, res) => {

    const Id = req.params.vendorid;

    OrdersListModel.find({ VendorID: Id }, function (err, result) {
        if (err) {
            res.send({ statusCode: 400, message: "There  is was a problem adding the information to the database." });
        } else {
            if(result.length === 0){
                res.send({message : "No Orders"})
            }else{
                res.send(result)
            }
        }
    });

};

//Place new order
const newOrder = (req, res) => {

    const CakeID = req.body.CakeID;
    const Title = req.body.Title;
    const Description = req.body.Description;
    const TypeOfCake = req.body.TypeOfCake;
    const Images = req.body.Images;
    const EggOrEggless = req.body.EggOrEggless;
    const Price = req.body.Price;
    const Flavour = req.body.Flavour;
    const Shape = req.body.Shape;
    const CakeToppings = req.body.CakeToppings;
    const Weight = req.body.Weight;
    const VendorID = req.body.VendorID;
    const VendorName = req.body.VendorName;
    const VendorPhoneNumber = req.body.VendorPhoneNumber;
    const UserID = req.body.UserID;
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
    const MessageOnTheCake = req.body.MessageOnTheCake;
    const SpecialRequest = req.body.SpecialRequest;
    const Discount = req.body.Discount;
    const Created_On = moment().tz('Asia/Kolkata').format("DD-MM-YYYY hh:mm A");

    try {

        if (CakeID === undefined || Images === undefined || Title === undefined || Description === undefined || TypeOfCake === undefined ||
            EggOrEggless === undefined || Price === undefined || Flavour === undefined || Shape === undefined || CakeToppings === undefined ||
            Weight === undefined || VendorID === undefined || VendorName === undefined || VendorPhoneNumber === undefined || UserID === undefined ||
            UserName === undefined || UserPhoneNumber === undefined || DeliveryAddress === undefined || VendorAddress === undefined || ItemCount === undefined ||
            Total === undefined || DeliveryCharge === undefined || PaymentType === undefined || PaymentStatus === undefined || MessageOnTheCake === undefined  ||
            SpecialRequest === undefined || Discount === undefined) {
            res.send({ statusCode: 400, message: "*required" });
        } else {
            const OrderList = new OrdersListModel({
                CakeID: CakeID,
                Title: Title,
                Description: Description,
                TypeOfCake: TypeOfCake,
                Images: Images,
                EggOrEggless: EggOrEggless,
                Price: Price,
                Flavour: Flavour,
                Shape: Shape,
                CakeToppings: CakeToppings,
                MessageOnTheCake : MessageOnTheCake,
                SpecialRequest : SpecialRequest,
                Weight: Weight,
                VendorID: VendorID,
                VendorName: VendorName,
                VendorPhoneNumber: VendorPhoneNumber,
                UserID: UserID,
                UserName: UserName,
                UserPhoneNumber: UserPhoneNumber,
                DeliveryAddress: DeliveryAddress,
                DeliveryDate : DeliveryDate,
                DeliverySession : DeliverySession,
                VendorAddress: VendorAddress,
                ItemCount: ItemCount,
                Total: Total,
                DeliveryCharge: DeliveryCharge,
                PaymentType: PaymentType,
                PaymentStatus: PaymentStatus,
                Discount: Discount,
                Created_On: Created_On

            });
            OrderList.save(function (err, result) {
                if (err) {
                    res.send({ statusCode: 400, message: "Failed" });
                } else {
                    res.send({ statusCode: 200, message: "Added Successfully" })
                }
            });
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
                        Status_Updated_By : Status_Updated_By
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

    OrdersListModel.find({ Status : Status},function(err,result){
        if(err){
            res.send({statusCode : 400, message : "Failed"});
        }else{
            if(result.length === 0){
                res.send({message : "No Orders"})
            }else{
                res.send(result)
            }
        }
    });
};

const getVendorOrdersListByStatus = (req, res) => {

    const id = req.params.id;
    const Status = req.params.status;

    OrdersListModel.find({ VendorID : id, Status : Status },function(err, result){
        if(err){
            res.send({statusCode : 400, message : "Failed"});
        }else{
            if(result.length === 0){
                res.send({message : "No Orders"})
            }else{
                res.send(result)
            }
        }
    });
};

const getOrdersStatusCount = (req, res) => {

    OrdersListModel.count({}, function(err,count1){
        if(err){
            res.send({statusCode : 400, message : "Failed"});
        }else{
            OrdersListModel.count({Status : 'New'}, function(err,count2){
                if(err){
                    res.send({statusCode : 400, message : "Failed"});
                }else{
                    OrdersListModel.count({Status : 'Preparing'}, function(err,count3){
                        if(err){
                            res.send({statusCode : 400, message : "Failed"});
                        }else{
                            OrdersListModel.count({Status : 'Delivered'}, function(err,count4){
                                if(err){
                                    res.send({statusCode : 400, message : "Failed"});
                                }else{
                                    res.send({ 
                                                Total : count1.toString(), 
                                                New : count2.toString(), 
                                                Preparing : count3.toString(),
                                                Delivered : count4.toString()
                                            });
                                }
                            })
                        }
                    })
                }
            })
        }
    });
};

const getVendorOrdersStatusCount = (req, res) => {

    const id = req.params.id;

    OrdersListModel.count({ VendorID : id }, function(err,count1){
        if(err){
            res.send({statusCode : 400, message : "Failed"});
        }else{
            OrdersListModel.count({Status : 'New', VendorID : id}, function(err,count2){
                if(err){
                    res.send({statusCode : 400, message : "Failed"});
                }else{
                    OrdersListModel.count({Status : 'Preparing', VendorID : id}, function(err,count3){
                        if(err){
                            res.send({statusCode : 400, message : "Failed"});
                        }else{
                            OrdersListModel.count({Status : 'Delivered', VendorID : id}, function(err,count4){
                                if(err){
                                    res.send({statusCode : 400, message : "Failed"});
                                }else{
                                    res.send({ 
                                                Total : count1.toString(), 
                                                New : count2.toString(), 
                                                Preparing : count3.toString(),
                                                Delivered : count4.toString()
                                            });
                                }
                            })
                        }
                    })
                }
            })
        }
    });
};

module.exports = {

    getOrdersList,
    getOrdersListById,
    getOrdersListByUserID,
    getOrdersListByVendorId,
    newOrder,
    updateOrder,
    updateOrderStatus,
    getOrdersListByStatus,
    getVendorOrdersListByStatus,
    getOrdersStatusCount,
    getVendorOrdersStatusCount

};