const mongoose = require('mongoose');

const ConnectDB = () => {
    mongoose.connect(process.env.DB_LOCAL_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(con => {
        console.log(`Mongodb db connected with HOST: ${con.connection.host}`)
    })
}

module.exports = ConnectDB;