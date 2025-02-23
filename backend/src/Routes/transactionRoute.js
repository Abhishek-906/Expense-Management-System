const express = require('express');
const router = express.Router();
const authenticateUser = require('../middleware/authenticationUser'); 
const { addTrans , getTrans , deleteTrans , editTrans } = require('../controller/TransactionController');

router.post('/addTrans'  , authenticateUser ,  addTrans);
router.post('/getTrans',authenticateUser ,  getTrans ) ;
router.post('/editTrans',authenticateUser ,  editTrans ) ;
router.delete('/deleteTrans/:id', authenticateUser ,  deleteTrans ) ;

module.exports = router;
