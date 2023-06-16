const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose= require("mongoose");

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


mongoose.connect("mongodb+srv://mohatadhruv:123@cluster0.qw1uqgt.mongodb.net/?retryWrites=true&w=majority",{
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const notice = {
  note: String
};

const Notice = mongoose.model("Notice" , notice);



app.get("/admin", function(req, res)
{
  Notice.find()
      .then((item) => {
        res.render("admin.ejs",{addNotice: item});
      })
      .catch((error) => {
        console.error('Error saving data:', error);
      });
});

app.post('/admin',function(req,res)
{
    const text = req.body.Add;
    const item1 = new Notice({
      note : text
    });
    item1.save();
    res.redirect("/");
});

app.post('/delete',function(req,res)
{
    const checked = req.body.checkbox;

    Notice.findByIdAndRemove(checked)
      .then(() => {
        res.redirect("/admin");
      })
      .catch((error) => {
        console.error('Error saving data:', error);
      });
    
});


const src = ["images/client-img/logo1.webp","images/client-img/logo2.webp","images/client-img/logo3.webp","images/client-img/logo4.webp","images/client-img/logo5.webp","images/client-img/logo6.webp","images/client-img/logo7.webp","images/client-img/logo8.webp","images/client-img/logo9.webp"]
app.get("/", function(req, res)
{

  Notice.find()
      .then((item) => {
        res.render("index.ejs",{photo: src , addNotice: item});
      })
      .catch((error) => {
        console.error('Error saving data:', error);
      });
  
});



const img = ["images/notes/python.webp","images/notes/c.webp","images/notes/cpp.webp","images/notes/java.webp","images/notes/html.webp","images/notes/css.webp","images/notes/js.webp","images/notes/php.webp"];
const course = ["Python Tutorial","C Tutorial","C++ Tutorial","Java Tutorial","HTML Tutorial","CSS Tutorial","JavaScript Tutorial","PHP Tutorial"]

app.get("/notes", function(req, res)
{
  res.render("notes.ejs",{photo: img , courses: course});
});



// to select port
app.listen(3000, function() {
    console.log("Server started on port 3000");
});