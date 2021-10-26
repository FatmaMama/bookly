const mongoose = require('mongoose');

const ConnectDB = () => {
    mongoose.connect(process.env.DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(con => {
        console.log(`connected DB with HOST: ${con.connection.host}`)
    })
}


module.exports = ConnectDB;