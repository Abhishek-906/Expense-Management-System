
const express = require('express');
const connectDB = require('../connectDB');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;



app.use(cors({
  origin: 'expense-management-system-virid.vercel.app',
  credentials: true, 
}));


app.use(express.json());


connectDB();

app.use('/user', require('./Routes/userRoute'));
app.use('/transaction', require('./Routes/transactionRoute'));


module.exports = app;
