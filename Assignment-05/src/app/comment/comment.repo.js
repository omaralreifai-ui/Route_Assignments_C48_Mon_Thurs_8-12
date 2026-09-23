const prisma = require('../db/prisma');

async function createbulkcomments(commentsData) {
  return await prisma.comment.createMany({
    data: commentsData
  });
}
async function findcommentbyid(commentId) {
  return await prisma.comment.findUnique({
    where: { id: Number(commentId) }
  });
}

async function updatecomment(commentId, content) {
  return await prisma.comment.update({
    where: { id: Number(commentId) },
    data: { content }
  });
}
async function findcommentbyspecs(postId, userId, content) {
  return await prisma.comment.findFirst({
    where: {
      postId: Number(postId),
      userId: Number(userId),
      content: content
    }
  });
}

async function createcomment(data) {
  return await prisma.comment.create({
    data: {
      content: data.content,
      post: { connect: { id: Number(data.postId) } },
      user: { connect: { id: Number(data.userId) } }
    }
  });
}
async function searchcommentsbyword(word) {
  const whereClause = {
    content: {
      contains: word,
      mode: 'insensitive' 
    }
  };

  const comments = await prisma.comment.findMany({
    where: whereClause
  });

  const count = await prisma.comment.count({
    where: whereClause
  });

  return { count, comments };
}
async function getnewestcommentsbypostid(postId) {
  return await prisma.comment.findMany({
    where: {
      postId: Number(postId)
    },
    orderBy: {
      createdAt: 'desc' 
    },
    take: 3, 
    select: {
      id: true,
      content: true,
      createdAt: true
    }
  });
}
async function getcommentdetailsbyid(id) {
  return await prisma.comment.findUnique({
    where: {
      id: Number(id)
    },
    select: {
      id: true,
      content: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true
        }
      },
      post: {
        select: {
          id: true,
          title: true,
          content: true
        }
      }
    }
  });
}
module.exports = { createbulkcomments, findcommentbyid, updatecomment  , findcommentbyspecs, createcomment , searchcommentsbyword ,getnewestcommentsbypostid , getcommentdetailsbyid};
