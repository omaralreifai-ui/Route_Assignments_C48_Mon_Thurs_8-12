
import{user} from '../model/user.model.js'
export async function updateUser(email ,updateData) {
   return await  user.findOneAndUpdate (
        {email :email} ,
        updateData ,
        {returnDocument :`after`}
    )
}
export async function finduserbyid(id)  {
  return   user.findById(id) ;
} {}