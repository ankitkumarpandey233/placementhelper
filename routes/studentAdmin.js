const express = require('express')
const {dbPool} = require('../config/db')

const router = express.Router()


router.post("/accept/:email", function(req, res)
{   
    dbPool.query('UPDATE student SET ? WHERE email = ?', [{allow : 1} , req.params.email] , (err, results) => {
      if (err) {
        res.redirect("/");
      }
    


      res.redirect("/admin");
  });
});

router.post("/reject/:email", function(req, res)
{   
    dbPool.query('DELETE FROM student WHERE email = ?', req.params.email , (err, results) => {
      if (err) {
        res.redirect("/");
      }

      res.redirect("/admin");
  });
});

module.exports = router