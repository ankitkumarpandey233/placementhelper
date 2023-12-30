const express = require('express')
const fs = require('fs')
const path = require('path');
const multer = require('multer');

const router = express.Router()

const {dbPool} = require('../config/db')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads/'); 
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  });
  
const upload = multer({ storage: storage, });

router.get('/download-resume/:resumePath', (req, res) => {
    const file = req.params.resumePath;
    console.log(file);
    const resumeFilePath = path.join('./public/uploads/', file);
    console.log(resumeFilePath);
    if (!fs.existsSync(resumeFilePath)) {
      res.status(404).send('The resume file does not exist.');
      return;
    }
  
    res.set({
      'Content-Type': 'application/octet-stream',
      'Content-Disposition': `attachment; filename=${file}`,
    });
  
    res.download(resumeFilePath);
  });
  
// in student dashboard
  router.post('/updateResume', upload.single('resume'), (req, res) => {
    const email = req.session.username; 
  
    dbPool.query('UPDATE student SET resume = ? WHERE email = ?', [req.file.filename, email], (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      //SHOW student that Resume has been updated
      res.status(200).json({ message: 'Resume updated successfully' });
    });
  });
module.exports = router