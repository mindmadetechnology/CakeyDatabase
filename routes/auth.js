const express = require("express");
const app = express();
const router = express.Router();
app.use(express.static('public/images'));
const upload=require("./../middleware/upload")
const { getUsers,putUsers,validateUsers,viewImg } = require('../controllers/userController');
const { loginValidate, forgotPassword, getVendors, addVendors, putVendors,deleteVendors } = require('../controllers/admin&vendorController');
app.use(router);
router.use(express.json());
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Set EJS as templating engine 
app.set("view engine", "ejs");
//Get all users
router.get("/users/list", getUsers);

//Update user's details
router.put("/users/update/:userId",upload.single("file"),putUsers);

//Validate the user -> If phonenumber is exists login else register
router.post("/userslogin/validate", validateUsers);
//route to download a file
router.get('/public/images/:file(*)',viewImg);


// /login for admin and vendors
router.post("/login/validate", loginValidate);

//forgot password
router.put("/forgotpassword/:id", forgotPassword);

//Get all vendors
router.get("/vendors/list", getVendors);

//Create new vendor
router.post("/vendors/new", addVendors);

//Update vendor's details
router.put("/vendors/update/:id", putVendors);

//Delete vendor
router.put("/vendors/delete/:id", deleteVendors);

module.exports = router;