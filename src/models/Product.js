const { type } = require('express/lib/response');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const date = require('date-and-time')
  
// const now  =  new Date();
  
// const value = date.format(now,'YYYY/MM/DD HH:mm:ss');

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true
    }, 
    // image: Array,
    image: [{
        type: String,
    }
    ],
    productType:{
        type: String,
    },
    price: {
        type: Number,
        required: true,
    },
    sale: {
        type: Number,
        // required: false,
        min: 0,
        max: 99
    },
    ngayTao: {
        type: Date,
        // default: date.format(now,'YYYY/MM/DD')
        default: Date.now,
    },
    status: {
        type: String,
        // required: true
    },
    description: {
        type: String,
        required: true
    },
    size:[ {
        type: String,
        // required: true
    }],
    color: [{
        type: String,
        // required: true,
    }],
    amount:[ {
        type: Number,
        // required: true
    }],
})

const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;