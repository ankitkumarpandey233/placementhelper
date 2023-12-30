const express = require('express')
const {dbPool} = require('../database/db')
const bcrypt = require('bcrypt');

const router = express.Router()

router.get('/admin', (req, res) => {
    dbPool.query('SELECT * FROM student WHERE allow = 0', (err, student) => {
      if (err) {
        res.redirect("/");
      }
        dbPool.query('SELECT * FROM student WHERE allow = 1', (err, verified) => {
          if (err) {
            res.redirect("/");
          }
  
          dbPool.query('SELECT * FROM companies', (err, companies) => {
            if (err) {
              res.redirect("/");
            }
            dbPool.query('SELECT * FROM notice', (err, notice) => {
              if (err) {
                res.redirect("/");
              }
            res.render("admin/index.ejs" , {student : student, verified : verified , companies: companies , notice: notice});
            });
          });
      });
    });
  });

  




router.get('/aLogin', (req, res) => {
    res.render('aLogin.ejs');
  });
  
router.post("/aLogin",(req,res) => {
  
    dbPool.query("SELECT * from admin where email = ?" , req.body.email , (err,result) => {
      if (err) {
        res.redirect("/aLogin");
      }
    
      if(result.length === 0)
      {
        res.redirect("/aLogin")
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
            res.redirect("/admin");
          } 
          else {
            console.log('Password does not match');
            res.redirect("/aLogin");
          }
        });
      }
      });
  });
  
router.post('/aRegister', (req, res) => {
  
    const plainPassword = req.body.password;
    const saltRounds = 10;
  
  
    bcrypt.hash(plainPassword, saltRounds, (err, hashedPassword) => {
      if (err) {
        console.error('Error hashing password:', err);
        return;
      }
      
      const admin1 ={
        email: req.body.email,
        password: hashedPassword,
      };
  
      dbPool.query('INSERT INTO admin SET ?', admin1, (err, result) => {
        if (err) {
          console.error('Error inserting data:', err);
          res.redirect("/");
        }
        console.log('Data inserted successfully!');
        res.redirect("/admin")
      });  
    
    });
  });
  

  module.exports = router