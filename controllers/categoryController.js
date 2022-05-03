const categoryModel = require("../models/CategoryModels");
const moment = require('moment-timezone');

const AddCategory = (req, res) => {
    const Category = req.body.Category;
    const Category_Created_On = moment().tz('Asia/Kolkata').format("DD-MM-YYYY hh:mm A");

    categoryModel.findOne({ Category: Category }, function (err, result) {
        if (err) {
            res.send({ statusCode: 400, message: "Failed1" });
        }
        else if (result === null) {
            if (Category === undefined || Category === "") {
                res.send({ statusCode: 400, message: "*required" });
            } else {
                const NewCategory = new categoryModel({
                    Category: Category,
                    Category_Created_On: Category_Created_On
                });

                NewCategory.save(function (err, result) {
                    if (err) {
                        res.send({ statusCode: 400, message: "Failed" });
                    }
                    else {
                        res.send({ statusCode: 200, message: "Category Added Successfully", result: result });
                    }
                })

            }
        }
        else {
            res.send({ statusCode: 400, message: "Category already exist" });
        }
    })
}
const AddNewSubCategory = (req, res) => {
    const Category = req.body.Category;
    const SubCategory = req.body.SubCategory;
    const SubCategory_Created_On = moment().tz('Asia/Kolkata').format("DD-MM-YYYY hh:mm A");
    categoryModel.findOne({ Category: Category }, function (err, result) {
        if (err) {
            return res.send({ statusCode: 400, message: "Failed1" })
        } else {
            if (result.SubCategory.length === 0) {
                categoryModel.findOneAndUpdate({ Category: Category },
                    {
                        $set: {
                            SubCategory: {
                                Name: SubCategory,
                                SubCategory_Created_On: SubCategory_Created_On
                            }
                        }
                    }, function (err, result) {
                        if (err) {
                            res.send({ statusCode: 400, message: "Failed" });
                        }
                        else {
                            res.send({ statusCode: 200, message: "Subcategory added Successfully" });

                        }
                    })

            } else {
                var IsExistSubCategory = result.SubCategory.filter((val) => {
                    if (val.Name.toLowerCase() === SubCategory.toLowerCase()) {
                        return val;
                    }
                })
                if (IsExistSubCategory.length !== 0) {
                    res.send({ statusCode: 400, message: "Subcategory already exist" });
                }
                else {
                    var SubCategoryList = result.SubCategory;
                    var NewSubCategory = {
                        Name: SubCategory,
                        SubCategory_Created_On: SubCategory_Created_On
                    }
                    var NewSubCategoryList = [...SubCategoryList, NewSubCategory];
                    categoryModel.findOneAndUpdate({ Category: Category },
                        {
                            $set: {
                                SubCategory: NewSubCategoryList
                            }
                        }, function (err2, result2) {
                            if (err2) {
                                res.send({ statusCode: 400, message: "Failed" });
                            }
                            else {
                                res.send({ statusCode: 200, message: "SubCategory added Successfully" });
                            }
                        })
                }
            }
        }
    })
};

const GetAllCategory = (req, res) => {
    categoryModel.find({},function(err,result){
        if(err){
            res.send({ statusCode: 400, message: "Failed" })
        }else{
            if(result.length === 0){
                res.send({ statusCode : 400, message : 'No Records Found' });
            }else{
                res.send(result)
            }
        }
    })
};

module.exports = {
    AddCategory,
    AddNewSubCategory,
    GetAllCategory
};