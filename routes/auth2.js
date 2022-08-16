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
    GetHamperDetailsById, GetApprovedHampersList
    // OrderHampers, UpdateHamperOrderStatus
} = require('../controllers/HampersController');

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

router.put('/hamper/approve/:id', ApproveHampers);

router.delete('/hamper/delete/:id', RemoveHampers);

module.exports = router;