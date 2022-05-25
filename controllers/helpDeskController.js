const helpDeskModel = require('../models/helpDeskModels');
const OrdersListModel = require("../models/OrdersListModels");
const CustomizeCakeModel = require('../models/CustomizeCakeModels');
const moment = require('moment-timezone');

const HelpDeskNew = (req, res) => {
    const Email = req.body.Email;
    const Password = req.body.Password;
    const Name = req.body.Name;
    const Created_On = moment().tz('Asia/Kolkata').format("DD-MM-YYYY hh:mm A");

    try {
        if (Email || Password || Name) {
            const HelpDesk = new helpDeskModel({
                Email: Email,
                Password: Password,
                Name: Name,
                Created_On: Created_On
            });
            HelpDesk.save(function (err, result) {
                if (err) {
                    res.send({ statusCode: 400, message: "Failed" })
                } else {
                    res.send({ statusCode: 200, message: "Registered Successfully" });
                }
            })
        } else {
            res.send({ statusCode: 400, message: '*reqired' });
        }
    } catch (err) {
        res.send({ statusCode: 400, message: "Failed" })
    }
};

const Above5kgCount = (req, res) => {

    try{
        OrdersListModel.count({ Above5KG : 'y', Status : 'New'},function(err, count1){
            if(err){
                res.send({ statusCode: 400, message: "Failed" })
            }else{
                OrdersListModel.count({ Above5KG : 'y', Status : 'Assigned'},function(err, count2){
                    if(err){
                        res.send({ statusCode: 400, message: "Failed" })
                    }else{
                        CustomizeCakeModel.count({ Above5KG : 'y', Status : 'New'},function(err, count3){
                            if(err){
                                res.send({ statusCode: 400, message: "Failed" })
                            }else{
                                CustomizeCakeModel.count({ Above5KG : 'y', Status : 'Assigned'},function(err, count4){
                                    if(err){
                                        res.send({ statusCode: 400, message: "Failed" })
                                    }else{
                                        res.send({ 
                                            OrderNew : count1, 
                                            OrderAssigned : count2, 
                                            CustomizeCakeNew : count3, 
                                            CustomizeCakeAssigned : count4
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    }catch(err) {
        res.send({ statusCode: 400, message: "Failed" }) 
    }
};

module.exports = {
    HelpDeskNew,
    Above5kgCount
}