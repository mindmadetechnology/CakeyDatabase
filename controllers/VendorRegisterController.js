const vendorModel = require("../models/vendorModels");
const adminModel = require("../models/adminModels");
const moment = require('moment-timezone');
const cloudinary = require("../middleware/cloudnary");

const RegisterVendors = (req, res) => {

    const VendorName = req.body.VendorName;
    const Email = req.body.Email;
    const PhoneNumber1 = req.body.PhoneNumber1;
    const PhoneNumber2 = req.body.PhoneNumber2;
    const FullAddress = req.body.FullAddress;
    const Street = req.body.Street;
    const City = req.body.City;
    const State = req.body.State;
    const Pincode = req.body.Pincode;
    const Description = req.body.Description;
    const EggOrEggless = req.body.EggOrEggless;
    const PreferredVendorName = req.body.PreferredVendorName; //optional
    const DateOfBirth = req.body.DateOfBirth;
    const Gender = req.body.Gender;
    const YearsOfExperienceAsBaker = req.body.YearsOfExperienceAsBaker;
    const AadhaarNumber = req.body.AadhaarNumber;
    const PANNumber = req.body.PANNumber;
    const GSTNumber = req.body.GSTNumber; //optional
    const FSSAINumber = req.body.FSSAINumber;
    const FSSAIExpiryDate = req.body.FSSAIExpiryDate;
    const MaximumCakesPerDay = req.body.MaximumCakesPerDay;
    const MaximumCakesPerWeek = req.body.MaximumCakesPerWeek;
    const JobType = req.body.JobType;
    const SpecializedIn = req.body.SpecializedIn; //optional
    const BankName = req.body.BankName;
    const Branch = req.body.Branch;
    const AccountNumber = req.body.AccountNumber;
    const IFSCCode = req.body.IFSCCode;
    const UPIId = req.body.UPIId; //optional
    const Registered_On = moment().tz('Asia/Kolkata').format("DD-MM-YYYY hh:mm A");
    //profile image (optional)

    try {
        if (VendorName === undefined || Email === undefined || PhoneNumber1 === undefined || PhoneNumber2 === undefined ||
            FullAddress === undefined || Street === undefined || City === undefined || State === undefined ||
            Pincode === undefined || EggOrEggless === undefined || Description === undefined ||
            DateOfBirth === undefined || Gender === undefined || YearsOfExperienceAsBaker === undefined ||
            AadhaarNumber === undefined || PANNumber === undefined || FSSAINumber === undefined || FSSAIExpiryDate === undefined ||
            MaximumCakesPerDay === undefined || MaximumCakesPerWeek == undefined || JobType === undefined ||
            BankName === undefined || Branch === undefined || AccountNumber === undefined || IFSCCode === undefined) {
            res.send({ statusCode: 400, message: "*required" });
        } else {
            if (req.file === undefined) {
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
                                    VendorName: VendorName,
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
                                    PreferredVendorName: PreferredVendorName,
                                    DateOfBirth: DateOfBirth,
                                    Gender: Gender,
                                    YearsOfExperienceAsBaker: YearsOfExperienceAsBaker,
                                    AadhaarNumber: AadhaarNumber,
                                    PANNumber: PANNumber,
                                    GSTNumber: GSTNumber,
                                    FSSAINumber: FSSAINumber,
                                    FSSAIExpiryDate: FSSAIExpiryDate,
                                    MaximumCakesPerDay: MaximumCakesPerDay,
                                    MaximumCakesPerWeek: MaximumCakesPerWeek,
                                    JobType: JobType,
                                    SpecializedIn: SpecializedIn,
                                    BankName: BankName,
                                    Branch: Branch,
                                    AccountNumber: AccountNumber,
                                    IFSCCode: IFSCCode,
                                    UPIId: UPIId,
                                    Registered_On: Registered_On
                                });

                                vendorValidate.save(function (err, result) {
                                    if (err) {
                                        res.send({ statusCode: 400, message: "Failed" });
                                    } else {
                                        res.send({ statusCode: 200, message: "Registered Successfully" });
                                    }
                                });
                            } else {
                                res.send({ statusCode: 400, message: "Email already exist!" });
                            }
                        })
                    } else {
                        res.send({ statusCode: 400, message: "Email already exist!" });
                    }
                })
            } else {
                adminModel.findOne({ Email: Email }, function (err, result) {
                    if (err) {
                        res.send({ statusCode: 400, message: "Failed" });
                    } else if (result === null) {
                        vendorModel.findOne({ Email: Email }, async function (err, result) {
                            if (err) {
                                res.send({ statusCode: 400, message: "Failed" });
                            } else if (result === null) {
                                const imagesUrl = await cloudinary.uploader.upload(req.file.path);

                                const vendorValidate = new vendorModel({
                                    Email: Email,
                                    VendorName: VendorName,
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
                                    ProfileImage: imagesUrl.url,
                                    PreferredVendorName: PreferredVendorName,
                                    DateOfBirth: DateOfBirth,
                                    Gender: Gender,
                                    YearsOfExperienceAsBaker: YearsOfExperienceAsBaker,
                                    AadhaarNumber: AadhaarNumber,
                                    PANNumber: PANNumber,
                                    GSTNumber: GSTNumber,
                                    FSSAINumber: FSSAINumber,
                                    FSSAIExpiryDate: FSSAIExpiryDate,
                                    MaximumCakesPerDay: MaximumCakesPerDay,
                                    MaximumCakesPerWeek: MaximumCakesPerWeek,
                                    JobType: JobType,
                                    SpecializedIn: SpecializedIn,
                                    BankName: BankName,
                                    Branch: Branch,
                                    AccountNumber: AccountNumber,
                                    IFSCCode: IFSCCode,
                                    UPIId: UPIId,
                                    Registered_On: Registered_On
                                });

                                vendorValidate.save(function (err, result) {
                                    if (err) {
                                        res.send({ statusCode: 400, message: "Failed" });
                                    } else {
                                        res.send({ statusCode: 200, message: "Registered Successfully" });
                                    }
                                });
                            } else {
                                res.send({ statusCode: 400, message: "Email already exist!" });
                            }
                        })
                    } else {
                        res.send({ statusCode: 400, message: "Email already exist!" });
                    }
                })
            }
        }
    } catch (err) {
        res.send({ statusCode: 400, message: "Failed" });
    }
};

module.exports = {

    RegisterVendors,

};