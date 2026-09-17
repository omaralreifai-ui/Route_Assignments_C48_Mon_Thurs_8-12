const postrepo = require('./post.repo');

async function createpost(data) {
  return await postrepo.createpost(data);
}

async function deletepost(postId, userId) {
  const find = await postrepo.findpostbyid(postId);
  if (!find) {
    throw new Error("Post not found.");
  }
  const ownerId = find.userId || find.authorId;
  if (ownerId !== Number(userId)) {
    throw new Error("You are not authorized to delete this post.");
  }
  return await postrepo.deletepost(postId);
}
async function getpostsdetails() {
  return await postrepo.getpostsdetails();
}
async function getpostscommentcount() {
  return await postrepo.getpostscommentcount();
}

module.exports = { createpost, deletepost ,getpostsdetails , getpostscommentcount };