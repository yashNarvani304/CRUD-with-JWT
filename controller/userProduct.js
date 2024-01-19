const Product = require("../model/Product.js")
const User = require("../model/userSchema.js")
const bcrypt = require("bcrypt");
const fs = require("fs");
const mongoose = require('mongoose');
// const productSetup = require("../views/");
// const securePassword = async (req, res, next) => {
//     try {
//         const hashPassword = bcrypt.hash(password, 10);
//     } catch (error) {
//         console.error(error.message);
//         // res.send({message: error.message});
//     }
// }
const addProduct = async (req, res) => {
    // console.log("Creating Product", Product)
    // const {Name, email, mobile, password, confirmPassword} = req.params
    try {
        var product = await Product.find()


        console.log(product.length + " product")
        // res.render('productSetup')
        fs.readFile('./views/productSetup.html', 'utf8', (err, data) => {
            if (err) {
                console.error("err")
                console.error(err);
                res.status(500).send('Internal Server Error');
            } else {
                // res.setHeader('Content-Type', 'text/html');
                res.send(data);
                // res.redirect(`/login`)
            }
        });
        // res.render("productSetup.html")
        // console.log("Product")

    } catch (error) {
        console.log(error)
    }

}

const admin = async (req, res) => {
    try {
        fs.readFile('./views/userLogin.html', 'utf8', (err, data) => {
            if (err) {
                console.error("err")
                console.error(err);
                res.status(500).send('Internal Server Error');
            } else {
                // res.setHeader('Content-Type', 'text/html');
                res.send(data);
            }
        });
    } catch (error) {
        console.log(error)
    }
};

const userLogin = async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log(req.body)
        const user = await User.findOne({ $or: [{ email: username }, { mobile: username }] });
        console.log(user)
        if (!user) {
            res.status(500).json({ message: "You don't have any account plz registerd first." })
        }
        else {
            if (username && password) {
                const imatch = await bcrypt.compare(password, user.password)
                if (imatch) {
                    res.status(200).json({ message: "success" })
                }
                else {
                    res.status(404).json({ message: "password or username incorrect" })
                }
            }
            else {
                res.status(404).json({ message: "plz fill this all details" })
            }

        }
    } catch (error) {
        console.log(error);
    }
    // res.send("Login")
}
const setupSave = async (req, res) => {

    const { name, email, mobile, password, confirmPassword, product_title, description, filename } = req.body;
    const user = await User.find({ email: email, mobile: mobile })

    if (user && user.length > 0) {
        console.log("hii")
        try {
            res.redirect('/login')
        } catch (error) {
            console.log(error)
        }
        // console.log(user)

        // res.write({ success: false, message: 'You already have an account plz login' })

        // res.redirect('/login')
    }
    else {
        console.log("hello")
        try {
            if (name && email && mobile && password && confirmPassword) {
                if (password === confirmPassword) {

                    const userPassword = req.body.password
                    const salt = await bcrypt.genSalt(10)
                    const hashPassword = await bcrypt.hash(userPassword, salt);
                    const product_title = req.body.product_title
                    const product_image = req.body.filename;
                    const description = req.body.description;
                    const email = req.body.email;
                    const name = req.body.name;
                    const password = hashPassword;
                    // console.log(password)

                    const product = new Product({
                        product_title: product_title,
                        product_logo: product_image,
                        description: description,

                    });

                    if (product.length > 0) {
                        await product.save()
                    }
                    const userRegistration = new User({
                        name: name,
                        email: email,
                        mobile: mobile,
                        password: password,
                        is_admin: 1,

                    });

                    const userData = await userRegistration.save();

                    // console.log("userdata", userData)
                    if (userData) {
                        console.log(userData, "user registration")
                        res.redirect('/login');
                        res.write({ "message": "uploaded successfully" })
                        res.end()
                    }
                    else {
                        console.log("error")
                        res.render('/admin', { message: 'not found' })
                    }

                }
                else {
                    res.send({ success: false, message: 'password and confirm password not matched' })
                }
            } else {
                res.send({ success: false, message: 'plz fill the required data' })
            }

        }
        catch (error) {
            console.error(error)
        }
    }


}


module.exports = { addProduct, admin, userLogin, setupSave }