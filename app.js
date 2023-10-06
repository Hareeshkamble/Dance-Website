
let express=require("express")
let fs =require("fs")
let path =require("path")
const bodyparser=require("body-parser")
const mongoose = require('mongoose');
let app=express()
let port=8000;
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/ContactDance');
}
//defining Mongoose schema
const contactschema = new mongoose.Schema({
    name:String,
    email:String,
    phoneNumber:String,
    address:String
  });
  var contact = mongoose.model('contact', contactschema);



// this will serve all the file from 'static' folder in root directory of project
app.use('/static',express.static(path.join(__dirname,'static')))

// to add the pug files
app.set('view engine', 'pug')
app.set('/views',path.join(__dirname,'views'))
//to render index page using template and passing data as parameter
// end points
app.use(bodyparser.urlencoded({ extended: true }));

app.get("/",(req,res)=>{
    res.render("index.pug")
})
app.get("/index.pug",(req,res)=>{
    res.render("index.pug")
})
app.get("/solar.pug",(req,res)=>{
    res.render("solar.pug")
})
app.get("/fees.pug",(req,res)=>{
    res.render("fees.pug")
})
app.get("/contact.pug",(req,res)=>{
    res.render("contact.pug")
})
app.post('/contact',(req,res)=>{
    var Mydata = new contact(req.body)
Mydata.save().then(()=>{
    res.send("Your Response is stored Successfully ")
}).catch(()=>{
    res.status(400).send("Error while saving your response");
})
})
app.listen(port,()=>{
    console.log(`Server is running on ${port}`)
})


// let express=require("express")
// let fs = require("fs")
// let path= require("path");
// let app=express()
// let port=80;

// // to add the path of static
// app.use('static',express.static('static'))

// app.set('view engine','pug')
// app.set('views',path.join(__dirname,'views'))

// app.get("/",(req,res)=>{
//     res.render("index.pug")

// })
// app.get("/solar.pug",(req,res)=>{
//     res.render("solar.pug")
// })


// app.listen(port,()=>{
//     console.log(`Server started at http://localhost:${port}`);
// })