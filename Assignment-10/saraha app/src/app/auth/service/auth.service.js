
import { sendemail } from '../../../lib/email/nodemailler.js';
import  * as authrepository from '../repository/auth.repository.js'
import  * as otpepository from '../repository/otp.repository.js'
import * as userrepository from '../../user/repository/user.repository.js'
import bcrypt from 'bcrypt'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import { otp } from '../model/otp.model.js';
import { invalidcode, otpexpired, passwordnotmatch } from '../error.js';
import { userAlreadyVerified, usernotexist, usernotVerified } from '../../user/error/error.js';
import { userexist1 } from '../../user/error/error.js';
import { generateToken } from '../utils/token.js';
import { comparepassword, hashpassword } from '../utils/hash.js';
import {OAuth2Client} from "google-auth-library";
import { verifyGoogletoken } from "../../../lib/utils/google-auth.js";

import {mailjetprovider} from "../../../pkg/email/init.js";
import { cacheprovider } from '../../../lib/cache/init.js';
export async function register(userData) {
const userexist = await authrepository.checkuserexistbyemail(userData.email) ;
if(userexist)
    throw userexist1;

userData.password = await hashpassword(userData.password);
const createuser =   await authrepository.createuser(userData);
const  otp = crypto.randomInt(100000,900000).toString();
const otpData = await otpepository.saveotp({
    code : otp ,
    email : userData.email ,
  expiresAt: new Date(Date.now() + 5 * 60 * 1000)  
})
mailjetprovider.sendemail(
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
  if(!user)  throw usernotexist;
  if(user.isVerified ===true) throw userAlreadyVerified ;
  const otp = await otpepository.getotpbyemail(email) ;
  if(!otp) throw otpexpired;
if(otp.code !== code) throw invalidcode;

 const updateUser = await userrepository.updateUser(email , {isVerified :true}) ;
const deleteotp = await otpepository.deleteotp(email) ;
return updateUser ;
}
export async function login(email , password) {
   const user =await authrepository.checkuserexistbyemail(email) ;
   if(!user) throw usernotexist ;
   if(user.isVerified ===false) throw usernotVerified ;
   const matchpassword =  await comparepassword(password , user.password );
   if(!matchpassword)  throw passwordnotmatch ;
  return generateToken({id :user._id ,email :user.email, name:user.name})
}
export async function forgotpassword(email) {
 const user = await authrepository.checkuserexistbyemail(email) ;
 if(!user) throw  usernotexist ;

await otpepository.deleteotp(email) ;
await cacheprovider.del(`otp:${email}`) ;

const otp = crypto.randomInt(100000,900000).toString();

await otpepository.saveotp({
    code : otp ,
    email : email ,
 expiresAt: Date.now() + 5 * 60 * 1000
}) ;

await cacheprovider.set(`otp:${email}`, otp, 300) ;

mailjetprovider.sendemail(
  email , 
  "reset your password" ,
  `<h1>reset your password</h1>
  <p>your code is ${otp}<p>`
  
)

}
export async function resetpassword(email, code, newpassword) {
  const cachedOtp = await cacheprovider.get(`otp:${email}`);

  if (cachedOtp) {
    if (cachedOtp !== code) throw invalidcode;
  } else {

    const otpFromDB = await otpepository.getotpbyemail(email);
    if (!otpFromDB) throw otpexpired;
    if (otpFromDB.code !== code) throw invalidcode;
  }
  const hash = await hashpassword(newpassword);
  await userrepository.updateUser(email, { password: hash });
  await otpepository.deleteotp(email);
  await cacheprovider.del(`otp:${email}`);
}


export  async  function loginwithGoogle(idToken) {
   const payload =   await verifyGoogletoken(idToken) ;
    const user = await authrepository.checkuserexistbyemail(payload.email) ;
    if(user) {
        return generateToken({
            id : user._id ,
            email : user.email,

        });
    }
    const safeName = (payload.name && payload.name.trim().length >= 3) 
        ? payload.name.trim().slice(0, 20) 
        : (payload.email ? payload.email.split('@')[0].slice(0, 20) : 'Google User');
    const createuser = await authrepository.createuser({
        name : safeName ,
        email : payload.email,
        provider : "google" ,
        isVerified:true,
    })

return generateToken({
    id : createuser._id ,
    email : createuser.email ,

})


}
