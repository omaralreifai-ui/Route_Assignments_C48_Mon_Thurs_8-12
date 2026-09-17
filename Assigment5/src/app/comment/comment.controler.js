const commentservice = require('./comment.service');

async function createbulkcomments(req, res) {
  try {
    const { comments } = req.body; 
    
    await commentservice.createbulkcomments(comments);
    
    return res.status(201).json({ message: "comments created." });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}
async function updatecomment(req, res) {
  try {
    const { commentId } = req.params;
    const { userId, content } = req.body;

    await commentservice.updatecomment(commentId, userId, content);

    return res.status(200).json({ message: "Comment updated." });
  } catch (err) {
    if (err.message === "comment not found.") {
      return res.status(404).json({ message: err.message });
    }
    if (err.message === "You are not authorized to update this comment.") {
      return res.status(403).json({ message: err.message });
    }
    return res.status(500).json({ message: err.message });
  }
}
async function findorcreatecomment(req, res) {
  try {
    const data = req.body;
    const result = await commentservice.findorcreatecomment(data);
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}
async function searchcommentsbyword(req, res) {
  try {
    const { word } = req.query; 
    const result = await commentservice.searchcommentsbyword(word || "");

    return res.status(200).json(result);
  } catch (err) {
    if (err.message === "no comments found.") {
      return res.status(404).json({ message: err.message });
    }
    return res.status(500).json({ message: err.message });
  }
}
async function getnewestcommentsbypostid(req, res) {
  try {
    const { postId } = req.params;
    const comments = await commentservice.getnewestcommentsbypostid(postId);

    return res.status(200).json(comments);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}
async function getcommentdetailsbyid(req, res) {
  try {
    const { id } = req.params;
    const comment = await commentservice.getcommentdetailsbyid(id);

    return res.status(200).json(comment);
  } catch (err) {
    if (err.message === "no comment found") {
      return res.status(404).json({ message: err.message });
    }
    return res.status(500).json({ message: err.message });
  }
}
module.exports = { createbulkcomments, updatecomment ,findorcreatecomment  ,searchcommentsbyword , getnewestcommentsbypostid, getcommentdetailsbyid} ;
