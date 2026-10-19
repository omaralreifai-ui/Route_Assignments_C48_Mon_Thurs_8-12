import * as userRepositry from '../../user/repository/user.repository.js'
import {usernotexist} from "../../user/error/error.js";
import * as messageRepository from '../../message/repository/message.repository.js'
import {AppError} from "../../../pkg/error/error.js";
export async function  sendmessage (content , receiver , sender) {
  const user = await  userRepositry.finduserbyid(receiver)
if(!user) throw usernotexist ;
return await messageRepository.createMessage(content,receiver,sender) ;


}
export  async function getALlmessages(userID) {

const message = await messageRepository.getAllMessages(userID) ;
if(message.length === 0 ) throw new AppError('not found message' ,404);
return message;
}