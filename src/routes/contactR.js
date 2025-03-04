const con_r = require('express').Router();
const con_cont = require('../controllers/contact');

//Contact GETS

//Contact POST
con_r.post('/', con_cont.sendEmail);

//Contact PUT

//Contact DEL

module.exports = con_r;