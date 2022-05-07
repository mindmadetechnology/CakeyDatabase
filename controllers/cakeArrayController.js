const CakeFlavoursModel = require('../models/flavourModels');
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

module.exports = {
    AddNewFlavours,
    GetFlavoursList
};