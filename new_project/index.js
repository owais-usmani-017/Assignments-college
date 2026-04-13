const express = require("express")
const path = require("path")
const app = express();
const fs = require("fs")

app.use(express.json());
app.use(express.urlencoded({extended : true}));

//ye line static compiler ko batayegi ki static yaani images wagiara dhoondne kaha jana hai , __dirname batata hai current directory tak ka address aur path.join usme /public krke jod deta hai taaki waha tak pohoncha jaa ske
app.use(express.static(path.join(__dirname,'public')));


//ejs is used for dynamic calculations at runtime , it is done by <%= 2+2%> like this in the views folder
//also you will need app.render rather then app.send
//setup ejs as a view engine
app.set('view engine' , 'ejs')

app.get("/" , (req,res)=>{
    fs.readdir('./files',(err,files)=>{
        res.render("index" , {files:files})
    })
})

//readmore pe click krke ye chalana hai
app.get("/file/:filename" , (req,res)=>{
    fs.readFile(`./files/${req.params.filename}` , "utf-8" , (err,filedata)=>{
        res.render('show' , {filename: req.params.filename , filedata : filedata})
        
    })
})

//edit button route
app.get("/edit/:filename" , (req,res)=>{
    res.render('edit' , {filename : req.params.filename});
})

//edit button post route
app.post("/edit", (req, res) => {
    fs.rename(`./files/${req.body.previous}` , `./files/${req.body.new}` , (err)=>{
        res.redirect('/')
    })
});

//form route
app.post("/create" , (req,res)=>{
    fs.writeFile(
      `./files/${req.body.title.split(" ").join("")}.txt`,
      req.body.details,
      (err) => {
        res.redirect("/");
      },
    );
})

//dynamic routing krne ke liye changing part of the route ke saamne colon : laga do
app.get("/profile/:username" , (req,res)=>{
    const username = (req.params.username);
    res.send(`hi ${username}`)
})

app.listen(3000, ()=> {
    console.log("server is running")
});