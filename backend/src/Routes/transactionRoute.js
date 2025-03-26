const express = require('express');
const router = express.Router();
const authenticateUser = require('../middleware/authenticationUser'); 
const { addTrans , getTrans , deleteTrans , editTrans , addImage } = require('../controller/TransactionController');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const uploadDir = path.join(__dirname, '../assets/downloads');

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
   destination: function(req, file, cb) {
       cb(null, uploadDir);
   },
   filename: function(req, file, cb) {
       cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
   }
});

const upload = multer({ storage: storage });

router.post('/addImage', upload.single('sample'),  addImage);
router.post('/addTrans'  , authenticateUser ,  addTrans);
router.post('/getTrans',authenticateUser ,  getTrans ) ;
router.post('/editTrans',authenticateUser ,  editTrans ) ;
router.delete('/deleteTrans/:id', authenticateUser ,  deleteTrans ) ;

module.exports = router;
