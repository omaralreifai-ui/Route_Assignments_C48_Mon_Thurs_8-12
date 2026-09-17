const prisma = require('../db/prisma');
async function findByemail(email) {
 
  return await prisma.user.findUnique({
    where: { email: email }
  });
}

async function createuser(data) {
  return await prisma.user.create({
    data: data
  });
}
async function updateuser(UserId ,updatedata) {
    return prisma.user.update({where :{id:Number(UserId)},
    data : updatedata
});
}
async function finduserbyemail(email) {
    return await prisma.user.findUnique({where : {email :email}
    });
}async function finduserbyid(id) {
  return await prisma.user.findUnique({
    where: { id: Number(id) }, 
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      updatedAt: true
    }
  });
}

module.exports = { findByemail, createuser , updateuser  ,finduserbyemail,finduserbyid};