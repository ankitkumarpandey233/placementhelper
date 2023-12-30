// admin.js
const express = require('express');
const bcrypt = require('bcrypt');
const adminModel = require('../models/adminModel');

const router = express.Router();

router.get('/admin', async (req, res) => {
  try {
    const unverifiedStudents = await adminModel.getUnverifiedStudents();
    const verifiedStudents = await adminModel.getVerifiedStudents();
    const companies = await adminModel.getCompanies();
    const notices = await adminModel.getNotices();

    res.render('admin/index.ejs', {
      student: unverifiedStudents,
      verified: verifiedStudents,
      companies: companies,
      notice: notices,
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

      req.session.company = req.body.email;
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

module.exports = router;
