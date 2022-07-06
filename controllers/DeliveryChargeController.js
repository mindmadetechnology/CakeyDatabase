const DeliveryChargeModel = require('../models/DeliveryChargeModels');
const moment = require('moment-timezone');

const ChangeDeliveryCharge = (req, res) => {
    const Km = req.body.Km;
    const Amount = req.body.Amount;
    const Modified_On = moment().tz('Asia/Kolkata').format("DD-MM-YYYY hh:mm A");

    try{
        DeliveryChargeModel.find({},function(err, result){
            if(err){
                res.send({ statusCode: 400, message: 'Failed'}); 
            }else if(result.length === 0){
                const NewDeliveryCharge = new DeliveryChargeModel({
                    Km: Km,
                    Amount: Amount,
                    Modified_On: Modified_On
                });
                NewDeliveryCharge.save(function(err, result2){
                    if(err){
                        res.send({ statusCode: 400, message: 'Failed'});
                    }else{
                        res.send({ statusCode: 200, message: 'Updated Successfully'});
                    }
                });
            }else{
                // console.log(result[0]._id);
                DeliveryChargeModel.findByIdAndUpdate({_id: result[0]._id}, {
                    $set:{
                        Km: Km,
                        Amount: Amount,
                        Modified_On: Modified_On
                    }
                }, function(err, result3){
                    if(err){
                        res.send({ statusCode: 400, message: 'Failed'});
                    }else{
                        res.send({ statusCode: 200, message: 'Updated Successfully'});
                    }
                })
            }
        });
    }catch(err){
        res.send({ statusCode: 400, message: 'Failed'});
    }
};

const GetDeliveryCharge = (req, res) => {
    try{
        DeliveryChargeModel.find({},function(err, result){
            if(err){
                res.send({ statusCode: 400, message: 'Failed'}); 
            }else{
                if(result.length === 0){
                    res.send({ message: 'No Records Found'}); 
                }else{
                    res.send(result); 
                }
            }
        });
    }catch(err){
        res.send({ statusCode: 400, message: 'Failed'}); 
    }
};

module.exports = {
    ChangeDeliveryCharge,
    GetDeliveryCharge
};