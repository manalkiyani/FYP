const express = require('express');
const { postBlog,getBlogs,getBlog,updateBlog,deleteBlog,getListOfBlogs,bookmarkBlog,getBookmarkedBlogs } =require('../controllers/blogs.controller');

const router = express.Router();

router.post('/', postBlog);
router.get('/',getBlogs);
router.get('/:blogId',getBlog)
router.post('/bookmarkedBlogs',getBookmarkedBlogs)
router.post('/get',getListOfBlogs)
router.post('/bookmark/:blogId',bookmarkBlog)
router.patch('/:blogId',updateBlog)
router.delete('/:blogId',deleteBlog)



module.exports = router;