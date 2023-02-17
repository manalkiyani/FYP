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
  const [open, setOpen] = React.useState(false);
  const [edit, setEdit] = React.useState(false);
  const [title, setTitle] = useState("");
  const [tagline, setTagline] = useState("");
  const [tags, setTags] = useState("");
  const [writer, setWriter] = useState("");
  const [time, setTime] = useState("");
  const [desc, setdesc] = useState("");
  const [blogId, setBlogId] = useState("");
  const [searchField, setSearchField] = useState("");

  function arrayBufferToBase64(buffer) {
    var binary = "";
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    return window.btoa(binary);
  }
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
  const delBlog = (id) => {
    console.log(id);
    axios
      .delete(`http://localhost:8800/api/blogs/${id}`)
      .then(function (response) {
        setOpen(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const handleClose = () => {
    setOpen(false);
    window.location.reload(true);
  };
  const handleOpenEdit = (id, title, tagline, tags, desc, writer, time) => {
    console.log(id, title, tagline, tags, desc, writer, time);
    setTitle(title);
    setTagline(tagline);
    setTags(tags);
    setdesc(desc);
    setWriter(writer);
    setTime(time);
    setBlogId(id);

    setEdit(true);
  };
  const handleCloseEdit = () => {
    setEdit(false);
    editBlog();
  };

  const editBlog = async () => {
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

        tags,
        writer,
        readingTime: time,
        description: desc,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.Blog);
      });
  };

  return (
    <div className="bigContainer">
      <Box sx={{}}>
        <AppBar
          style={{
            backgroundColor: "teal",
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
            >
              BLOGS FOR YOU
            </Typography>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                onChange={(e) => setSearchField(e.target.value)}
              />
            </Search>
          </Toolbar>
        </AppBar>
      </Box>
      <div className="posts">
        <div>
          {open && (
            <Dialog
              open={open}
              TransitionComponent={Transition}
              keepMounted
              onClose={handleClose}
              aria-describedby="alert-dialog-slide-description"
            >
              <DialogTitle>{"Blog deletion"}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                  Blog deleted successfully
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>CLOSE</Button>
              </DialogActions>
            </Dialog>
          )}

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
              let array = blog.image?.img?.data?.data;
              let binaryString = `data:image/jpeg;base64,${arrayBufferToBase64(
                array
              )}`;
              return (
                <Blog
                  key={blog._id}
                  bid={blog._id}
                  img={binaryString}
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
