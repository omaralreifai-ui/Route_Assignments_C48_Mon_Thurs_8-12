import {user}  from '../../user/model/user.model.js'
export    async function checkuserexistbyemail(email) {
     return await user.findOne({email}) ;

}
export async  function createuser (userData) {
    return await user.create(userData)
}