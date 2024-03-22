const express = require('express');
const { CreateBlog, updateBlog, deleteBlog, allblog, singleblog, search, likes } = require('../Controller/blogController');
const { upload } = require('../helper/multer');
const { verifyToken } = require('../helper/JWTverify');
const { commentController, updateCommment, deleteComment } = require('../Controller/commentController');
const blogRouter = express.Router();

blogRouter.post('/createBlog',upload.single("blogpic"), CreateBlog)
blogRouter.put('/updateb',upload.single("blogpic"),updateBlog)
blogRouter.delete('/delete:id',verifyToken,deleteBlog)
blogRouter.get('/allblog',allblog)
blogRouter.get('/single',singleblog)
blogRouter.get('/search',search)

blogRouter.post('/comment/:id',commentController)
blogRouter.post('/updatecomment',updateCommment)
blogRouter.post('/deletecomment',deleteComment)
blogRouter.put('/like/:id',likes)


module.exports = {blogRouter}