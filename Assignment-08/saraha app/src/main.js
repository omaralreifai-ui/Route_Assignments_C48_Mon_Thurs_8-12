import 'dotenv/config'
import './common/db/mongoose.js'
import {otp} from "./app/auth/model/otp.model.js"

import express from 'express' ;

import authRouter from "./app/auth/auth.route.js"
import userRoute from"./app/user/user.route.js"
import messageRoute from"./app/message/message.route.js"


const app =express() 
app.use(express.json())

app.use('/auth' ,authRouter);
app.use('/user' ,userRoute)
app.use('/message' ,messageRoute)
app.listen(3000 , () =>
    console.log('server start') 
)
