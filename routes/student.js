const express = require('express')
const {dbPool} = require('../database/db')
const bcrypt = require('bcrypt');

const router = express.Router()

function requireAuth(req, res, next) {
    if (req.session && req.session.username) {
      next();
    } else {
      res.redirect('/');
    }
  }
  
router.get('/students', requireAuth ,(req, res) => {
  
        dbPool.query('SELECT * FROM student WHERE email = ?', req.session.username , (err, results) => {
          if (err) {
            console.error('Error querying the database:', err);
          }
          var current = new Date();
          dbPool.query('SELECT * FROM companies WHERE cgpa <= ? AND marks10 <= ? AND marks12 <= ? AND startingDate <= ? AND endingDate >= ?', [results[0].cgpa , results[0].marks10 , results[0].marks12 , current , current], (err, company) => {
            if (err) {
              res.redirect("/");
            }
              dbPool.query('SELECT * FROM companies WHERE (cgpa > ? OR marks10 > ? OR marks12 > ?) AND startingDate <= ? AND endingDate >= ?', [results[0].cgpa , results[0].marks10 , results[0].marks12 , current , current], (err, companyNot) => {
                if (err) {
                  res.redirect("/");
                }
                dbPool.query('SELECT * FROM companies WHERE  startingDate > ? OR endingDate < ?', [ current , current], (err, companyPast) => {
                if (err) {
                  res.redirect("/");
                }
                dbPool.query('SELECT * FROM notice', (err, notice) => {
                  if (err) {
                    res.redirect("/");
                  }
                dbPool.query('SELECT * FROM applied WHERE studentEmail = ?',req.session.username , (err, c) => {
                  if (err) {
                    res.redirect("/");
                  }
                  var cStudent = [];
                  for(var i=0; i<c.length; i++)
                  {
                    cStudent.push(c[i].companyName);
                  }
                  dbPool.query('SELECT * FROM rejected WHERE studentEmail = ?',req.session.username , (err, co) => {
                    if (err) {
                      res.redirect("/");
                    }
                    var sCompany = [];
                    for(var i=0; i<co.length; i++)
                    {
                      sCompany.push(co[i].companyName);
                    }
  
                    // console.log(sCompany);                
  
                  if(cStudent.length != 0)
                  {
                    dbPool.query('SELECT * FROM companies WHERE name IN (?)', [cStudent] , (err, comp) => {
                      if (err) {
                        res.redirect("/");
                      }
                      if(comp != undefined)
                      {
                        cStudent = comp;
                      }
                        
  
                      res.render("studentD.ejs" , {student: results , companies : company , companiesNot : companyNot , companyPast: companyPast , cStudent: cStudent , notice: notice , sCompany: sCompany});   
                    });
                  }
                  else{
                    res.render("studentD.ejs" , {student: results , companies : company , companiesNot : companyNot , companyPast: companyPast , cStudent: cStudent , sCompany: sCompany , notice: notice});
                  }
                });
                });
              });
              });
              });
          });
      });
  });
  
  
  
router.post("/applied/:email", function(req, res)
  {   
    dbPool.query('SELECT * FROM student WHERE email = ?', req.session.username , (err, results) => {
      if (err) {
        res.redirect("/students");
      }
      
      dbPool.query('SELECT * FROM companies WHERE email = ?', req.params.email , (err, compan) => {
        if (err) {
          res.redirect("/students");
        }
        const applied1 = {
          studentEmail : req.session.username,
          studentName : results[0].name,
          companyEmail : compan[0].email,
          companyName : compan[0].name,
          studentEnrollment : results[0].enrollment
        };
  
        dbPool.query('INSERT INTO applied SET ?', applied1 , (err, result) => {
          if (err) {
            res.redirect("/");
          }
          res.redirect("/students");
        });
      });
    });
  });


  
router.post('/updatePassword', (req, res) => {

    const email = req.session.username; 
  
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;
  
    dbPool.query('SELECT * FROM student WHERE email = ?', [email], (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
      }
  
      bcrypt.compare(oldPassword, results[0].password, (err, passwordMatch) => {
        if (err) {
        console.log('Error comparing passwords:', err);
          return;
        }
  
        if (passwordMatch) 
        {
          const saltRounds = 10;
          bcrypt.hash(newPassword, saltRounds, (err, hashedPassword) => {
            if (err) {
              console.error('Error hashing password:', err);
              return;
            }
            dbPool.query('UPDATE student SET password = ? WHERE email = ?', [hashedPassword, email], (err) => {
              if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Internal server error' });
              }
              //SHOW student that password has been updated
              res.status(200).json({ message: 'Password updated successfully' });
            });
        });
         
        } 
        else {
          console.log('Password does not match');
          res.redirect("/students");
        }
    });
    });
  });
  
  

module.exports = router