import {model, Schema} from  "mongoose"
const messageschema = Schema(
    {
        content : {
            type : String ,
            required :true ,
            minlength  :1 ,
            maxlength :200 ,
            trim : true 
        } ,
        receiver : {
            type :String ,
            ref : 'user' ,
            required :true   } ,
            sender : 
            {
                type : Schema.Types.ObjectId ,
                ref :"user"
            } , 
            isDeleted : {
                type :Boolean ,
                default :false
            } ,
    } ,
    {
        timestamps : {
            createdAt :true ,
            updatedAt : true
        }
    }
)
export const message = model('message'  , messageschemam) ;
 