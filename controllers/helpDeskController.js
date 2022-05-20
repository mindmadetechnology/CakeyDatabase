const helpDeskModel = require('../models/helpDeskModels');
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

module.exports = {
    HelpDeskNew
}