import User from '../models/User';
import bcrypt from 'bcrypt';

let getAdmin = (req, res) => {
    return res.render('admin');
}
let getShopRegister = (req, res) => {
    return res.render('shop-register');
}
let getShopLogin = (req, res) => {
    return res.render('shop-login');
}
let getShopLogout = (req, res) => {
    req.session.destroy(() => {
        return res.redirect('/');
    });
}
global.userIn = null;
let getUserIn = (req, res, next) => {

    User.findById(req.session.userId, (err, user) => {

        // why
        if(!err) {
            global.userIn = user;
            next();
        }
    })
}

let checkLoginAdmin = (req, res, next) => {
    User.findById(req.session.adminId, (err, user) => {

        // why
        if(!err && user) {
            next();
        } else {
            return res.redirect('/shop-login');
        }
    })
}
let checkLoginUser = (req, res, next) => {
    User.findById(req.session.userId, (err, user) => {
        if(!err && user) {
            next();
        } else {
            return res.redirect('/shop-login');
        }
    })
}

// Post
let postShopRegister = (req, res) => {
    User.create({
        ...req.body,
        role: 'user'
    }, (err, user) => {
        if(!err) {
            return res.redirect('/shop-login');
        } else {
            return res.redirect('/shop-register');
        }
    })
}
let postShopLogin = (req, res) => {
    const {email, password} = req.body;
    User.findOne({email}, (err, user) => {
        if(!err && user) {
            bcrypt.compare(password, user.password, (err, result) => {
                if(result) {
                    if(user.role === 'admin') {
                        req.session.adminId = user._id;
                        return res.redirect('/admin');
                    } else if(user.role === 'user') {
                        req.session.userId = user._id;
                        return res.redirect('/');
                    }
                } else {
                    return res.redirect('/shop-login');
                }
            })
        } else {
            return res.redirect('/shop-login');
        }
    })
}


module.exports = {
    getAdmin,
    getShopRegister,
    postShopRegister,
    getShopLogin,
    postShopLogin,
    getShopLogout,
    getUserIn,
    checkLoginAdmin,
    checkLoginUser
}