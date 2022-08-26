const router = require('./auth');

const upload = require("../middleware/multer");

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
    UpdateOtherProduct, DeleteOtherProduct,
    GetOtherProductListByStatus, GetNewAndUpdatedOtherProductsList,
    GetOtherProductDetails, ApproveUpdatedOtherProduct
} = require('../controllers/OtherProductsController');

const {
    NewOtherProductOrder, GetAllOtherProductList,
    GetVendorOtherProductOrderList, GetOtherProductOrderDetails,
    UpdateOtherProductOrderStatus, AcceptOrCancelOrder,
} = require('../controllers/OtherProductOrdersController');

const {
    CreateBankName, DeleteBankName,
    GetBankNameList
} = require("../controllers/BankNameControllers");

router.post('/caketype/new', AddNewCakeType);

router.get('/caketype/list', Authorization, GetCakeTypeList);

router.put('/caketype/delete', DeleteCakeTypeOrCakeSubType);

router.delete('/admin/removenotification/:id', RemoveAdminNotification);



router.post('/hamper/new', upload.single('file'), CreateHampers);

router.put('/hamper/update/:id', upload.single('file'), UpdateHampers);

router.get('/hamper/list', Authorization, GetHampersList);

router.get('/hamper/listbyvendor/:id', Authorization, GetVendorsHampersList);

router.get('/hamper/approvedlist', Authorization, GetApprovedHampersList);

router.get('/hamper/details/:id', Authorization, GetHamperDetailsById);

router.put('/hamper/approve/:id', upload.single('file'), ApproveHampers);

router.delete('/hamper/delete/:id', RemoveHampers);

router.post('/hamperorder/new', OrderHampers);

router.put('/hamperorder/updatestatus/:id', upload.single('file'), UpdateHamperOrderStatus);

router.put('/hamperorder/accepted/:id', AcceptHamperOrder);

router.put('/hamperorder/canceled/:id', CancelHamperOrder);

router.get('/hamperorder/list', Authorization, GetHamperOrdersList);

router.get('/hamperorder/listbyvendor/:id', Authorization, GetVendorHamperOrdersList);

router.get('/hamperorder/listbyuser/:id', Authorization, GetUserHamperOrdersList);

router.get('/hamperorder/details/:id', Authorization, GetHamperOrderDetailsById);

router.get('/ordersandhamperorders/listbyuser/:id', Authorization, GetUserOrderAndHamperOrder);


router.post('/otherproduct/new', upload.fields([{ name: 'ProductImage', maxCount: 5 }]), CreateOtherProduct);

router.put('/otherproduct/approve/:id', ApproveOtherProduct);

router.put('/otherproduct/approveupdated/:id', ApproveUpdatedOtherProduct);

router.get('/otherproduct/alllist', Authorization, GetAllOtherProductsList);

router.get('/otherproduct/details/:id', Authorization, GetOtherProductDetails);

router.get('/otherproduct/listbyvendor/:id', Authorization, GetVendorsOtherProductsList);

router.get('/otherproduct/list', Authorization, GetApprovedOtherProductsList);

router.get('/otherproduct/newlist', Authorization, GetNewAndUpdatedOtherProductsList);

router.get('/otherproduct/listbystatus/:status', Authorization, GetOtherProductListByStatus);

router.put('/otherproduct/information/:id', OtherProductSendInformation);

router.put('/otherproduct/update/:id', UpdateOtherProduct);

router.delete('/otherproduct/delete/:id', DeleteOtherProduct);


router.post('/otherproduct/order/new', NewOtherProductOrder);

router.get('/otherproduct/order/alllist', Authorization, GetAllOtherProductList);

router.get('/otherproduct/order/listbyvendor/:id', Authorization, GetVendorOtherProductOrderList);

router.get('/otherproduct/order/details/:id', Authorization, GetOtherProductOrderDetails);

router.put('/otherproduct/order/updatestatus/:id', upload.single('file'), UpdateOtherProductOrderStatus);

router.put('/otherproduct/order/acceptorcancel/:id', AcceptOrCancelOrder);

router.post('/bankname/new',CreateBankName);

router.delete('/bankname/delete/:bankname',DeleteBankName);

router.get('/bankname/list', Authorization,GetBankNameList);

module.exports = router;