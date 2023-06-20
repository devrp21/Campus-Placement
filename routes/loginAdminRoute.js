// const express = require('express');
// const routerAdm = express.Router();
// const bcrypt = require("bcrypt");
// const adminlogin = require('../model/admin');


// // Login 
// routerAdm.get('/adminlogin', (req, res) => {
//     res.render("adminlogin",{pageTitle:"Admin Login"})
// });

// routerAdm.post('/adminlogin', async (req, res) => {
//     try {
//         const aid = parseInt(req.body.aid);
//         const pass = req.body.apass;

//         const adminLogin = await adminlogin.findOne({ aid: aid });

//         const isMatch = await bcrypt.compare(pass, adminLogin.password);

//         if (isMatch) {
//             res.status(201).send(adminLogin);
//         }
//         else {
//             res.send("Inavalid Login");
//         }

//     } catch (error) {
//         res.status(404).send(error);
//     }
// })

// module.exports = routerAdm;


const express = require('express');
const routerAdm = express.Router();
const bcrypt = require("bcrypt");
const bodyparser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path');
const app = express();
const adminlogin = require('../model/admin');
const adminController = require('../controller/admin');
// const studentdata=require('../model/student');
const collegeData = require('../model/college');
const companydata = require('../model/company');
const axios = require("axios");
var studentlogin = require('../model/student');
const queAns = require('../model/qNa');
// const { body } = require('express-validator/check');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Admin Login 
routerAdm.get('/adminlogin', adminController.adminlogin
    // (req, res) => {
    //     res.render("adminlogin",{pageTitle:"Admin Login"})
    // }
);

// Admin Login For post method to find entered id and password is right or not
routerAdm.post('/adminlogin', adminController.adminloginPost
    // async (req, res) => {
    //     try {
    //         const aid = parseInt(req.body.aid);
    //         const pass = req.body.apass;

    //         const adminLogin = await adminlogin.findOne({ aid: aid });

    //         const isMatch = await bcrypt.compare(pass, adminLogin.password);

    //         if (isMatch) {
    //             res.status(201).redirect("/adminProfile");
    //         }
    //         else {
    //             res.send("Inavalid Login");
    //         }

    //     } catch (error) {
    //         res.status(404).send(error);
    //     }
    // }
)

//

// Admin Logout
routerAdm.get('/logout', adminController.adminLogout);






// Admin profile route
routerAdm.get('/adminProfile', adminController.adminProfile
    // (req,res)=>{
    // res.render("adminProfile",{pageTitle:"Admin Profile"})
    // }
)


// Admin Student Info
routerAdm.get('/adminStudent', adminController.adminStudent
    //  (req, res) => {
    //     // make get req to admin/student
    //     axios.get('http://localhost:5000/admin/student')
    //     .then(function(response){
    //         res.render("adminStudentData",{student:response.data , pageTitle:"Student Data"})

    //     })
    //     .catch(err=>{
    //         res.send(err)
    //     })

    // }
);

// Admin Company Section
routerAdm.get('/adminCompany', adminController.adminCompany
    //  (req, res) => {
    //     // make get req to admin/Company
    //     axios.get('http://localhost:5000/admin/Company')
    //         .then(function (response) {
    //             res.render("adminCompanyData", { Company: response.data, pageTitle: "Student Data" })

    //         })
    //         .catch(err => {
    //             res.send(err)
    //         })

    // }
);


// Admin Adding New Student
routerAdm.get('/adminNewStudent', adminController.adminNewStudent
    //  (req, res) => {
    //     res.render("adminNewStudent",{pageTitle:" Add Stduent Data"})
    // }
);



// routerAdm.get('/adminUpdatestudent', (req, res) => {
//     // console.log('hi')
//     // console.log(req.query.sid);
//     axios.get('http://localhost:5000/admin/student',{params:{sid:req.query.sid}})
//     .then(function(studentdata){
//         // console.log(studentdata.data[0].sid)
//         res.render('adminUpdateStudentData',{student:studentdata.data[0]})

//     })
//     .catch(err=>{
//         res.send(err);
//     })
//     // res.render("adminUpdateStudentData",{pageTitle:"Update Student Data"})
// });

// routerAdm.get('/adminUpdatestudent', (req, res,next) => {
//     console.log(req.query.sid);
//     axios.get('http://localhost:5000/admin/student',{params:{sid:req.query.sid}})
//     .then(function(studentdata){
//         // console.log(studentdata.data[0].sid)
//         res.render('adminUpdateStudentData',{student:studentdata.data[0]})

//     })
//     .catch(err=>{
//         res.send(err);
//     })
//     res.render("adminUpdateStudentData",{pageTitle:"Update Student Data"})

//     // studentlogin.findOneAndUpdate({sid:req.params.sid},{new:true},(err,docs)=>{
//     //     if(err){
//     //         console.log("Something went wrong");
//     //         next(err);
//     //     }
//     //     else{
//     //        res.redirect('adminUpdateStudentData',{studentlogin:docs}) 
//     //     }
//     // })
// }
// )

// Admin Update Student
routerAdm.get('/adminUpdatestudent/:sid', adminController.adminUpdateStudent
    // (req,res,next)=>{
    //     // console.log/(req.params.sid);
    //     var sid=(req.params.sid);
    //     // var s=parseInt(sid);
    //     // console.log(typeof(s))
    //     studentlogin.findOneAndUpdate({sid:sid},req.body,{new:true},(err,docs)=>{
    //         if(err){
    //             console.log("Can Not Retive the data");
    //             next(err)
    //         }
    //         else{
    //             res.render('adminUpdatestudentData',{student:docs});
    //         }
    //     })


    // }
);

// Poste Method of admin Update Student
routerAdm.post('/adminUpdatestudent/:sid', adminController.adminUpdateStudentPost
    // (req,res,next)=>{
    //     var sid=(req.params.sid);
    //     var s=parseInt(sid);
    //     studentlogin.findOneAndUpdate({sid:s},req.body,(err,docs)=>{
    //         if(err){
    //             console.log("Can Not Update");
    //             next(err)
    //         }
    //         else{
    //             console.log('updated succesfully');
    //             axios.get('http://localhost:5000/admin/student')
    //     .then(function(response){
    //         // res.render("adminStudentData",{student:response.data , pageTitle:"Student Data"})
    //         res.redirect("/admin/adminStudent");

    //     })
    //     .catch(err=>{
    //         res.send(err)
    //     })

    //         }
    //     });

    // }
);

// Admin Deleting Student
routerAdm.get('/Studentdelete/:sid', adminController.adminDeleteStudent
    // (req,res,next)=>{
    //     studentlogin.findOneAndDelete({sid:req.params.sid},(err,docs)=>{
    //         if(err){
    //             console.log("Something went wrong for delete");
    //         }
    //         else{
    //             console.log("Delete Successfully");
    //            res.redirect("/admin/adminStudent");
    //     }

    // })
    // }
);

// routerAdm.post('/adminUpdatestudent/:sid', (req, res,next) => {

//     // studentlogin.findOneAndUpdate({sid:req.params.sid},{new:true},(err,docs)=>{
//     //     if(err){
//     //         console.log("Something went wrong");
//     //         next(err);
//     //     }
//     //     else{
//     //        res.redirect('adminUpdateStudentData') 
//     //     }
//     // })
//     console.log('hi')
//     console.log(req.query.sid);
//     axios.get(`http://localhost:5000/admin/student/${req.query.sid}`)
//     .then(function(studentdata){
//         // console.log(studentdata.data[0].sid)
//         res.render('adminUpdateStudentData',{student:studentdata.data[0]})

//     })
//     .catch(err=>{
//         res.send(err);
//     })
//     // res.render("adminUpdateStudentData",{pageTitle:"Update Student Data"})
// });





// Admin New College Data
routerAdm.get('/adminNewCollegeData', adminController.adminNewCollegeData
    // (req, res) => {
    //     res.render("adminNewCollegeData",{pageTitle:" Add College Data"})
    // }
);

// Admin College Data
routerAdm.get('/adminCollegeData', adminController.adminCollegeData
    //  (req, res) => {
    //     // make get req to admin/College
    //     axios.get('http://localhost:5000/admin/college')
    //     .then(function(response){
    //         res.render("adminCollegeData",{data:response.data , pageTitle:"College Data"})

    //     })
    //     .catch(err=>{
    //         res.send(err)
    //     })

    // }
);

// Admin Question Answer Section
routerAdm.get('/adminQuestionSection', adminController.adminQuestionSection
    // (req, res) => {
    //     queAns.find({ answer: "" }, function (err, questions) {
    //         if (err) {
    //             console.log(err);
    //         }
    //         else {
    //             console.log("hi", (questions._id));
    //             res.render("adminQuestionSection", { question: questions, pageTitle: "Admin Question Section" });
    //         }
    //     });
    // }
);

// Admin Posting Answer Section
routerAdm.post('/adminQuestionSection', adminController.adminQuestionSectionPost
    // async (req, res) => {
    //     console.log(req.body);
    //     var _id = req.body._id;
    //     var ans = req.body.answer
    //     queAns.findByIdAndUpdate({ _id: _id }, { answer: ans }, (err, doc) => {
    //         if (err) {
    //             console.log(err);
    //         }
    //         else {
    //             console.log("Updated");
    //             res.redirect("/adminQuestionSection")
    //         }
    //     });

    // }
);

routerAdm.get('/adminPlacedStudent',adminController.placedStudent);

routerAdm.use('/css', express.static(path.resolve(__dirname, "public/css")));
routerAdm.use('/img', express.static(path.resolve(__dirname, "public/images")));
routerAdm.use('/js', express.static(path.resolve(__dirname, "public/js")));

module.exports = routerAdm;