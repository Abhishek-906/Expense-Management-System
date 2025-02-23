

const express = require('express');
const router = express.Router();
const authenticateUser = require('../middleware/authenticationUser'); 
const { register, login , editUser ,  monthlyBudget , deleteUserById ,dashboard} = require('../controller/UserController');
const { addTrans , getTrans , deleteTrans , editTrans } = require('../controller/TransactionController');

router.post('/login' , login);
router.post('/register' , register);
router.post('/editUser' ,authenticateUser , editUser);
router.post('/monthlyBudget', authenticateUser,  monthlyBudget);
router.delete('/deleteUserById' , authenticateUser , deleteUserById);
router.get('/dashboard' ,authenticateUser , dashboard);

router.post('/addTrans'  , authenticateUser ,  addTrans);
router.post('/getTrans',authenticateUser ,  getTrans ) ;
router.post('/editTrans',authenticateUser ,  editTrans ) ;
router.delete('/deleteTrans/:id', authenticateUser ,  deleteTrans ) ;




module.exports = router ;




