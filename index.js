const dotenv = require('dotenv');
dotenv.config();
const express = require('express')
const connectDB = require("./config/db.config.js")
const app = express()
const port = process.env.PORT
const DATABASE_URL = process.env.DATABASE_URL
app.use(express.json())
const isProduct = require('./middleware/productMiddleware.js')
app.use(isProduct.isProduct)
const Routes = require('./Routes/userRoutes.js')
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

var option = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'node js API projects',
            version: "1.0.0",
        },
        servers: [
            {
                url: "http://localhost:3000/"
            }
        ]
    },
    apis:['./index.js']
}

const swaggerSpec = swaggerJSDoc(option)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
// ...
app.set('view eng4ine', 'ejs')
// Add your routes before the error handling middleware
app.use('/', Routes)

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err);
    // Set an appropriate status code based on the error
    const statusCode = err.status || 500;
    // Send an error response with a meaningful message
    res.status(statusCode).json({
        error: err.message || 'Internal Server Error',
    });
});
// ...

connectDB(DATABASE_URL)
app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
})
