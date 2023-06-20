const express = require('express');
const routerCmp = express.Router();
const app = express();
const path = require('path');
// const bcrypt = require("bcrypt");
// const companylogin = require('../model/company');
// const studentdetail = require('../model/student');
// const crypto = require("crypto");
// const fs = require('fs');
// const appliedStd = require('../model/applyincomp');
const companyController=require('../controller/company');
// const studentlogin = require('../model/student');
// var companyLogin;
// var loginCompanyId;

const template_path = path.join(__dirname, "../templates/views");
// const partial_path = path.join(__dirname, "../templates/partials");
app.set("view engine", "hbs");
app.set("views", template_path);


// Company Login 
routerCmp.get('/companylogin', companyController.companyLogin
// (req, res) => {
    // res.render("companylogin", { pageTitle: "Company Login" })
// }
);


// Post Detail Of Login To Verify
routerCmp.post('/companylogin',companyController.companyLoginPost
//  async (req, res) => {
//     try {
//         const cemail = req.body.cemail;
//         const pass = req.body.cpwd;

//         companyLogin = await companylogin.findOne({ cemail: cemail });

//         const isMatch = await bcrypt.compare(pass, companyLogin.password);

//         if (isMatch) {
//             res.status(201).redirect("/companyProfile")
//         }
//         else {
//             res.send("Inavalid Login");
//         }

//     } catch (error) {
//         res.status(404).send(error);
//     }
// }
);

// Registration Page direction of Company
routerCmp.get('/companyregister', companyController.companyRegister
// (req, res) => {
//     res.render("companyRegistration", { pageTitle: "Company Registration" })
// }
);

// Posting Registration Details in Database
routerCmp.post('/companyregister', companyController.companyRegisterPost
// async (req, res) => {
//     const registerCompany = new companylogin({
//         cid: crypto.randomInt(0, 1000),
//         cemail: req.body.cemail,
//         password: req.body.cpwd,
//         cname: req.body.cname,
//         mobileNo: req.body.cnumber,
//         address: req.body.caddress,

//     });
//     const register = await registerCompany.save();
//     res.status(201).render('companylogin');
// }
);

// Loading Student Profile
// const companyProfile = fs.readFileSync(`${template_path}/companyProfile.ejs`, "utf-8");
// const navbar = fs.readFileSync(`${template_path}/includes/navlogout.ejs`, "utf-8");
// const replaceVal = (tempVal, orgVal) => {
//     let cmp = tempVal.replace("{%cname%}", orgVal.cname);
//     cmp = cmp.replace("<%- include('includes/navlogout.ejs')%>", navbar);
//     cmp = cmp.replace("{%cphone%}", orgVal.mobileNo);
//     cmp = cmp.replace("{%cemail%}", orgVal.cemail);
//     cmp = cmp.replace("{%caddress%}", orgVal.address);
//     cmp = cmp.replace("{%description%}", orgVal.description);

//     return cmp;
// }


// Logout From Company
routerCmp.get('/logout',companyController.companyLogout);

// Company Profile Page
routerCmp.get('/companyProfile', companyController.companyProfile
// (req, res) => {
    
//     var companyDetail = companyLogin;

//     // const realData = arrData.map((val) => replaceVal(companyProfile, val)).join("");
//     // res.send(realData);
//     res.render("companyProfile", { compDetails: companyDetail, pageTitle: "Company Profile" });


// }
);

routerCmp.get('/companyDetail',companyController.cmpDetail);


// Edit Company Info
// const companyEdit = fs.readFileSync(`${template_path}/editCompanyDetail.ejs`, "utf-8");

// Company Edit Detail PAge For Some Modification 
routerCmp.get('/companyeditdetails', companyController.companyEditDetails
// (req, res) => {
//     var companyDetail = companyLogin;

//     res.render("editCompanyDetail", { compDetails: companyDetail, pageTitle: "Edit Company" });

// }
);

// Posting Updated Details of the Company
routerCmp.post('/companyeditdetails', companyController.companyEditDetailsPost
//  (req, res) => {
//     // var cid = (req.params.cid);
//     var c=parseInt(companyLogin.cid);
//     // console.log(c);
//     // console.log(req.body);
//     // console.log(req.body.address);
//     companylogin.findOneAndUpdate({cid:c},req.body,(err,docs)=>{
//         if(err){
//             console.log("Can Not Retive the data");
//         }
//         else{
//             res.render("companyProfile", { compDetails: docs, pageTitle: "Company Profile" });

//         }
//     });

// }
);



// Student Info Table
routerCmp.get('/studentsection',companyController.studentSection
//  (req, res) => {
//     studentdetail.find({}, function (err, allDetail) {
//         if (err) {
//             console.log(err);
//         }
//         else {
//             res.render("studentSec", { details: allDetail, pageTitle: "Student Section" });
//         }
//     }).sort({ sid: 1 });
// }
);

// Showing Info About Perticular Student 
routerCmp.get('/showStudentInfo/:sid',companyController.showStudentInfo);

// Getting Applied Student Details
routerCmp.get('/appliedStudentDetails', companyController.appliedStudentDetails
// async (req, res) => {
//     var companyId = companyLogin;
//     // console.log(companyId.cid);
//     var appliedStudentId = await appliedStd.find({ cid: companyId.cid }, { sid: 1, _id: 0 }).sort({ sid: 1 });
//     // console.log(appliedStudentId.length);
//     var astd = appliedStudentId;
//     console.log(typeof (astd));
//     for (var i = 0; astd.length; i++) {
//         var sid = await astd[i].sid;
//         console.log(sid);
//         var studentInfo = await studentdetail.find({ sid })
//         console.log(studentInfo);
//     }

//     res.send(astd);
// }
);

// Accepting Application of the Student
routerCmp.get('/acceptApplication/:sid',companyController.acceptApplication
// (req,res)=>{
//     console.log(req.params.sid);
//     try{
//         acceptingSid=parseInt(req.params.sid);
        

//     }
//     catch(e){
//         console.log(e);
//     }
// }
);

// Sending Mail to Student
routerCmp.post('/sendMail',companyController.sendMail);

// Getting Display Accepted Student
routerCmp.get('/acceptedStudent',companyController.showAcceptedApplication);

routerCmp.get('/placeStudent/:sid',companyController.placeStudent);

routerCmp.get('/placedStudent',companyController.placedStudent);

routerCmp.get('/rejectedStudent/:sid',companyController.rejectStudent);


module.exports = routerCmp;