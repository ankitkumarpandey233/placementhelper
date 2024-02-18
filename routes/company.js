const express = require('express')
const { dbPool } = require('../config/db')

const router = express.Router()

function requireAuth(req, res, next) {
  if (req.session && req.session.company ) {
    next();
  } else {
    res.redirect('/companyLogin');
  }
}

router.get('/company', requireAuth , (req, res) => {
    dbPool.query("SELECT * from applied where companyEmail = ? && next = 0",req.session.company,(err,data) => {
      if (err) {
        res.redirect("/companyLogin");
      }
      dbPool.query("SELECT * from applied where companyEmail = ? && next = 1",req.session.company,(err,results) => {
        if (err) {
          res.redirect("/companyLogin");
        }
        dbPool.query("SELECT * from rejected where companyEmail = ?",req.session.company,(err,rejected) => {
          if (err) {
            res.redirect("/companyLogin");
          }
          dbPool.query("SELECT * from selected where companyEmail = ? ",req.session.company,(err,selected) => {
            if (err) {
              res.redirect("/companyLogin");
            }
            dbPool.query("SELECT * from rejectedcompanies where companyEmail = ?",req.session.company,(err,rejectedcompanies) => {
              if (err) {
                res.redirect("/companyLogin");
              }
              res.render("company/company.ejs",{students: data , accepted: results , rejected: rejected , selected: selected , rejectedcompanies : rejectedcompanies});
            });
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
          res.redirect("/company");
        });

        
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
      dbPool.query("SELECT * FROM applied WHERE companyEmail = ? && next = 1", [req.session.company]  , (err, result) => {
        if (err) {
          res.redirect("/company");
        }
        let selectedStudents = [];
          for(var i = 0; i < result.length; i++){
            const selected ={
              studentEmail:result[i].studentEmail,
              studentName:result[i].studentName,
              companyEmail:result[i].companyEmail,
              companyName:result[i].companyName,
              studentEnrollment:result[i].studentEnrollment,
              package : result[i].package,
              selected:1,
              resume : result[i].resume
            };
            selectedStudents.push(selected);
          }
          const values = selectedStudents.map(student => [student.studentEmail, student.studentName, student.companyEmail, student.companyName, student.studentEnrollment, student.package, student.selected, student.resume]);

          // Use a single INSERT query to insert all selected students
          dbPool.query('INSERT INTO selected (studentEmail, studentName, companyEmail, companyName, studentEnrollment, package, selected, resume) VALUES ?', [values], (err, resu) => {
            if (err) {
              console.error('Error inserting data:', err);
              res.redirect("/company");
            }
            dbPool.query("DELETE FROM applied WHERE companyEmail = ? && next = 1",[req.session.company] , (err, re) => {
              if (err) {
                res.redirect("/company");
              }
              res.redirect("/company");
            });
          
          });
        
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