/*jshint esversion: 6 */
const Blog = require("../models/Blog");
const User = require("../models/User");
const mongoose = require("mongoose");

function postBlog(req, res) {
  if (!req.body.title || !req.body.description || !req.body.image) {
    return res
      .status(500)
      .json({ message: "Please fill all the required fields" });
  }
  let date_ob = new Date();
  // current date
  // adjust 0 before single digit date
  let date = ("0" + date_ob.getDate()).slice(-2);
  // current month
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  // current year
  let year = date_ob.getFullYear();

  const blog = new Blog({
    _id: mongoose.Types.ObjectId(),
    title: req.body.title,
    tagline: req.body.tagline,
    tags: req.body.tags,
    image: req.body.image,
    readingTime: req.body.readingTime,
    writer: req.body.writer,
    rating: {
      stars: 0,
      count: 0,
    },
    bookmarks: 0,
    shares: 0,

    publishedDate: date + "-" + month + "-" + year,
    description: req.body.description,
  });
  return blog
    .save()
    .then((newBlog) => {
      return res.status(201).json({
        success: true,
        message: "New blog created successfully",
        blogId: newBlog._id,
      });
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: "Server error. Please try again.",
        error: error.message,
      });
    });
}
function getBlogs(req, res) {
  Blog.find()
    .populate("image")
    .then((allBlogs) => {
      return res.status(200).json({
        success: true,
        message: "A list of all blogs",
        Blog: allBlogs,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        success: false,
        message: "Server error. Please try again.",
        error: err.message,
      });
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
        message: "This cause does not exist",
        error: err.message,
      });
    });
}
//get Blogs from a specified array of ids
async function getListOfBlogs(req, res) {
  console.log("Req.body", req.body.blogIds);

  //find blogs which have ids in the array
  Blog.find({ _id: { $in: req.body.blogIds } })

    .then((allBlogs) => {
      return res.status(200).json({
        success: true,
        message: "A list of all blogs",
        Blogs: allBlogs,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Server error. Please try again.",
        error: err.message,
      });
    });
}
function updateBlog(req, res) {
  const id = req.params.blogId;
  const blogObject = req.body;
  console.log('blogObject', blogObject)
  Blog.findOneAndUpdate({ _id: id }, { $set: blogObject })
    .exec()
    .then(() => {
      
      res.status(200).json({
        success: true,
        message: "Blog is updated",
        Blog: {_id:id, ...blogObject},
      });
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({

        success: false,
        message: "Server error. Please try again.",
      });
    });
}

function deleteBlog(req, res) {
  const id = req.params.blogId;
  Blog.findByIdAndRemove(id)
    .exec()
    .then(() =>
      res.status(204).json({
        messsage: "Blog successfully deleted",
        success: true,
      })
    )
    .catch((err) =>
      res.status(500).json({
        success: false,
      })
    );
}
async function bookmarkBlog(req, res) {
  try {
    const { userId } = req.body; //assuming you also pass the userId from the frontend
    const user = await User.findById(userId); //find the user by their ID

    if (!user) {
      return res.status(200).json({ message: "User not found" });
    }

    const { bookmarks } = user;
    if (bookmarks.includes(req.params.blogId)) {
      return res.status(200).json({ message: "Blog already bookmarked" });
    }

    //add the blog ID to the user's bookmarks array
    bookmarks.push(req.params.blogId);
    user.bookmarks = bookmarks;
    await user.save();

    return res.status(200).json({ message: "Blog bookmarked successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
}

//get bookmarked blogs
async function getBookmarkedBlogs(req, res) {
  try {
    const { userId } = req.body; //assuming you also pass the userId from the frontend
    const user = await User.findById(userId); //find the user by their ID

    if (!user) {
      return res.status(200).json({ message: "User not found" });
    }

    const { bookmarks } = user;

    Blog.find({ _id: { $in: bookmarks } }).then((blogs) => {
      
      return res.status(200).json({ message: " bookmarked blogs", blogs: blogs });
    });

    
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
}
module.exports = {
  getBlogs,
  postBlog,
  getBlog,
  updateBlog,
  deleteBlog,
  getListOfBlogs,
  bookmarkBlog,
  getBookmarkedBlogs,
};
