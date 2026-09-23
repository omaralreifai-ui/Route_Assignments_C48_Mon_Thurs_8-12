const commentrepo = require('./comment.repo')

async function createbulkcomments(commentsData) {
  return await commentrepo.createbulkcomments(commentsData);
}
async function updatecomment(commentId, userId, content) {
  const comment = await commentrepo.findcommentbyid(commentId);
  if (!comment) {
    throw new Error("comment not found.");
  }
  if (comment.userId !== Number(userId)) {
    throw new Error("You are not authorized to update this comment.");
  }
  return await commentrepo.updatecomment(commentId, content);
}
async function findorcreatecomment(data) {
  const { postId, userId, content } = data;
  const existingComment = await commentrepo.findcommentbyspecs(postId, userId, content);
  if (existingComment) {
    return {
      comment: existingComment,
      created: false
    };
  }
  const newComment = await commentrepo.createcomment(data);
  return {
    comment: newComment,
    created: true
  };
}
async function searchcommentsbyword(word) {
  const result = await commentrepo.searchcommentsbyword(word);

  if (result.comments.length === 0) {
    throw new Error("no comments found.");
  }

  return result;
}
async function getnewestcommentsbypostid(postId) {
  return await commentrepo.getnewestcommentsbypostid(postId);
}
async function getcommentdetailsbyid(id) {
  const comment = await commentrepo.getcommentdetailsbyid(id);

  if (!comment) {
    throw new Error("no comment found");
  }

  return comment;
}
module.exports = { createbulkcomments, updatecomment  ,findorcreatecomment ,searchcommentsbyword ,getnewestcommentsbypostid , getcommentdetailsbyid};
