const CakeFlavoursModel = require('../models/flavourModels');
const CakeShapesModel = require('../models/shapesModels');
const CakeWeightModel = require('../models/weightModels');
const CakeToppingsModel = require('../models/cakeToppingsModel');
const CakeArticlesModel = require('../models/articlesModels');
const moment = require('moment-timezone');

const AddNewFlavours = (req, res) => {

    const Flavour = req.body.Flavour;
    const Created_On = moment().tz('Asia/Kolkata').format("DD-MM-YYYY hh:mm A");

    try{
        CakeFlavoursModel.find({},function(err,result){
            if(err){
                res.send(err);
            }else{
                const NewFlavour = result.filter(val=>{
                   return Flavour === val.Name
                });
                if(NewFlavour.length === 0){

                    const Flavour_List = new CakeFlavoursModel ({
                        Name : Flavour,
                        Created_On : Created_On
                    });
                    Flavour_List.save(function(err, result){
                        if(err){
                            res.send({ statusCode : 400, message : "Failed"});
                        }else{
                            res.send({ statusCode : 200, message : "Flavour Added Successfully"});
                        }
                    });
                }else{
                    res.send({statusCode : 400, message : 'Flavour Already Exist'});
                }    
            }
        })
    }catch(err){
        console.log(err);
    }
};

const GetFlavoursList = (req, res) => {

    CakeFlavoursModel.find({}, function(err, result){
        if(err){
            res.send({statusCode : 400, message : 'Failed'});
        }else{
            if(result.length === 0){
                res.send({message : 'No Records Found'});
            }else{
                res.send(result);
            }
        }
    })
};

const AddNewShapes = (req, res) => {
    
    const Shape = req.body.Shape;
    const Created_On = moment().tz('Asia/Kolkata').format("DD-MM-YYYY hh:mm A");

    try{
        CakeShapesModel.find({},function(err,result){
            if(err){
                res.send(err);
            }else{
                const NewShape = result.filter(val=>{
                   return Shape === val.Name
                });
                if(NewShape.length === 0){

                    const Shape_List = new CakeShapesModel ({
                        Name : Shape,
                        Created_On : Created_On
                    });
                    Shape_List.save(function(err, result){
                        if(err){
                            res.send({ statusCode : 400, message : "Failed"});
                        }else{
                            res.send({ statusCode : 200, message : "Shape Added Successfully"});
                        }
                    });
                }else{
                    res.send({statusCode : 400, message : 'Shape Already Exist'});
                }    
            }
        })
    }catch(err){
        console.log(err);
    }
};

const GetShapesList = (req, res) => {

    CakeShapesModel.find({}, function(err, result){
        if(err){
            res.send({statusCode : 400, message : 'Failed'});
        }else{
            if(result.length === 0){
                res.send({message : 'No Records Found'});
            }else{
                res.send(result);
            }
        }
    })
};

const AddNewWeight = (req, res) => {
    
    const Weight = req.body.Weight;
    const Created_On = moment().tz('Asia/Kolkata').format("DD-MM-YYYY hh:mm A");

    try{
        CakeWeightModel.find({},function(err,result){
            if(err){
                res.send(err);
            }else{
                const NewWeight = result.filter(val=>{
                   return Weight === val.Weight
                });
                if(NewWeight.length === 0){

                    const Weight_List = new CakeWeightModel ({
                        Weight : Weight,
                        Created_On : Created_On
                    });
                    Weight_List.save(function(err, result){
                        if(err){
                            res.send({ statusCode : 400, message : "Failed"});
                        }else{
                            res.send({ statusCode : 200, message : "Weight Added Successfully"});
                        }
                    });
                }else{
                    res.send({statusCode : 400, message : 'Weight Already Exist'});
                }    
            }
        })
    }catch(err){
        console.log(err);
    }
};

const GetWeightList = (req, res) => {

    CakeWeightModel.find({}, function(err, result){
        if(err){
            res.send({statusCode : 400, message : 'Failed'});
        }else{
            if(result.length === 0){
                res.send({message : 'No Records Found'});
            }else{
                res.send(result);
            }
        }
    })
};

const AddNewArticle = (req, res) => {

    const Article = req.body.Article;
    const Created_On = moment().tz('Asia/Kolkata').format("DD-MM-YYYY hh:mm A");

    try{
        CakeArticlesModel.find({},function(err,result){
            if(err){
                res.send(err);
            }else{
                const NewArticle = result.filter(val=>{
                   return Article === val.Name
                });
                if(NewArticle.length === 0){

                    const Article_List = new CakeArticlesModel ({
                        Name : Article,
                        Created_On : Created_On
                    });
                    Article_List.save(function(err, result){
                        if(err){
                            res.send({ statusCode : 400, message : "Failed"});
                        }else{
                            res.send({ statusCode : 200, message : "Article Added Successfully"});
                        }
                    });
                }else{
                    res.send({statusCode : 400, message : 'Article Already Exist'});
                }    
            }
        })
    }catch(err){
        console.log(err);
    }
};

const GetArticleList = (req, res) => {

    CakeArticlesModel.find({}, function(err, result){
        if(err){
            res.send({statusCode : 400, message : 'Failed'});
        }else{
            if(result.length === 0){
                res.send({message : 'No Records Found'});
            }else{
                res.send(result);
            }
        }
    })
};

const AddNewCakeToppings = (req, res) => {
    
    const CakeToppings = req.body.CakeToppings;
    const Created_On = moment().tz('Asia/Kolkata').format("DD-MM-YYYY hh:mm A");

    try{
        CakeToppingsModel.find({},function(err,result){
            if(err){
                res.send(err);
            }else{
                const NewCakeToppings = result.filter(val=>{
                    
                   return CakeToppings === val.Name
                });
                if(NewCakeToppings.length === 0){

                    const CakeToppings_List = new CakeToppingsModel ({
                        Name : CakeToppings,
                        Created_On : Created_On
                    });
                    CakeToppings_List.save(function(err, result){
                        if(err){
                            res.send({ statusCode : 400, message : "Failed"});
                        }else{
                            res.send({ statusCode : 200, message : "Flavour Added Successfully"});
                        }
                    });
                }else{
                    res.send({statusCode : 400, message : 'Flavour Already Exist'});
                }    
            }
        })
    }catch(err){
        console.log(err);
    }
};

const GetCakeToppingsList = (req, res) => {

    CakeToppingsModel.find({}, function(err, result){
        if(err){
            res.send({statusCode : 400, message : 'Failed'});
        }else{
            if(result.length === 0){
                res.send({message : 'No Records Found'});
            }else{
                res.send(result);
            }
        }
    })
};

module.exports = {
    AddNewFlavours,
    GetFlavoursList,
    AddNewShapes,
    GetShapesList,
    AddNewWeight,
    GetWeightList,
    AddNewArticle,
    GetArticleList,
    AddNewCakeToppings,
    GetCakeToppingsList
};