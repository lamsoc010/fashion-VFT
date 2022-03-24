// const express = require('express');
import express from 'express';
import configViewEngine from './configs/viewEngine';
import initWebRoute from './route/web';
import mongoose from 'mongoose';
mongoose.connect('mongodb://localhost/fashion-VFT', { useNewUrlParser: true });

const app = express();
const port = 3000;

// setup view engine
configViewEngine(app);

// init web route
initWebRoute(app);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})





