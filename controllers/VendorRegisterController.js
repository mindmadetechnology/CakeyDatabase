const vendorModel = require("../models/vendorModels");
const adminModel = require("../models/adminModels");
const moment = require('moment-timezone');
const cloudinary = require("../middleware/cloudnary");

//register vendor
const RegisterVendors = (req, res) => {

    const VendorName = req.body.VendorName;
    const PreferredNameOnTheApp = req.body.PreferredNameOnTheApp;
    const Email = req.body.Email;
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
    // const PreferredVendorName = req.body.PreferredVendorName; //optional
    const DateOfBirth = req.body.DateOfBirth;
    const Gender = req.body.Gender;
    const YearsOfExperienceAsBaker = req.body.YearsOfExperienceAsBaker;
    const AadhaarNumber = req.body.AadhaarNumber;
    const PANNumber = req.body.PANNumber;
    const GSTNumber = req.body.GSTNumber; //optional
    const FSSAINumber = req.body.FSSAINumber;
    const FSSAIExpiryDate = req.body.FSSAIExpiryDate;
    // const MaximumCakesPerDay = req.body.MaximumCakesPerDay;
    // const MaximumCakesPerWeek = req.body.MaximumCakesPerWeek;
    const JobType = req.body.JobType;
    // const SpecializedIn = req.body.SpecializedIn; //optional
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
    try {
        if (VendorName === undefined || !PreferredNameOnTheApp || Email === undefined || PhoneNumber1 === undefined || PhoneNumber2 === undefined ||
            FullAddress === undefined || Street === undefined || City === undefined || State === undefined ||
            Pincode === undefined || EggOrEggless === undefined || Description === undefined ||
            DateOfBirth === undefined || Gender === undefined || YearsOfExperienceAsBaker === undefined ||
            AadhaarNumber === undefined || PANNumber === undefined || FSSAINumber === undefined || FSSAIExpiryDate === undefined ||
            JobType === undefined || BankName === undefined || Branch === undefined || AccountNumber === undefined || IFSCCode === undefined ||
            !Ratings || !AreYouFamiliarOnWorkingWithApps || !LearningType || !TotalDurationOfLearning || !CurrentAverageSalePerMonth ||
            !HowManyCakesCanYouMakeInaWeek || !HowManyDaysCanYouWorkInaWeek || !YourSpecialityCakes || !CanYouMakeSingleCakeAbove5Kgs ||
            !CanYouMakeTierCakes || !CakeTypesYouBake || !CanYouMakeARegularCakeWithFondantAsToppers) {
            res.send({ statusCode: 400, message: "*required" });
        } else {
            if (CanYouMakeARegularCakeWithFondantAsToppers === 'n') {
                if (req.files['ProfileImage'] === undefined) {
                    adminModel.findOne({ Email: Email }, function (err, result) {
                        if (err) {
                            res.send({ statusCode: 400, message: "Failed11" });
                        } else if (result === null) {
                            vendorModel.findOne({ Email: Email }, async function (err, result) {
                                if (err) {
                                    res.send({ statusCode: 400, message: "Failed12" });
                                } else if (result === null) {
                                    const vendorValidate = new vendorModel({
                                        Email: Email,
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
                                        // MaximumCakesPerDay: MaximumCakesPerDay,
                                        // MaximumCakesPerWeek: MaximumCakesPerWeek,
                                        JobType: JobType,
                                        // SpecializedIn: SpecializedIn,
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
                                            res.send({ statusCode: 400, message: "Failed13" });
                                        } else {
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
                            res.send({ statusCode: 400, message: "Failed14" });
                        } else if (result === null) {
                            vendorModel.findOne({ Email: Email }, async function (err, result) {
                                if (err) {
                                    res.send({ statusCode: 400, message: "Failed15" });
                                } else if (result === null) {
                                    const imagesUrl = await cloudinary.uploader.upload(req.files['ProfileImage'][0].path);
                                    const vendorValidate = new vendorModel({
                                        ProfileImage: imagesUrl.url,
                                        Email: Email,
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
                                        // MaximumCakesPerDay: MaximumCakesPerDay,
                                        // MaximumCakesPerWeek: MaximumCakesPerWeek,
                                        JobType: JobType,
                                        // SpecializedIn: SpecializedIn,
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
                                            res.send({ statusCode: 400, message: "Failed16" });
                                        } else {
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
                            res.send({ statusCode: 400, message: "Failed1" });
                        } else if (result === null) {
                            vendorModel.findOne({ Email: Email }, async function (err, result) {
                                if (err) {
                                    res.send({ statusCode: 400, message: "Failed2" });
                                } else if (result === null) {
                                    var TopperImages = [];
                                    for (let i = 0; i < req.files['CanYouMakeARegularCakeWithFondantAsToppersImage'].length; i++) {
                                        var result = await cloudinary.uploader.upload(req.files['CanYouMakeARegularCakeWithFondantAsToppersImage'][i].path, { width: 640, height: 426, crop: "scale", format: 'webp' });
                                        TopperImages.push(result.url);
                                    };
                                    const vendorValidate = new vendorModel({
                                        Email: Email,
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
                                        // MaximumCakesPerDay: MaximumCakesPerDay,
                                        // MaximumCakesPerWeek: MaximumCakesPerWeek,
                                        JobType: JobType,
                                        // SpecializedIn: SpecializedIn,
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
                                            res.send({ statusCode: 400, message: "Failed3", error: err });
                                        } else {
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
                            res.send({ statusCode: 400, message: "Failed4" });
                        } else if (result === null) {
                            vendorModel.findOne({ Email: Email }, async function (err, result) {
                                if (err) {
                                    res.send({ statusCode: 400, message: "Failed5" });
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
                                        // MaximumCakesPerDay: MaximumCakesPerDay,
                                        // MaximumCakesPerWeek: MaximumCakesPerWeek,
                                        JobType: JobType,
                                        // SpecializedIn: SpecializedIn,
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
                                            res.send({ statusCode: 400, message: "Failed6" });
                                        } else {
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
        res.send({ statusCode: 400, message: "Failed1111", error: err });
    };
};

//get new vendors list
const GetNewVendorList = (req, res) => {

    const Status = req.params.Status;
    try {
        vendorModel.find({ Status: Status, IsDeleted: 'n' }, function (err, result) {
            if (err) {
                res.send({ statusCode: 400, message: "Failed" });
            } else {
                if (result.length === 0) {
                    res.send({ message: 'No Records Found' });
                } else {
                    res.send(result);
                }
            }
        });
    } catch (err) {
        res.send({ statusCode: 400, message: "Failed" });
    };
};

module.exports = {

    RegisterVendors,
    GetNewVendorList

};