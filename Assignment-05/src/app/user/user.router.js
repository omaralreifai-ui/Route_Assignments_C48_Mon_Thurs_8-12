const express = require('express') ;
const router = express.Router() ;
const usercontroler =require('./user.controler');
router.post('/users/signup' , usercontroler.newuser);
router.put('/users/:id', usercontroler.updatauser);
router.get('/users/by-email/:email', usercontroler.finduserbyemail);
router.get('/users/:id', usercontroler.finduserbyid);
module.exports =router;