// admin.js
const express = require('express');
const bcrypt = require('bcrypt');
const dataModel = require('../models/dataModel');

const router = express.Router();


router.get('/stats', async (req, res) => {
  try {

    const Data = await dataModel.getData();
    res.json('data.ejs', {
      Data: Data
    });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.redirect('/');
  }
});

router

module.exports = router;
