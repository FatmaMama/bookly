const express = require ('express');
const app = express();
const ConnectDB = require('./config/database');
const errorMiddleware = require('./middlewares/errors');
const cookieParser = require('cookie-parser');
const bodyparser = require('body-parser');
const cloudinary = require('cloudinary');
const fileUpload = require('express-fileupload');
const path = require('path')

app.use(express.json());
app.use(bodyparser.urlencoded({ extended : true }))
app.use(cookieParser());
app.use(fileUpload());


//Handle Uncaught Exceptions
process.on('uncaughtException', err => {
    console.log(`ERROR: ${err.message}`);
    console.log('Shutting down due to Uncaught Exception');
    process.exit(1)
});

//setup config file
if(process.env.NODE_ENV !== "PRODUCTION") require('dotenv').config({ path: 'backend/config/config.env' });


//connect DB
ConnectDB();

//setup cloudinary
cloudinary.config ({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

//import all routes
const products = require('./routes/productRoutes');
const user = require('./routes/userRoutes');
const order = require('./routes/orderRoutes');

app.use('/api/v1', products);
app.use('/api/v1', user);
app.use('/api/v1', order);

//To Deploy
if(process.env.NODE_ENV === "PRODUCTION"){
    app.use(express.static(path.join(__dirname, '../frontend/build')))

    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'))
    })
}

app.use(errorMiddleware);

const server = app.listen(process.env.PORT, ()=> {
    console.log(`server running on port : ${process.env.PORT} in ${process.env.NODE_ENV} mode` )
})

// Handle Unhandled Promise Rejections
process.on('unhandledRejection', (err) => {
    console.log(`ERROR: ${err.message}`);
    console.log('Shutting down the server due to Unhandled Promise Rejections');
    server.close(()=> process.exit(1))
})