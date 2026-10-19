import * as messageserver from '../service/message.service.js';
import {validate} from '../../../lib/validation/validation.js'
import {user} from "../../user/model/user.model.js";
import {seendMessageDTO} from "../../user/dto/message.dto.js";
export async function sendmessage(req ,res , next) {
    try{
const data =  validate(seendMessageDTO ,req.body) ;
const{content,receiver} = data ;
const sender = req.user?.id
 const createMessage = await       messageserver.sendmessage(content,receiver,sender,receiver);
res.status(201).json({
    message   :' message created successfully',
    success : true ,
    data : createMessage
})
    }catch(err){
        return next(err);
    }
}
export async function  getAllmessage(req,res,next) {
    try {
const message = await messageserver.getALlmessages(req.user.id) ;
res.json({
    message : "ok",
    success : true ,
    data : message ,
})

    }catch(err) {
        next(err);
    }
}