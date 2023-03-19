import Blog from "./Blog";
import React from "react";
import toast, { Toaster } from "react-hot-toast";
import classes from "../../../../blogWebsite/components/Blogs/Blogs.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";

import SearchIcon from "@mui/icons-material/Search";

import {addBookmark} from '../../../../utilityFunctions/axiosFunctions'
import Sidebar from "../../../../blogWebsite/components/Sidebar/Sidebar";
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));
const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const testUserId="63e8df1974cc16f2b7ecacb6";

export default function Blogs({ blogIds }) {
  const [blogs, setBlogs] = useState(null);
  const [searchField, setSearchField] = useState("");
 
  useEffect(() => {
    axios
      .post("http://localhost:8800/api/blogs/get", { blogIds })
      .then((res) => {
        setBlogs(res.data.Blogs);

        console.log(res.data.Blogs);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [blogs]);

   const bookmarkBlog = (blogId) => {

    addBookmark(testUserId, blogId)
  .then((result) => {
  console.log(result.message)

    toast.success(result.message);
  })
  .catch((error) => {
    console.log(error)
     toast.error(error);
   
  });
  }

  return (
    <>
    <Toaster position="top-center" reverseOrder={false}></Toaster>
    <div className={classes.home}>
      <div className={classes.bigContainer}>
      <Box style={{marginBottom:'50px'}}>
        <AppBar
          style={{
            backgroundColor: "white",
            marginTop: "30px",
            width: "100%",
          }}
          position="static"
        >
          <Toolbar
            style={{
              display: "flex",
              justifyContent: "center"

            }}
          >
            <Search style={{width:'50%'}}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search ..."
                inputProps={{ "aria-label": "search" }}
                onChange={(e) => setSearchField(e.target.value)}
              />
            </Search>
          </Toolbar>
        </AppBar>
      </Box>
      <div className={classes.posts}>
        <div></div>
        {blogs &&
          blogs
            .filter((blog) => {
              return (
                blog.title.toLowerCase().includes(searchField.toLowerCase()) ||
                blog.tagline
                  .toLowerCase()
                  .includes(searchField.toLowerCase()) ||
                blog.description
                  .toLowerCase()
                  .includes(searchField.toLowerCase())
              );
            })
            .map((blog) => {
              return (
                <Blog
                  bookmarkBlog={bookmarkBlog}
                  key={blog._id}
                  bid={blog._id}
                  img={blog.image}
                  title={blog.title}
                  tagline={blog.tagline}
                  writer={blog.writer}
                  time={blog.readingTime}
                  desc={blog.description}
                  tags={blog.tags}
                />
              );
            })}
      </div>
    </div>
    <Sidebar/>
    </div>
   
    </>
    
  );
}
