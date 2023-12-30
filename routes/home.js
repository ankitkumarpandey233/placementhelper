const express = require('express')

const router = express.Router()

const src = ["images/client-img/logo1.webp","images/client-img/logo2.webp","images/client-img/logo3.webp","images/client-img/logo4.webp","images/client-img/logo5.webp","images/client-img/logo6.webp","images/client-img/logo7.webp","images/client-img/logo8.webp","images/client-img/logo9.webp"]

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




router.get("/", function(req, res)
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

router.get('/form', (req, res) => {
  res.render('form.ejs');
});


router.get("/notes", function(req, res)
{
  res.render("notes.ejs",{photo: img , courses: course , link: material, link1: source});
});

router.get('/notes1', (req, res) => {
  res.render('notes1.ejs');
});


module.exports = router