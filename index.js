const express = require('express');
const mongoose = require('mongoose');
var bodyParser = require('body-parser')

const app = express();


app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended: true
}))

//connect mongoDb

mongoose.connect("mongodb://localhost:27017/DataBase")
var db = mongoose.connection
db.on("error",()=>console.log('error in Connecting dataBase'))
db.once('open',()=>console.log('Connected to DataBase'))

app.post("/signup",(req,res)=>{
    var name = req.body.name
    var age = req.body.age
    var email = req.body.email
    var phno = req.body.phno
    var Gender = req.body.Gender
    var password = req.body.password

    var data = {
        "name": name,
        "age": age,
        "email": email,
        "phno": phno,
        "gender": Gender,
        "password": password,
    }
    db.collection('users').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully");
    })
    return res.redirect('signup_success.html')

})

app.get('/',(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin":"*"
    })
    return res.redirect('index.html')




}).listen(3000);

console.log(`listening on port 3000`);


