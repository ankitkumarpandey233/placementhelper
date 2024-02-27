const express = require('express')
const {dbPool} = require('../config/db')
const ExcelJS = require('exceljs');
const flash = require('connect-flash')
const multer = require('multer');
const bcrypt = require('bcrypt');
const router = express.Router()


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads/'); 
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage, });
router.post('/Notice', (req, res) => {
    const notice1 ={
      title : req.body.title,
      notice : req.body.notice
    };
  
    dbPool.query('INSERT INTO notice SET ?', notice1, (err, result) => {
      if (err) {
        console.error('Error inserting data:', err);
        res.redirect("/");
      }
      flash('success_msg', 'Notice added successfully')
      console.log('Data inserted successfully!');
      res.redirect("/admin")
    });  
  });

  router.get('/download/:companyName', (req, res) => {
    const companyName = req.params.companyName;
  
    const query = `SELECT * FROM applied WHERE companyName = ?`;
  
    dbPool.query(query, [companyName], (err, results) => {
      if (err) {
        console.error('Error fetching data:', err);
        res.status(500).send('Internal Server Error');
        return;
      }
  
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Applications');
  
      worksheet.columns = [
        { header: 'Student Email', key: 'studentEmail', width: 20 },
        { header: 'Student Name', key: 'studentName', width: 20 },
        { header: 'Company Email', key: 'companyEmail', width: 20 },
        { header: 'Company Name', key: 'companyName', width: 20 },
        { header: 'Student Enrollment', key: 'studentEnrollment', width: 20 },
        { header: 'Next Round', key: 'next', width: 20 },
        { header: 'Round Selected', key: 'selected', width: 20 },
      ];
  
      results.forEach((result) => {
        worksheet.addRow(result);
      });
  
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', `attachment; filename=${companyName}_applications.xlsx`);
  
      // Pipe the workbook to the response
      workbook.xlsx.write(res).then(() => {
        res.end();
      });
    });
  });

  router.get('/download-verified-student/', (req, res) => {
  
    const query = `SELECT name, email, enrollment FROM student WHERE allow = 1`;
  
    dbPool.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching data:', err);
        res.status(500).send('Internal Server Error');
        return;
      }
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Applications');
  
      worksheet.columns = [
        { header: 'Student Name', key: 'name', width: 20 },
        { header: 'Student Email', key: 'email', width: 20 },
        { header: 'Student Enrollment', key: 'enrollment', width: 20 },
      ];
  
      results.forEach((result) => {
        worksheet.addRow(result);
      });
  
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', `attachment; filename=Verified_Student_data.xlsx`);
  
      // Pipe the workbook to the response
      workbook.xlsx.write(res).then(() => {
        res.end();
      });
    });
  });

  router.post('/importCompany', upload.single('file'), (req, res) => {
    try {
      const filePath = req.file?.path;
  
      if (!filePath) {
        console.error('Invalid or empty file path.');
        res.status(400).send('Bad Request');
        return;
      }
  
      const workbook = new ExcelJS.Workbook();
      workbook.xlsx.readFile(filePath)
        .then(() => {
  
          workbook.eachSheet((sheet, sheetId) => {
            const headers = sheet.getRow(1).values;
            const saltRounds = 10;
            for (let i = 2; i <= sheet.rowCount; i++) {
              const row = sheet.getRow(i).values;
  
              const rowData = {};
              headers.forEach((header, index) => {
                rowData[header] = row[index];
              });
  
                  dbPool.query('INSERT INTO studentplacement SET ?', rowData, (dbErr, results) => {
                    if (dbErr) {
                      console.error('Error inserting data into the database:', dbErr);
                    } else {
                      console.log('Data inserted into the database successfully!');
                    }
                  });
            }
          });
  
          res.send('File uploaded, and data inserted into the database!');
        })
        .catch((err) => {
          console.error('Error loading Excel file:', err);
          res.status(500).send('Internal Server Error');
        });
    } catch (err) {
      console.error('Error handling file upload:', err);
      res.status(500).send('Internal Server Error');
    }
  });
  

module.exports = router