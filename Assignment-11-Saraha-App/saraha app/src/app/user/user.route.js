import {Router} from "express"
import {withaCache} from "../../lib/cache/withCache.js";
import {user} from "./model/user.model.js";
import {uploadSingleFile} from "../../lib/multer/multer.js";
import * as Usercontroller from './controller/user.controller.js';
import {guard} from "../../lib/AUTH/guard.js";

const userRouter = Router();

userRouter.get('/alluser',
    withaCache(),
    async (req, res, next) => {
        const data = await user.find();
        res.json(data);
    }
)

userRouter.post('/upolad', uploadSingleFile('photo'), (req, res) => {
    console.log(req.file);
    res.json('ok')
})

userRouter.post('/reqidentity', guard, Usercontroller.reqidentity);
userRouter.get('/getAllreq' , guard , Usercontroller.getAllreq);
userRouter.patch('/RespondToIdentityRequest' , Usercontroller.RespondToIdentityRequest)
userRouter.post('/conversation/:conversationId/message', guard, Usercontroller.sendMessageInConversation);
userRouter.get('/conversation/:conversationId', guard, Usercontroller.getConversation);

export default userRouter;
