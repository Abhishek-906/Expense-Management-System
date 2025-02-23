
const express = require('express');
const router = express.Router();
const authenticateUser = require('../middleware/authenticationUser'); 
const { register, login , editUser ,  monthlyBudget , deleteUserById ,dashboard} = require('../controller/UserController');



router.post('/login' , login);
router.post('/register' , register);
router.post('/editUser' ,authenticateUser , editUser);
router.post('/monthlyBudget', authenticateUser,  monthlyBudget);
router.delete('/deleteUserById' , authenticateUser , deleteUserById);
router.get('/dashboard' ,authenticateUser , dashboard);
module.exports = router ;
