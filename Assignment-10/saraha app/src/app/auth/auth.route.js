import {Router} from "express" ;
import * as authcontroller from './controller/auth.controller.js'
import {idempotency} from "../../lib/idempotency/idempotency.js";
const authRouter = Router()
export default authRouter ;
authRouter.patch('/verify_account' , authcontroller.verifyAccount)
authRouter.post('/register' , authcontroller.register)
authRouter.post('/login' ,authcontroller.login) ;
authRouter.post('/forgotpassword' , authcontroller.forgotpassword);
authRouter.patch('/resetpassword' , idempotency(),authcontroller.resetpassword);
authRouter.post('/loginWithGmail' ,authcontroller.loginwithGoogle);
authRouter.post('/login-with-google' ,authcontroller.loginwithGoogle);

  