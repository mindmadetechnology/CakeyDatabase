const BannerModel = require('../models/BannerModels');
const moment = require('moment-timezone');
const cloudinary = require("../middleware/cloudnary");

const AddNewBanner = async (req, res) => {
    const Slogan = req.body.Slogan;
    const Created_On = moment().tz('Asia/Kolkata').format("DD-MM-YYYY hh:mm A");
    //Image
    try {
        const Image = await cloudinary.uploader.upload(req.file.path);
        const NewBanner = BannerModel({
            Image: Image.url,
            Slogan: Slogan,
            Created_On: Created_On
        });
        NewBanner.save(function (err, result) {
            if (err) {
                res.send({ statusCode: 400, message: 'Failed' });
            } else {
                res.send({ statusCode: 200, message: 'Added Successfully' });
            }
        })
    } catch (err) {
        res.send({ statusCode: 400, message: 'Failed' });
    }
};

const GetBanner = (req, res) => {
    BannerModel.find({}, function (err, result) {
        if (err) {
            res.send({ statusCode: 400, message: 'Failed' });
        } else {
            if (result.length === 0) {
                res.send({ message: "No Records Found" });
            } else {
                res.send(result);
            }
        }
    });
};

const UpdateBanner = async (req, res) => {
    const id = req.params.id;
    const Slogan = req.body.Slogan;
    const Image = req.body.Image;
    const Modified_On = moment().tz('Asia/Kolkata').format("DD-MM-YYYY hh:mm A");

    try {
        var FinalImage;
        if (req.file === undefined) {
            FinalImage = Image
        } else {
            var uploadedImage = await cloudinary.uploader.upload(req.file.path);
            FinalImage = uploadedImage.url;
        };

        BannerModel.findOneAndUpdate({ _id: id }, {
            $set: {
                Image: FinalImage,
                Slogan: Slogan,
                Modified_On: Modified_On
            }
        }, function (err, result) {
            if (err) {
                res.send({ statusCode: 400, message: 'Failed' });
            } else {
                res.send({ statusCode: 200, message: 'Updated Successfully' });
            }
        })
    } catch (err) {

    }

};

const DeleteBanner = (req, res) => {
    const id = req.params.id;

    try {
        BannerModel.findOneAndDelete({ _id: id }, function (err, result) {
            if (err) {
                res.send({ statusCode: 400, message: 'Failed' });
            } else {
                res.send({ statusCode: 200, message: 'Deleted Successfully' });
            }
        })
    } catch (err) {
        res.send({ statusCode: 400, message: 'Failed' });
    }
};

module.exports = {
    AddNewBanner,
    GetBanner,
    UpdateBanner,
    DeleteBanner,
}