
import {model , Schema} from 'mongoose' ;
const messagesSchems =new Schema({
    msgID : {type : Schema.Types.ObjectId, ref: 'Message' ,required: true},
    sender : {type : Schema.Types.ObjectId, ref: 'User'  , required: true},
},{timestamps:true});
const schema = new Schema({
    sender : {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true ,

    } ,
    receiver : {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    } ,
    message : [messagesSchems]

} , {timestamps : true});
export const Conversation = model('Conversation', schema);