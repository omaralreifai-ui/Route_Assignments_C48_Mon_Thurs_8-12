
const prisma = require('../db/prisma');

async function createpost(data) {
  return await prisma.post.create({
    data: {
      title: data.title,
      content: data.content,
      user: {
        connect: { id: Number(data.authorId) }
      }
    }
  });
}
async function findpostbyid(postId) {
   return await prisma.post.findUnique({where :  { id: Number(postId)}})
}
async function deletepost (postId) {
   return await prisma.post.delete({ where : {id : Number(postId)}})
}
async function getpostsdetails() {
  return await prisma.post.findMany({
    select: {
      id: true,
      title: true,
      user: {
        select: {
          id: true,
          name: true
        }
      },
      comments: {
        select: {
          id: true,
          content: true
        }
      }
    }
  });
}
async function getpostscommentcount() {
  const posts = await prisma.post.findMany({
    select: {
      id: true,
      title: true,
      _count: {
        select: { comments: true }
      }
    }
  });

  return posts.map(post => ({
    id: post.id,
    title: post.title,
    commentCount: post._count.comments
  }));
}
module.exports = { createpost ,findpostbyid , deletepost   ,getpostsdetails, getpostscommentcount} ;