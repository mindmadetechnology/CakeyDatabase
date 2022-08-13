const router = require('./auth');

const {
    AddNewCakeType, GetCakeTypeList,
    DeleteCakeTypeOrCakeSubType, RemoveAdminNotification
} = require('../controllers/CakeTypeController');

router.post('/caketype/new', AddNewCakeType);

router.get('/caketype/list', GetCakeTypeList);

router.put('/caketype/delete', DeleteCakeTypeOrCakeSubType);

router.delete('/admin/removenotification/:id', RemoveAdminNotification)

module.exports = router;