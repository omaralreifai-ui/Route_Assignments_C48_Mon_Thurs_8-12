import * as authservice from '../service/auth.service.js'

export async function register(req , res , next) {
    try {
const createuser = await authservice.register(req.body);
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
    const {email , code} = req.body ;
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
        const {email , password} = req.body ;
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
        const {email} = req.body ;
        const newotp  =  await authservice.forgotpassword(email) ;
        res.status(200).json({
            message :'OTP sent successfully check your email' ,
            success :true ,
           
        })
    } catch(err) {
        next(err)
    }
}