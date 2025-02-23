
const express = require('express');
const connectDB = require('../connectDB');
require('dotenv').config();
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());


connectDB();

app.use('/user', require('./Routes/userRoute'));
app.use('/transaction', require('./Routes/transactionRoute'));


module.exports = app;















/*

const express = require('express');
const connectDB = require('../connectDB');
require('dotenv').config();
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());


connectDB();
app.use('/task', require('./Routes/route'));

module.exports = app;

*/













/*

const express = require('express');
const connectDB = require('../connectDB');
require('dotenv').config();
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());


connectDB();
app.use('/task', require('./Routes/route'));


module.exports = app;


*/









/*

const express = require('express');
const connectDB = require('../connectDB');
require('dotenv').config();
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());


connectDB();


app.use('/work', require('./Routes/expense_route'));


module.exports = app;


*/