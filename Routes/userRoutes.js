const express = require('express');
const server = express();
const bodyParser = require('body-parser');
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.set("view engine", "ejs");
server.set("views", "./views");

const multer = require('multer');
const path = require('path');

server.use(express.static("public"))
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log('destination', __dirname);
        const filePath = path.join(__dirname, 'views', 'productSetup.html');
        res.sendFile(filePath);
        console.log('directory', filePath)
    },
    filename: function (req, file, cb) {
        // console.log('filename', file.originalname)
        const name = Date.now() + '-' + file.originalname;
        cb(null, name);
    }
});

const storag = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log('destination', __dirname);
        const filePath = path.join(__dirname, 'views', 'userLogin.html');
        res.sendFile(filePath);
        console.log('directory', filePath)
    },
    filename: function (req, file, cb) {
        // console.log('filename', file.originalname)
        const name = Date.now() + '-' + file.originalname;
        cb(null, name);
    }
});


// console.log('storage', storage);
// const upload = multer({ storage: storage });

const upload = multer({ storage: storage });
const uploa = multer({ storage: storag });
// console.log("upload", upload)
const userProduct = require('../controller/userProduct.js');
const sendData = require('../controller/sendData.js');

server.get('/admin', userProduct.addProduct);

server.get('/login', userProduct.admin);
// server.get('/data', sendData.data);
server.post('/admin', upload.single('ProductImage'), userProduct.setupSave)
server.post('/login', uploa.single('userLogin'), userProduct.userLogin)
module.exports = server
