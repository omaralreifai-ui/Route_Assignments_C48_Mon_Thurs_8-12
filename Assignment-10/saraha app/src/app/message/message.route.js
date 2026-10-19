import {Router} from "express" ;
import * as messageController from '../message/controller/message.controller.js';
import {guard} from "../../lib/AUTH/guard.js";
const messageRouter = Router()
messageRouter.post('/' ,messageController.sendmessage) ;
messageRouter.post('/public', guard ,messageController.sendmessage);

messageRouter.get('/getallmessage' , guard , messageController.getAllmessage) ;
export default messageRouter ;