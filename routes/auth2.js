const router = require('./auth');

const {
    AddNewCakeType, GetCakeTypeList,
    DeleteCakeTypeOrCakeSubType
} = require('../controllers/CakeTypeController');

router.post('/caketype/new', AddNewCakeType);

router.get('/caketype/list', GetCakeTypeList);

router.put('/caketype/delete', DeleteCakeTypeOrCakeSubType);

module.exports = router;