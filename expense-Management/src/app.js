const express = require('express');
const connectDB = require('./connectDB');
require('dotenv').config();
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000 ;

app.use(express.json());

connectDB();

app.use('/work' , require('.Routes/routes'))

module.exports = app ;