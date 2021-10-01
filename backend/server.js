const express = require ('express');
const app = express();
const dotenv = require('dotenv');
const ConnectDB = require('./config/database');
const errorMiddleware = require('./middlewares/errors');

app.use(express.json())

//set up config file
dotenv.config({ path: 'backend/config/config.env' });

//connect DB
ConnectDB();

//import all routes
const products = require('./routes/productRoutes');

app.use('/api/v1', products);
app.use(errorMiddleware)

app.listen(process.env.PORT, ()=> {
    console.log(`server running on port : ${process.env.PORT} in ${process.env.NODE_ENV} mode` )
})