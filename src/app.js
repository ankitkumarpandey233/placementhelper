const express = require("express");
const bodyParser = require("body-parser");
const ejs = require('ejs');
const mysql = require("mysql");
const bcrypt = require('bcrypt');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
var cookieParser = require('cookie-parser');
const nocache = require('nocache');
const multer = require('multer');
const nodemailer = require('nodemailer');
const env = require('dotenv');

const app = express();

app.use(nocache());

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

require('dotenv').config()

//database connection
const con ={
  host : "localhost",
  user : "root",
  password:"",
  database: "college"
}

app.use(cookieParser());

//pool creation 
const dbPool = mysql.createPool(con);

// Create a MySQL session store
const sessionStore = new MySQLStore({
  expiration: 8640000, // Session expiration time in milliseconds (e.g., 1 day)
  createDatabaseTable: true, // Create the session table if it doesn't exist
}, dbPool);

// Configure session middleware
app.use(session({
  key: 'user_sid',
  secret: 'your_session_secret',
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
}));


// const transporter = nodemailer.createTransport({
//   service: 'Gmail',
//   auth: {
//       user: 'turbogeek641@gmail.com',
//       pass: 'vcle vjly tzln yznv'
//   }
// });


const homeRouter = require('../routes/home')

app.use(homeRouter)


const adminRouter = require('../routes/admin')

app.use(adminRouter)


const companyRouter = require('../routes/company')

app.use(companyRouter)

const companyloginRouter = require('../routes/companylogin')

app.use(companyloginRouter)



const studentRouter = require('../routes/student')

app.use(studentRouter)

const studentloginRouter = require('../routes/studentlogin')

app.use(studentloginRouter)

const studentAdminRouter = require('../routes/studentAdmin')

app.use(studentAdminRouter)



const errorRouter = require('../routes/404')

app.use(errorRouter)



const port = process.env.PORT || 5000
app.listen(port, function() {
    console.log(`Server running at ${port}`);
});