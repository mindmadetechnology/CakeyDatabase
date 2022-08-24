const ToppersModel = require('../models/ToppersModels');
const moment = require('moment-timezone');
const cloudinary = require("../middleware/cloudnary");

const GetAllToppers = (req, res) => {

    try {
        ToppersModel.find({ IsDeleted : 'n' }, function (err, result) {
            if (err) {
                res.send({ statusCode: 400, message: "Failed" });
            } else {
                if (result.length === 0) {
                    res.send({ message: "No Records Found" });
                } else {
                    res.send(result.reverse());
                }
            }
        });
    } catch (err) {
        res.send({ statusCode: 400, message: 'Failed' });
    }
};

const GetToppersByVendorID = (req, res) => {

    const Id = req.params.id;
    try {
        ToppersModel.find({ VendorID: Id, IsDeleted : 'n' }, function (err, result) {
            if (err) {
                res.send({ statusCode: 400, message: "Failed" });
            } else {
                if (result.length === 0) {
                    res.send({ message: "No Records Found" });
                } else {
                    res.send(result.reverse());
                }
            }
        });
    } catch (err) {
        res.send({ statusCode: 400, message: 'Failed' });
    }
};

const GetToppersByVendorIDandStock = (req, res) => {

    const Id = req.params.id;
    try {
        ToppersModel.find({ VendorID: Id, Stock: 'InStock', IsDeleted : 'n' }, function (err, result) {
            if (err) {
                res.send({ statusCode: 400, message: "Failed" });
            } else {
                if (result.length === 0) {
                    res.send({ message: "No Records Found" });
                } else {
                    res.send(result);
                }
            }
        });
    } catch (err) {
        res.send({ statusCode: 400, message: 'Failed' });
    }
};

const AddNewTopper = (req, res) => {
    
    const VendorID = req.body.VendorID;
    const Vendor_ID = req.body.Vendor_ID;
    const VendorName = req.body.VendorName;
    const TopperName = req.body.TopperName;
    const Price = req.body.Price;
    const Stock = req.body.Stock;
    const AvailableCount=req.body.AvailableCount;
    const Created_On = moment().tz('Asia/Kolkata').format("DD-MM-YYYY hh:mm A");
    //file - TopperImage

    try {
        if (!VendorID || !Vendor_ID || !VendorName || !TopperName || !Price || !Stock || req.file === undefined) {
            res.send({ statusCode: 400, message: '*required' });
        } else {
            ToppersModel.find({ VendorID: VendorID }, async function (err, result) {
                if (err) {
                    res.send({ statusCode: 400, message: 'Failed' });
                } else {
                    if (result.length === 25) {
                        res.send({ statusCode: 400, message: 'You can add only 25 Toppers' });
                    } else {
                        const image = await cloudinary.uploader.upload(req.file.path);
                        const TopperImage = image.url;

                        const Topper = new ToppersModel({
                            VendorID: VendorID,
                            Vendor_ID: Vendor_ID,
                            VendorName: VendorName,
                            TopperName: TopperName?.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase()),
                            TopperImage: TopperImage,
                            Price: Price,
                            Stock: Stock,
                            AvailableCount:AvailableCount,
                            Created_On: Created_On,
                        });
                        Topper.save(function (err, result) {
                            if (err) {
                                res.send({ statusCode: 400, message: 'Failed' });
                            } else {
                                res.send({ statusCode: 200, message: 'Added Successfully' });
                            }
                        });
                    }
                }
            });
        }
    } catch (err) {
        res.send({ statusCode: 400, message: 'Failed' });
    };
};

const UpdateTopper = async (req, res) => {

    const Id = req.params.id;
    const VendorID = req.body.VendorID;
    const Vendor_ID = req.body.Vendor_ID;
    const VendorName = req.body.VendorName;
    const TopperName = req.body.TopperName;
    const AvailableCount = req.body.AvailableCount;
    const Price = req.body.Price;
    const Stock = req.body.Stock;
    const Modified_On = moment().tz('Asia/Kolkata').format("DD-MM-YYYY hh:mm A");
    //file - TopperImage

    try {
        var TopperImage;
        if (req.file === undefined) {
            const ImagePromise = new Promise((resolve, reject) => {
                ToppersModel.findOne({ _id: Id }, function (err, result) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result.TopperImage);
                    }
                })
            });
            TopperImage = await ImagePromise;
        } else {
            const Image = await cloudinary.uploader.upload(req.file.path);
            TopperImage = Image.url;
        };
        ToppersModel.findOneAndUpdate({ _id: Id }, {
            $set: {
                VendorID: VendorID,
                Vendor_ID: Vendor_ID,
                VendorName: VendorName,
                TopperName: TopperName?.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase()),
                TopperImage: TopperImage,
                AvailableCount:AvailableCount,
                Price: Price,
                Stock: Stock,
                Modified_On: Modified_On,
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

}

const removeToppers=(req,res)=>{
    const Id = req.params.id;
    try{
        ToppersModel.findOne({_id:Id},function(err,result){
            if(err){
                res.send({statusCode:400,message:"Failed"})
            }else if(result === null){
                res.send({statusCode:400, message:"ToppersId Doesn't Exist"})
            }else{
                ToppersModel.findOneAndDelete({_id:Id},function(err,result){
                    if(err){
                        res.send({statusCode:400,message:"Failed"})
                    }else{
                        res.send({statusCode:200,message:"Selected Topper is Removed Successfully"})
                    }
                })
            }
        })

    }catch(err){
        res.send({statusCode:400,message:"Catch Error"})
    }


}

module.exports = {
    AddNewTopper,
    UpdateTopper,
    GetAllToppers,
    GetToppersByVendorID,
    GetToppersByVendorIDandStock,
    removeToppers
};