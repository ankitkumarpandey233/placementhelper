const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mysql = require("mysql");
const bcrypt = require('bcrypt');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
var cookieParser = require('cookie-parser');
const nocache = require('nocache');
const fs = require('fs')
const multer = require('multer');
const path = require('path');


const app = express();
app.use(nocache());

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads/'); 
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage, });

//database connection
const con ={
  host : "localhost",
  user : "root",
  password:"",
  database: "college"
}

app.use(cookieParser());

//pool creation 
const dbPool = mysql.createPool(con);

// Create a MySQL session store
const sessionStore = new MySQLStore({
  expiration: 8640000, // Session expiration time in milliseconds (e.g., 1 day)
  createDatabaseTable: true, // Create the session table if it doesn't exist
}, dbPool);

// Configure session middleware
app.use(session({
  key: 'user_sid',
  secret: 'your_session_secret',
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
}));





// login formss

//register

app.post("/register",upload.fields([{ name: 'photo', maxCount: 1 } , { name: 'resume', maxCount: 1 }]), function(req, res)  {

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
            photo: req.body.photo,
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



app.get("/verified" , function(req , res){
  res.render("verification.ejs");
});


//login

app.get("/login", function(req,res){
  res.render("form")
})

app.post("/login", function(req, res)
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



//logout session

app.get('/logout', (req, res) => {
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



//courses

const img = ["images/notes/dsa.webp","images/notes/dp.jpeg","images/notes/dbms.jpeg","images/notes/oops.jpeg","images/notes/graph.jpeg","images/notes/cn.jpeg","images/notes/android.webp","images/notes/linux.jpeg"];
const course = ["Data Structure","Dynamic Programming","DBMS notes","OOPs notes","Graph data structure","CN notes","OS notes","Linux Commands"]
const material = ["https://drive.google.com/drive/folders/11etmJeRLiR7rxqYsivewospbw7ifZKfT?usp=drive_link",
                "https://drive.google.com/drive/folders/1ouVY5i2zFwVOBsz3tPqSxz-qLzo7fIDR?usp=drive_link",
                "https://drive.google.com/drive/folders/1I8R4JF9ZH8Vsux9tmC0br_3mROtlO93P?usp=drive_link",
                "https://drive.google.com/drive/folders/15ZbHWioUqJL2qrUCdqHLh_gMaWqa0VQL?usp=drive_link",
                "#",
                "https://drive.google.com/drive/folders/1ohimPKcR43ck76aZiPkh0qiHBMmgQ-T9?usp=drive_link",
                "https://drive.google.com/drive/folders/1APQ_EY32HA1OvmL5hmfJdKMZVbsBX_AS?usp=drive_link",
                "https://drive.google.com/drive/folders/1nsk5VaTz1jzWY42klsRRXNcMWlWyVxg0?usp=drive_link"
                 ];
const source = ["https://www.javatpoint.com/data-structure-tutorial",
                 "https://www.geeksforgeeks.org/dynamic-programming/",
                 "https://www.tutorialspoint.com/dbms/index.htm",
                 "https://www.javatpoint.com/what-is-object-oriented-programming",
                 "https://www.geeksforgeeks.org/graph-data-structure-and-algorithms/",
                 "https://www.javatpoint.com/computer-network-tutorial",
                 "https://www.geeksforgeeks.org/what-is-an-operating-system/",
                 "https://www.javatpoint.com/linux-commands",
               ];

app.get("/notes", function(req, res)
{
  res.render("notes.ejs",{photo: img , courses: course , link: material, link1: source});
});



// admin panel




app.get('/admin', (req, res) => {
  dbPool.query('SELECT * FROM student WHERE allow = 0', (err, student) => {
    if (err) {
      res.redirect("/");
    }
      dbPool.query('SELECT * FROM student WHERE allow = 1', (err, verified) => {
        if (err) {
          res.redirect("/");
        }

        dbPool.query('SELECT * FROM companies', (err, companies) => {
          if (err) {
            res.redirect("/");
          }
          dbPool.query('SELECT * FROM notice', (err, notice) => {
            if (err) {
              res.redirect("/");
            }
          res.render("admin/index.ejs" , {student : student, verified : verified , companies: companies , notice: notice});
          });
        });
    });
  });
});

// Resume Download

app.get('/download-resume/:resumePath', (req, res) => {
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



// student section

app.post("/accept/:email", function(req, res)
{   
    dbPool.query('UPDATE student SET ? WHERE email = ?', [{allow : 1} , req.params.email] , (err, results) => {
      if (err) {
        res.redirect("/");
      }
      res.redirect("/admin");
  });
});

app.post("/reject/:email", function(req, res)
{   
    dbPool.query('DELETE FROM student WHERE email = ?', req.params.email , (err, results) => {
      if (err) {
        res.redirect("/");
      }
      res.redirect("/admin");
  });
});


//company section

app.post('/cRegister', (req, res) => {

  const plainPassword = req.body.password;
  const saltRounds = 10;


  bcrypt.hash(plainPassword, saltRounds, (err, hashedPassword) => {
    if (err) {
      console.error('Error hashing password:', err);
      return;
    }
    const company1 ={
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      marks10: req.body.marks10,
      marks12 : req.body.marks12,
      cgpa : req.body.cgpa,
      description : req.body.description,
      location : req.body.location,
      package : req.body.package,
      startingDate	: req.body.startingDate,
      endingDate	: req.body.endingDate
    };
    dbPool.query('INSERT INTO companies SET ?', company1, (err, result) => {
      if (err) {
        console.error('Error inserting data:', err);
        res.redirect("/");
      }
      console.log('Data inserted successfully!');
      res.redirect("/admin")
    });  
  
  });
});


//Notice board section

app.post('/Notice', (req, res) => {
  const notice1 ={
    title : req.body.title,
    notice : req.body.notice
  };

  dbPool.query('INSERT INTO notice SET ?', notice1, (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      res.redirect("/");
    }
    console.log('Data inserted successfully!');
    res.redirect("/admin")
  });  
});



// students panel


function requireAuth(req, res, next) {
  if (req.session && req.session.username) {
    next();
  } else {
    res.redirect('/');
  }
}

app.get('/students', requireAuth ,(req, res) => {

      dbPool.query('SELECT * FROM student WHERE email = ?', req.session.username , (err, results) => {
        if (err) {
          console.error('Error querying the database:', err);
        }
        var current = new Date();
        dbPool.query('SELECT * FROM companies WHERE cgpa <= ? AND marks10 <= ? AND marks12 <= ? AND startingDate <= ? AND endingDate >= ?', [results[0].cgpa , results[0].marks10 , results[0].marks12 , current , current], (err, company) => {
          if (err) {
            res.redirect("/");
          }
            dbPool.query('SELECT * FROM companies WHERE (cgpa > ? OR marks10 > ? OR marks12 > ?) AND startingDate <= ? AND endingDate >= ?', [results[0].cgpa , results[0].marks10 , results[0].marks12 , current , current], (err, companyNot) => {
              if (err) {
                res.redirect("/");
              }
              dbPool.query('SELECT * FROM companies WHERE  startingDate > ? OR endingDate < ?', [ current , current], (err, companyPast) => {
              if (err) {
                res.redirect("/");
              }
              dbPool.query('SELECT * FROM notice', (err, notice) => {
                if (err) {
                  res.redirect("/");
                }
              dbPool.query('SELECT * FROM applied WHERE studentEmail = ?',req.session.username , (err, c) => {
                if (err) {
                  res.redirect("/");
                }
                var cStudent = [];
                for(var i=0; i<c.length; i++)
                {
                  cStudent.push(c[i].companyName);
                }
                dbPool.query('SELECT * FROM rejected WHERE studentEmail = ?',req.session.username , (err, co) => {
                  if (err) {
                    res.redirect("/");
                  }
                  var sCompany = [];
                  for(var i=0; i<co.length; i++)
                  {
                    sCompany.push(co[i].companyName);
                  }

                  // console.log(sCompany);                

                if(cStudent.length != 0)
                {
                  dbPool.query('SELECT * FROM companies WHERE name IN (?)', [cStudent] , (err, comp) => {
                    if (err) {
                      res.redirect("/");
                    }
                    if(comp != undefined)
                    {
                      cStudent = comp;
                    }
                      

                    res.render("studentD.ejs" , {student: results , companies : company , companiesNot : companyNot , companyPast: companyPast , cStudent: cStudent , notice: notice , sCompany: sCompany});   
                  });
                }
                else{
                  res.render("studentD.ejs" , {student: results , companies : company , companiesNot : companyNot , companyPast: companyPast , cStudent: cStudent , sCompany: sCompany , notice: notice});
                }
              });
              });
            });
            });
            });
        });
    });
});


app.post

app.post("/applied/:email", function(req, res)
{   
  dbPool.query('SELECT * FROM student WHERE email = ?', req.session.username , (err, results) => {
    if (err) {
      res.redirect("/students");
    }
    
    dbPool.query('SELECT * FROM companies WHERE email = ?', req.params.email , (err, compan) => {
      if (err) {
        res.redirect("/students");
      }
      const applied1 = {
        studentEmail : req.session.username,
        studentName : results[0].name,
        companyEmail : compan[0].email,
        companyName : compan[0].name,
        studentEnrollment : results[0].enrollment
      };

      dbPool.query('INSERT INTO applied SET ?', applied1 , (err, result) => {
        if (err) {
          res.redirect("/");
        }
        res.redirect("/students");
      });
    });
  });
});


//companies panel

app.get('/company', (req, res) => {
  dbPool.query("SELECT * from applied where companyEmail = ? && next = 0",req.session.company,(err,data) => {
    if (err) {
      res.redirect("/cLogin");
    }
    dbPool.query("SELECT * from applied where companyEmail = ? && next = 1",req.session.company,(err,results) => {
      if (err) {
        res.redirect("/cLogin");
      }
      dbPool.query("SELECT * from rejected where companyEmail = ?",req.session.company,(err,rejected) => {
        if (err) {
          res.redirect("/cLogin");
        }
        dbPool.query("SELECT * from applied where companyEmail = ? && selected = 1",req.session.company,(err,selected) => {
          if (err) {
            res.redirect("/cLogin");
          }
          res.render("company/company.ejs",{students: data , accepted: results , rejected: rejected , selected: selected});
        });
      });
    });
  });
});

app.get('/cLogin', (req, res) => {
  res.render('cLogin.ejs');
});

app.post("/cLogin",(req,res) => {

  dbPool.query("SELECT * from companies where email = ?" , req.body.email , (err,result) => {
    if (err) {
      res.redirect("/cLogin");
    }
  
    if(result.length === 0)
    {
      res.redirect("/cLogin")
    }
    else
    {
      bcrypt.compare(req.body.password , result[0].password, (err, passwordMatch) => {
        if (err) {
          console.log('Error comparing passwords:', err);
          res.redirect("/cLogin");
        }
        
        if (passwordMatch) 
        {
          req.session.company = req.body.email;
          res.redirect("/company");
        } 
        else {
          console.log('Password does not match');
          res.redirect("/cLogin");
        }
      });
    }
    });
});

app.post("/accepted/:email", function(req, res)
{   
    dbPool.query("UPDATE applied SET ? WHERE companyEmail = ? && studentEmail = ?",[{next: 1}, req.session.company, req.params.email] , (err, results) => {
        if (err) {
          res.redirect("/company");
        }
        res.redirect("/company");
    });
});

app.post("/rejected/:email", function(req, res)
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

app.post("/selected", function(req, res)
{   

    dbPool.query('UPDATE applied SET ? WHERE companyEmail = ? && next = 1',[{selected : 1},req.session.company] , (err, results) => {
      if (err) {
        res.redirect("/company");
      }
      res.redirect("/company");
    });
});

app.post('/next', (req, res) => {
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


// front panel

//home

const src = ["images/client-img/logo1.webp","images/client-img/logo2.webp","images/client-img/logo3.webp","images/client-img/logo4.webp","images/client-img/logo5.webp","images/client-img/logo6.webp","images/client-img/logo7.webp","images/client-img/logo8.webp","images/client-img/logo9.webp"]
app.get("/", function(req, res)
{
    if(req.session && req.session.username)
    { 
      res.redirect("/students");
    }
    else
    {
      res.render("index.ejs",{photo: src});
    }
});

app.get('/form', (req, res) => {
  res.render('form.ejs');
});


app.get('/notes1', (req, res) => {
  res.render('notes1.ejs');
});







app.listen(3000, function() {
    console.log("Server started on port 3000");
});