
const express = require('express');
const connectDB = require('../connectDB');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require("cors");
const app = express();

app.use(cors({ origin: "*" }));


app.use(express.json());


connectDB();

app.use('/user', require('./Routes/userRoute'));
app.use('/transaction', require('./Routes/transactionRoute'));

module.exports = app;
