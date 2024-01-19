const Product = require("../model/Product.js")
const User = require("../model/userSchema.js")
const isProduct = async (req, res, next) => {
    try {

        // console.log(Product)
        const user = await User.find({})
        const productSetting = await Product.find({})
        const originalURL = req.originalUrl
        if (productSetting.length == 0 && originalURL !== "/admin" && user.length < 0) {
        
            res.redirect('/admin');
            
        }
        else {
            next();
        }
    }
    catch (err) {
        console.log(err);
    }
    
}
module.exports = {
    isProduct
}