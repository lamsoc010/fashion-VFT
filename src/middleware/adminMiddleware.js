const res = require('express/lib/response');
const product = require('../models/Product');


// khai báo biến -- truy cập vào fiel ejs
global.allProduct = null;


const admin_product = product.find({}, (error, pro) =>{
    if(pro){
        console.log("ok")
       return allProduct = pro; 
    }else{
        res.render('shop-index')
    }
    
    
        // nếu kết quả tìm thấy tồn tại thì chuyển sang middleware khác
        // Nược lại redirect về trang chủ
    // next()
})
module.exports = {admin_product};