const mongoose = require('mongoose');
require('dotenv').config({path: 'backend/config/config.env'})

const mongoURI = process.env.MONGO_URI;
console.log(mongoURI)
const connectToMongo = () => {
    mongoose.connect(mongoURI,{
        useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Connected to Mongo Successfully!");
    });
}
module.exports = connectToMongo;
//import in server.js
