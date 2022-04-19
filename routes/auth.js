const express = require("express");
const cors = require('cors');

const app = express();

const router = express.Router();
app.use(router);

router.use(express.json());
app.use(cors());

const upload=require("../middleware/multer");

const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
};
app.use(cors(corsOptions));
app.options('*', cors());

const { 
    getUsers,
    putUsers,
    validateUsers, 
    getUsersbyPhoneNumber 
} = require('../controllers/userController');

const { 
    getAdminbyEmail,
    putAdmin,
    loginValidate, 
    forgotPassword, 
    getVendors,
    getVendorsbyEmail, 
    addVendors, 
    putVendors,
    deleteVendors, 
    verifyToken 
} = require('../controllers/admin&vendorController');

const { 
    addCake,
    updateCake,
    deleteCake,
    getcakelist,
    getCakeDetails, 
    getcakelistByVendorName,
    getcakelistByVendorId 
} = require('../controllers/cakeController');

const { 
    getOrdersList, 
    newOrder, 
    updateOrder, 
    updateOrderStatus,
    getOrdersListById,
    getOrdersListByUserID,
    getOrdersListByVendorId,
    getOrdersListByStatus,
    getVendorOrdersListByStatus,
    getOrdersStatusCount,
    getVendorOrdersStatusCount
} = require('../controllers/orderListController');


//Admin API

//Get all vendors
router.get("/admin/list/:email", getAdminbyEmail);

//Update admin's details
router.put("/admin/update/:id",upload.single("file"), putAdmin);


//Users API

//Get all users
router.get("/users/list", getUsers);

//Get user's details by phone number
router.get("/users/list/:pn", getUsersbyPhoneNumber);

//Update user's details
router.put("/users/update/:userId",upload.single("file"),putUsers);

//Validate the user -> If phonenumber is exists login else register
router.post("/userslogin/validate", validateUsers);


//Login & Forgot password API

//login for admin and vendors
router.post("/login/validate", loginValidate);

//verify token
router.get("/verifytoken/:token", verifyToken);

//forgot password
router.put("/forgotpassword/:email", forgotPassword);


//Vendors API

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


// Cake API

//Get all cakes
router.get("/cake/list", getcakelist);

// get cake details
router.get("/cake/list/:id",getCakeDetails);

// get cake details based on vendorname
router.get("/cake/listbyName/:VendorName",getcakelistByVendorName);

// get cake details based on vendorId
router.get("/cake/listbyId/:VendorId",getcakelistByVendorId);

//Create new vendor
router.post("/cake/new",upload.array("files"), addCake);

//Update vendor's details
router.put("/cake/update/:id",upload.array("files"), updateCake);

//Delete vendor
router.put("/cake/delete/:id", deleteCake);


//Cake order API

//get orders list
router.get('/order/list',getOrdersList);

//get order's list based on orderId
router.get('/order/list/:id',getOrdersListById);

//get order list based on userId
router.get('/order/listbyuserid/:userid',getOrdersListByUserID); 

//get order list based on vendorId
router.get('/order/listbyvendorid/:vendorid',getOrdersListByVendorId); 

//Add new order
router.post('/order/new',newOrder);

//update order details
router.put('/order/update/:id',updateOrder);

//update order status
router.put('/order/updatestatus/:id',updateOrderStatus);

//get Orders list by Status
router.get('/order/listbystatus/:status',getOrdersListByStatus);

//get Orders list by Status
router.get('/order/listbyvendorstatus/:id',getVendorOrdersListByStatus);

//get Orders list by Status
router.get('/order/totalcount',getOrdersStatusCount);

//get Orders list by Status
router.get('/order/countbyvendorid/:id',getVendorOrdersStatusCount);


module.exports = router;