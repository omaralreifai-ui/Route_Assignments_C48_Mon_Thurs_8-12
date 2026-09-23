import {Router} from "express" ;
import * as authcontroller from './controller/auth.controller.js'
const authRouter = Router()
export default authRouter ;
authRouter.patch('/verify_account' , authcontroller.verifyAccount)
authRouter.post('/register' , authcontroller.register)
authRouter.post('/login' ,authcontroller.login) ;
authRouter.post('/forgotpassword' , authcontroller.forgotpassword);

