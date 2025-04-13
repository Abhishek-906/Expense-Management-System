
const express = require('express');
const connectDB = require('../connectDB');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require("cors");
const app = express();


// Allow both localhost and production frontend
const allowedOrigins = [
  'http://localhost:5173',
  'https://expense-management-system-virid.vercel.app'
];

console.log("allowedOrigins ",allowedOrigins)

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));


app.use(express.json());


connectDB();

app.use('/user', require('./Routes/userRoute'));
app.use('/transaction', require('./Routes/transactionRoute'));


module.exports = app;
