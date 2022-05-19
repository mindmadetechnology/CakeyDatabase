const express = require("express");
const cors = require('cors');

const app = express();

app.use(express.static(__dirname));

const router = express.Router();
app.use(router);

router.use(express.json());
app.use(cors());

const upload=require("../middleware/multer");

// const Authorization = require('../middleware/autherization');

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
    verifyToken,
    getAllUsersCount,
    NewAdmin,
    GetNotificationCount
} = require('../controllers/admin&vendorController');

const { 
    addCake,
    updateCake,
    deleteCake,
    getcakelist,
    getCakeDetails, 
    getcakelistByVendorName,
    getcakelistByVendorId ,
    getCakeListByStatus,
    ApproveCake
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

const { 
    AddCategory,
    AddNewSubCategory,
    GetAllCategory,
    DeleteCategory,
    DeleteSubCategory,
    UpdateCategory
} = require('../controllers/categoryController');

const {
    RegisterVendors,
    GetNewVendorList
} = require('../controllers/VendorRegisterController');

const {
    HelpDeskNew
} = require('../controllers/helpDeskController');

const {
    AddNewFlavours,
    GetFlavoursList,
    AddNewShapes,
    GetShapesList,
    AddNewWeight,
    GetWeightList,
    AddNewArticle,
    GetArticleList,
    AddNewCakeToppings,
    GetCakeToppingsList
} = require('../controllers/cakeArrayController');

const {
    AddNewCustomizeCake,
    GetCustomizeCakeList,
    GetAbove5kgCustomizeCakeList,
    GetCustomizeCakeListByVendorId, 
    GetCustomizeCakeListByUserId,
    GetNewCustomizeCakeListByVendorId
} = require('../controllers/customizeCakeController');

const {
    sampleCode
} = require('../controllers/sample');


//Admin API

router.post('/admin/new', NewAdmin);

//Get all vendors
router.get("/admin/list/:email", getAdminbyEmail);

//Update admin's details
router.put("/admin/update/:id",upload.single("file"), putAdmin);

//users count 
router.get('/admin/userscount', getAllUsersCount);

//get Notification Count
router.get('/notification/count',GetNotificationCount);


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

//Get registered vendors
router.get("/vendors/list/:Status", GetNewVendorList);

//Get vendor's details based on email
router.get("/vendors/listbyemail/:email", getVendorsbyEmail);

//Register vendor
router.post("/vendors/register",upload.single("file"), RegisterVendors);

//Create new vendor
router.put("/vendors/new/:id", addVendors);

//Update vendor's details
router.put("/vendors/update/:id",upload.single("file"), putVendors);

//Delete vendor
router.put("/vendors/delete/:id", deleteVendors);

//Help Desk API

//Create New Help desk member
router.post('/helpdesk/new',HelpDeskNew);


// Cake API

//Get all cakes
router.get("/cake/list", getcakelist);

// get cake details
router.get("/cake/list/:id", getCakeDetails);

//get cake list based on status
router.get('/cake/listbystatus/:status', getCakeListByStatus);

// get cake details based on vendorname
router.get("/cake/listbyName/:VendorName", getcakelistByVendorName);

// get cake details based on vendorId
router.get("/cake/listbyId/:VendorId", getcakelistByVendorId);

//Create new vendor
router.post("/cake/new",upload.array("files"), addCake);

//cake approval
router.put('/cake/approve/:id', ApproveCake);

//Update vendor's details
router.put("/cake/update/:id",upload.array("files"), updateCake);

//Delete vendor
router.put("/cake/delete/:id", deleteCake);


//Cake order API

//get orders list
router.get('/order/list', getOrdersList);

//get order's list based on orderId
router.get('/order/list/:id', getOrdersListById);

//get order list based on userId
router.get('/order/listbyuserid/:userid', getOrdersListByUserID); 

//get order list based on vendorId
router.get('/order/listbyvendorid/:vendorid', getOrdersListByVendorId); 

//Add new order
router.post('/order/new',newOrder);

//update order details
router.put('/order/update/:id',updateOrder);

//update order status
router.put('/order/updatestatus/:id',updateOrderStatus);

//get Orders list by Status
router.get('/order/listbystatus/:status', getOrdersListByStatus);

//get Orders list by Status
router.get('/order/listbyvendorstatus/:id/:status', getVendorOrdersListByStatus);

//get Orders list by Status
router.get('/order/totalcount', getOrdersStatusCount);

//get Orders list by Status
router.get('/order/countbyvendorid/:id', getVendorOrdersStatusCount);


//Category API

// get all category
router.get('/category/list',GetAllCategory);

//Add new Category
router.post('/category/new',AddCategory);

//Add new SubCategory
router.put('/subcategory/new',AddNewSubCategory);

//Delete category
router.delete('/category/delete/:id',DeleteCategory);

//Delete subcategory
router.put('/subcategory/delete/:id',DeleteSubCategory);

//Update Category
router.put('/category/update/:id',UpdateCategory);

//Cake Array List API

//Add new Flavours
router.post('/flavour/new',AddNewFlavours);

//Get Flavours List
router.get('/flavour/list',GetFlavoursList);

//Add new Shape
router.post('/shape/new',AddNewShapes);

//Get Shapes List
router.get('/shape/list',GetShapesList);

//Add new Weight
router.post('/weight/new', AddNewWeight);

//Get Weight List
router.get('/weight/list', GetWeightList);

//Add new Articles
router.post('/article/new',AddNewArticle);

//Get Articles List
router.get('/article/list',GetArticleList)

//Add new Cake Toppings
router.post('/toppings/new', AddNewCakeToppings);

//Get Cake Toppings List
router.get('/toppings/list', GetCakeToppingsList);


//Customize Cake API

//Add new customize cake
router.post('/customize/cake/new',upload.array("files"), AddNewCustomizeCake);

//get all Customize cake
router.get('/customize/cake/list', GetCustomizeCakeList);

//get customize cake based on above 5kg yes or no
router.get('/customize/cake/list/:above', GetAbove5kgCustomizeCakeList);

//get customize cake based on vendor id
router.get('/customize/cake/listbyvendorid/:id', GetCustomizeCakeListByVendorId);

//get new customizecake based on vendor id
router.get('/customize/cake/listbystatus/:id/:status',GetNewCustomizeCakeListByVendorId);

//get customize cake based on user id
router.get('/customize/cake/listbyuserid/:id', GetCustomizeCakeListByUserId);


router.post('/sample/new', sampleCode);

module.exports = router;