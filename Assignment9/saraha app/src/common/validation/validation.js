import {z} from 'zod'
import {AppError} from "../error/error.js";

export function validate(dto ,body) { 

 const result = dto.safeParse(body) ;
 if(result.success === false) {
const errmessage = result.error.issues.map(issue => `${issue.path[0]} : ${issue.message}`);
throw new AppError( errmessage.join(', '),400)
 }
 return  result.data ;
 
}