const express = require("express");
const app = express();
const router = express.Router();

const { getUsers,setUsers,putUsers,validateUsers } = require('../controllers/userController');

app.use(router);
router.use(express.json());

//Get all users
router.get("/list", getUsers);

router.post("/addUser", setUsers);

//Update user's details
router.put("/update/:userId", putUsers);

//Validate the user -> If phonenumber is exists login else register
router.post("/validate", validateUsers);

module.exports = router;