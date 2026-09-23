const servicepost = require('./post.service') ;
async function  createpost (req ,res) { 
    try {
    const data= req.body ;
     const newpost = await servicepost.createpost(data) ;
     res.status(201).json({ message: "Post created successfully."});

    } catch(err) {
        return res.status(500).json({ message: err.message });
    }
    
}
async function deletepost(req, res) {
  try {
    const { postId } = req.params;
    const { userId } = req.body; 
    await servicepost.deletepost(postId, userId);

    return res.status(200).json({ message: "Post deleted." });
  } catch (err) {
    if (err.message === "Post not found.") {
      return res.status(404).json({ message: err.message });
    }
    if (err.message === "You are not authorized to delete this post.") {
      return res.status(403).json({ message: err.message });
    }
    return res.status(500).json({ message: err.message });
  }
}
async function getpostsdetails(req, res) {
  try {
    const posts = await servicepost.getpostsdetails();
    return res.status(200).json(posts);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}
async function getpostscommentcount(req, res) {
  try {
    const posts = await servicepost.getpostscommentcount();
    return res.status(200).json(posts);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}
module.exports= {createpost ,deletepost  ,getpostsdetails ,getpostscommentcount};