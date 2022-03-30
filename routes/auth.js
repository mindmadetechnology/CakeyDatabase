const express = require("express");
const cors = require('cors');
const app = express();
const router = express.Router();
app.use(router);
router.use(express.json());
app.use(cors());

const multer = require("multer");
const path = require("path");

const corsOptions ={
    origin:'https://cakey-database.vercel.app', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader(
//     'Access-Control-Allow-Headers',
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );
//  res.setHeader ('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
//  next ();
// });


const { getUsers,putUsers,validateUsers,viewImg } = require('../controllers/userController');
const { loginValidate, forgotPassword, getVendors, addVendors, putVendors,deleteVendors } = require('../controllers/admin&vendorController');

var storage = multer.diskStorage({
    destination:(req,file,callBack)=>{
        callBack(null,'public/images');
    },
    filename :(req,file,callBack)=>{
        const mimeExtension = {
            'image/jpeg' : '.jpeg',
            'image/jpg' : '.jpg',
            'image/png' : '.png',
            'application/pdf' : '.pdf',
            'application/zip': '.zip',
            'application/msword' : '.doc',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx'
        };
        callBack(null, file.fieldname + '-'  + Date.now() + path.extname(file.originalname));
        // callBack(null,file.fieldname + '-'  + Date.now() + mimeExtension[file.mimetype] )
    }
});
var upload = multer({
    storage :storage,
    // limits:{fileSize : 1024 *1024},
    fileFilter:(req,file,callBack)=>{
        if(file.mimetype ==='image/jpeg' || file.mimetype === 'image/jpg' ||  file.mimetype === 'image/png' ||
            file.mimetype === 'application/pdf' ||
            file.mimetype === 'application/zip' ||
            file.mimetype === 'application/msword' ||
            file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'){
            callBack(null,true);
        }else{
            callBack(null,false);
        }
    }
});

//Get all users
router.get("/users/list", getUsers);

//Update user's details
router.put("/users/update/:userId",upload.single('file'),putUsers);

//Validate the user -> If phonenumber is exists login else register
router.post("/userslogin/validate", validateUsers);

//route to download a file
router.get('/public/images/:file(*)',viewImg);

//login for admin and vendors
router.post("/login/validate", loginValidate);

//forgot password
router.put("/forgotpassword/:id", forgotPassword);

//Get all vendors
router.get("/vendors/list", getVendors);

//Create new vendor
router.post("/vendors/new", addVendors);

//Update vendor's details
router.put("/vendors/update/:id", putVendors);

//Delete vendor
router.put("/vendors/delete/:id", deleteVendors);

module.exports = router;