const express = require('express')
const {dbPool} = require('../database/db')

const router = express.Router()


router.post("/accept/:email", function(req, res)
{   
    dbPool.query('UPDATE student SET ? WHERE email = ?', [{allow : 1} , req.params.email] , (err, results) => {
      if (err) {
        res.redirect("/");
      }
      const mailOptions = {
        from: 'turbogeek641@gmail.com',
        to: req.params.email,
        subject: 'Hello, regarding ',
        text: `registration has been accepted you can now register in placement helper GUIN`
      };
    
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending email: ' + error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

      res.redirect("/admin");
  });
});

router.post("/reject/:email", function(req, res)
{   
    dbPool.query('DELETE FROM student WHERE email = ?', req.params.email , (err, results) => {
      if (err) {
        res.redirect("/");
      }

      const mailOptions = {
        from: 'turbogeek641@gmail.com',
        to: req.params.email,
        subject: 'Hello, regarding registration',
        text: `Your registration has been rejected you have to register again in placement helper GUIN`
      };
    
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending email: ' + error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

      res.redirect("/admin");
  });
});

module.exports = router