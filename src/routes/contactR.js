const con_r = require('express').Router();
const con_cont = require('../controller/contact');

//Contact GETS

//Contact PUTS
con_r.get('/', con_cont.sendEmail);

module.exports = con_r;