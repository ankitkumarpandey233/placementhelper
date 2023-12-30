const mysql = require("mysql")
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

const con ={
    host : "localhost",
    user : "root",
    password:"",
    database: "college"
  }
  
  //pool creation 
  const dbPool = mysql.createPool(con);
  
  // Create a MySQL session store
  const sessionStore = new MySQLStore({
    expiration: 8640000, // Session expiration time in milliseconds (e.g., 1 day)
    createDatabaseTable: true, // Create the session table if it doesn't exist
  }, dbPool);

  module.exports.dbPool = dbPool