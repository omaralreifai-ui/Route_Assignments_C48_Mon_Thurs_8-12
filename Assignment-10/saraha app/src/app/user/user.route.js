import {Router} from "express"
import {withaCache} from "../../lib/cache/withCache.js";
import {user} from "./model/user.model.js";
import {uploadSingleFile} from "../../lib/multer/multer.js";
const userRouter = Router();
userRouter.get('/alluser' ,
    withaCache(),
    async (req ,res ,next) =>{
    const data =  await user.find();
    res.json(data);
    }
)
userRouter.post('/upolad' ,uploadSingleFile('photo') , (req ,res) => {
    console.log(req.file);
    res.json('ok')
})
export default userRouter;