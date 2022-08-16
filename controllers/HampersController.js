const HampersModel = require("../models/HampersModels");
const AdminNotificationModel = require('../models/AdminNotificationModels');
const VendorNotificationModel = require("../models/VendorNotification");
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
    const Price = req.body.Price;
    const Product_Contains = req.body.Product_Contains;
    const Description = req.body.Description;
    const Created_On = moment().tz('Asia/Kolkata').format("DD-MM-YYYY hh:mm A");
    //file - HamperImage

    try {
        if (VendorID || Vendor_ID || VendorName || VendorPhoneNumber1 || VendorAddress || GoogleLocation || HampersName
            || Price || req.file !== undefined || Description) {
            const Image = await cloudinary.uploader.upload(req.file.path);
            const FinalLocation = JSON.parse(GoogleLocation);
            const FinalProduct_Contains = JSON.parse(Product_Contains);

            const NewHampers = HampersModel({
                VendorID: VendorID,
                Vendor_ID: Vendor_ID,
                VendorName: VendorName,
                VendorPhoneNumber1: VendorPhoneNumber1,
                VendorPhoneNumber2: VendorPhoneNumber2,
                VendorAddress: VendorAddress,
                GoogleLocation: FinalLocation,
                HampersName: HampersName,
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

const UpdateHampers = async(req, res) => {
    const Id = req.params.id;
    const VendorID = req.body.VendorID;
    const Vendor_ID = req.body.Vendor_ID;
    const VendorName = req.body.VendorName;
    const VendorPhoneNumber1 = req.body.VendorPhoneNumber1;
    const VendorPhoneNumber2 = req.body.VendorPhoneNumber2;
    const VendorAddress = req.body.VendorAddress;
    const GoogleLocation = req.body.GoogleLocation;
    const HampersName = req.body.HampersName;
    const Price = req.body.Price;
    const Product_Contains = req.body.Product_Contains;
    const Description = req.body.Description;
    const Modified_On = moment().tz('Asia/Kolkata').format("DD-MM-YYYY hh:mm A");
    //file - HamperImage
    try {
        // HampersModel.findOne({_id:Id}, async function(err, result){
        //     if(err){
        //         res.send({ statusCode: 400, message: 'Failed' });
        //     }else{
                var Image;
                if (req.file) {
                    var ImageURL = await cloudinary.uploader.upload(req.file.path);
                    Image = ImageURL.url
                }
                const FinalLocation = JSON.parse(GoogleLocation);
                const FinalProduct_Contains = JSON.parse(Product_Contains);
        
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
                        Price: Price,
                        Product_Contains: FinalProduct_Contains,
                        HamperImage: Image,
                        Description: Description,
                        Modified_On: Modified_On,
                    }
                }, function(err){
                    if(err){
                        res.send({ statusCode: 400, message: 'Failed' });
                    }else{
                        res.send({ statusCode: 200, message: 'Updated Successfully' });
                    }
                });
            // }
        // });
    } catch (err) {
        res.send({ statusCode: 400, message: 'Failed' });
    }
};

const GetHampersList = (req, res) => {
    try{
        HampersModel.find({}, function(err, result){
            if(err){
                res.send({ statusCode: 400, message: 'Failed' });
            }else{
                if(result.length === 0){
                    res.send({ message: 'No Records Found' });
                }else{
                    res.send(result.reverse());
                }
            }
        });
    }catch(err){
        res.send({ statusCode: 400, message: 'Failed' });
    }
};

const GetVendorsHampersList = (req, res) => {
    const Id = req.params.id;
    try{
        HampersModel.find({VendorID: Id}, function(err, result){
            if(err){
                res.send({ statusCode: 400, message: 'Failed' });
            }else{
                if(result.length === 0){
                    res.send({ message: 'No Records Found' });
                }else{
                    res.send(result.reverse());
                }
            }
        });
    }catch(err){
        res.send({ statusCode: 400, message: 'Failed' });
    }
};

const GetHamperDetailsById = (req, res) => {
    const Id = req.params.id;
    try{
        HampersModel.findOne({_id: Id}, function(err, result){
            if(err){
                res.send({ statusCode: 400, message: 'Failed' });
            }else{
                res.send(result);
            }
        });
    }catch(err){
        res.send({ statusCode: 400, message: 'Failed' });
    }
};

const ApproveHampers = (req, res) => {
    const Id = req.params.id;
    const Status = req.body.Status;
    const Status_Updated_By= req.body.Status_Updated_By;
    const Status_Updated_On = moment().tz('Asia/Kolkata').format("DD-MM-YYYY hh:mm A");
    try{
        HampersModel.findOneAndUpdate({_id: Id},{
            $set:{
                Status:Status,
                Status_Updated_By:Status_Updated_By,
                Status_Updated_On:Status_Updated_On,
            }
        }, function(err, result){
            if(err){
                res.send({ statusCode: 400, message: 'Failed' });
            }else{
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
                Notification.save(function(err){
                    if(err){
                        res.send({ statusCode: 400, message: "Failed" });
                    }else{
                        res.send({ statusCode: 200, message: 'Approved Successfully' });
                    }
                });
            }
        });
    }catch(err){
        res.send({ statusCode: 400, message: 'Failed' });
    }
};

const RemoveHampers = (req, res) => {
    const Id = req.params.id;
    try{
        HampersModel.findOneAndDelete({_id:Id}, function(err){
            if(err){
                res.send({ statusCode: 400, message: 'Failed' });
            }else{
                res.send({ statusCode: 200, message: 'Deleted Successfully' });
            }
        });
    }catch(err){
        res.send({ statusCode: 400, message: 'Failed' });
    };
};

const OrderHampers = (req, res) => {

};

const UpdateHamperOrderStatus = (req, res) => {

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
    UpdateHamperOrderStatus

};