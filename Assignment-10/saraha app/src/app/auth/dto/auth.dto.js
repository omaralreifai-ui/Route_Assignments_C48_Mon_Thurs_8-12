import { z } from 'zod'
export const  reqisterDTO = z.object({
    email : z.email().lowercase().trim() ,
    name : z.string().min(2).max(20).trim() ,
    password : z.string().min(6).max(20).trim() ,   
    provider : z.enum(['local' , 'google' , 'facebook']).default('local') ,
      dob :z.date().optional(),
      gender : z.enum(['male' , 'female' , 'other']).optional() ,

})

export const verifyDTO = z.object({
    email : z.email().lowercase().trim() ,
    code : z.string().length(6).trim() ,
})
export const loginDTO =z.object({
    email :z.email().lowercase().trim() ,
    password : z.string().min(2).max(20).trim() , 
})
export const sendDTO = z.object({
email: z.email().lowercase().trim() ,

}) ;
export const resetPasswordDTO = z.object({
email: z.email().lowercase().trim() ,
code : z.string().length(6).trim() ,
newpassword : z.string().min(6).max(20).trim() ,
});