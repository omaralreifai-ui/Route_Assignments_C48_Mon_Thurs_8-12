import { error } from 'console';
import { sendemail } from '../../../common/email/nodemailler.js';
import  * as authrepository from '../repository/auth.repository.js'
import  * as otpepository from '../repository/otp.repository.js'
import * as userrepository from '../../user/repository/user.repository.js'
import bcrypt from 'bcrypt'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import { otp } from '../model/otp.model.js';
export async function register(userData) {
const userexist = await authrepository.checkuserexistbyemail(userData.email) ;
if(userexist)
    throw new Error('user already exist')

userData.password =  await bcrypt.hash(userData.password , 10) 
const createuser =   await authrepository.createuser(userData);
const  otp = crypto.randomInt(100000,900000).toString();
const otpData = await otpepository.saveotp({
    code : otp ,
    email : userData.email ,
  expiresAt: new Date(Date.now() + 5 * 60 * 1000)  
})
sendemail(
  userData.email ,
  "verify your account" ,
  `<h1>verify your account</h1>
  <p>your code is ${otp}</p>
  <p>please check your email</p>
  `
)
return createuser ;
}
export async  function verifyAccount  (email ,code) {
  const user = await authrepository.checkuserexistbyemail(email);
  if(!user)  throw new Error('user not found') ;
  if(user.isVerified ===true) throw new Error('user already verified') ;
  const otp = await otpepository.getotpbyemail(email) ;
  if(!otp) throw new Error ('OTP expired, please resend OTP') ;
if(otp.code !== code) throw new Error('invalid code') ;

 const updateUser = await userrepository.updateUser(email , {isVerified :true}) ;
const deleteotp = await otpepository.deleteotp(email) ;
return updateUser ;
}
export async function login(email , password) {
   const user =await authrepository.checkuserexistbyemail(email) ;
   if(!user) throw new Error('user not exist') ;
   if(user.isVerified ===false) throw new Error('user not verified') ;
   const matchpassword = await bcrypt.compare(password ,user.password) ;
   if(!matchpassword)  throw new error('password not match') ;
   const token = jwt.sign({id :user._id ,email :user.email, namme:user.name} ,process.env.JWT_SECRET,{expiresIn: '1h'});
   return token ;
}
export async function forgotpassword(email) {
 const user = await authrepository.checkuserexistbyemail(email) ;
 if(!user) throw new Error('user not found') ;
await otpepository.deleteotp(email) ;
const otp = crypto.randomInt(100000,900000).toString();
await otpepository.saveotp({
    code : otp ,
    email : email ,
  expiresAt: new Date(Date.now() + 5 * 60 * 1000)
}) ;
sendemail(
  email , 
  "reset your password" ,
  `<h1>reset your password</h1>
  <p>your code is ${otp}<p>`
  
)

}