const express = require('express');
const { postBlog,getBlogs,getBlog,updateBlog,deleteBlog,getListOfBlogs } =require('../controllers/blogs.controller');

const router = express.Router();

router.post('/', postBlog);
router.get('/',getBlogs);
router.get('/:blogId',getBlog)
router.post('/get',getListOfBlogs)
router.patch('/:blogId',updateBlog)
router.delete('/:blogId',deleteBlog)


module.exports = router;