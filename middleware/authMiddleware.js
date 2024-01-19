const jwt = require("jsonwebtoken")
const userModel = require("../model/userSchema.js")
const { log } = require("console")
// const Product = require("../model/Product.js")
var checkUser = async (req, res, next) => {
    var token
    const { authorization } = req.headers
    console.log(authorization)
    if (authorization && authorization.startsWith('Bearer')) {
        try {
            token = authorization.spilt(' ')[1];
            // console.log(token)
            const userID = jwt.verify(token, process.env.JWT_SECRET_KEY);
            req.user = await userModel.findbyId(userID).select('-password');
            next()
        }
        catch (err) {
            console.error(err)
            res.status(404).json({ "success": false, "messege": err.messege })
        }
    }
    else if (!token) {
        res.status(404).json({ "success": false, "messege": "Unauthorized user who has not token" })
    }
}
module.exports = checkUser