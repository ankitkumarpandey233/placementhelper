const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mysql = require("mysql");
const bcrypt = require('bcrypt');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const multer = require("multer");

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const upload = multer({storage: multer.memoryStorage()});

//database connection
const con ={
  host : "localhost",
  user : "root",
  password:"",
  database: "collage"
};

//pool creation 
const dbPool = mysql.createPool(con);

// Create a MySQL session store
const sessionStore = new MySQLStore({
  expiration: 86400000, // Session expiration time in milliseconds (e.g., 1 day)
  createDatabaseTable: true, // Create the session table if it doesn't exist
}, dbPool);

// Configure session middleware
app.use(session({
  secret: 'your_session_secret',
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
}));





//register

app.post("/register", function(req, res)
{

    var skills = req.body.skills;
    const serializedArray = JSON.stringify(skills);

    const plainPassword = req.body.password;
    const saltRounds = 10;

  bcrypt.hash(plainPassword, saltRounds, (err, hashedPassword) => {
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
      resume: req.body.resume
    };

    dbPool.query('INSERT INTO student SET ?', student1, (err, result) => {
      if (err) {
        console.error('Error inserting data:', err);
        res.redirect("/");
      }
      console.log('Data inserted successfully!');
      req.session.username = req.body.email;
      // emailc = req.body.email;
      res.redirect("/admin");
    });  
  });  
});






//login

app.post("/login", function(req, res)
{
      const name = req.body.email;
      const password = req.body.password;

      dbPool.query('SELECT * FROM student WHERE email = ?', name, (err, results) => {
          if (err) {
            console.error('Error querying the database:', err);
            res.redirect("/");
          }
        
          if (results.length === 0) 
          {
            console.log('Name and password do not match in the database.');
          } 
        
          bcrypt.compare(password, results[0].password, (err, passwordMatch) => {
            if (err) {
              console.error('Error comparing passwords:', err);
              return;
            }
        
            if (passwordMatch) {
              console.log('Password matched');
              // emailc = name;
              req.session.username = req.body.email;
              res.redirect("/admin");
            } 
            else {
              console.log('Password does not match');
              res.redirect("/");
            }
          });

      });
});




//admin penal

app.get("/admin", function(req, res)
{   
    if(!req.session || !req.session.username)
    { 
      res.redirect("/");
    }
    else{
      dbPool.query('SELECT * FROM student WHERE email = ?', req.session.username , (err, results) => {
        if (err) {
          console.error('Error querying the database:', err);
        }
        res.render("admin.ejs" , {item: results});
      });
  
    }
 
});




//logout session

app.get('/logout', (req, res) => {
  // Destroy the session
  req.session.destroy((err) => {
    if (err) {
      
      console.log('Error ending session:', err);
    }
    // emailc=" ";
    res.redirect('/');
  });
});




//home

const src = ["images/client-img/logo1.webp","images/client-img/logo2.webp","images/client-img/logo3.webp","images/client-img/logo4.webp","images/client-img/logo5.webp","images/client-img/logo6.webp","images/client-img/logo7.webp","images/client-img/logo8.webp","images/client-img/logo9.webp"]
app.get("/", function(req, res)
{
  res.render("index.ejs",{photo: src});
});





//courses

const img = ["images/notes/python.webp","images/notes/c.webp","images/notes/cpp.webp","images/notes/java.webp","images/notes/html.webp","images/notes/css.webp","images/notes/js.webp","images/notes/php.webp"];
const course = ["Python Tutorial","C Tutorial","C++ Tutorial","Java Tutorial","HTML Tutorial","CSS Tutorial","JavaScript Tutorial","PHP Tutorial"]

app.get("/notes", function(req, res)
{
  res.render("notes.ejs",{photo: img , courses: course});
});

//form

app.get('/form', (req, res) => {
  res.render('form.ejs');
});


// to select port
app.listen(3000, function() {
    console.log("Server started on port 3000");
});



























// mongoose.connect("mongodb+srv://mohatadhruv:123@cluster0.qw1uqgt.mongodb.net/?retryWrites=true&w=majority",{
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });

// const notice = {
//   note: String
// };

// const student = {
//   name: String,
//   email: String,
//   password: String,
//   cpassword: String,
//   enrollment: Number,
//   birthDate: Date,
//   mobile: Number,
//   marks10 : mongoose.Types.Decimal128,
//   marks12 : mongoose.Types.Decimal128,
//   cgpa : mongoose.Types.Decimal128,
//   skills : [String],
//   linkedin : String,
//   github : String,
//   otherid : String,
//   photo: {
//     data: Buffer,
//     contentType: {
//       type: String,
//       default: 'application/pdf'
//     }
//   },
//   resume : {
//       data: Buffer,
//     contentType: {
//       type: String,
//       default: 'application/pdf'
//     }
//   }
// };

// const Notice = mongoose.model("Notice" , notice);
// const Student = mongoose.model("Student" , student);








// admin panel

// app.get("/admin", function(req, res)
// {
//   Notice.find()
//       .then((item) => {
//         res.render("admin.ejs",{addNotice: item});
//       })
//       .catch((error) => {
//         console.error('Error saving data:', error);
//       });
// });

// app.post('/admin',function(req,res)
// {
//     const text = req.body.Add;
//     const item1 = new Notice({
//       note : text
//     });
//     item1.save();
//     res.redirect("/admin");
// });

// app.post('/delete',function(req,res)
// {
//     const checked = req.body.checkbox;

//     Notice.findByIdAndRemove(checked)
//       .then(() => {
//         res.redirect("/admin");
//       })
//       .catch((error) => {
//         console.error('Error saving data:', error);
//       });
    
// });



// Notice.find()
// .then((item) => {
//   res.render("index.ejs",{photo: src , addNotice: item});
// })
// .catch((error) => {
//   console.error('Error saving data:', error);
// });
