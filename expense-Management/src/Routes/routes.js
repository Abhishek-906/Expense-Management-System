const express = require('express');
const router  = express.Router();
const {register , manage} = require('../Controller/ExpenseController');

router.post('/register' , register);
router.post('/manage' , manage);


module.exports = router ;