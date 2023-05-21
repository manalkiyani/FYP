import "./Write.css";
import React, { useEffect } from "react";

import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { uploadImage } from "../../../utilityFunctions/imageUpload";
import { stateToHTML } from "draft-js-export-html";
import { TextField, Button, Paper } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import Categories from "../components/Categories/Categories";
import axios from "axios";

import Box from "@mui/material/Box";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { Person } from "@mui/icons-material";
import { useLocalStorageState } from "ahooks";
// import QuillEditor from "./QuillEditor";

import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { FileButton, Group, Text, List, Flex } from "@mantine/core";
import { Button as Btn } from "@mantine/core";

export default function Write({ setAddBlog, operation, editId }) {
  /**************************videos *****************/
  const [files, setFiles] = useState(null);
  /* ************************************** */

  const [title, setTitle] = useState("");
  const [tagline, setTagline] = useState("");
  const [tags, setTags] = useState([]);
  const [writer, setWriter] = useState("");
  const [time, setTime] = useState("");
  const [desc, setdesc] = useState("");
  const [image, setImage] = useState("");

  const [displayImage, setDisplayImage] = useState(
    "https://res.cloudinary.com/djlewzcd5/image/upload/v1680437430/Freelancing_Promotion_Facebook_Cover_Photo_rk3krj.png"
  );
  // const { template, setTemplate } = useContext(UserContext);
  const [template, setTemplate] = useLocalStorageState("template", "");

  const [open, setOpen] = useState(false);
  const [tag, setTag] = useState("");
  const [category, setCategory] = useState("");
  const [imageChanged, setImageChanged] = useState(false);

  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [isMediaUploaded, setIsMediaUploaded] = useState(false);

  const handleEditorChange = (state) => {
    setEditorState(state);
  };
  const handleMediaUpload = async (file) => {
    console.log("handling media upload");
    try {
      const fileType = file.type.split("/")[0];
      console.log("fileType", fileType);
      const mediaUrl = await uploadImage(file); // Call your Cloudinary file upload function
      console.log(mediaUrl);

      if (fileType === "image") {
        return { data: { link: mediaUrl } };
      } else if (fileType === "video") {
        console.log("in video");
        return { data: { link: mediaUrl } };
      }

      // Handle other file types if needed
    } catch (error) {
      console.error("Error uploading media:", error);
    }
  };
  const fileChange = (e) => {
    setImageChanged(true);
    const newImage = e.target.files[0];

    if (newImage) {
      setImage(newImage);
      setDisplayImage(URL.createObjectURL(newImage));
    }
  };

  const handleSubmit = async (e) => {
    console.log(files);

    e.preventDefault();
    if (!title || !image || !editorState || !category || !time) {
      toast.error("Please fill all the required fields");
      console.log(title, image, desc, category, time);
      return;
    }
    const loadingToast = toast.loading("uploading your blog");
    let link = "";
    try {
      link = await uploadImage(image);
    } catch (err) {
      console.log(err);
    }

    await fetch("http://localhost:8800/api/blogs", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        category,
        title,
        tagline,
        image: link,
        videos: files ,
        tags,
        writer,
        readingTime: time,
        description: stateToHTML(editorState.getCurrentContent()),
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        toast.dismiss(loadingToast);
        toast.success("Blog Published Successfully");

        console.log(response);
        setTemplate({
          ...template,
          data: {
            blogs: [...template?.data?.blogs, response.blogId],
          },
        });
      })
      .catch((err) => {
        toast.error("Something went wrong");
        console.log(err);
      });
  };

  const handleAddTags = () => {
    if (tag === "") return;
    setTags([...tags, tag]);
    setTag("");
    setOpen(false);
  };
  const handleeDeleteTags = (selectedTag) => {
    setTags(tags.filter((tag) => tag !== selectedTag));
  };
  const handlePopperState = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const setSelectedCategory = (category) => {
    setCategory(category);
  };

  const handleChangeDescription = (desc) => {
    console.log(desc);
  };

  const handleCancel = () => {
    setAddBlog(false);
  };
  const editBlog = async () => {
 const updatingtoast =   toast.loading("Updating your blog");

    let link = null;
    if (imageChanged) {
      try {
        link = await uploadImage(image);
        console.log(link);
      } catch (err) {
        console.log(err);
      }
    }
    console.log("image", image);
    await fetch(`http://localhost:8800/api/blogs/${editId}`, {
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
        image: link || image,
        tags,
        writer,
        readingTime: time,
        description: stateToHTML(editorState.getCurrentContent()),
        videos : files ,

        category,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        toast.dismiss(updatingtoast)
        toast.success("Blog Updated Successfully");
        console.log(data, "daata");
      });
  };
  const getBlog = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8800/api/blogs/${editId}`
      );
      const blog = response.data.blog;
      console.log(blog);
      setCategory(blog.category);
      setTagline(blog.tagline);
      setDisplayImage(blog.image);
      setTags(blog.tags);
      setTitle(blog.title);
      setTime(blog.readingTime);
      setWriter(blog.writer);
      setdesc(blog.description);
      console.log(blog.category)
      setCategory(blog?.category)
      // setEditorState(blog?.description)
      setFiles(blog?.videos);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFiles = async (Files) => {
    console.log(Files);
    // setFiles(files);
    const loadingToast = toast.loading("Uploading videos");
    for (const file of Files) {
      try {
        let link = await uploadImage(file);
        if (files) {
          setFiles([files, link]);
        } else {
          setFiles([link]);
        }
      } catch (err) {
        console.log(err);
      }
    }
    toast.dismiss(loadingToast);
    console.log("done");
  };
  const clearFile = () => {
    setFiles(null);
  };
  useEffect(() => {
    if (editId) {
      getBlog();
    }
  }, [editId]);
  return (
    <>
      <Toaster position="top-center" reverseOrder={false}></Toaster>

      <div className="write">
        <form className="writeForm">
          <img className="writeImg" src={displayImage} alt="First slide" />
          <div className="writeFormGroup1">
            <label>
              <div>
                <img
                  className="writeIcon"
                  alt=""
                  src="https://res.cloudinary.com/djlewzcd5/image/upload/v1670250225/plus_2_qak15o.png"
                />
                <input
                  multiple
                  className="input"
                  type="file"
                  name="file"
                  onChange={fileChange}
                ></input>
              </div>
            </label>

            <input id="fileInput" type="file" style={{ display: "none" }} />
            <Group position="center">
              <Button
                onClick={handleCancel}
                variant="outlined"
                className="writeSubmit"
                size="medium"
              >
                Cancel
              </Button>

              {operation === "edit" ? (
                <Button
                  onClick={editBlog}
                  variant="contained"
                  className="writeSubmit"
                  type="submit"
                  size="medium"
                >
                  Update
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  variant="contained"
                  className="writeSubmit"
                  type="submit"
                  size="medium"
                >
                  Publish
                </Button>
              )}
            </Group>
          </div>
          <div className="writeFormGroup">
            <input
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="Enter Title..."
              className="blogInputTitle"
              value={title}
            />
          </div>

          <div className="writeFormGroup">
            <input
              onChange={(e) => setTagline(e.target.value)}
              type="text"
              placeholder="Enter Subtitle..."
              className="blogInputTagline"
              value={tagline}
            />
          </div>

          <div className="writeFormGroup">
            {tags.length === 0 ? (
              <>
                <Button
                  variant="outlined"
                  onClick={handlePopperState}
                  style={{
                    borderRadius: "20px",
                    borderColor: "#9F9F9F",
                    backgroundColor: "#ebebeb",
                    color: "#47474d",
                    textTransform: "capitalize",
                  }}
                  endIcon={<AddIcon />}
                >
                  Add SubCategory
                </Button>
                {open && (
                  <Popper
                    setOpen={setOpen}
                    setTag={setTag}
                    handleAddTags={handleAddTags}
                  />
                )}
              </>
            ) : (
              <>
                {tags.map((tag) => {
                  return (
                    <Button
                      variant="outlined"
                      onClick={() => handleeDeleteTags(tag)}
                      style={{
                        borderRadius: "20px",
                        marginRight: "10px",
                        borderColor: "#9F9F9F",
                        backgroundColor: "#ebebeb",
                        color: "#47474d",
                        textTransform: "capitalize",
                      }}
                      endIcon={<CloseIcon />}
                    >
                      {tag}
                    </Button>
                  );
                })}
                <div
                  onClick={handlePopperState}
                  style={{
                    display: "inline-block",
                    borderRadius: "50%",
                    width: "fit-content",
                    padding: "5px",
                    border: "1px solid #9F9F9F",
                    backgroundColor: "#ebebeb",
                    color: "#47474d",
                    cursor: "pointer",
                  }}
                >
                  <AddIcon />
                </div>
                {open && (
                  <Popper
                    setOpen={setOpen}
                    setTag={setTag}
                    handleAddTags={handleAddTags}
                  />
                )}
              </>
            )}
          </div>
          <div className="writeFormGroup1">
            <div>
              <AccessTimeIcon sx={{ marginRight: "10px" }} />
              <input
                onChange={(e) => setTime(e.target.value)}
                type="text"
                placeholder="Reading Time..."
                className="blogInputTagline"
                style={{ fontSize: "15px" }}
                value={time}
              />
            </div>
            <div>
              <Person sx={{ marginRight: "10px" }} />
              <input
                onChange={(e) => setWriter(e.target.value)}
                type="text"
                placeholder="Writer's Name..."
                className="blogInputTagline"
                style={{ fontSize: "15px" }}
                value={writer}
              />
            </div>
          </div>

          <div className="writeFormGroup">
            <Editor
              editorState={editorState}
              onEditorStateChange={handleEditorChange}
              toolbar={{
                options: [
                  "inline",
                  "blockType",
                  "fontSize",
                  "list",
                  "textAlign",
                  "link",
                  "image",
                  "history",
                ],
                image: {
                  uploadCallback: handleMediaUpload,
                  alt: { present: true, mandatory: true },
                },

                embedded: {
                  defaultSize: {
                    height: "300",
                    width: "300",
                  },
                },
              }}
            />
          </div>

          <>
            <Group position="center">
              <FileButton onChange={handleFiles} accept="video/mp4" multiple>
                {(props) => <Button {...props}>Upload video</Button>}
              </FileButton>
              <Btn disabled={!files} color="red" onClick={clearFile}>
                Reset
              </Btn>
            </Group>
          </>
  <Paper shadow="xs" p="md" withBorder>
             <Text fz="xl" fw="600">
          Your Previous Blog
        </Text>

          </Paper>
       
            <div style={{padding:'20px'}} dangerouslySetInnerHTML={{ __html: desc }}></div>
          
     
          {files && (
            <Flex gap="md" wrap="wrap">
              {Array.from(files).map((link, index) => (
                <Paper shadow="xs" p="md">
                  <video width="300" height="200" controls>
                    <source key={index} src={link} type="video/mp4" />
                  </video>
                </Paper>
              ))}
            </Flex>
          )}
          </form>

        <Categories category={category} setCategory={setSelectedCategory} />
      </div>
    </>
  );
}

const Popper = ({ setOpen, setTag, handleAddTags }) => {
  return (
    <div style={{ width: "fit-content" }}>
      <Box
        sx={{
          border: 1,
          p: 1,
          backgroundColor: "white",
          borderColor: "#fcf7f7",
          margin: "10px",
          borderRadius: "10px",
          padding: "10px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignContent: "center",
          }}
        >
          <h6>Enter SubCategory </h6>
          <CloseIcon
            style={{ cursor: "pointer" }}
            onClick={() => setOpen(false)}
            size="small"
            color="#47474d"
          />
        </div>
        <div style={{ marginTop: "5px" }}>
          <TextField
            onChange={(e) => setTag(e.target.value)}
            variant="outlined"
            size="small"
          />
          <Button onClick={handleAddTags} variant="text">
            ADD
          </Button>
        </div>
      </Box>
    </div>
  );
};
