import Cart from '../models/Cart';
import Product from '../models/Product';
let getShopAddCartItem = (req, res) => {
    Product.findById(req.params.id, (err, product) => {
        if(!err && product) {
            Cart.findOne({userId: req.session.userId}, (err, cart) => {
                if(!err && cart) {
                    cart.product.push({
                        _id: product._id,
                        ... req.body
                    });
                    cart.save((err, cart) => {
                        return res.redirect('/shop-shopping-cart');
                    })
                } else {
                    Cart.create({
                        userId: req.session.userId,
                        product: [{
                            _id: product._id,
                            ... req.body
                        }]
                    });
                    return res.redirect('/shop-shopping-cart');
                }
            })
        } else {
            return res.redirect('/shop-shopping-cart');
        }
    })
}

let getShopDeleteCartItem = (req, res) => {
    Product.findById(req.params.id, (err, product) => {
        if(!err && product) {
            Cart.findOne({userId: req.session.userId}, (err, cart) => {
                if(!err && cart) {
                    cart.product.pull({
                        _id: product._id
                    });
                    cart.save((err, cart) => {
                        return res.redirect('/shop-shopping-cart');
                    })
                } else {
                    return res.redirect('/shop-shopping-cart');
                }
            })
        }
    })
}

module.exports = {
    getShopAddCartItem,
    getShopDeleteCartItem
}