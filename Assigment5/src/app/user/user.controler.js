const { json } = require('express');
const userservice =require('./user.service') ;

async function newuser(req,res) {
    try {
            const {name , email , age ,role} = req.body
            if (!name || !email) {
      return res.status(400).json({ message: 'Name and email are required' });
    }
    await  userservice.newuser({name ,email , age ,role})
    return res.status(201).json({message: 'User added successfully'});


    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
     
}
async function updatauser(req ,res) {
    try{
    const{id} = req.params ;
    await userservice.updatauser(id , req.body) ;
    return res.status(200).json({message: "User created or updated successfully"})
    } catch(err) {
        return res.status(500).json({ message: err.message });
    }
}
async function finduserbyemail(req ,res) {
    try {
        const {email} = req.params
          const user = await userservice.finduserbyemail(email) ;
        res.status(200).json({user});
    } catch(err)
{
    return res.status(404).json({ message: err.message });
}    
}
async function finduserbyid(req, res) {
  try {
    const { id } = req.params; 
    const user = await userservice.finduserbyid(id);
    return res.status(200).json(user);
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
}
module.exports ={newuser , updatauser , finduserbyemail ,finduserbyid};