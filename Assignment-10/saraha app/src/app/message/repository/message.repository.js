import {message} from "../model/message.model.js";

export  async  function  createMessage(content , receiver , sender){
    return message.create( {
content: content,
        sender: sender,
        receiver: receiver,
    })
}
export async function getAllMessages(userID) {

         return  message.find({
             receiver : userID
         } , {} , {populate : {path :"sender",select: "-password"}})

}