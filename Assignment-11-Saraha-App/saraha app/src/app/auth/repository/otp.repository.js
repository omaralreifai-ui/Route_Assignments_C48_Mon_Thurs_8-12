import { otp } from '../model/otp.model.js' ;
export async function saveotp(otpData) {
    return await otp.create(otpData) ;
    
}
  export async function getotpbyemail(email) {
    return await otp.findOne({ email : email }) ;
}
export async function deleteotp(email) {
    return await otp.deleteMany({ email : email }) ;
}