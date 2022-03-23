const productController = require('../controllers/productController');
const multipleUploadController = require('../controllers/multipleUploadController');
const router = require('express').Router();

// CONNECT ADMIN
// router.get('/', (req, res)=>{
//    return  res.render('admin')
// })
// ADD A PRODUCT
// router.post('/', multipleUploadController.multipleUpload, productController.addProduct);
router.post('/', productController.addProduct);
// update
router.put('/:id', productController.updateProduct)

router.delete('/:id', productController.deleteProduct)

// get all product
router.get('/:id', );
module.exports = router;