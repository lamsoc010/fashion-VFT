const product = require('../models/Product');
const path = require('path');
// khai báo biến -- truy cập vào fiel ejs
global.message = null;
global.allProduct = null;
const productController = {
// ADD A PRODUCT
    addProduct : async (req, res) =>{
        let image = req.files.image;
        // res.json(image)
        image.mv(path.resolve(__dirname, '../public/assets/upload', image.name), (error) => {
            product.create({
                ...req.body,
                image: '/assets/upload/' + image.name
            }, (err, post) => {
                if(err){
                    return res.send("eror")
                }
                res.redirect('/')
            })
        })
    },
// GET ALL PRODUCT
    getAllproduct: async(req, res)=>{
        try {
            let allProduct = await product.find();
            res.render('testAdmin', {
                allProduct,
            })
            // res.redirect('/testAdmin')
            // allProduct;
            // return allProduct;
        } catch (error) {
            res.send("eror")
        }
    },
    // UPDATE PRODUCT
    updateProduct: async(req, res) =>{
        try {
            const proUpdate = await product.findById(req.params.id);
            await proUpdate.updateOne({$set: req.body});
         return res.redirect('/admin')
           
        } catch (error) {
            console.log('update fail')
            return   res.redirect('/testAdmin')
        }
    },

    // DELETE PRODUCT
    deleteProduct: async(req, res) =>{
        try {
            await product.findByIdAndDelete(req.params.id);
            res.redirect('back')
        } catch (error) {
            console.log('delete fail')
            res.render('admin')
        }
    }
}



module.exports = productController;