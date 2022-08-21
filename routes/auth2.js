const router = require('./auth');

const upload=require("../middleware/multer");

const Authorization = require('../middleware/autherization');

const {
    AddNewCakeType, GetCakeTypeList,
    DeleteCakeTypeOrCakeSubType, RemoveAdminNotification
} = require('../controllers/CakeTypeController');

const {
    CreateHampers, UpdateHampers,
    GetHampersList, GetVendorsHampersList,
    ApproveHampers, RemoveHampers,
    GetHamperDetailsById, GetApprovedHampersList,
    OrderHampers, UpdateHamperOrderStatus,
    AcceptHamperOrder, CancelHamperOrder,
    GetHamperOrdersList, GetVendorHamperOrdersList,
    GetHamperOrderDetailsById, GetUserHamperOrdersList,
    GetUserOrderAndHamperOrder
} = require('../controllers/HampersController');

const {
    CreateOtherProduct, ApproveOtherProduct,
    GetAllOtherProductsList, GetVendorsOtherProductsList,
    GetApprovedOtherProductsList, OtherProductSendInformation,
    UpdateOtherProduct, DeleteOtherProduct
} = require('../controllers/OtherProductsController');

router.post('/caketype/new', AddNewCakeType);

router.get('/caketype/list',Authorization, GetCakeTypeList);

router.put('/caketype/delete', DeleteCakeTypeOrCakeSubType);

router.delete('/admin/removenotification/:id', RemoveAdminNotification);



router.post('/hamper/new', upload.single('file'), CreateHampers);

router.put('/hamper/update/:id', upload.single('file'), UpdateHampers);

router.get('/hamper/list',Authorization, GetHampersList);

router.get('/hamper/listbyvendor/:id',Authorization, GetVendorsHampersList);

router.get('/hamper/approvedlist',Authorization, GetApprovedHampersList);

router.get('/hamper/details/:id', GetHamperDetailsById);

router.put('/hamper/approve/:id', upload.single('file'), ApproveHampers);

router.delete('/hamper/delete/:id', RemoveHampers);

router.post('/hamperorder/new', OrderHampers);

router.put('/hamperorder/updatestatus/:id', upload.single('file'), UpdateHamperOrderStatus);

router.put('/hamperorder/accepted/:id', AcceptHamperOrder);

router.put('/hamperorder/canceled/:id', CancelHamperOrder);

router.get('/hamperorder/list',Authorization, GetHamperOrdersList);

router.get('/hamperorder/listbyvendor/:id',Authorization, GetVendorHamperOrdersList);

router.get('/hamperorder/listbyuser/:id',Authorization, GetUserHamperOrdersList);

router.get('/hamperorder/details/:id', GetHamperOrderDetailsById);

router.get('/ordersandhamperorders/listbyuser/:id', GetUserOrderAndHamperOrder);


router.post('/otherproduct/new',upload.fields([{name: 'ProductImage', maxCount: 5}]), CreateOtherProduct);

router.put('/otherproduct/approve/:id', ApproveOtherProduct);

router.get('/otherproduct/alllist', GetAllOtherProductsList);

router.get('/otherproduct/listbyvendor/:id', GetVendorsOtherProductsList);

router.get('/otherproduct/list', GetApprovedOtherProductsList);

router.put('/otherproduct/information/:id', OtherProductSendInformation);

router.put('/otherproduct/update/:id', UpdateOtherProduct);

router.delete('/otherproduct/delete/:id', DeleteOtherProduct);
module.exports = router;