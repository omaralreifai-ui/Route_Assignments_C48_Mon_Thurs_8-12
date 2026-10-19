import {AppError} from "../../pkg/error/error.js";
import jwt from "jsonwebtoken";

export function guard(req , res ,next) {
    try {
        const token = req.cookies.token ;
        if(!token) throw new AppError('np token provided' ,403) ;
        req.user = jwt.verify(token , process.env.JWT_SECRET) ;
        next() ;
    }
    catch(err){next(err)}
}