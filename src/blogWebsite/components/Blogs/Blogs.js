import Blog from "../Blog/Blog";
import React from "react";

import classes from "./Blogs.module.css";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import Button from "@mui/material/Button";

import DialogContentText from "@mui/material/DialogContentText";

import Slide from "@mui/material/Slide";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { uploadImage } from "../../../utilityFunctions/imageUpload";
import { useContext } from "react";
import { UserContext } from "../../../App";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ConfirmDeleteDialog = ({ open, onClose, onConfirm }) => {
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    await onConfirm();
    setLoading(false);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirm Deletion</DialogTitle>
      <DialogContent>
        Are you sure you want to delete this blog post?
      </DialogContent>
      <DialogActions>
        <Button disabled={loading} onClick={onClose}>
          Cancel
        </Button>
        <Button disabled={loading} onClick={handleConfirm} color="error">
          {loading ? 'Deleting...' : 'Delete'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};



export default function Blogs({ blogIds }) {
  const [blogs, setBlogs] = useState(null);
  const[blogDeletion,setBlogDeletion]=useState(false);
  const [edit, setEdit] = React.useState(false);
  const [title, setTitle] = useState("");
  const [tagline, setTagline] = useState("");
  const [tags, setTags] = useState("");
  const [writer, setWriter] = useState("");
  const [time, setTime] = useState("");
  const [desc, setdesc] = useState("");
  const [blogId, setBlogId] = useState("");
  const { template, setTemplate } = useContext(UserContext);
 const [image, setImage] = useState(null);
  const [displayImage, setDisplayImage] = useState(null);
  const [imageChanged, setImageChanged] = useState(false);
  const [blogDeleteId, setBlogDeleteId] = useState(null);

  const getBlogs = async () => {
    axios
      .post("http://localhost:8800/api/blogs/get", { blogIds })
      .then((res) => {
        setBlogs(res.data.Blogs);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  useEffect(() => {
    getBlogs();
  }, []);

 
  const openBlogDeletion = (id) => {
    setBlogDeleteId(id);
    setBlogDeletion(true);
  }
  const closeBlogDeletion = () => {
    setBlogDeletion(false);
  }
  const delBlog = () => {
    axios
      .delete(`http://localhost:8800/api/blogs/${blogDeleteId}`)
      .then(function (response) {
        setTemplate({
          ...template,

          data: {
            blogs: blogs.filter((blogId) => blogId !== blogDeleteId),
          },
        });

        toast.success("Blog Deleted Successfully");
        setBlogs(blogs.filter((blog) => blog._id !== blogDeleteId));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleOpenEdit = (id, title, tagline, tags, desc, writer, time,image) => {
    console.log(id, title, tagline, tags, desc, writer, time,image);
    setTitle(title);
    setTagline(tagline);
    setTags(tags);
    setdesc(desc);
    setWriter(writer);
    setTime(time);
    setBlogId(id);
    setImage(image);
    setDisplayImage(image);
    setEdit(true);
  };
  const handleCloseEdit = () => {
    setEdit(false);
    editBlog();
  };

  const editBlog = async () => {
         toast.success("Updating your blog");

     let link = null;
    if (imageChanged) {
      
     
      try {
        link = await uploadImage(image);
        console.log(link)
     
      } catch (err) {
        console.log(err);
      }
    }
    console.log('image',image)
    await fetch(`http://localhost:8800/api/blogs/${blogId}`, {
      method: "PATCH",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        title,
        tagline,
        image:link || image,
        tags,
        writer,
        readingTime: time,
        description: desc,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success("Blog Updated Successfully");
        console.log(data,'daata')
        setBlogs(blogs.map((blog) => (blog._id === blogId ? data.Blog : blog)));
        console.log(data.Blog);
      });
  };
  const fileChange = (e) => {
    const newImage = e.target.files[0];

    if (newImage) {
      setImage(newImage);
      setDisplayImage(URL.createObjectURL(newImage));
      setImageChanged(true);
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className={classes.bigContainer}>
        <div className={classes.posts}>
          <div>
            {
              <Dialog
                open={edit}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleCloseEdit}
                aria-describedby="alert-dialog-slide-description"
              >
                <DialogTitle>{"Update Blog"}</DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-slide-description">
                    <Box
                      component="form"
                      sx={{
                        "& .MuiTextField-root": { m: 1, width: "60ch" },
                      }}
                      noValidate
                      autoComplete="off"
                    >
                      <center>
                        <div
                          style={{ marginBottom: "20px", marginTop: "20px" }}
                        >
                          (
                            <img
                              style={{
                                borderRadius: "30px",
                                objectFit: "cover",
                                width: "300px",
                                height: "300px",
                              }}
                              src={displayImage}
                              alt="productImage"
                            />
                          )       
                        </div>
                      </center>

                      <label
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginBottom: "10px",
                        }}
                      >
                        <AddCircleOutlineIcon />
                        Add Image
                        <input
                          multiple
                          className="input"
                          type="file"
                          name="file"
                          onChange={fileChange}
                        ></input>
                      </label>

                      <input
                        id="fileInput"
                        type="file"
                        style={{ display: "none" }}
                      />
                      <TextField
                        onChange={(e) => setTitle(e.target.value)}
                        className="input"
                        id="outlined-basic"
                        label="Title"
                        variant="outlined"
                        value={title}
                        margin="normal"
                      />
                      <div className="inputContainer">
                        <TextField
                          onChange={(e) => setTagline(e.target.value)}
                          className="input"
                          id="outlined-basic"
                          label="Tagline"
                          value={tagline}
                          variant="outlined"
                          margin="normal"
                        />
                        <TextField
                          onChange={(e) => setTags(e.target.value)}
                          className="input"
                          id="outlined-basic"
                          label="Tags"
                          value={tags}
                          variant="outlined"
                          margin="normal"
                        />
                      </div>
                      <div className="inputContainer">
                        <TextField
                          onChange={(e) => setWriter(e.target.value)}
                          className="input"
                          id="outlined-basic"
                          label="Author"
                          value={writer}
                          variant="outlined"
                          margin="normal"
                        />
                        <TextField
                          onChange={(e) => setTime(e.target.value)}
                          className="input"
                          id="outlined-basic"
                          label="Reading Time"
                          value={time}
                          variant="outlined"
                          margin="normal"
                        />
                      </div>

                      <TextField
                        onChange={(e) => setdesc(e.target.value)}
                        multiline={true}
                        className="input"
                        id="outlined-basic"
                        value={desc}
                        minRows={6}
                        maxRows={6}
                        label="Tell Your Story"
                        variant="outlined"
                        margin="normal"
                      />
                    </Box>
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseEdit}>Update</Button>
                </DialogActions>
              </Dialog>
            }
          </div>
         <ConfirmDeleteDialog open={blogDeletion} onClose ={closeBlogDeletion} onConfirm={delBlog} />
          {blogs &&
            blogs.map((blog) => {
              return (
                <Blog
                  key={blog._id}
                  bid={blog._id}
                  img={blog.image}
                  title={blog.title}
                  tagline={blog.tagline}
                  writer={blog.writer}
                  time={blog.readingTime}
                  desc={blog.description}
                  tags={blog.tags}
                  deleted={openBlogDeletion}
                  edit={handleOpenEdit}
                />
              );
            })}
        </div>
      </div>
    </>
  );
}
