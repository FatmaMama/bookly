const express = require ('express');
const app = express();
const dotenv = require('dotenv');
const ConnectDB = require('./config/database');
const errorMiddleware = require('./middlewares/errors');

app.use(express.json())

//Handle Uncaught Exceptions
process.on('uncaughtException', err => {
    console.log(`ERROR: ${err.message}`);
    console.log('Shutting down due to Uncaught Exception');
    process.exit(1)
});

//set up config file
dotenv.config({ path: 'backend/config/config.env' });

//connect DB
ConnectDB();

//import all routes
const products = require('./routes/productRoutes');

app.use('/api/v1', products);
app.use(errorMiddleware)

const server = app.listen(process.env.PORT, ()=> {
    console.log(`server running on port : ${process.env.PORT} in ${process.env.NODE_ENV} mode` )
})

//Handle Unhandled Promise Rejections
process.on('unhandledRejection', (err) => {
    console.log(`ERROR: ${err.message}`);
    console.log('Shutting down the server due to Unhandled Promise Rejections');
    server.close(()=> process.exit(1))
})