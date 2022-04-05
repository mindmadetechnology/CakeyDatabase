const cakeModel = require("../models/CakeModels");

const moment = require('moment-timezone');

const cloudinary = require("../middleware/cloudnary");


// get cake list
const getcakelist = (req, res) => {
    cakeModel.find({ IsDeleted: 'n' }, function (err, result) {
        if (err) {
            res.send({ statusCode: 400, message: "There  is was a problem adding the information to the database." });
        } else {
            res.send(result);
        }
    })
};

// get cake list
const getcakelistByVendorName = (req, res) => {
    const VendorName = req.params.VendorName;
    cakeModel.find({ VendorName: VendorName, IsDeleted: 'n' }, function (err, result) {
        if (err) {
            res.send({ statusCode: 400, message: "There  is was a problem adding the information to the database." });
        } else {
            res.send(result);
        }
    })
};

// get single details using id
const getCakeDetails = (req, res) => {
    const id = req.params.id;
    cakeModel.findById({ _id: id }, function (err, result) {

        if (err) {
            res.send({ statusCode: 400, message: "Failed" })
        } else {
            res.send(result)
        }
    })
}
//Add new vendors
const addCake = async (req, res) => {
    const Title = req.body.Title;
    const Description = req.body.Description;
    const TypeOfCake = req.body.TypeOfCake;
    const EggOrEggless = req.body.EggOrEggless;
    const Price = req.body.Price;
    const Ratings = req.body.Ratings;
    const VendorID = req.body.VendorID;
    const VendorName = req.body.VendorName;
    const VendorPhoneNumber = req.body.VendorPhoneNumber;
    const FlavourList = req.body.FlavourList;
    const ShapeList = req.body.ShapeList;
    const CakeToppings = req.body.CakeToppings;
    const WeightList = req.body.WeightList;
    const Stock = req.body.Stock;
    const Created_On = moment().tz('Asia/Kolkata').format("DD-MM-YYYY hh:mm A");
    try {
        if (req.files === undefined || Title === undefined || Description === undefined || TypeOfCake === undefined || EggOrEggless === undefined || Price === undefined || Ratings === undefined || VendorID === undefined || VendorName === undefined || VendorPhoneNumber === undefined || FlavourList === undefined || ShapeList === undefined || CakeToppings === undefined || WeightList === undefined || Stock === undefined) {
            res.send({ statusCode: 400, message: "*required" })
        } else {
            // res.send({ statusCode: 400, message: req.files })
            var imageUrlList = [];
            for (let i = 0; i < req.files.length; i++) {
                // Upload the local image to Cloudinary
                // and get image url as response
                var result = await cloudinary.uploader.upload(req.files[i].path);
                imageUrlList.push(result.url);
            }

            // var result=   cloudinary.uploader.upload(req.file.path);
            const vendorValidate = new cakeModel({
                Title: Title,
                Description: Description,
                TypeOfCake: TypeOfCake,
                Images: imageUrlList,
                EggOrEggless: EggOrEggless,
                Price: Price,
                Ratings: Ratings,
                VendorID: VendorID,
                VendorName: VendorName,
                VendorPhoneNumber: VendorPhoneNumber,
                FlavourList: FlavourList,
                ShapeList: ShapeList,
                CakeToppings: CakeToppings,
                WeightList: WeightList,
                Stock: Stock,
                Created_On: Created_On

            });
            vendorValidate.save(function (err, result) {
                if (err) {
                    res.send({ statusCode: 400, message: "Failed" });
                } else {
                    res.send({ statusCode: 200, message: "Added Successfully" })
                }
            });
        }
    } catch (err) {
        console.log(err);
    }
};

//Update vendor's details
const updateCake = (req, res) => {
    const id = req.params.id;
    const Title = req.body.Title;
    const Description = req.body.Description;
    const TypeOfCake = req.body.TypeOfCake;
    const imageUrl = req.body.imageUrl;
    const EggOrEggless = req.body.EggOrEggless;
    const Price = req.body.Price;
    const Ratings = req.body.Ratings;
    const VendorID = req.body.VendorID;
    const VendorName = req.body.VendorName;
    const VendorPhoneNumber = req.body.VendorPhoneNumber;
    const FlavourList = req.body.FlavourList;
    const ShapeList = req.body.ShapeList;
    const CakeToppings = req.body.CakeToppings;
    const WeightList = req.body.WeightList;
    const Stock = req.body.Stock;
    const Modified_On = moment().tz('Asia/Kolkata').format("DD-MM-YYYY hh:mm A");

    try {
        cakeModel.findById({ _id: id }, async function (err, result) {
            if (err) {
                res.send({ statusCode: 400, message: "Failed" })
            } else if (result === null) {
                res.send({ statusCode: 400, message: "Failed" })
            } else {
                if (req.files === undefined || req.files === null) {
                    cakeModel.findOneAndUpdate({ _id: id },
                        {
                            $set: {
                                Title: Title,
                                Description: Description,
                                TypeOfCake: TypeOfCake,
                                Images: imageUrl,
                                EggOrEggless: EggOrEggless,
                                Price: Price,
                                Ratings: Ratings,
                                VendorID: VendorID,
                                VendorName: VendorName,
                                VendorPhoneNumber: VendorPhoneNumber,
                                FlavourList: FlavourList,
                                ShapeList: ShapeList,
                                CakeToppings: CakeToppings,
                                WeightList: WeightList,
                                Stock: Stock,
                                Modified_On: Modified_On,

                            }
                        }, function (err, result) {
                            if (err) {
                                res.send({ statusCode: 400, message: "Failed" });
                            } else {
                                res.send({ statusCode: 200, message: "Updated Successfully" });
                            }
                        });
                } else {
                    if (imageUrl === null || imageUrl === undefined || imageUrl === []) {
                        var imageUrlList = [];
                    } else {
                        var imageUrlList = imageUrl
                    }

                    for (let i = 0; i < req.files.length; i++) {
                        await cloudinary.uploader.upload(req.files[i].path, function (err, result) {
                            imageUrlList.push(result.url);
                        })
                    }
                    cakeModel.findOneAndUpdate({ _id: id },
                        {
                            $set: {
                                Title: Title,
                                Description: Description,
                                TypeOfCake: TypeOfCake,
                                Images: imageUrlList,
                                EggOrEggless: EggOrEggless,
                                Price: Price,
                                Ratings: Ratings,
                                VendorID: VendorID,
                                VendorName: VendorName,
                                VendorPhoneNumber: VendorPhoneNumber,
                                FlavourList: FlavourList,
                                ShapeList: ShapeList,
                                CakeToppings: CakeToppings,
                                WeightList: WeightList,
                                Stock: Stock,
                                Modified_On: Modified_On,

                            }
                        }, function (err, result) {
                            if (err) {
                                res.send({ statusCode: 400, message: "Failed" });
                            } else {
                                res.send({ statusCode: 200, message: "Updated Successfully" });
                            }
                        });
                }

            }
        })
    } catch (err) {
        console.log(err);
    }
}
//delete vendors
const deleteCake = (req, res) => {
    const id = req.params.id;
    const IsDeleted = 'y';
    const Modified_On = moment().tz('Asia/Kolkata').format("DD-MM-YYYY hh:mm A");
    cakeModel.findOneAndUpdate({ _id: id }, { $set: { IsDeleted: IsDeleted, Modified_On: Modified_On } }, function (err, result) {
        if (err) {
            res.send({ statusCode: 400, message: "Failed" })
        } else {
            res.send({ statusCode: 200, message: "Deleted Successfully" })
        }
    })
}
module.exports = {
    addCake,
    updateCake,
    deleteCake,
    getcakelist,
    getCakeDetails,
    getcakelistByVendorName
}