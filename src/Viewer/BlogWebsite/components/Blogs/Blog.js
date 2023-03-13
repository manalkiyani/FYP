import Blog from "../Blog/Blog";
import React from "react";
import "./Blogs.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { Textarea } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
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
  }, []);

  return (
    <div className="bigContainer">
      <Box sx={{}}>
        <AppBar
          style={{
            backgroundColor: "white",
            marginTop: "30px",
            width: "1244px",
          }}
          position="static"
        >
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            ></Typography>
            <Search>
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
      <div className="posts">
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
                  key={blog._id}
                  bid={blog._id}
                  img={blog.image}
                  title={blog.title}
                  tagline={blog.tagline}
                  writer={blog.writer}
                  time={blog.readingTime}
                  desc={blog.description}
                  tags={blog.tags}
                  deleted={delBlog}
                  edit={handleOpenEdit}
                />
              );
            })}
      </div>
    </div>
  );
}
