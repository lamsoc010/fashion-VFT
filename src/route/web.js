import express from "express";
let router = express.Router();
import homeController from "../controllers/homeController";
import UserController from "../controllers/UserController";
import cartController from "../controllers/cartController";

const initWebRoute = (app) => {
    // loggined
    router.get('*', homeController.getListCarts, UserController.getUserIn);
    router.get('/shop-register', UserController.getShopRegister);
    router.get('/shop-login', UserController.getShopLogin);
    router.get('/admin', UserController.checkLoginAdmin, UserController.getAdmin)
    router.get('/shop-logout', UserController.getShopLogout);
    // Post
    router.post('/users/shop-register', UserController.postShopRegister);
    router.post('/users/shop-login', UserController.postShopLogin);

    router.get('/fake-api-product', homeController.getFakeApiProduct);
    router.get('/', homeController.getHomepage);
    router.get('/shop-item/:id', homeController.getShopItem)
    router.get('/shop-account', homeController.getShopAccout)
    router.get('/shop-checkout', homeController.getShopCheckout)
    router.get('/shop-product-list', homeController.getShopProductList)
    router.get('/shop-index-header-fix', homeController.getShopIndexHeader)
    router.get('/shop-search-result', homeController.getShopSearchResult)
    router.get('/shop-shopping-cart', homeController.checkNullProduct, homeController.getShopShoppingCart)
    router.get('/shop-standart-forms', homeController.getShopStandartForms)
    router.get('/shop-contacts', homeController.getShopContacts)
    router.get('/shop-shopping-cart-null', homeController.getShopShoppingCartNull)

    router.post('/shop-add-cartItem/:id', UserController.checkLoginUser, cartController.getShopAddCartItem)
    router.get('/shop-delete-cartItem/:id', cartController.getShopDeleteCartItem)
    return app.use('/', router);
}

module.exports = initWebRoute;