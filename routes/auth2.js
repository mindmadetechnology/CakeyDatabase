const router = require('./auth');

const {
    AddNewCakeType, GetCakeTypeList
} = require('../controllers/CakeTypeController');

router.post('/caketype/new', AddNewCakeType);

router.get('/caketype/list', GetCakeTypeList);

module.exports = router;