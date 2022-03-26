const express = require("express");
const app = express();
const router = express.Router();
const upload=require("./../middleware/upload")
const { getUsers,setUsers,putUsers,validateUsers } = require('../controllers/userController');

app.use(router);
router.use(express.json());

//Get all users
router.get("/users/list", getUsers);

router.post("/users/addUser", setUsers);

//Update user's details
router.put("/users/update/:userId",upload.single("file"),putUsers);

//Validate the user -> If phonenumber is exists login else register
router.post("/users/validate", validateUsers);

module.exports = router;