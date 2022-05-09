const categoryModel = require("../models/CategoryModels");
const moment = require('moment-timezone');
// const { find } = require("../models/CategoryModels");

//add new category
const AddCategory = (req, res) => {
    const Category = req.body.Category;
    const Category_Created_On = moment().tz('Asia/Kolkata').format("DD-MM-YYYY hh:mm A");

    categoryModel.findOne({ Category: Category,IsDeleted :'n' }, function (err, result) {
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

//add new Subcategory
const AddNewSubCategory = (req, res) => {
    const Category = req.body.Category;
    const SubCategory = req.body.SubCategory;
    const SubCategory_Created_On = moment().tz('Asia/Kolkata').format("DD-MM-YYYY hh:mm A");
    if(Category === "" || Category === undefined || SubCategory === "" || SubCategory === undefined){
        res.send({statusCode :400,message:"*required"});
    }else{
    categoryModel.findOne({ Category: Category ,IsDeleted:'n' }, function (err, result) {
        if (err) {
            return res.send({ statusCode: 400, message: "Failed1" })
        } else if( result === null){
            res.send({statusCode:400,message:"Category Not Exist"});
        }
        else{
            if (result.SubCategory.length === 0) {
                categoryModel.findOneAndUpdate({ Category: Category,IsDeleted :'n' },
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
                    categoryModel.findOneAndUpdate({ Category: Category ,IsDeleted:'n'},
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
}
};

//get category list
const GetAllCategory = (req, res) => {
    categoryModel.find({IsDeleted:'n'},function(err,result){
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

//Hard delete
const DeleteCategory=(req,res)=>{
    const id=req.params.id;
    categoryModel.findByIdAndDelete({ _id: id },function(err,result){
        if(err){
            res.send({ statusCode: 400, message: "Failed" });
        }else{
            res.send({ statusCode: 200, message: "Deleted Successfully" ,result:result});
        }
    })
}

//soft delete
// const DeleteCategory = (req, res) => {

//     const id = req.params.id;
//     const IsDeleted = 'y';
//     const Modified_On = moment().tz('Asia/Kolkata').format("DD-MM-YYYY hh:mm A");

//     categoryModel.findOneAndUpdate({ _id: id },
//         {
//             $set: {
//                 IsDeleted: IsDeleted,
//                 Modified_On: Modified_On
//             }
//         }, function (err, result) {
//             if (err) {
//                 res.send({ statusCode: 400, message: "Failed" });
//             } else {
//                 res.send({ statusCode: 200, message: "Deleted Successfully" });
//             }
//         });

// };


//Delete Subcategory using filter method
const DeleteSubCategory=(req,res)=>{
    const id=req.params.id;
    const Category=req.body.Category;
    categoryModel.findOne({Category:Category},function(err,result){
        if(err){
            res.send({statusCode:400,message:"Failed"})
        }else{
           const SubcategoryList= result.SubCategory.filter((val)=>{
                if(val._id.toString() !== id){
                   return val;
                }
            })
            categoryModel.findOneAndUpdate({Category:Category},{
                $set:{
                    SubCategory:SubcategoryList
                }
            },function(err,result){
                if(err){
                    res.send({statusCode:400,message:"Failed"})
                }
                else{
                    res.send({statusCode:200,message:"Subcategory Deleted Successfully"});

                }
            })
            // res.send({ statusCode: 200, message: "Deleted Successfully" ,result:result}); 
        }
    })   
};

const UpdateCategory = (req, res) => {
    const id = req.params.id;
    const Category = req.body.Category;
    const Category_Modified_On = moment().tz('Asia/Kolkata').format("DD-MM-YYYY hh:mm A");

    try {
        if(Category){
            categoryModel.find({Category : Category},function(err, result){
                if(err){
                    res.send({ statusCode : 400, message : 'Failed'});
                }else if(result === null){
                    categoryModel.findByIdAndUpdate({_id : id},{
                        $set : {
                            Category:Category,
                            Category_Modified_On : Category_Modified_On
                        }
                    },function(err, result){
                        if(err){
                            res.send({ statusCode : 400, message : 'Failed'});
                        }else{
                            res.send({ statusCode : 200, message : 'Category Updated Successfully'});
                        }
                    });
                }else{
                    res.send({ statusCode : 400, message : 'Category Already Exist'});
                }
            })
            
        };
    }catch (err){
        console.log(err);
    };
};

module.exports = {
    AddCategory,
    AddNewSubCategory,
    GetAllCategory,
    DeleteCategory,
    DeleteSubCategory,
    UpdateCategory 
};