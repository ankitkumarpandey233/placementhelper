const express = require('express')
const {dbPool} = require('../database/db')
const bcrypt = require('bcrypt');
const multer = require('multer');

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


//login

router.get("/login", function(req,res){
    res.render("form")
  })
  
  router.post("/login", function(req, res)
  {
        const name = req.body.email;
        const password = req.body.password;
  
        dbPool.query('SELECT * FROM student WHERE email = ?', name, (err, results) => {
            if (err) {
              res.redirect("/");
            }
          
            if (results.length === 0) 
            {
              console.log('Name and password do not match in the database.');
              res.redirect("/");
            } 
            else{
              bcrypt.compare(password, results[0].password, (err, passwordMatch) => {
                if (err) {
                console.log('Error comparing passwords:', err);
                  return;
                }
                
                if (passwordMatch) 
                {
                  if(results[0].allow === 0)
                  {
                    res.redirect("/");
                  }
                  else
                  {
                    console.log('login succesfull');
                    req.session.username = req.body.email;
                    res.redirect("/students");
                  }
                } 
                else {
                  console.log('Password does not match');
                  res.redirect("/");
                }
            });
          }
        });
  });

// register

router.post("/register",upload.fields([{ name: 'photo', maxCount: 1 } , { name: 'resume', maxCount: 1 }]), function(req, res)  {

    var skills = req.body.skills;
    const serializedArray = JSON.stringify(skills);

    const plainPassword = req.body.password;
    const saltRounds = 10;

    dbPool.query('SELECT * FROM student WHERE email = ?', req.body.email, (err, results) => {
      if (err) {
        console.error('Error querying the database:', err);
        res.redirect("/");
      }
    
      if (results.length>0) 
      {
        console.log('please enter diffrent email its already loged in');
        res.redirect("/form");
      }
      else
      {
        bcrypt.hash(plainPassword, saltRounds, (err, hashedPassword) => {8
          if (err) {
            console.error('Error hashing password:', err);
            return;
          }

          console.log(hashedPassword);

          const student1 ={
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            cpassword: hashedPassword,
            enrollment: req.body.enrollment,
            birthDate: req.body.birthDate,
            mobile: req.body.mobile,
            marks10: req.body.marks10,
            marks12 : req.body.marks12,
            cgpa : req.body.cgpa,
            skills : serializedArray,
            linkedin : req.body.linkedin,
            github : req.body.github,
            otherid : req.body.otherid,
            photo: req.files['photo'][0].originalname,
            resume : req.files['resume'][0].originalname
          };
          

          dbPool.query('INSERT INTO student SET ?', student1, (err, result) => {
            if (err) {
              console.error('Error inserting data:', err);
              res.redirect("/");
            }
            console.log('Data inserted successfully!');
            res.redirect("/verified");
          });  
        });  
      }
    });
});

//verification wait

router.get("/verified" , function(req , res){
  res.render("verification.ejs");
});



//logout session

router.get('/logout', (req, res) => {
  // Destroy the session
  req.session.destroy((err) => {
    if (err) {
      
      console.log('Error ending session:', err);
    }
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    res.clearCookie('user_sid');
    res.redirect('/');
  });
});

module.exports = router