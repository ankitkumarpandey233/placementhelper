// admin.js
const express = require('express');
const bcrypt = require('bcrypt');
const adminModel = require('../models/adminModel');

const router = express.Router();

function requireAuth(req, res, next) {
  if (req.session && req.session.admin) {
    next();
  } else {
    res.redirect('/adminLogin');
  }
}

router.get('/admin',requireAuth,async (req, res) => {
  try {
    const unverifiedStudents = await adminModel.getUnverifiedStudents();
    const verifiedStudents = await adminModel.getVerifiedStudents();
    const companies = await adminModel.getCompanies();
    const notices = await adminModel.getNotices();
    const placed = await adminModel.placedStudent();

    res.render('admin/index.ejs', {
      student: unverifiedStudents,
      verified: verifiedStudents,
      companies: companies,
      notice: notices,
      placed: placed
    });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.redirect('/');
  }
});

router.get('/adminLogin', (req, res) => {
  res.render('admin/adminLogin.ejs');
});

router.post('/adminLogin', async (req, res) => {
  try {
    const admin = await adminModel.getAdminByEmail(req.body.email);

    if (admin.length === 0) {
      return res.redirect('/adminLogin');
    }

    bcrypt.compare(req.body.password, admin[0].password, (err, passwordMatch) => {
      if (err || !passwordMatch) {
        console.log('Error comparing passwords or password does not match');
        return res.redirect('/adminLogin');
      }

      req.session.admin = req.body.email;
      res.redirect('/admin');
    });
  } catch (error) {
    console.error('Error fetching admin:', error);
    res.redirect('/adminLogin');
  }
});

router.post('/adminRegister', async (req, res) => {
  const plainPassword = req.body.password;
  const saltRounds = 10;

  try {
    const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
    const adminData = {
      email: req.body.email,
      password: hashedPassword,
    };

    await adminModel.insertAdmin(adminData);

    console.log('Data inserted successfully!');
    res.redirect('/admin');
  } catch (error) {
    console.error('Error inserting data:', error);
    res.redirect('/');
  }
});

router.get('/logoutAdmin', (req, res) => {
  // Destroy the session
  req.session.destroy((err) => {
    if (err) {
      
      console.log('Error ending session:', err);
    }
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    res.clearCookie('user_sid');
    res.redirect('/adminLogin');
  });
});

module.exports = router;
