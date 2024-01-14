const express = require('express')
const {dbPool} = require('../config/db')
const bcrypt = require('bcrypt');
const studentModel = require('../models/studentModel');

const router = express.Router()

function requireAuth(req, res, next) {
    if (req.session && req.session.username) {
      next();
    } else {
      res.redirect('/');
    }
  }
  
router.get('/students', requireAuth , async (req, res) => {
  
  try {
    const results = await studentModel.findStudentByEmail(req.session.username);

    const [eligibleCompanies, notEligibleCompanies, pastDeadlineCompanies, appliedCompanies, rejectedCompanies, notice] = await Promise.all([
      studentModel.getCompaniesForStudent(req.session.username),
      studentModel.getCompaniesNotEligibleForStudent(req.session.username),
      studentModel.getCompaniesPastDeadlinesForStudent(),
      studentModel.getStudentAppliedCompanies(req.session.username),
      studentModel.getStudentRejectedCompanies(req.session.username),
      studentModel.getNotice(),
    ]);

    let cStudent = appliedCompanies.map((c) => c.companyName);
    let sCompany = rejectedCompanies.map((co) => co.companyName);

    if (cStudent.length !== 0) {
      const comp = await studentModel.getCompaniesByName(cStudent);
      if (comp !== undefined) {
        cStudent = comp;
      }
    }

    res.render("student/studentDashboard.ejs", {
      student: results,
      companies: eligibleCompanies,
      companiesNot: notEligibleCompanies,
      companyPast: pastDeadlineCompanies,
      cStudent: cStudent,
      sCompany: sCompany,
      notice: notice,
    });
  } catch (error) {
    console.error('Error:', error);
    res.redirect("/students");
  }
  });
  
  
  
router.post("/applied/:email", async function(req, res)
  {   
    try {
      await studentModel.applyToCompany(req.session.username, req.params.email);
      res.redirect("/students");
    } catch (error) { 
      console.error('Error:', error);
      res.redirect("/students");
    }
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