import Product from '../models/Product';
import Cart from '../models/Cart';
import { faker } from '@faker-js/faker';
const product = require('../models/Product');

const PAGE_SIZE = 9;

let getFakeApiProduct = (req, res, next) => {
    for(let i = 1; i < 15; i++) {
        const newprd = new Product();
        newprd.name = faker.commerce.productName();
        newprd.image = [faker.image.image(), faker.image.image(), faker.image.image()];
        newprd.price = faker.commerce.price();
        newprd.sale = faker.commerce.price();
        newprd.status = faker.commerce.productAdjective();
        newprd.description = faker.lorem.paragraph();
        newprd.storage = [{
            size: faker.commerce.productAdjective(),
            color: faker.commerce.productAdjective(),
            quality: 5
        }, {
            size: faker.commerce.productAdjective(),
            color: faker.commerce.productAdjective(),
            quality: 5
        }, {
            size: faker.commerce.productAdjective(),
            color: faker.commerce.productAdjective(),
            quality: 5
        }];
        newprd.save();
        res.redirect('/');
    }
}
global.listCarts = null;
let getHomepage = async (req, res) => {
    if(req.session.userId) {
        const listCart = await Cart.findOne({userId: req.session.userId}).populate('product._id');
        listCarts = listCart;
        return res.render('shop-index');
    }
    return res.render('shop-index');
}
let getShopItem = (req, res) => {
    Product.findOne({_id: req.params.id}, function(err, product) {
        if(product) {
            return res.render('shop-item', {
                detailProduct: product
            })
        }
    })
}
let getShopAccout = (req, res) => {
    return res.render('shop-account');
}
let testAdmin = async (req, res) => {
    const allProduct = await product.find();
    return res.render('testAdmin', {allProduct});
}
let getShopCheckout = (req, res) => {
    return res.render('shop-checkout');
}
let statusDonhang = (req, res) => {
    return res.render('TrangThaiDonHang');
}
let editProduct =async (req, res) => {
    const searchProduct = await product.findById(req.params.id)
    return res.render('editProduct', {searchProduct});
}
// Phân trang
let getShopProductList = (req, res) => {
    let page = req.query.page || 1;
    if(page) {
        // get page
        page = parseInt(page);
        
        page = (page < 1) ? 1 : page;

        let skip = (page - 1) * PAGE_SIZE;
        Product.find({})
        .skip(skip) 
        .limit(PAGE_SIZE)
        .exec((err, products) => {
            Product.countDocuments((err, count) => { //đếM để tính có bao nhiêu trang
                if(err) return next(err);
                res.render('shop-product-list', {
                    products, // sản phẩM trên một page
                    current: page, //page hiệN tại
                    pages: Math.ceil(count / PAGE_SIZE) //tổng các các page
                })
            })
        })
    } else {
        // get all
        Pagination.find({})
        .then(data => {
            res.render('shop-product-list', {
                products,
                current: page,
                pages: Math.ceil(data.length / PAGE_SIZE)
            })
        })
        .catch(err => { 
            res.status(500).json('loi server');
        })
    }
}
let getShopIndexHeader = (req, res) => {
    return res.render('shop-index-header-fix');
}
let getShopSearchResult = (req, res) => {
    return res.render('shop-search-result');
}
let getShopShoppingCart = (req, res) => {
    return res.render('shop-shopping-cart');
}
let getShopStandartForms = (req, res) => {
    return res.render('shop-standart-forms');
}
let getShopContacts = (req, res) => {
    return res.render('shop-contacts');
}
let getShopShoppingCartNull = (req, res) => {
    return res.render('shop-shopping-cart-null');
}


module.exports = {
    editProduct,
    testAdmin,
    statusDonhang,
    getHomepage,
    getShopItem,
    getShopAccout,
    getShopCheckout,
    getShopProductList,
    getShopIndexHeader,
    getShopSearchResult,
    getShopShoppingCart,
    getShopStandartForms,
    getShopContacts,
    getShopShoppingCartNull,
    getFakeApiProduct

}