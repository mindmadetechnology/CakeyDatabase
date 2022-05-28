const vendorModel = require('../models/vendorModels');
const cakeModel = require('../models/CakeModels');

const VendorRatings = (req, res) => {
    const Id = req.params.id;
    const Ratings = req.body.Ratings;

    try {
        vendorModel.findById({ _id: Id }, function (err, result) {
            if (err) {
                res.send({ statusCode: 400, message: 'Failed' });
            } else {
                if (result.Ratings === 0) {
                    vendorModel.findOneAndUpdate({ _id: Id }, {
                        $set: {
                            Ratings: Ratings
                        }
                    }, function (err, result) {
                        if (err) {
                            res.send({ statusCode: 400, message: 'Failed' });
                        } else {
                            res.send({ statusCode: 200, message: 'Ratings Updated Successfully' })
                        }
                    });
                } else {
                    const NewRatings = (result.Ratings + Ratings) / 2;

                    vendorModel.findOneAndUpdate({ _id: Id }, {
                        $set: {
                            Ratings: NewRatings
                        }
                    }, function (err, result) {
                        if (err) {
                            res.send({ statusCode: 400, message: 'Failed' });
                        } else {
                            res.send({ statusCode: 200, message: 'Ratings Updated Successfully' })
                        }
                    });
                }
            }
        })
    } catch (err) {
        res.send({ statusCode: 400, message: 'Failed' });
    }
};

const CakeRatings = (req, res) => {
    const Id = req.params.id;
    const Ratings = req.body.Ratings;

    try {
        cakeModel.findById({ _id: Id }, function (err, result) {
            if (err) {
                res.send({ statusCode: 400, message: 'Failed' });
            } else {
                if (result.Ratings === 0) {
                    cakeModel.findOneAndUpdate({ _id: Id }, {
                        $set: {
                            Ratings: Ratings
                        }
                    }, function (err, result) {
                        if (err) {
                            res.send({ statusCode: 400, message: 'Failed' });
                        } else {
                            res.send({ statusCode: 200, message: 'Ratings Updated Successfully' })
                        }
                    });
                } else {
                    const NewRatings = ((result.Ratings + Ratings) / 2).toFixed(1);

                    cakeModel.findOneAndUpdate({ _id: Id }, {
                        $set: {
                            Ratings: NewRatings
                        }
                    }, function (err, result) {
                        if (err) {
                            res.send({ statusCode: 400, message: 'Failed' });
                        } else {
                            res.send({ statusCode: 200, message: 'Ratings Updated Successfully' })
                        }
                    });
                }
            }
        })
    } catch (err) {
        res.send({ statusCode: 400, message: 'Failed' });
    }
};

module.exports = {
    VendorRatings,
    CakeRatings
}