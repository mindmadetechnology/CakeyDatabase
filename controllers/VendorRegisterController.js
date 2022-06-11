const vendorModel = require("../models/vendorModels");
const adminModel = require("../models/adminModels");
const moment = require('moment-timezone');
const cloudinary = require("../middleware/cloudnary");
const { transporter } = require('../middleware/nodemailer');

//register vendor
const RegisterVendors = (req, res) => {

    const VendorName = req.body.VendorName;
    const PreferredNameOnTheApp = req.body.PreferredNameOnTheApp;
    const Email = req.body.Email;
    const Password = req.body.Password;
    const PhoneNumber1 = req.body.PhoneNumber1;
    const PhoneNumber2 = req.body.PhoneNumber2;
    const FullAddress = req.body.FullAddress;
    const Street = req.body.Street;
    const City = req.body.City;
    const State = req.body.State;
    const Pincode = req.body.Pincode;
    // const GoogleLocation = req.body.GoogleLocation;
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
    //CanYouMakeARegularCakeWithFondantAsToppersImage (if CanYouMakeARegularCakeWithFondantAsToppers === 'y') CanYouMakeARegularCakeWithFondantAsToppersImage
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
        if (VendorName === undefined || !PreferredNameOnTheApp || Email === undefined || PhoneNumber1 === undefined || PhoneNumber2 === undefined ||
            FullAddress === undefined || Street === undefined || City === undefined || State === undefined ||
            Pincode === undefined || EggOrEggless === undefined || Description === undefined ||
            DateOfBirth === undefined || Gender === undefined || YearsOfExperienceAsBaker === undefined ||
            AadhaarNumber === undefined || PANNumber === undefined || FSSAINumber === undefined || FSSAIExpiryDate === undefined ||
            JobType === undefined || BankName === undefined || Branch === undefined || AccountNumber === undefined || IFSCCode === undefined ||
            !Ratings || !AreYouFamiliarOnWorkingWithApps || !LearningType || !TotalDurationOfLearning || !CurrentAverageSalePerMonth ||
            !HowManyCakesCanYouMakeInaWeek || !HowManyDaysCanYouWorkInaWeek || !YourSpecialityCakes || !CanYouMakeSingleCakeAbove5Kgs ||
            !CanYouMakeTierCakes || !CakeTypesYouBake || !CanYouMakeARegularCakeWithFondantAsToppers || !Password) {
            res.send({ statusCode: 400, message: "*required" });
        } else {
            if (CanYouMakeARegularCakeWithFondantAsToppers === 'n') {
                if (req.files['ProfileImage'] === undefined) {
                    adminModel.findOne({ Email: Email }, function (err, result) {
                        if (err) {
                            res.send({ statusCode: 400, message: "Failed" });
                        } else if (result === null) {
                            vendorModel.findOne({ Email: Email }, async function (err, result) {
                                if (err) {
                                    res.send({ statusCode: 400, message: "Failed" });
                                } else if (result === null) {
                                    const vendorValidate = new vendorModel({
                                        Email: Email,
                                        Password: Password,
                                        VendorName: VendorName,
                                        PreferredNameOnTheApp: PreferredNameOnTheApp,
                                        PhoneNumber1: PhoneNumber1,
                                        PhoneNumber2: PhoneNumber2,
                                        Address: {
                                            FullAddress: FullAddress,
                                            Street: Street,
                                            City: City,
                                            State: State,
                                            Pincode: Pincode
                                        },
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
                } else {
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
                                        Address: {
                                            FullAddress: FullAddress,
                                            Street: Street,
                                            City: City,
                                            State: State,
                                            Pincode: Pincode
                                        },
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
            } else {
                if (req.files['ProfileImage'] === undefined) {
                    adminModel.findOne({ Email: Email }, function (err, result) {
                        if (err) {
                            res.send({ statusCode: 400, message: "Failed" });
                        } else if (result === null) {
                            vendorModel.findOne({ Email: Email }, async function (err, result) {
                                if (err) {
                                    res.send({ statusCode: 400, message: "Failed" });
                                } else if (result === null) {
                                    var TopperImages = [];
                                    for (let i = 0; i < req.files['CanYouMakeARegularCakeWithFondantAsToppersImage'].length; i++) {
                                        var result = await cloudinary.uploader.upload(req.files['CanYouMakeARegularCakeWithFondantAsToppersImage'][i].path, { width: 640, height: 426, crop: "scale", format: 'webp' });
                                        TopperImages.push(result.url);
                                    };
                                    const vendorValidate = new vendorModel({
                                        Email: Email,
                                        Password: Password,
                                        VendorName: VendorName,
                                        PreferredNameOnTheApp: PreferredNameOnTheApp,
                                        PhoneNumber1: PhoneNumber1,
                                        PhoneNumber2: PhoneNumber2,
                                        Address: {
                                            FullAddress: FullAddress,
                                            Street: Street,
                                            City: City,
                                            State: State,
                                            Pincode: Pincode
                                        },
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
                                        CanYouMakeARegularCakeWithFondantAsToppersImage: TopperImages,
                                        Created_On: Created_On
                                    });
                                    vendorValidate.save(function (err, result) {
                                        if (err) {
                                            res.send({ statusCode: 400, message: "Failed", error: err });
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
                } else {
                    adminModel.findOne({ Email: Email }, function (err, result) {
                        if (err) {
                            res.send({ statusCode: 400, message: "Failed" });
                        } else if (result === null) {
                            vendorModel.findOne({ Email: Email }, async function (err, result) {
                                if (err) {
                                    res.send({ statusCode: 400, message: "Failed" });
                                } else if (result === null) {
                                    const imagesUrl = await cloudinary.uploader.upload(req.files['ProfileImage'][0].path);
                                    var TopperImages = [];
                                    for (let i = 0; i < req.files['CanYouMakeARegularCakeWithFondantAsToppersImage'].length; i++) {
                                        var result = await cloudinary.uploader.upload(req.files['CanYouMakeARegularCakeWithFondantAsToppersImage'][i].path, { width: 640, height: 426, crop: "scale", format: 'webp' });
                                        TopperImages.push(result.url);
                                    };
                                    const vendorValidate = new vendorModel({
                                        ProfileImage: imagesUrl.url,
                                        Email: Email,
                                        Password: Password,
                                        VendorName: VendorName,
                                        PreferredNameOnTheApp: PreferredNameOnTheApp,
                                        PhoneNumber1: PhoneNumber1,
                                        PhoneNumber2: PhoneNumber2,
                                        Address: {
                                            FullAddress: FullAddress,
                                            Street: Street,
                                            City: City,
                                            State: State,
                                            Pincode: Pincode
                                        },
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
                                        CanYouMakeARegularCakeWithFondantAsToppersImage: TopperImages,
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
            }
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
    // const Password = req.body.Password;
    const PhoneNumber1 = req.body.PhoneNumber1;
    const PhoneNumber2 = req.body.PhoneNumber2;
    const FullAddress = req.body.FullAddress;
    const Street = req.body.Street;
    const City = req.body.City;
    const State = req.body.State;
    const Pincode = req.body.Pincode;
    // const GoogleLocation = req.body.GoogleLocation;
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
    const FondantToppersImage = req.body.FondantToppersImage;
    const Modified_On = moment().tz('Asia/Kolkata').format("DD-MM-YYYY hh:mm A");
    //profile image (optional)   ProfileImage
    //CanYouMakeARegularCakeWithFondantAsToppersImage (if CanYouMakeARegularCakeWithFondantAsToppers === 'y') CanYouMakeARegularCakeWithFondantAsToppersImage

    try {
        var imagesUrl, FinalEmail;
        var FoundantTopperImage = [];
        //for profile image validation
        if (req.files['ProfileImage'] === undefined) {
            const ProfileImagePromise = new Promise((resolve, reject) => {
                vendorModel.findOne({ _id: id }, function (err, result) {
                    if (err) {
                        reject(err);
                    } else {
                        if (result.ProfileImage === undefined) {
                            resolve('');
                        } else {
                            resolve(result.ProfileImage);
                        }
                    }
                })
            });
            imagesUrl = await ProfileImagePromise;
        } else {
            var uploadedProfile = await cloudinary.uploader.upload(req.files['ProfileImage'][0].path);
            imagesUrl = uploadedProfile.url
        };

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
                            if(err){
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
                            }else{
                                resolve('already exist');
                            }
                        })
                    }
                }
            })
        });
        FinalEmail = await EmailPromise;

        //for foundant image validation
        if(FondantToppersImage === undefined || FondantToppersImage.length === 0){
            FoundantTopperImage = [];
        }else{
            if(FondantToppersImage.length === 1){
                FoundantTopperImage = FondantToppersImage;    
            }else{
                FoundantTopperImage = [...FondantToppersImage];
            };   
        }
        if (req.files['CanYouMakeARegularCakeWithFondantAsToppersImage'] !== undefined) {
            for (let i = 0; i < req.files['CanYouMakeARegularCakeWithFondantAsToppersImage'].length; i++) {
                var NewImages = await cloudinary.uploader.upload(req.files['CanYouMakeARegularCakeWithFondantAsToppersImage'][i].path);
                FoundantTopperImage.push(NewImages.url);
            }
        };
        if(FinalEmail === 'already exist'){
            res.send({ statusCode: 400, message: "Email already Exist" });
        }else{
            vendorModel.findOneAndUpdate({_id: id},{
                $set : {
                    ProfileImage: imagesUrl,
                    Email: FinalEmail,
                    VendorName: VendorName,
                    PreferredNameOnTheApp: PreferredNameOnTheApp,
                    PhoneNumber1: PhoneNumber1,
                    PhoneNumber2: PhoneNumber2,
                    Address: {
                        FullAddress: FullAddress,
                        Street: Street,
                        City: City,
                        State: State,
                        Pincode: Pincode
                    },
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
                    CanYouMakeARegularCakeWithFondantAsToppersImage: FoundantTopperImage,
                    Modified_On: Modified_On
                }
            }, function(err, result){
                if(err){
                    res.send({ statusCode: 400, message: 'Failed', error : err});
                }else{
                    res.send({ statusCode: 200, message: 'Updated Successfully'});
                }
            })
        };
    } catch (err) {
        res.send({ statusCode: 400, message: "Failed", error: err });
    };
};

//get new vendors list
// const GetNewVendorList = (req, res) => {

//     const Status = req.params.Status;
//     try {
//         vendorModel.find({ Status: Status, IsDeleted: 'n' }, function (err, result) {
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
    // GetNewVendorList

};