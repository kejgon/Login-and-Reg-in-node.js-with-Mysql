const express = require ('express');
const app = express();

// create a mysql database
const mysql=require('mysql');
const con =mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    database: "iststudent"
});
// here we are creating a connection between into mysql
con.connect((err)=>{
    if(!err)console.log('connected');
    else
console.log('failed'+ err);
});



// here we are creating get functions that will display the html pages
app.get('/', function (req, res) {
    res.sendFile( __dirname + "/" + "login.html" );
});

app.get('/reg_form', function (req, res) {
    res.sendFile( __dirname + "/" + "registor.html" );
});
app.get('/login', function (req, res) {
    res.sendFile( __dirname + "/" + "login.html" );
});

app.get('/view', function (req, res) {
    res.sendFile( __dirname + "/" + "workspace.html" );
});
app.get("/registration" ,function(req,res){

        let fname = req.query.fname;
        let lname = req.query.lname;
        let gender = req.query.gender;
        let County = req.query.county;
        let Courses = req.query.courses;

        let email = req.query.email;
        let usrname = req.query.ursname;

        let password = req.query.password;

        // here we are creating a database called register

       con.query(`INSERT INTO registration (fname, lname, gender, county, courses, email, ursname, password) VALUES ('${fname}', '${lname}','${gender}', '${County}' ,'${Courses}','${email}', '${usrname}', '${password}')`,(err,rows,fields)=>{
    if (!err)
      console.log(rows);
    else
      console.log(err);
   });

   res.redirect('/');
});
// Here we are selecting from the table
app.get('/view', function (req, res) {
   con.selection(`SELECT * FROM registration`,(err,rows,fields)=>{
    if (!err){
      console.log(rows);
      res.send(rows);
    }
    else
      console.log(err);

  });
});

app.listen(8080);
