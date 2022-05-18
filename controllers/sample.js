const SampleModel = require('../models/sample');

const sampleCode = (req, res) => {
    const Name = req.body.Name;
    const Password = req.body.Password;

    const data = SampleModel({
        Name : Name,
        Password : Password
    });
    data.save(function(err, result){
        if(err){
            res.send('Failed');
        }else{
            res.send('success')
        }
    })
};

module.exports = {
    sampleCode
}