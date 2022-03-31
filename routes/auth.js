const express = require("express");
const cors = require('cors');

const app = express();

const router = express.Router();
app.use(router);

router.use(express.json());
app.use(cors());

const upload=require("../middleware/multer");

const corsOptions ={
    origin:'https://cakey-database.vercel.app', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
};
app.use(cors(corsOptions));

const { getUsers,putUsers,validateUsers, getUsersbyPhoneNumber } = require('../controllers/userController');
const { getAdminbyEmail,putAdmin,loginValidate, forgotPassword, getVendors,getVendorsbyEmail, addVendors, putVendors,deleteVendors } = require('../controllers/admin&vendorController');

//Get all vendors
router.get("/admin/list/:email", getAdminbyEmail);

//Update admin's details
router.put("/admin/update/:id",upload.single("file"), putAdmin);

//Get all users
router.get("/users/list", getUsers);

//Get user's details by phone number
router.get("/users/list/:pn", getUsersbyPhoneNumber);

//Update user's details
router.put("/users/update/:userId",upload.single("file"),putUsers);

//Validate the user -> If phonenumber is exists login else register
router.post("/userslogin/validate", validateUsers);

//login for admin and vendors
router.post("/login/validate", loginValidate);

//forgot password
router.put("/forgotpassword/:id", forgotPassword);

//Get all vendors
router.get("/vendors/list", getVendors);

//Get vendor's details based on email
router.get("/vendors/list/:email", getVendorsbyEmail);

//Create new vendor
router.post("/vendors/new", addVendors);

//Update vendor's details
router.put("/vendors/update/:id",upload.single("file"), putVendors);

//Delete vendor
router.put("/vendors/delete/:id", deleteVendors);

module.exports = router;