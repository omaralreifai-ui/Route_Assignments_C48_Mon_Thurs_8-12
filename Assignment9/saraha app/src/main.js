import 'dotenv/config'
import './common/db/mongoose.js'
import {otp} from "./app/auth/model/otp.model.js"

import express from 'express' ;

import authRouter from "./app/auth/auth.route.js"
import * as authcontroller from "./app/auth/controller/auth.controller.js"
import userRoute from"./app/user/user.route.js"
import messageRoute from"./app/message/message.route.js"
import { success } from 'zod';
import { logger } from './common/logger.js/logger.js';
import cors from 'cors'


const app =express() 
app.use(cors({
    origin : 'http://localhost:4200',
    credentials: true
}));
app.use(express.json())

app.use('/auth' ,authRouter);
app.post('/loginWithGmail', authcontroller.loginwithGoogle);
app.use('/user' ,userRoute)
app.use('/message' ,messageRoute)
otp.create({
    code :'123456' ,
    email :'omara@gmail.com' ,
    expiresAt : Date.now() + 30 *10000
}); 
app.use((err , req , res , next) => {
logger.error(err.message , err)
   if(err.inoperational === true)   
   {
    return res.json({
        message : err.message ,
      stack : err.stack ,
     success: false
 
        })
   }
return res.status(500).json({
error :'something went wrong' , succes : false
 })
}) 

app.listen(3000 , () => 
    console.log('server start') 
)