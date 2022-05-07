const express = require("express");
const cors = require('cors');

const app = express();

app.use(express.static(__dirname));

const router = express.Router();
app.use(router);

router.use(express.json());
app.use(cors());

const upload=require("../middleware/multer");

// const Authorization = require('../middleware/autherization');

const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
};
app.use(cors(corsOptions));
app.options('*', cors());

const {
    AddNewFlavours,
    GetFlavoursList
} = require('../controllers/cakeArrayController');

//Add new Flavours
router.post('/flavour/new',AddNewFlavours);

//Get Flavours List
router.get('/flavour/list',GetFlavoursList);

module.exports = router;