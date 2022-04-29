const cakeModel = require("../models/CakeModels");
const moment = require('moment-timezone');
const cloudinary = require("../middleware/cloudnary");

// get cake list
const getcakelist = (req, res) => {

    cakeModel.find({ IsDeleted: 'n' }, function (err, result) {
        if (err) {
            res.send({ statusCode: 400, message: "There  is was a problem adding the information to the database." });
        } else {
            if(result.length === 0){
                res.send({message : "No Records Found"})
            }else{
                res.send(result)
            }
        }
    });

};

// get cake list based on vendoename
const getcakelistByVendorName = (req, res) => {

    const VendorName = req.params.VendorName;

    cakeModel.find({
        VendorName: VendorName,
        IsDeleted: 'n'
    }, function (err, result) {
        if (err) {
            res.send({ statusCode: 400, message: "There  is was a problem adding the information to the database." });
        } else {
            if(result.length === 0){
                res.send({message : "No Records Found"})
            }else{
                res.send(result)
            }
        }
    });
};

const getcakelistByVendorId = (req,res) => {

    const VendorId = req.params.VendorId;

    cakeModel.find({
        VendorID : VendorId,
        IsDeleted: 'n'
    }, function (err, result) {
        if (err) {
            res.send({ statusCode: 400, message: "There  is was a problem adding the information to the database." });
        } else {
            if(result.length === 0){
                res.send({message : "No Records Found"})
            }else{
                res.send(result)
            }
        }
    });

};

// get single cake's detail using id
const getCakeDetails = (req, res) => {

    const id = req.params.id;

    cakeModel.findById({ _id: id }, function (err, result) {
        if (err) {
            res.send({ statusCode: 400, message: "Failed" });
        } else {
            res.send(result);
        }
    });

};

//Add new cake
const addCake = async (req, res) => {

    const Title = req.body.Title;
    const Description = req.body.Description;
    const TypeOfCake = req.body.TypeOfCake;
    const EggOrEggless = req.body.EggOrEggless;
    const Price = req.body.Price;
    const Discount = req.body.Discount;
    const Ratings = req.body.Ratings;
    const VendorID = req.body.VendorID;
    const VendorName = req.body.VendorName;
    const VendorPhoneNumber = req.body.VendorPhoneNumber;
    const FlavourList = req.body.FlavourList;
    const ShapeList = req.body.ShapeList;
    const CakeToppings = req.body.CakeToppings;
    const WeightList = req.body.WeightList;
    // const Stock = req.body.Stock;
    const Street = req.body.Street;
    const City = req.body.City;
    const District = req.body.District;
    const Pincode = req.body.Pincode;
    const DeliveryCharge = req.body.DeliveryCharge;
    const Tax = req.body.Tax;
    const Created_On = moment().tz('Asia/Kolkata').format("DD-MM-YYYY hh:mm A");

    try {

        if (req.files === undefined || Title === undefined || Description === undefined || TypeOfCake === undefined ||
            EggOrEggless === undefined || Price === undefined || Ratings === undefined || VendorID === undefined ||
            VendorName === undefined || VendorPhoneNumber === undefined || FlavourList === undefined ||
            ShapeList === undefined || CakeToppings === undefined || WeightList === undefined || 
            Street === undefined || City === undefined || District === undefined || Pincode === undefined || 
            Discount === undefined || DeliveryCharge === undefined || Tax === undefined) {
            res.send({ statusCode: 400, message: "*required" });
        } else {
            var imageUrlList = [];
            console.log(req.files);
            for (let i = 0; i < req.files.length; i++) {
                var result = await cloudinary.uploader.upload(req.files[i].path, { width: 640,height : 426, crop: "scale",format:'webp' });
                imageUrlList.push(result.url);
            };
            console.log(imageUrlList);

            const vendorValidate = new cakeModel({
                Title: Title,
                Description: Description,
                TypeOfCake: TypeOfCake,
                Images: imageUrlList,
                EggOrEggless: EggOrEggless,
                Price: Price,
                Discount: Discount,
                Ratings: Ratings,
                VendorID: VendorID,
                VendorName: VendorName,
                VendorPhoneNumber: VendorPhoneNumber,
                VendorAddress : {
                    Street : Street,
                    City : City,
                    District : District,
                    Pincode : Pincode
                },
                FlavourList: FlavourList,
                ShapeList: ShapeList,
                CakeToppings: CakeToppings,
                WeightList: WeightList,
                DeliveryCharge : DeliveryCharge,
                Tax : Tax,
                Created_On: Created_On
            });

            vendorValidate.save(function (err, result) {
                if (err) {
                    res.send({ statusCode: 400, message: "Failed" });
                } else {
                    res.send({ statusCode: 200, message: "Added Successfully" });
                }
            });
        }

    } catch (err) {
        return err;
    };

};

//Update cake's details
const updateCake = (req, res) => {

    const id = req.params.id;
    const Title = req.body.Title;
    const Description = req.body.Description;
    const TypeOfCake = req.body.TypeOfCake;
    const Images = req.body.Images;
    const EggOrEggless = req.body.EggOrEggless;
    const Price = req.body.Price;
    const Discount = req.body.Discount;
    const Ratings = req.body.Ratings;
    const FlavourList = req.body.FlavourList;
    const ShapeList = req.body.ShapeList;
    const CakeToppings = req.body.CakeToppings;
    const WeightList = req.body.WeightList;
    const Stock = req.body.Stock;
    const DeliveryCharge = req.body.DeliveryCharge;
    const Tax = req.body.Tax;
    const Modified_On = moment().tz('Asia/Kolkata').format("DD-MM-YYYY hh:mm A");

    try {

        cakeModel.findById({ _id: id },async function (err, result) { 
            if (err) {
                res.send({ statusCode: 400, message: "Failed1" });
            } else if (result === null) {
                res.send({ statusCode: 400, message: "Failed2" });
            } else {
                    if (Images === null || Images === undefined || Images === []) {
                        var imageUrlList = [];
                    } else {
                        var imageUrlList = Images;
                    }
                    console.log(Array.isArray(Images))
                    
                    
                    if (req.files !== undefined || req.files !== null){
                        if(Array.isArray(Images)===false){
                            var imageUrlList = [Images]
                        }
                        
                    for (let i = 0; i < req.files.length; i++) {
                        await cloudinary.uploader.upload(req.files[i].path,{ width: 640,height : 426, crop: "scale",format:'webp' }, function (err, result) {
                            // imageUrlList=[...imageUrlList,result.url]
                            imageUrlList.push(result.url); 
                        });
                    };
                }
                console.log(imageUrlList)
                    cakeModel.findOneAndUpdate({ _id: id },
                        {
                            $set: {
                                Title: Title,
                                Description: Description,
                                TypeOfCake: TypeOfCake,
                                Images: imageUrlList,
                                EggOrEggless: EggOrEggless,
                                Price: Price,
                                Discount: Discount,
                                Ratings: Ratings,
                                FlavourList: FlavourList,
                                ShapeList: ShapeList,
                                CakeToppings: CakeToppings,
                                WeightList: WeightList,
                                Stock: Stock,
                                DeliveryCharge : DeliveryCharge,
                                Tax : Tax,
                                Modified_On: Modified_On,
    
                            }
                        }, function (err, result) {
                            if (err) {
                                res.send({ statusCode: 400, message: "Failed4", error:err });
                            } else {
                                res.send({ statusCode: 200, message: "Updated Successfully" });
                            }
                    });
            }
        });

    } catch (err) {
        res.send({ statusCode: 400, message: "Failed5" });
    };

};

//delete cake
const deleteCake = (req, res) => {

    const id = req.params.id;
    const IsDeleted = 'y';
    const Modified_On = moment().tz('Asia/Kolkata').format("DD-MM-YYYY hh:mm A");

    cakeModel.findOneAndUpdate({ _id: id },
        {
            $set: {
                IsDeleted: IsDeleted,
                Modified_On: Modified_On
            }
        }, function (err, result) {
            if (err) {
                res.send({ statusCode: 400, message: "Failed" });
            } else {
                res.send({ statusCode: 200, message: "Deleted Successfully" });
            }
        });

};

module.exports = {

    addCake,
    updateCake,
    deleteCake,
    getcakelist,
    getCakeDetails,
    getcakelistByVendorName,
    getcakelistByVendorId

};