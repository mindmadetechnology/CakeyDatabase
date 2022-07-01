const express = require("express");
const cors = require('cors');

const app = express();

app.use(express.static(__dirname));

const router = express.Router();
app.use(router);

router.use(express.json());
app.use(cors());

const upload=require("../middleware/multer");

const Authorization = require('../middleware/autherization');

const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
};
app.use(cors(corsOptions));
app.options('*', cors());

const { 
    getUsers, putUsers,
    validateUsers, getUsersbyPhoneNumber 
} = require('../controllers/userController');

const { 
    getAdminbyEmail, putAdmin,
    loginValidate, forgotPassword, 
    getVendors, getVendorsbyEmail, 
    deleteVendors, verifyToken,
    getAllUsersCount, NewAdmin,
    GetNotificationCount,
} = require('../controllers/admin&vendorController');

const { 
    addCake, updateCake,
    deleteCake, getcakelist,
    getCakeDetails, getcakelistByVendorName,
    getcakelistByVendorId, getCakeListByStatus,
    ApproveCake
} = require('../controllers/cakeController');

const { 
    getOrdersList, newOrder, 
    updateOrder, updateOrderStatus,
    getOrdersListById, getOrdersListByUserID,
    getOrdersListByVendorId, getOrdersListByStatusAndAbove5Kg,
    getOrdersListByStatus, getVendorOrdersListByStatus,
    getOrdersStatusCount, getVendorOrdersStatusCount,
    OrderandCustomizecakeNotification, GetAbove5kgOrdersList,
    Above5KGOrderAssign, Above5KGOrderPriceInvoice,
    UpdateOrderResponsebyVendor, GetNotRespondOrders,
    CancelOrder
} = require('../controllers/orderListController');

const { 
    AddCategory, AddNewSubCategory,
    GetAllCategory, DeleteCategory,
    DeleteSubCategory, UpdateCategory
} = require('../controllers/categoryController');

const {
    RegisterVendors, putVendors,
    SetLastSeen
} = require('../controllers/VendorRegisterController');

const {
    HelpDeskNew, Above5kgCount,
    ChangePassword, GetHelpdeskMembers,
    DeleteHelpdeskMember
} = require('../controllers/helpDeskController');

const {
    AddNewFlavours, GetFlavoursList,
    AddNewShapes, GetShapesList,
    AddNewWeight, GetWeightList,
    AddNewArticle, GetArticleList,
    AddNewCakeToppings, GetCakeToppingsList,
    DeleteFlavour, DeleteShape, 
    DeleteWeight, DeleteArticle
} = require('../controllers/cakeArrayController');

const {
    AddNewCustomizeCake, GetCustomizeCakeList,
    GetAbove5kgCustomizeCakeList, GetCustomizeCakeListByVendorId, 
    GetCustomizeCakeListByUserId, GetNewCustomizeCakeListByVendorId,
    AssignCustomizecake, CustomizeCakePriceInvoice,
    CustomizeCakeConfirmOrder, ChangeNotificationStatus
} = require('../controllers/customizeCakeController');

const {
    VendorRatings, CakeRatings
} = require('../controllers/RatingsController');

const {
    AddNewTopper, UpdateTopper,
    GetAllToppers, GetToppersByVendorID,
    GetToppersByVendorIDandStock
} = require ('../controllers/ToppersController');

const {
    // SessionOrders,
    GetSessionOrders
} = require('../controllers/SessionOrdersListController');

const {
    AddNewBanner, GetBanner,
    UpdateBanner, DeleteBanner
} = require('../controllers/BannerController');

//Admin API

//add new admin
router.post('/admin/new', NewAdmin);

//Get all vendors
router.get("/admin/list/:email", Authorization, getAdminbyEmail);

//Update admin's details
router.put("/admin/update/:id",upload.single("file"), putAdmin);

//users count 
router.get('/admin/userscount', Authorization, getAllUsersCount);

//get Notification Count
router.get('/notification/count', Authorization, GetNotificationCount);


//Users API

//Get all users
router.get("/users/list", Authorization, getUsers);

//Get user's details by phone number
router.get("/users/list/:pn", Authorization, getUsersbyPhoneNumber);

//Update user's details
router.put("/users/update/:userId",upload.single("file"),putUsers);

//Validate the user -> If phonenumber is exists login else register
router.post("/userslogin/validate", validateUsers);


//Login & Forgot password API

//login for admin and vendors
router.post("/login/validate", loginValidate);

//verify token
router.get("/verifytoken/:token", Authorization, verifyToken);

//forgot password
router.put("/forgotpassword/:email", forgotPassword);

//Change Password
router.put('/password/change/:id',ChangePassword);


//Vendors API

//Get all vendors
router.get("/vendors/list", Authorization, getVendors);

//Get registered vendors
// router.get("/vendors/listbystatus/:Status", Authorization, GetNewVendorList);

//Get vendor's details based on email
router.get("/vendors/listbyemail/:email", Authorization, getVendorsbyEmail);

//Register vendor
// router.post("/vendors/register",upload.single("file"), RegisterVendors);
router.post("/vendors/register",upload.fields([{name: 'ProfileImage', maxCount: 1},{name:'CanYouMakeARegularCakeWithFondantAsToppersImage', maxCount: 3}]), RegisterVendors);

//Create new vendor
// router.put("/vendors/new/:id", addVendors);

//Update vendor's details
router.put("/vendors/update/:id",upload.fields([{name: 'ProfileImage', maxCount: 1},{name:'CanYouMakeARegularCakeWithFondantAsToppersImage', maxCount: 3}]), putVendors);

//Delete vendor
router.put("/vendors/delete/:id", deleteVendors);


//Help Desk API

//get all helpdesk members
router.get('/helpdesk/list', Authorization, GetHelpdeskMembers);

//Create New Help desk member
router.post('/helpdesk/new',HelpDeskNew);

//get above 5kg orders and customize cake orders count
router.get('/helpdesk/orders/count', Authorization, Above5kgCount);

//delete helpdesk member
router.put('/helpdesk/delete/:id', DeleteHelpdeskMember);


//Cake API

//Get all cakes
router.get("/cake/list", Authorization, getcakelist);

//get cake details
router.get("/cake/list/:id", Authorization, getCakeDetails);

//get cake list based on status
router.get('/cake/listbystatus/:status', Authorization, getCakeListByStatus);

//get cake details based on vendorname
router.get("/cake/listbyName/:VendorName", Authorization, getcakelistByVendorName);

//get cake details based on vendorId
router.get("/cake/listbyId/:VendorId", Authorization, getcakelistByVendorId);

//Create new vendor
router.post("/cake/new",upload.fields([{name: 'MainCakeImage', maxCount: 1},{name:'AdditionalCakeImages', maxCount: 5},{name:'SampleImages', maxCount: 10}]), addCake);

//cake approval
router.put('/cake/approve/:id', ApproveCake);

//Update vendor's details
router.put("/cake/update/:id",upload.fields([{name:'SampleImages', maxCount: 10}]), updateCake);

//Delete vendor
router.put("/cake/delete/:id", deleteCake);


//Cake order API

//get orders list
router.get('/order/list', Authorization, getOrdersList);

//get order's list based on orderId
router.get('/order/list/:id', Authorization, getOrdersListById);

//get order list based on userId
router.get('/order/listbyuserid/:userid', Authorization, getOrdersListByUserID); 

//get order list based on vendorId
router.get('/order/listbyvendorid/:vendorid', Authorization, getOrdersListByVendorId); 

//Add new order
router.post('/order/new', upload.single("file"), newOrder);

//update order details
router.put('/order/update/:id',updateOrder);

//send above 5kg orders price invoice 
router.put('/order/price/:id', Above5KGOrderPriceInvoice); //not used

//update order status
router.put('/order/updatestatus/:id',updateOrderStatus);

//get orders list by status
router.get('/order/listby/status/:status', Authorization, getOrdersListByStatus)

//get Orders list by Status and above 5kg
router.get('/order/listbystatus/:above', Authorization, getOrdersListByStatusAndAbove5Kg);

//get Orders list by Status
router.get('/order/listbyvendorstatus/:id/:status', Authorization, getVendorOrdersListByStatus);

//get Orders list by Status
router.get('/order/totalcount', Authorization, getOrdersStatusCount);

//get Orders list by Status
router.get('/order/countbyvendorid/:id', Authorization, getVendorOrdersStatusCount);

//get customize cake based on above 5kg yes or no
router.get('/order/listbyAbove5KG/:above', Authorization, GetAbove5kgOrdersList);

//get not respond orders for display in helpdesk and admin dashboard
router.get('/order/listbyresponse',GetNotRespondOrders);

//Above 5k orders assign to vendors
router.put('/order/assign/:id', Above5KGOrderAssign);

//update order response
router.put('/order/response/update/:id/:response', UpdateOrderResponsebyVendor);

//get single users orders and customize cake orders for notification
router.get('/users/notification/:id', Authorization, OrderandCustomizecakeNotification);

//change notification status for customize  cake
router.put('/customize/cake/update/notification/:id', ChangeNotificationStatus);

//cancel order
router.put('/order/cancel/:id', CancelOrder);


//Category API

// get all category
router.get('/category/list', Authorization, GetAllCategory);

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
router.get('/flavour/list', Authorization, GetFlavoursList);

//delete Flavour
router.delete('/flavour/delete/:id', DeleteFlavour);

//Add new Shape
router.post('/shape/new',AddNewShapes);

//Get Shapes List
router.get('/shape/list', Authorization, GetShapesList);

//delete shape
router.delete('/shape/delete/:id', DeleteShape);

//Add new Weight
router.post('/weight/new', AddNewWeight);

//Get Weight List
router.get('/weight/list', Authorization, GetWeightList);

//delete Weight
router.delete('/weight/delete/:id', DeleteWeight);

//Add new Articles
router.post('/article/new',AddNewArticle);

//Get Articles List
router.get('/article/list', Authorization, GetArticleList);

//delete article
router.delete('/article/delete/:id', DeleteArticle);

//Add new Cake Toppings
router.post('/toppings/new', AddNewCakeToppings);

//Get Cake Toppings List
router.get('/toppings/list', Authorization, GetCakeToppingsList);


//Customize Cake API

//Add new customize cake
router.post('/customize/cake/new',upload.array("files"), AddNewCustomizeCake);

//Assign customize cake to vendors
router.put('/customize/cake/assign/:id', AssignCustomizecake);

//send customize cake price invoice to user
router.put('/customize/cake/price/:id', CustomizeCakePriceInvoice);

//customize cake's confirm order
router.post('/customize/cake/order/new/:id', CustomizeCakeConfirmOrder);

//get all Customize cake
router.get('/customize/cake/list', Authorization, GetCustomizeCakeList);

//get customize cake based on above 5kg yes or no
router.get('/customize/cake/list/:above', Authorization, GetAbove5kgCustomizeCakeList);

//get customize cake based on vendor id
router.get('/customize/cake/listbyvendorid/:id', Authorization, GetCustomizeCakeListByVendorId);

//get new customizecake based on vendor id
router.get('/customize/cake/listbystatus/:id/:status', Authorization, GetNewCustomizeCakeListByVendorId);

//get customize cake based on user id
router.get('/customize/cake/listbyuserid/:id', Authorization, GetCustomizeCakeListByUserId);


//Ratings

//Vendor Ratings
router.put('/vendor/ratings/:id', VendorRatings);

//cake Ratings
router.put('/cake/ratings/:id', CakeRatings);


//Toppers

//get all toppers
router.get('/toppers/list', Authorization, GetAllToppers);

//get toppers by vendor id
router.get('/toppers/listbyvendor/:id', Authorization, GetToppersByVendorID);

//get toppers by vendor id and stock
router.get('/toppers/listbyvendorandstock/:id', Authorization, GetToppersByVendorIDandStock);

//Add new topper
router.post('/toppers/new', upload.single('file'), AddNewTopper);

//update topper
router.put('/toppers/update/:id', upload.single('file'), UpdateTopper);


//last seen
router.put('/lastseen', SetLastSeen);

//get orders by session
// router.get('/order/session', SessionOrders);

//get session orders
router.get('/order/session', Authorization, GetSessionOrders);


//banner

//add new banner
router.post('/banner/new', upload.single('file'), AddNewBanner);

//get all banner
router.get('/banner/list', Authorization, GetBanner);

//update banner details
router.put('/banner/update/:id', upload.single('file'), UpdateBanner);

//delete banner
router.delete('/banner/delete/:id', DeleteBanner);


module.exports = router;