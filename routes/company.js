const express = require('express')
const {dbPool} = require('../database/db')
const bcrypt = require('bcrypt');

const router = express.Router()

router.get('/company', (req, res) => {
    dbPool.query("SELECT * from applied where companyEmail = ? && next = 0",req.session.company,(err,data) => {
      if (err) {
        res.redirect("/cLogin");
      }
      dbPool.query("SELECT * from applied where companyEmail = ? && next = 1",req.session.company,(err,results) => {
        if (err) {
          res.redirect("/cLogin");
        }
        dbPool.query("SELECT * from rejected where companyEmail = ?",req.session.company,(err,rejected) => {
          if (err) {
            res.redirect("/cLogin");
          }
          dbPool.query("SELECT * from applied where companyEmail = ? && selected = 1",req.session.company,(err,selected) => {
            if (err) {
              res.redirect("/cLogin");
            }
            res.render("company/company.ejs",{students: data , accepted: results , rejected: rejected , selected: selected});
          });
        });
      });
    });
  });

router.post("/accepted/:email", function(req, res)
{   
    dbPool.query("UPDATE applied SET ? WHERE companyEmail = ? && studentEmail = ?",[{next: 1}, req.session.company, req.params.email] , (err, results) => {
        if (err) {
          res.redirect("/company");
        }
        dbPool.query("SELECT * FROM companies WHERE email = ?",[req.session.company] , (err, resu) => {
          if (err) {
            res.redirect("/company");
          }
            const mailOptions = {
              from: 'turbogeek641@gmail.com',
              to: req.params.email,
              subject: 'Hello',
              text: `You have been accepted for the next round in ${resu[0].name}`
            };
          
            transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                  console.log('Error sending email: ' + error);
              } else {
                  console.log('Email sent: ' + info.response);
              }
          });
        });

        res.redirect("/company");
    });
});

router.post("/rejected/:email", function(req, res)
{   
  dbPool.query("SELECT * from applied where companyEmail = ? && studentEmail = ?",[ req.session.company, req.params.email], (err, results) => {
    if (err) {
      res.redirect("/");
    }
    const applied1 ={
      studentEmail:results[0].studentEmail,
      studentName:results[0].studentName,
      companyEmail:results[0].companyEmail,
      companyName:results[0].companyName,
      round:results[0].round
    };
    const mailOptions = {
      from: 'turbogeek641@gmail.com',
      to: req.params.email,
      subject: 'Hello',
      text: `You have been rejected for the next round in ${results[0].companyName}`
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          console.log('Error sending email: ' + error);
      } else {
          console.log('Email sent: ' + info.response);
      }
    });
    dbPool.query('INSERT INTO rejected SET ?', applied1, (err, result) => {
      if (err) {
        console.error('Error inserting data:', err);
        res.redirect("/");
      }
    
      dbPool.query("DELETE FROM applied WHERE companyEmail = ? && studentEmail = ?",[ req.session.company, req.params.email] , (err, results) => {
        if (err) {
          res.redirect("/");
        }
        res.redirect("/company");
      });
    }); 
});
});

router.post("/selected", function(req, res)
{   

    dbPool.query('UPDATE applied SET ? WHERE companyEmail = ? && next = 1',[{selected : 1},req.session.company] , (err, results) => {
      if (err) {
        res.redirect("/company");
      }

      dbPool.query("SELECT * FROM applied WHERE companyEmail = ? && selected = 1",[req.session.company]  , (err, resu) => {
        if (err) {
          res.redirect("/company");
        }

        for(var i = 0; i<resu.length; i++)
        {
          const mailOptions = {
            from: 'turbogeek641@gmail.com',
            to: resu[i].studentEmail,
            subject: 'Hello',
            text: `congratulatins, You have been selected for ${resu[i].companyName}`
          };
        
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Error sending email: ' + error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
      }
      });

      res.redirect("/company");
    });
});

router.post('/next', (req, res) => {
    dbPool.query("SELECT * from companies where email = ?",req.session.company, (err, results) => {
        if (err) {
        res.redirect("/");
        }

        dbPool.query("UPDATE companies SET ? WHERE email = ?",[{round: results[0].round+1}, req.session.company] , (err, result) => {
            if (err) {
                res.redirect("/company");
            }

            dbPool.query("UPDATE applied SET ? WHERE companyEmail = ?",[{round: results[0].round+1, next: 0}, req.session.company] , (err, resul) => {
                if (err) {
                res.redirect("/company");
                }
                res.redirect("/company");
            });
        });
    });
});

module.exports = router