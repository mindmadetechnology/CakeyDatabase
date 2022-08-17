const vendorModel = require("../models/vendorModels");
const adminModel = require("../models/adminModels");
const LastLoginSessionModel = require('../models/LastLoginSessionModel');
const moment = require('moment-timezone');
const cloudinary = require("../middleware/cloudnary");
const { transporter } = require('../middleware/nodemailer');
const JWT = require('jsonwebtoken');

//register vendor
const RegisterVendors = (req, res) => {

    const VendorName = req.body.VendorName;
    const PreferredNameOnTheApp = req.body.PreferredNameOnTheApp;
    const Email = req.body.Email;
    const Password = req.body.Password;
    const PhoneNumber1 = req.body.PhoneNumber1;
    const PhoneNumber2 = req.body.PhoneNumber2; //optional
    const Address = req.body.Address;
    const GoogleLocation = req.body.GoogleLocation;
    // const Street = req.body.Street;
    // const City = req.body.City;
    // const State = req.body.State;
    // const Pincode = req.body.Pincode;
    const Description = req.body.Description;
    const EggOrEggless = req.body.EggOrEggless;
    const DateOfBirth = req.body.DateOfBirth;
    const Gender = req.body.Gender;
    const YearsOfExperienceAsBaker = req.body.YearsOfExperienceAsBaker;
    const AadhaarNumber = req.body.AadhaarNumber;
    const PANNumber = req.body.PANNumber;
    const GSTNumber = req.body.GSTNumber; //optional
    const FSSAINumber = req.body.FSSAINumber;
    const FSSAIExpiryDate = req.body.FSSAIExpiryDate;
    const JobType = req.body.JobType;
    const BankName = req.body.BankName;
    const Branch = req.body.Branch;
    const AccountNumber = req.body.AccountNumber;
    const IFSCCode = req.body.IFSCCode;
    const UPIId = req.body.UPIId; //optional
    const Ratings = req.body.Ratings;
    const AreYouFamiliarOnWorkingWithApps = req.body.AreYouFamiliarOnWorkingWithApps;
    const LearningType = req.body.LearningType;
    const TotalDurationOfLearning = req.body.TotalDurationOfLearning;
    const InstitutionName = req.body.InstitutionName; //selected learn type is Institution then only mandatory 
    const CurrentAverageSalePerMonth = req.body.CurrentAverageSalePerMonth;
    const HowManyCakesCanYouMakeInaWeek = req.body.HowManyCakesCanYouMakeInaWeek;
    const HowManyDaysCanYouWorkInaWeek = req.body.HowManyDaysCanYouWorkInaWeek;
    const YourSpecialityCakes = req.body.YourSpecialityCakes;
    const CanYouMakeSingleCakeAbove5Kgs = req.body.CanYouMakeSingleCakeAbove5Kgs;
    const CanYouMakeTierCakes = req.body.CanYouMakeTierCakes;
    const CakeTypesYouBake = req.body.CakeTypesYouBake;
    const CanYouMakeARegularCakeWithFondantAsToppers = req.body.CanYouMakeARegularCakeWithFondantAsToppers;
    const Created_On = moment().tz('Asia/Kolkata').format("DD-MM-YYYY hh:mm A");
    //profile image (optional)   ProfileImage
    const mailBody = `
    <h3>Hello ${VendorName},</h3>
      <br />
    <p>
        Your Registration completed as a vendor on Cakey. <br /><br />
        To log in, go to https://cakey-react-project.vercel.app/ then enter the following credentials <br /><br />

      <b>Email</b> : ${Email} <br />
      <b>Password</b> : ${Password} <br /> <br />
      

      You can change your password once you logged in.
      </p>

      <h4>Best wishes,</h4>
      <h5>MindMade Team</h5>
    `
    try {
        if (!VendorName || !PreferredNameOnTheApp || !Email || !Password || !PhoneNumber1
            || !Address|| !GoogleLocation || !Description || !EggOrEggless || !DateOfBirth ||
            !Gender || !YearsOfExperienceAsBaker || !AadhaarNumber || !PANNumber || 
            !FSSAINumber || !FSSAIExpiryDate || !JobType || !BankName || !Branch ||
            !AccountNumber || !IFSCCode || !Ratings || !AreYouFamiliarOnWorkingWithApps ||
            !LearningType || !TotalDurationOfLearning || !CurrentAverageSalePerMonth ||
            !HowManyCakesCanYouMakeInaWeek || !HowManyDaysCanYouWorkInaWeek || !YourSpecialityCakes ||
            !CanYouMakeSingleCakeAbove5Kgs || !CanYouMakeTierCakes || !CakeTypesYouBake || !CanYouMakeARegularCakeWithFondantAsToppers ) {
            res.send({ statusCode: 400, message: "*required" });
        } else {
            const FinalLocation = JSON.parse(GoogleLocation);
            // const FinalYourSpecialityCakes = JSON.parse(YourSpecialityCakes);
            // const FinalCakeTypesYouBake = JSON.parse(CakeTypesYouBake);
            // const FinalInstitutionName = [];
            // if(InstitutionName){
            //     FinalInstitutionName = InstitutionName;
            // };
            adminModel.findOne({ Email: Email }, function (err, result) {
                if (err) {
                    res.send({ statusCode: 400, message: "Failed" });
                } else if (result === null) {
                    vendorModel.findOne({ Email: Email }, async function (err, result) {
                        if (err) {
                            res.send({ statusCode: 400, message: "Failed" });
                        } else if (result === null) {
                            const imagesUrl = await cloudinary.uploader.upload(req.files['ProfileImage'][0].path);
                            const vendorValidate = new vendorModel({
                                ProfileImage: imagesUrl.url,
                                Email: Email,
                                Password: Password,
                                VendorName: VendorName,
                                PreferredNameOnTheApp: PreferredNameOnTheApp,
                                PhoneNumber1: PhoneNumber1,
                                PhoneNumber2: PhoneNumber2,
                                Address: Address,
                                GoogleLocation: FinalLocation,
                                Description: Description,
                                EggOrEggless: EggOrEggless,
                                DateOfBirth: DateOfBirth,
                                Gender: Gender,
                                YearsOfExperienceAsBaker: YearsOfExperienceAsBaker,
                                AadhaarNumber: AadhaarNumber,
                                PANNumber: PANNumber,
                                GSTNumber: GSTNumber,
                                FSSAINumber: FSSAINumber,
                                FSSAIExpiryDate: FSSAIExpiryDate,
                                JobType: JobType,
                                BankName: BankName,
                                Branch: Branch,
                                AccountNumber: AccountNumber,
                                IFSCCode: IFSCCode,
                                UPIId: UPIId,
                                Ratings: Ratings,
                                AreYouFamiliarOnWorkingWithApps: AreYouFamiliarOnWorkingWithApps,
                                LearningType: LearningType,
                                TotalDurationOfLearning: TotalDurationOfLearning,
                                InstitutionName: InstitutionName,
                                CurrentAverageSalePerMonth: CurrentAverageSalePerMonth,
                                HowManyCakesCanYouMakeInaWeek: HowManyCakesCanYouMakeInaWeek,
                                HowManyDaysCanYouWorkInaWeek: HowManyDaysCanYouWorkInaWeek,
                                YourSpecialityCakes: YourSpecialityCakes,
                                CanYouMakeSingleCakeAbove5Kgs: CanYouMakeSingleCakeAbove5Kgs,
                                CanYouMakeTierCakes: CanYouMakeTierCakes,
                                CakeTypesYouBake: CakeTypesYouBake,
                                CanYouMakeARegularCakeWithFondantAsToppers: CanYouMakeARegularCakeWithFondantAsToppers,
                                Created_On: Created_On
                            });
                            vendorValidate.save(function (err, result) {
                                if (err) {
                                    res.send({ statusCode: 400, message: "Failed" });
                                } else {
                                    let mailOptions = {
                                        from: 'support@mindmade.in',
                                        to: Email,
                                        subject: 'Cakey Credentials - reg',
                                        html: mailBody
                                    };
                                    transporter.sendMail(mailOptions, (err, info) => {
                                        if (err) {
                                            return err;
                                        } else {
                                            return info;
                                        }
                                    });
                                    res.send({ statusCode: 200, message: "Registered Successfully" });
                                }
                            });
                        } else {
                            res.send({ statusCode: 400, message: "Email already exist!" });
                        }
                    });
                } else {
                    res.send({ statusCode: 400, message: "Email already exist!" });
                }
            });
        }
    } catch (err) {
        res.send({ statusCode: 400, message: "Failed", error: err });
    };
};

//Update vendor's details
const putVendors = async (req, res) => {
    const id = req.params.id;
    const VendorName = req.body.VendorName;
    const PreferredNameOnTheApp = req.body.PreferredNameOnTheApp;
    const Email = req.body.Email;
    const PhoneNumber1 = req.body.PhoneNumber1;
    const PhoneNumber2 = req.body.PhoneNumber2;
    const Address = req.body.Address;
    const GoogleLocation = req.body.GoogleLocation;
    const Description = req.body.Description;
    const EggOrEggless = req.body.EggOrEggless;
    const DateOfBirth = req.body.DateOfBirth;
    const Gender = req.body.Gender;
    const YearsOfExperienceAsBaker = req.body.YearsOfExperienceAsBaker;
    const AadhaarNumber = req.body.AadhaarNumber;
    const PANNumber = req.body.PANNumber;
    const GSTNumber = req.body.GSTNumber; //optional
    const FSSAINumber = req.body.FSSAINumber;
    const FSSAIExpiryDate = req.body.FSSAIExpiryDate;
    const JobType = req.body.JobType;
    const BankName = req.body.BankName;
    const Branch = req.body.Branch;
    const AccountNumber = req.body.AccountNumber;
    const IFSCCode = req.body.IFSCCode;
    const UPIId = req.body.UPIId; //optional
    const Ratings = req.body.Ratings;
    const AreYouFamiliarOnWorkingWithApps = req.body.AreYouFamiliarOnWorkingWithApps;
    const LearningType = req.body.LearningType;
    const TotalDurationOfLearning = req.body.TotalDurationOfLearning;
    const InstitutionName = req.body.InstitutionName; //selected learn type is Institution then only mandatory 
    const CurrentAverageSalePerMonth = req.body.CurrentAverageSalePerMonth;
    const HowManyCakesCanYouMakeInaWeek = req.body.HowManyCakesCanYouMakeInaWeek;
    const HowManyDaysCanYouWorkInaWeek = req.body.HowManyDaysCanYouWorkInaWeek;
    const YourSpecialityCakes = req.body.YourSpecialityCakes;
    const CanYouMakeSingleCakeAbove5Kgs = req.body.CanYouMakeSingleCakeAbove5Kgs;
    const CanYouMakeTierCakes = req.body.CanYouMakeTierCakes;
    const CakeTypesYouBake = req.body.CakeTypesYouBake;
    const CanYouMakeARegularCakeWithFondantAsToppers = req.body.CanYouMakeARegularCakeWithFondantAsToppers;
    const Modified_On = moment().tz('Asia/Kolkata').format("DD-MM-YYYY hh:mm A");

    try {
        var FinalEmail;
        //for email validation
        const EmailPromise = new Promise((resolve, reject) => {
            vendorModel.findOne({ _id: id }, function (err, result) {
                if (err) {
                    reject(err);
                } else {
                    if (result.Email === Email) {
                        resolve(Email);
                    } else {
                        adminModel.findOne({ Email: Email }, function (err, result) {
                            if (err) {
                                reject(err);
                            }
                            if (result === null) {
                                vendorModel.findOne({ Email: Email }, function (err, result) {
                                    if (result === null) {
                                        resolve(Email);
                                    } else {
                                        resolve('already exist');
                                    }
                                })
                            } else {
                                resolve('already exist');
                            }
                        })
                    }
                }
            })
        });
        FinalEmail = await EmailPromise;

        // const FinalLocation = JSON.parse(GoogleLocation);
        // var FinalInstitutionName;
        // if(InstitutionName){
        //     FinalInstitutionName = JSON.parse(InstitutionName);
        // };
        // const FinalYourSpecialityCakes = JSON.parse(YourSpecialityCakes);
        // const FinalCakeTypesYouBake = JSON.parse(CakeTypesYouBake);
        

        if (FinalEmail === 'already exist') {
            res.send({ statusCode: 400, message: "Email already Exist" });
        } else {
            vendorModel.findOneAndUpdate({ _id: id }, {
                $set: {
                    Email: FinalEmail,
                    VendorName: VendorName,
                    PreferredNameOnTheApp: PreferredNameOnTheApp,
                    PhoneNumber1: PhoneNumber1,
                    PhoneNumber2: PhoneNumber2,
                    Address: Address,
                    GoogleLocation: GoogleLocation,
                    Description: Description,
                    EggOrEggless: EggOrEggless,
                    DateOfBirth: DateOfBirth,
                    Gender: Gender,
                    YearsOfExperienceAsBaker: YearsOfExperienceAsBaker,
                    AadhaarNumber: AadhaarNumber,
                    PANNumber: PANNumber,
                    GSTNumber: GSTNumber,
                    FSSAINumber: FSSAINumber,
                    FSSAIExpiryDate: FSSAIExpiryDate,
                    JobType: JobType,
                    BankName: BankName,
                    Branch: Branch,
                    AccountNumber: AccountNumber,
                    IFSCCode: IFSCCode,
                    UPIId: UPIId,
                    Ratings: Ratings,
                    AreYouFamiliarOnWorkingWithApps: AreYouFamiliarOnWorkingWithApps,
                    LearningType: LearningType,
                    TotalDurationOfLearning: TotalDurationOfLearning,
                    InstitutionName: InstitutionName,
                    CurrentAverageSalePerMonth: CurrentAverageSalePerMonth,
                    HowManyCakesCanYouMakeInaWeek: HowManyCakesCanYouMakeInaWeek,
                    HowManyDaysCanYouWorkInaWeek: HowManyDaysCanYouWorkInaWeek,
                    YourSpecialityCakes: YourSpecialityCakes,
                    CanYouMakeSingleCakeAbove5Kgs: CanYouMakeSingleCakeAbove5Kgs,
                    CanYouMakeTierCakes: CanYouMakeTierCakes,
                    CakeTypesYouBake: CakeTypesYouBake,
                    CanYouMakeARegularCakeWithFondantAsToppers: CanYouMakeARegularCakeWithFondantAsToppers,
                    Modified_On: Modified_On
                }
            }, function (err, result) {
                if (err) {
                    res.send({ statusCode: 400, message: 'Failed', error: err });
                } else {
                    res.send({ statusCode: 200, message: 'Updated Successfully' });
                }
            })
        };
    } catch (err) {
        res.send({ statusCode: 400, message: "Failed", err });
    };
};

//get last seen 
const SetLastSeen = (req, res) => {
    const token = req.body.token;
    const LastLogout_At = req.body.LastLogout_At;

    const decodeToken = JWT.decode(token);

    try {
        LastLoginSessionModel.findOne({ Id: decodeToken.id }, function (err, result) {
            if (err) {
                res.send({ statusCode: 400, message: "Failed" });
            } else {
                LastLoginSessionModel.findOneAndUpdate({ Id: decodeToken.id }, {
                    $set: {
                        LastLogout_At: LastLogout_At
                    }
                }, function (err, result) {
                    if (err) {
                        res.send({ statusCode: 400, message: "Failed" });
                    } else {
                        res.send({ statusCode: 200, message: "Updated Successfully" });
                    }
                });
            }
        });
    } catch (err) {
        res.send({ statusCode: 400, message: "Failed" });
    }
};

const UploadProfileImage = async (req, res) => {
    const Id = req.params.id;
    // ProfileImage
    try{
        if(req.files['ProfileImage'] === undefined){
            res.send({ statusCode: 400, message: "required" });
        }else{
            const uploadedProfile = await cloudinary.uploader.upload(req.files['ProfileImage'][0].path);
            const ImagesUrl = uploadedProfile.url
            vendorModel.findOneAndUpdate({_id:Id},{
                $set: {
                    ProfileImage: ImagesUrl
                }
            }, function(err){
                if(err){
                    res.send({ statusCode: 400, message: "Failed" });
                }else{
                    res.send({ statusCode: 200, message: "Updated Successfully" });
                }
            });
        }
    }catch(err){
        res.send({ statusCode: 400, message: "Failed" });
    }
};

const BlockVendor= (req, res) => {
    const Id = req.params.id;

    try{
        vendorModel.findOneAndUpdate({_id: Id},{
            $set:{
                Status: 'Blocked'
            }
        }, function(err){
            if(err){
                res.send({ statusCode: 400, message: "Failed" });   
            }else{
                res.send({ statusCode: 200, message: "Blocked Successfully" });
            }
        });
    }catch(err){
        res.send({ statusCode: 400, message: "Failed" });
    };
};

//get new vendors list
// const GetNewVendorList = (req, res) => {

//     const Status = req.params.Status;
//     try {
//         vendorModel.find({ IsDeleted: 'n' }, function (err, result) {
//             if (err) {
//                 res.send({ statusCode: 400, message: "Failed" });
//             } else {
//                 if (result.length === 0) {
//                     res.send({ message: 'No Records Found' });
//                 } else {
//                     res.send(result);
//                 }
//             }
//         });
//     } catch (err) {
//         res.send({ statusCode: 400, message: "Failed" });
//     };
// };

module.exports = {

    RegisterVendors,
    putVendors,
    SetLastSeen,
    UploadProfileImage,
    BlockVendor
    // GetNewVendorList

};