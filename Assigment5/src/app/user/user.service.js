const userrepo = require('./user.repo');
async function newuser  (userdata) {
    const existing = await userrepo.findByemail(userdata.email) ;
    if(existing) {
        throw new Error ("useralready exists");

    }
    return await userrepo.createuser(userdata) ;

} 
async function updatauser (id ,userdata) {
    const exist = await userrepo.updateuser(id , userdata) ;
    if(!exist) {
        throw new Error ("user not found ")
    }
    return await  userrepo.updateuser(id ,userdata) ;
}
async function finduserbyemail(email) {
    const existing  = await userrepo.finduserbyemail(email) ;
    if(!existing) {
        throw new Error('email not found')
    } return existing ;
    
}
async function finduserbyid(id) {
  const user = await userrepo.finduserbyid(id);
  if (!user) {
    throw new Error('no user found'); 
  }
  return user;
}
module.exports = {newuser , updatauser ,finduserbyemail ,finduserbyid};
