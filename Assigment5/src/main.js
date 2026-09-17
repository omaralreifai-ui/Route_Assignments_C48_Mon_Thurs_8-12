const express = require('express') ;
const app =express() ;
const {config} =require('dotenv') ;
const userRouter = require('./app/user/user.router');
const postRouter = require('./app/post/post.router');
const commentRouter = require('./app/comment/comment.router');
config();
app.use(express.json());
app.use('/', userRouter);
app.use('/', postRouter);
app.use('/', commentRouter);
app.listen(3000,()=> {
    console.log('done server')
})