const express = require('express')
const {dbPool} = require('../database/db')
const bcrypt = require('bcrypt');

const router = express.Router()

// login
  
router.get('/cLogin', (req, res) => {
    res.render('cLogin.ejs');
  });
  
router.post("/cLogin",(req,res) => {
  
    dbPool.query("SELECT * from companies where email = ?" , req.body.email , (err,result) => {
      if (err) {
        res.redirect("/cLogin");
      }
    
      if(result.length === 0)
      {
        res.redirect("/cLogin")
      }
      else
      {
        bcrypt.compare(req.body.password , result[0].password, (err, passwordMatch) => {
          if (err) {
            console.log('Error comparing passwords:', err);
            res.redirect("/cLogin");
          }
          
          if (passwordMatch) 
          {
            req.session.company = req.body.email;
            res.redirect("/company");
          } 
          else {
            console.log('Password does not match');
            res.redirect("/cLogin");
          }
        });
      }
      });
  });
  // register from admin dashboard

router.post('/cRegister', (req, res) => {

    const plainPassword = req.body.password;
    const saltRounds = 10;
  
  
    bcrypt.hash(plainPassword, saltRounds, (err, hashedPassword) => {
      if (err) {
        console.error('Error hashing password:', err);
        return;
      }
      const company1 ={
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        marks10: req.body.marks10,
        marks12 : req.body.marks12,
        cgpa : req.body.cgpa,
        description : req.body.description,
        location : req.body.location,
        package : req.body.package,
        startingDate	: req.body.startingDate,
        endingDate	: req.body.endingDate
      };
      dbPool.query('INSERT INTO companies SET ?', company1, (err, result) => {
        if (err) {
          console.error('Error inserting data:', err);
          res.redirect("/");
        }
        req.flash('success_msg', 'Company Data inserted successfully!')
        console.log('Data inserted successfully!');
        res.redirect("/admin")
      });  
    
    });
  });


  module.exports = router