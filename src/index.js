// const express = require('express');
import express from 'express';
import configViewEngine from './configs/viewEngine';
import initWebRoute from './route/web';
import mongoose from 'mongoose';
const methodOverride = require('method-override')

// API PRODUCT
const product = require('./route/product')



mongoose.connect('mongodb://localhost/fashion-VFT', { useNewUrlParser: true });
const app = express();
const port = 3000;


const adminMiddleware = require('./middleware/adminMiddleware');

// Cho phép lý dữ liệu từ form method POST
// app.use(express.urlencoded({extended: true}));

// setup view engine
configViewEngine(app);

app.use(methodOverride('_method'))
app.use('/admin/product', product)
// init web route
initWebRoute(app);




app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})





