const express = require('express');
const app = express();
const routerStd = express.Router();
const bcrypt = require("bcrypt");
const path = require('path');
var session     =   require('express-session');
const bodyParser = require('body-parser');
const studentlogin = require('../model/student');
const cmpdetail = require('../model/company');
const appliedStd = require('../model/applyincomp');
const studentController=require('../controller/student');
const queAns = require('../model/qNa');
var loginedStudentsId;
var studentLogin;
var nodemailer = require('nodemailer');
var cid;

const template_path = path.join(__dirname, "../templates/views");
const partial_path = path.join(__dirname, "../templates/partials");
app.set("view engine", "ejs");
app.set("views", template_path);
app.use(express.json());
routerStd.use(express.json())


// Student Login 
routerStd.get('/studentlogin',studentController.studentLogin);

// Posting Login Detail and Verify
routerStd.post('/studentlogin',studentController.studentLoginPost);

// Student Logout
routerStd.get('/logout',studentController.studentLogout)

// Loading Student Profile
// const stdProfile = fs.readFileSync(`${template_path}/studentProfile.ejs`, "utf-8");
// const navbar = fs.readFileSync(`${template_path}/includes/navlogout.ejs`, "utf-8");
// const replaceVal = (tempVal, orgVal) => {
//     let std = tempVal.replace("{%Name%}", orgVal.sname);
//     std = std.replace("<%- include('includes/navlogout.ejs')%>", navbar);
//     std = std.replace("{%Er%}", orgVal.sid);
//     std = std.replace("{%Email%}", orgVal.email);
//     std = std.replace("{%Address%}", orgVal.address);
//     std = std.replace("{%cgpa%}", orgVal.cgpa);
//     std = std.replace("{%Branch%}", orgVal.branch);
//     std = std.replace("{%MobileNo%}", orgVal.mobileNo);

//     return std;
// }

// routerStd.get('/studentProfile/loaded',studentController.studentProfileLoaded
// (req, res) => {
//     var studentDetail = studentLogin;
//     // console.log(studentDetail.sid);
//     // var arrData = [studentDetail];

//     // const realData = arrData.map((val) => replaceVal(stdProfile, val)).join("");
//     // res.send(realData);
//     res.render("studentProfile", { stdDetails: studentDetail, pageTitle: "Student Profile" });
//     // res.render("studentProfile");

// }
// );

// Student Profile Page
routerStd.get('/studentProfile',studentController.studentProfile
// (req, res) => {
//     var studentDetail = studentLogin;
//     // console.log(studentDetail.sid);
//     // var arrData = [studentDetail];

//     // const realData = arrData.map((val) => replaceVal(stdProfile, val)).join("");
//     // res.send(realData);
//     res.render("studentProfile", { stdDetails: studentDetail, pageTitle: "Student Profile" });
//     // res.render("studentProfile");

// }
);



// Upload The Document
routerStd.get('/upload', (req, res) => {
    res.render('upload')
})

// Company Section of 
routerStd.get('/companysection',studentController.companySection
//  (req, res) => {
//     // console.log(studentLogin)
//     cmpdetail.find({}, function (err, allDetail) {
//         if (err) {
//             console.log(err);
//         }
//         else {
//             res.render("companySec", { details: allDetail, pageTitle: "Company Section" });
//         }
//     }).sort({ cid: 1 });
// }
);

// Getting Information About Comapny
routerStd.get('/companyInfo/:cid', studentController.companyInfo
// (req, res, next) => {
//     cmpdetail.find({ cid: req.params.cid }, function (err, allDetail) {
//         if (err) {
//             console.log(err);
//         }
//         else {
//             res.render("companyDesc", { details: allDetail[0].description, pageTitle: "Company Description" });
//         }
//     });

// }
);


// Applying In Company
routerStd.get('/companyApply/:cid',studentController.applyCompany
//  async (req, res) => {
//     try {
//         cid = parseInt(req.params.cid);
//         console.log(cid)
//         var cemail;
//         var semail;
//         cmpdetail.find({ cid: cid }, function (err, allDetail) {
//             if (err) {
//                 console.log(err);
//             }
//             else {
//                 cemail = allDetail[0].cemail;
//                 // console.log(cemail, cid);
//             }
//         });


//         const a = { "cid": cid, "sid": loginedStudentsId }
//         // console.log(a);
//         studentlogin.find({ sid: loginedStudentsId }, async function (err, allDetail) {
//             if (err) {
//                 console.log(err);
//             }
//             else {
//                 console.log(allDetail);
//                 semail = allDetail[0].email;
//                 // console.log(semail, loginedStudentsId);
//             }
//         });
//         // const details=appliedStd.find({ "sid": loginedStudentsId, "cid": cid }, { cid: 1, sid: 1, _id: 0 });
//         // console.log(details);

//         appliedStd.find({ "sid": loginedStudentsId, "cid": cid }, { cid: 1, sid: 1, _id: 0 }, async function (err, allDetail) {

//             if (allDetail.length == 0) {
//                 var info = { from: semail, to: cemail };
//                 res.render('sendMail', { pageTitle: "Send Mail", info: info });
//                 //     const addStudentAndCompany = new appliedStd({ cid: cid, sid: loginedStudentsId });

//                 //     const saveApplies = await addStudentAndCompany.save();
//                 //     let transporter = await nodemailer.createTransport({
//                 //         host: "smtp.ethereal.email",
//                 //         port: 587,
//                 //         secure: false,
//                 //         auth: {
//                 //             user: "toby.larson10@ethereal.email",
//                 //             pass: "xFjAvzguuuF5pRAgs9",
//                 //         },
//                 //     });

//                 //     let info = await transporter.sendMail({
//                 //         from: `<${semail}>`, // sender address
//                 //         to: `${cemail}`, // list of receivers
//                 //         subject: "Appling for interview", // Subject line
//                 //         text: "Hello my name is xyz, I have read about your company in our website and i would like to join your company.", // plain text body
//                 //         html: "<b> Apply For Company</b>", // html body
//                 //     });

//                 //     console.log("Message sent: %s", info.messageId);

//                 //     res.status(201).redirect('/companysection');

//             }
//             else {
//                 if (allDetail[0].sid == a.sid && allDetail[0].cid == a.cid) {
//                     console.log('already applied');
//                     res.status(201).redirect('/companysection');

//                 }
//             }
//             // }catch(e){
//             // else{
//             //         console.log("No application found");  
//             //         const addStudentAndCompany = new appliedStd({ cid: cid, sid: loginedStudentsId });

//             //         const saveApplies = await addStudentAndCompany.save();
//             //         let transporter = await nodemailer.createTransport({
//             //             host: "smtp.ethereal.email",
//             //             port: 587,
//             //             secure: false,
//             //             auth: {
//             //                 user: "toby.larson10@ethereal.email",
//             //                 pass: "xFjAvzguuuF5pRAgs9",
//             //             },
//             //         });

//             //         let info = await transporter.sendMail({
//             //             from: `<${semail}>`, // sender address
//             //             to: `${cemail}`, // list of receivers
//             //             subject: "Appling for interview", // Subject line
//             //             text: "Hello my name is xyz, I have read about your company in our website and i would like to join your company.", // plain text body
//             //             html: "<b> Apply For Company</b>", // html body
//             //         });

//             //         console.log("Message sent: %s", info.messageId);

//             // res.status(201).redirect('/companysection');

//             // }
//             // }
//             // }
//         });
//         // if (a == b) {
//         //     console.log('already applied')
//         // }
//         // console.log(b);


//         // alert('Mail sented Successfully');
//         // res.status(201).redirect('/companysection');
//     } catch (error) {
//         res.status(400).send(error);
//     }
// }
);

// Sending mail to the company for applying in it
routerStd.post('/sendMail', studentController.sendMail
// async (req, res) => {
//     // console.log(req.body);
//     const addStudentAndCompany = new appliedStd({ cid: cid, sid: loginedStudentsId });

//     const saveApplies = await addStudentAndCompany.save();
//     let transporter = await nodemailer.createTransport({
//         host: "smtp.ethereal.email",
//         port: 587,
//         secure: false,
//         auth: {
//             user: "toby.larson10@ethereal.email",
//             pass: "xFjAvzguuuF5pRAgs9",
//         },
//     });

//     let info = await transporter.sendMail({
//         from: `<${req.body.From}>`, // sender address
//         to: `${req.body.To}`, // list of receivers
//         subject: `${req.body.Subject}`, // Subject line
//         text: `${req.body.Description}`, // plain text body
//         html: `<b> ${req.body.Description}</b>`, // html body
//     });

//     console.log("Message sent: %s", info.messageId);

//     res.status(201).redirect('/companysection');

// }
);
// routerStd.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
// routerStd.post('/selectComp', (req, res) => {
//     // console.log(req.body.name);
//     var c = JSON.stringify(req.body);
//     var d = req.body["r4"];
//     // var a = req.body.r4[0];
//     // var b=req.body.data;
//     // var c = a.split(' ');

//     console.log(d);
//     // res.send(c);
//     // res.send(req.body.name);
// });

// Question Section Of Student
routerStd.get('/QandA', studentController.qAndA
// (req, res) => {
//     const q = req.body;
//     console.log(q);
//     res.render('QandA', { pageTitle: "Question And Answer Section" });
// }
);

// Question Answer Section
routerStd.get('/questionAnswer',studentController.questionAnswer);

// Postiing The Question To database
routerStd.post('/QandA',studentController.qAndAPost 
// async (req, res) => {
//     var q = req.body.question;
//     // console.log(q);
//     if (q.trim() !="") {
//         const question = new queAns({
//             question: req.body.question,
//             answer:""
//         });
//         const submitQue = await question.save();
//     }

//     res.status(200).redirect('/studentProfile');

// }
);

// Getting Info About Accepted Company
routerStd.get('/seeAcceptedCompany',studentController.showAcceptedCompany);


routerStd.get('/editDetails',studentController.editDetails);

routerStd.post('/editDetails',studentController.postEditedDetails);




module.exports = routerStd;



// var transporter = nodemailer.createTransport({
//     host: 'smtp.gmail.com',
//     port: 587,
//     secure:false,
//     auth: {
//     user: 'devkumarpatel20@gnu.ac.in',
//     pass: 'RaJeSh#2106'
//     }
//     });
//     var mailOptions = {
//     from: 'devkumarpatel20@gnu.ac.in',
//     to: 'devrpatel2106@gmail.com',
//     subject: 'Thankyou for contacting!',
//     text: ' Hii ${req.body.username} thanks for contacting. I will touch you soon!'
//     };
//     var mailOptionsSender = {
//     from: 'devkumarpatel20@gnu.ac.in',
//     to: 'devrpatel2106@gmail.com',
//     subject: 'Someone Wants to connect With you !',
//     text:  'Hello  ${req.body.username} wants to connect with you please contact him to further query!'
//     };
//     transporter.sendMail(mailOptions, function(error, info){
//     if (error) {
//     console.log(error);
//     } else {
//     console.log('Email sent: ' + info.response);
//     transporter.sendMail(mailOptionsSender, function(error, info){
//     if (error) {
//     console.log(error);
//     } else {
//     console.log('Email sent: ' + info.response);
//     }
//     });
//     }
//     });
