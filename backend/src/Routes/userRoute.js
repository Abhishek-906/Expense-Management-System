
const express = require('express');
const router = express.Router();
const authenticateUser = require('../middleware/authenticationUser'); 
const { register, login , editUser ,  monthlyBudget , deleteUserById ,getUserOverview} = require('../controller/UserController');



router.post('/login' , login);
router.post('/register' , register);
router.post('/editUser' ,authenticateUser , editUser);
router.post('/monthlyBudget', authenticateUser,  monthlyBudget);
router.delete('/deleteUserById' , authenticateUser , deleteUserById);
router.get('/get-user-overview' ,authenticateUser , getUserOverview);
module.exports = router ;
