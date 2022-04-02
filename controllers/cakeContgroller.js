const cakeModel = require("../models/CakeModels");

const moment = require('moment-timezone');

const cloudinary = require("../middleware/cloudnary");


// get cake list

const getcakelist = (req, res) => {

    cakeModel.find({}, function (err, result) {
        if (err) {
            res.send({ statusCode: 400, message: "There  is was a problem adding the information to the database." });
        } else {
            res.send(result);
        }
    })
};


//Add new vendors
const addCake =async  (req, res) => {
    const Title = req.body.Title;
    const Description = req.body.Description;
    const TypeOfCake = req.body.TypeOfCake;
    const eggOrEggless = req.body.eggOrEggless;
    const Price = req.body.Price;
    const Ratings = req.body.Ratings;
    const VendorID = req.body.VendorID;
    const VendorName = req.body.VendorName;
    const MobileNumberVendor = req.body.MobileNumberVendor;
    const FlavorList = req.body.FlavorList;
    const ShapesLists = req.body.ShapesLists;
    const CakeToppings = req.body.CakeToppings;
    const WeightList = req.body.WeightList;
    const Created_On = moment().tz('Asia/Kolkata').format("DD-MM-YYYY hh:mm A");


   

   
    try {
        if (req.files === undefined || Title === undefined || Description === undefined || TypeOfCake === undefined || eggOrEggless === undefined || Price === undefined || Ratings === undefined || VendorID === undefined || VendorName === undefined || MobileNumberVendor === undefined || FlavorList === undefined || ShapesLists === undefined || CakeToppings === undefined || WeightList === undefined) {
            res.send({ statusCode: 400, message: "*required" })
        } else {

            var imageUrlList = [];

            for (var i = 0; i < req.files.length; i++) {
                var locaFilePath = req.files[i].path;
        
                // Upload the local image to Cloudinary
                // and get image url as response
                var result = await cloudinary.uploader.upload(locaFilePath);
                imageUrlList.push(result.url);
            }
            res.send({ statusCode: 200, message: locaFilePath })
            // var result=   cloudinary.uploader.upload(req.file.path);
            // const vendorValidate = new cakeModel({
            //     Title: Title,
            //     Description: Description,
            //     TypeOfCake: TypeOfCake,
            //     Images: imageUrlList,
            //     eggOrEggless: eggOrEggless,
            //     Price: Price,
            //     Ratings: Ratings,
            //     VendorID: VendorID,
            //     VendorName: VendorName,
            //     MobileNumberVendor: MobileNumberVendor,
            //     FlavorList: FlavorList,
            //     ShapesLists: ShapesLists,
            //     CakeToppings: CakeToppings,
            //     WeightList: WeightList,
            //     Created_On: moment().tz('Asia/Kolkata').format("DD-MM-YYYY hh:mm A")

            // });
            // vendorValidate.save(function (err, result) {
            //     if (err) {
            //         res.send({ statusCode: 400, message: "Failed" });
            //     } else {
            //         res.send({ statusCode: 200, message: imageUrlList })
            //     }
            // });
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
    const eggOrEggless = req.body.eggOrEggless;
    const Price = req.body.Price;
    const Ratings = req.body.Ratings;
    const VendorID = req.body.VendorID;
    const VendorName = req.body.VendorName;
    const MobileNumberVendor = req.body.MobileNumberVendor;
    const FlavorList = req.body.FlavorList;
    const ShapesLists = req.body.ShapesLists;
    const CakeToppings = req.body.CakeToppings;
    const WeightList = req.body.WeightList;
    const Modified_On = moment().tz('Asia/Kolkata').format("DD-MM-YYYY hh:mm A");

    try {
        cakeModel.findById({ _id: id }, function (err, result) {
            if (err) {
                res.send({ statusCode: 400, message: "Failed" })
            } else if (result === null) {
                res.send({ statusCode: 400, message: "Failed" })
            }
            else {
                if (req.file === undefined || req.file === null) {
                    cakeModel.findOneAndUpdate({ _id: id },
                        {
                            $set: {
                                Title: Title,
                                Description: Description,
                                TypeOfCake: TypeOfCake,
                                Images: imageUrl,
                                eggOrEggless: eggOrEggless,
                                Price: Price,
                                Ratings: Ratings,
                                VendorID: VendorID,
                                VendorName: VendorName,
                                MobileNumberVendor: MobileNumberVendor,
                                FlavorList: FlavorList,
                                ShapesLists: ShapesLists,
                                CakeToppings: CakeToppings,
                                WeightList: WeightList,
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
                    cloudinary.uploader.upload(req.file.path, function (err, result) {
                        if (err) {
                            res.send(err);
                        } else {
                            cakeModel.findOneAndUpdate({ _id: id },
                                {
                                    $set: {
                                        Title: Title,
                                        Description: Description,
                                        TypeOfCake: TypeOfCake,
                                        Images: result.secure_url,
                                        eggOrEggless: eggOrEggless,
                                        Price: Price,
                                        Ratings: Ratings,
                                        VendorID: VendorID,
                                        VendorName: VendorName,
                                        MobileNumberVendor: MobileNumberVendor,
                                        FlavorList: FlavorList,
                                        ShapesLists: ShapesLists,
                                        CakeToppings: CakeToppings,
                                        WeightList: WeightList,
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
                    );
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
    getcakelist
}