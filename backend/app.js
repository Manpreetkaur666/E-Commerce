const express = require('express');
var cookieParser = require('cookie-parser')
let cors = require("cors");
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const app = express();

const middlewareError = require('./middleware/error');

app.use(express.json());
app.use(cookieParser());
// app.use(cors());
// app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
//importing routes
app.use("/api/v1", require('./routes/productRoute'))
app.use("/api/v1", require('./routes/userRoute'))
app.use("/api/v1", require('./routes/orderRoute'))
app.use("/api/v1", require('./routes/paymentRoute'))
app.use(middlewareError);


module.exports  = app

//import in server.js
