const express = require('express');
const router = express.Router();
const commentcontroler = require('./comment.controler');

router.post('/comments', commentcontroler.createbulkcomments);
router.patch('/comments/:commentId', commentcontroler.updatecomment);
router.post('/comments/find-or-create', commentcontroler.findorcreatecomment);
router.get('/comments/search', commentcontroler.searchcommentsbyword);
router.get('/comments/newest/:postId', commentcontroler.getnewestcommentsbypostid);
router.get('/comments/details/:id', commentcontroler.getcommentdetailsbyid);
module.exports = router;