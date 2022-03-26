const multer = require("multer");
const path = require("path");
var storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, 'public/images');
    },
    filename: (req, file, callBack) => {
        const mimeExtension = {
            'image/jpeg': '.jpeg',
            'image/jpg': '.jpg',
            'image/png': '.png',
            'application/pdf': '.pdf',
            'application/zip': '.zip',
            'application/msword': '.doc',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx'
        };
        callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
        // callBack(null,file.fieldname + '-'  + Date.now() + mimeExtension[file.mimetype] )
    }
});
var upload = multer({
    storage: storage,
    // limits:{fileSize : 1024 *1024},
    fileFilter: (req, file, callBack) => {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png' ||
            file.mimetype === 'application/pdf' ||
            file.mimetype === 'application/zip' ||
            file.mimetype === 'application/msword' ||
            file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
            callBack(null, true);
        } else {
            callBack(null, false);
        }
    }
});
module.exports = upload;