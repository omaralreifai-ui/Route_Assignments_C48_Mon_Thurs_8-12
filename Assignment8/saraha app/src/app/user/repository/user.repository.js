
import{user} from '../model/user.model.js'
export async function updateUser(email ,updateData) {
   return await  user.findOneAndUpdate (
        {email :email} ,
        {isVerified :true} ,
        {returnDocument :`after`}
    )
}