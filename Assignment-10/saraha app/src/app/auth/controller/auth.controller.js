import { validate } from '../../../lib/validation/validation.js';
import { loginDTO, reqisterDTO, resetPasswordDTO, sendDTO, verifyDTO } from '../dto/auth.dto.js';
import * as authservice from '../service/auth.service.js'

export async function register(req , res , next) {
    try {
  const data = validate(reqisterDTO    , req.body) ;
const createuser = await authservice.register(data);
res.status(201).json({
    message :'user created successfully' ,
    success :true ,
    data : createuser
});
    
} 
catch(err) {
next(err)

}
}
export async function verifyAccount(req , res , next) {

try {
    const data = validate(verifyDTO, req.body) ;
    const {email , code} = data ;
    const updateUser = await authservice.verifyAccount(email , code);
    res.status(200).json({
        message :'user verified successfully' ,
        success :true ,
        data : updateUser
    })

}catch(err) 
{
    next(err)
}

}
export async function login(req ,res , next) {
    try {
        const data = validate(loginDTO , req.body) ;
        const {email , password} = data ;
const login = await authservice.login(email , password) ;
  res.cookie('token' ,login , {
    httpOnly :true ,
    maxage :60 * 60 * 1000 ,
  })
res.status(200).json({
    message : 'login successfully' ,
    success :true ,

})
    } catch(err) {
        next(err)
    }
}
export async function forgotpassword(req , res , next) {
    try {
        const data = validate(sendDTO, req.body) ;
        const {email} = data ;
        const newotp  =  await authservice.forgotpassword(email) ;
        res.status(200).json({
            message :'OTP sent successfully check your email' ,
            success :true ,
           
        })
    } catch(err) {
        next(err)
    }
}
export async function resetpassword(req ,res , next) {
    try {
        const data = validate(resetPasswordDTO, req.body) ;
const{email ,code ,newpassword} = data ;
 await authservice.resetpassword(email , code , newpassword) ;
 res.json({
message :'password reset successfully' ,
success :true ,
 }) 
    }catch(error) {
next(error)
     }
}
export async  function loginwithGoogle(req ,res , next) {
    try{
 const token = await authservice.loginwithGoogle(req.body.idToken);
 res.cookie('access_token',token,{
     httpOnly :true ,maxAge :60 * 60 * 1000 ,

 });
res.json({message:"user login successfully" ,success :true });
    }
    catch(err){
        next(err)
    }
}