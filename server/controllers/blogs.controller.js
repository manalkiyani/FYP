/*jshint esversion: 6 */
const Blog = require('../models/Blog');
const mongoose = require('mongoose');

function postBlog(req, res) {
    if (! req.body.title || ! req.body.readingTime || ! req.body.description || ! req.body.writer) {
        return res.status(400).json({message: 'Please fill all the required fields'});
    }
    let date_ob = new Date();
    // current date
    // adjust 0 before single digit date
    let date = ("0" + date_ob.getDate()).slice(-2);
    // current month
    let month = ("0" + (
        date_ob.getMonth() + 1
    )).slice(-2);
    // current year
    let year = date_ob.getFullYear();

    const blog = new Blog({
    _id: mongoose.Types.ObjectId(),
        title: req.body.title,
        tagline: req.body.tagline,
        tags:req.body.tags,
        image:req.body.image,
        readingTime: req.body.readingTime,
        writer: req.body.writer,
        rating: {
            stars: 0,
            count: 0
        },
        bookmarks: 0,
        shares: 0,

        publishedDate: date + "-" + month + "-" + year,
        description: req.body.description
    });
    return blog.save().then((newBlog) => {
        return res.status(201)
        .json({
          success: true, 
          message: 'New blog created successfully', 
          Blog: newBlog});
    }).catch((error) => {
        res.status(500).json({success: false, message: 'Server error. Please try again.', error: error.message});
    });
}
function getBlogs(req,res){
    Blog.find().populate('image')
    .then((allBlogs) => {
        return res.status(200)
    .json({
      success: true, 
      message: 'A list of all blogs', 
      Blog: allBlogs});
    }).catch((err) => {
        return res.status(500)
        .json({success: false, message: 'Server error. Please try again.', error: err.message});
    });
}
function getBlog(req, res) {
  const id = req.params.blogId;
  Blog.findById(id)
    .then((blog) => {
      res.status(200).json({
        success: true,
        message: `More on ${blog.title}`,
        Blog: blog,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: 'This cause does not exist',
        error: err.message,
      });
   });
}
function updateBlog(req,res){
   const id = req.params.blogId;
   const blogObject = req.body;
  Blog.findOneAndUpdate({ _id:id }, { $set:blogObject })
    .exec()
    .then(() => {
      res.status(200).json({
        success: true,
        message: 'Blog is updated',
        Blog: blogObject,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: 'Server error. Please try again.'
      });
    });
}
 function deleteBlog(req, res) {
  const id = req.params.blogId;
  Blog.findByIdAndRemove(id)
    .exec()
    .then(()=> res.status(204).json({
      messsage:'Blog successfully deleted',
      success: true,
    }))
    .catch((err) => res.status(500).json({
      success: false,
    }));
}
module.exports={
   getBlogs,
   postBlog,
   getBlog,
   updateBlog,
   deleteBlog

};