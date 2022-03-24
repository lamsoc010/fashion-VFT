const productController = require('../controllers/productController');
const multipleUploadController = require('../controllers/multipleUploadController');
const router = require('express').Router();

// ADD A PRODUCT
router.post('/', productController.addProduct);
// update
router.put('/:id', productController.updateProduct)

router.delete('/:id', productController.deleteProduct)

module.exports = router;