const app = require("./app");
const express = require('express');
const path = require('path');
require('dotenv').config({path: 'backend/config/config.env'})
const cloudinary = require("cloudinary")
const connectToMongo = require('./db');
app.use(express.static(path.join(__dirname, 'build')));

//handling uncaught -- if by mistake type something that does not exist -- should be defined on top
process.on('uncaughtException', (err) => {
    console.log(err.message);
    console.log('server is shutting down!')
    process.exit(1)
});

app.use(express.static(path.join(__dirname, '../frontend/build')))
app.get('/*', (req, res) => {
    res.cookie('token');
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'),
        // res.sendFile(path.join(__dirname, './frontend/build', 'index.html'),
        function (err) {
            res.status(500).send(err)
        });
});

//connectiong to database
connectToMongo();

// let port = process.env.PORT;
// if (port == null || port == "") {
//   port = 3000;
// }

// connectToMongo().then(() => {
//   app.listen(port, () => {
//       console.log("listening for requests");
//   })
// });
const server = app.listen(5000, ()=>{console.log(`Server is running on port 5000`)});

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
})

//respond to get request
// app.get('/',(req,res) => {
//     res.send("Hello! ManSe is working now!");
//     res.cookie('token');

// })

// Unhandled Promise Rejection -- by mistake any error in mongouri it will handle or any promise that is not handled!
process.on('unhandledRejection',(err) => {
    console.log(err.message);
    console.log('shutting down the server!');

    server.close(() => {
        process.exit(1);
    });
});