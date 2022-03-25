const express = require("express");
const app = express();
const router = express.Router();

const { getUsers, setUsers, putUsers, validateUsers,getimg } = require('../controllers/userController');

app.use(router);
router.use(express.json());
multer = require("multer")
fs = require("fs")
//img upload
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
})
var upload = multer({ storage: storage })


//Get all users
router.get("/users/list", getUsers);

router.post("/users/addUser", setUsers);

//Update user's details
router.put("/users/update/:userId",upload.single('ProfileImg'), putUsers);

//Validate the user -> If phonenumber is exists login else register
router.post("/users/validate", validateUsers);
router.get('/uploads/:file(*)',getimg);

module.exports = router;