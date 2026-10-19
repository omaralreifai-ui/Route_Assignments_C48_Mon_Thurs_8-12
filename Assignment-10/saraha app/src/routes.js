
import {Router} from 'express';
import authRouter from "./app/auth/auth.route.js";
import userRoute from "./app/user/user.route.js";
import messageRoute from "./app/message/message.route.js";
export const router  = Router();
router.use('/auth' ,authRouter);
router.use('/user' ,userRoute);
router.use('/message' ,messageRoute);


