import axios from "axios";
import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./BlogDetail.css";
import { UserContext } from "../../App";


import {
  getBlog,
  getBlogsByCategory,
} from "../../utilityFunctions/axiosFunctions";
import {
  Box,
  Button,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import classes from "./BlogDetail.module.css";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";

import BeatLoader from "react-spinners/BeatLoader";

const bull = (
  <Box
    component="h5"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);
const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  initialSlide: 0,
};
const BlogDetail = () => {
  //comment
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  //blog
  const [blog, setBlog] = React.useState(null);
  //get blog id from url
  const { blogId } = useParams();

  //related blogs list
  const [relatedBlogs, setRelatedBlogs] = useState([]);


  
  const getRelatedBlogs = async (category) => {
    try {
      const data = await getBlogsByCategory(category);
      console.log(data);
      if (data?.status === 404) {
        console.log("No related blogs found");
      }
      setRelatedBlogs(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getBlogData = async () => {
    try {
      const data = await getBlog(blogId);
      if (data?.success) {
        setBlog(data.blog);
        getRelatedBlogs(data.blog.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBlogData();
  }, [blogId]);


  

  return (
    <>
      <div className={classes.container}>
        {blog ? (
          <>
            <h1 style={{ fontWeight: "bold" }}>{blog.title}</h1>
            <div>
              <h5>{blog.tagline}</h5>
            </div>

            <div className={classes.flex}>
              <Typography
                sx={{ mt: 3, mb: 1 }}
                color="text.secondary"
                variant="body1"
                component="div"
              >
                {blog.publishedDate} {bull} {blog.readingTime} read {bull}{" "}
                {blog.writer}
              </Typography>
              <div style={{ cursor: "pointer" }}>
                <BookmarkAddOutlinedIcon />
                <ShareOutlinedIcon />
              </div>
            </div>

            <img className={classes.blogImage} src={blog.image} />

            <div dangerouslySetInnerHTML={{ __html: blog.description }} />

            <div style={{ display: "flex" }}>
              {blog.tags.map((tag) => (
                <Button
                  style={{
                    borderRadius: "20px",
                    borderColor: "#9F9F9F",
                    color: "#fff",
                    backgroundColor: "#2C7A86",
                    textTransform: "capitalize",
                    marginBottom: "10px",
                    marginRight: "10px",
                  }}
                >
                  {tag}
                </Button>
              ))}
            </div>
          </>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "70vh",
            }}
          >
            <BeatLoader color="#40AFCE" loading={true} size={20} />
          </div>
        )}
      </div>
      <div className={classes.container}>
        <h2
          style={{
            alignSelf: "start",
            family: "poppins",
            marginTop: "20px",
            fontWeight: "400",
          }}
        >
          More from {blog?.category}
        </h2>
      </div>
      <center>
        <div className={classes.relatedBlogs} style={{ width: "70%" }}>
          <div>
            <Slider {...settings}>
              {relatedBlogs.map((blog) => (
                <Blog
                  key={blog._id}
                  title={blog.title}
                  tagline={blog.tagline}
                  image={blog.image}
                  blogId = {blog._id}
                />
                // <div>{blog.title}</div>
              ))}
            </Slider>
          </div>
        </div>
      </center>
      <div className={classes.container}>
        <h3
          style={{
            textAlign: "left",
            family: "poppins",

            fontWeight: "400",
          }}
        >
          Write a Comment
        </h3>
      </div>

      <center>
        <div className={classes.contactForm}>
          <form
            className={classes.Form}
            // onSubmit={handleSubmit}
            autoComplete="off"
          >
            <div className={classes.inputContainer}>
              <p>Comment</p>
              <textarea
                onChange={(e) => setMessage(e.target.value)}
                name="message"
                className={classes.input}
              ></textarea>
            </div>
            <div className={classes.inputContainer}>
              <p>Email (required)</p>
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                name="email"
                className={classes.input}
              />
            </div>

            <div className={classes.inputContainer}>
              <p>Name (required)</p>
              <input
                onChange={(e) => setSubject(e.target.value)}
                type="text"
                name="subject"
                className={classes.input}
              />
            </div>

            <input type="submit" value="Submit" className={classes.btn} />
          </form>
        </div>
      </center>
    </>
  );
};

export default BlogDetail;

function Blog({ title, tagline, image,blogId }) {
const navigate = useNavigate();
const {templateId} = useContext(UserContext)
  const openBlogDetail = () => {
    navigate(`/blog/template/${templateId}/blogs/${blogId}`);
  };
  return (
    <Card sx={{ maxWidth: 345, textAlign: "left" }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={image}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {tagline}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button onClick={()=>openBlogDetail()} size="small" color="primary">
          Read Now
        </Button>
      </CardActions>
    </Card>
  );
}
