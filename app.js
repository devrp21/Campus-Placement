const express = require('express');
const port = process.env.PORT || 5000;
const app = express();
const path = require('path');
// const hbs = require('hbs');
const mongoose = require('mongoose')
const bodyparser = require('body-parser')
const routerStd = require('./routes/loginStudentRoute')
const routerAdm=require('./routes/loginAdminRoute');
const routerCmp=require('./routes/loginCompanyRoute');
const rounterHome=require('./controller/home');
const studentlogin = require('./model/student');
const router = require('./routes/route');
const bcrypt = require("bcrypt");
// var selected=require('./templates/views/selectedcompany');
const sessions = require('express-session');
const flash=require('connect-flash');

require('./db/conn');

const public_path = path.join(__dirname, "./public");
const template_path = path.join(__dirname, "./templates/views");
const partials_path = path.join(__dirname, "./templates/partials");

app.use(bodyparser.urlencoded({ extended: false }));
// hbs.registerPartials(partials_path);
app.set("view engine", "ejs");
app.set("views", template_path);
// app.set("views/admin", template_path);
app.use(express.static(public_path));
app.use(express.static(path.join(partials_path,'javascript')))
app.use(express.static('images'));

app.use(flash());

// Creating Session
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    resave: false
}));

app.use(function(req, res, next) {
    if (!req.user)
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    next();
});

app.use(express.json());
app.use(router);
app.use('/student',routerStd);
app.use('/admin',routerAdm);
app.use('/company',routerCmp);
app.get('/', rounterHome.counts);

// console.log(selected);

app.listen(port, () => {
    console.log(`Port Started at ${port}`);
});




// https://www.youtube.com/watch?v=oLuuIgiyxmg

// https://www.youtube.com/watch?v=zoqW6qSjSfI&list=PLwGdqUZWnOp00IbeN0OtL9dmnasipZ9x8

// https://www.youtube.com/watch?v=FL8eFtvS6UI


// Apply Button click to apply in company
// any changes happens in that when i reload it gives error sname is not there
// navebar error in login student route

// pdf upload kar dai e che frontend aavde but e file select thai to upload kai rite thase

// regex remain undone in admin add student and update student
// on button click alert message problem
// password bycrypt in update student
// how to stop duplicating data in mongodb
