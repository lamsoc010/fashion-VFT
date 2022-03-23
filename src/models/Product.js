const { type } = require('express/lib/response');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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