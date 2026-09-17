   const express  =require('express');
   const router = express.Router();
const postcontoler  =require('./post.controler') ;
router.post('/posts' ,postcontoler.createpost) ;
router.delete('/posts/:postId', postcontoler.deletepost);
router.get('/posts/details', postcontoler.getpostsdetails);
router.get('/posts/comment-count', postcontoler.getpostscommentcount);
module.exports =router; 