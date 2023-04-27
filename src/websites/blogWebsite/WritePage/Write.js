import "./Write.css";
import React, { useCallback } from "react";
import { Carousel } from "react-bootstrap";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { uploadImage } from "../../../utilityFunctions/imageUpload";

import { Button, TextField } from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import Categories from "../components/Categories/Categories";

import Box from "@mui/material/Box";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { Person } from "@mui/icons-material";
import { useLocalStorageState } from "ahooks";
import QuillEditor from "./QuillEditor";

export default function Write() {

  const [title, setTitle] = useState(null);
  const [tagline, setTagline] = useState("");
  const [tags, setTags] = useState([]);
  const [writer, setWriter] = useState("");
  const [time, setTime] = useState("");
  const [desc, setdesc] = useState(null);
  const [image, setImage] = useState(null);
  const [images, setImages] = useState([]);
  const [displayImage, setDisplayImage] = useState(
    "https://res.cloudinary.com/djlewzcd5/image/upload/v1680437430/Freelancing_Promotion_Facebook_Cover_Photo_rk3krj.png"
  );
  // const { template, setTemplate } = useContext(UserContext);
  const [template, setTemplate] = useLocalStorageState("template", "");

  const [open, setOpen] = useState(false);
  const [tag, setTag] = useState("");
  const [category, setCategory] = useState("");

 

  const fileChange = (e) => {
    const newImage = e.target.files[0];

    if (newImage) {
      setImage(newImage);
      setDisplayImage(URL.createObjectURL(newImage));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !image || !desc || !category || !time) {
      toast.error("Please fill all the required fields");
      console.log(title, image, desc, category, time)
      return;
    }

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
        tags,
        writer,
        readingTime: time,
        description: desc,
      }),
    })
      .then((res) => res.json())
      .then((response) => {
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
  const handlePopperState = (event) => {
    setOpen((prevOpen) => !prevOpen);
  };

  const setSelectedCategory = (category) => {
    setCategory(category);
  };

  const handleChangeDescription = (desc) => {
    console.log(desc);
  };
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
            <Button
              onClick={handleSubmit}
              variant="contained"
              className="writeSubmit"
              type="submit"
              size="large"
            >
              Publish
            </Button>
          </div>
          <div className="writeFormGroup">
            <input
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="Enter Title..."
              className="blogInputTitle"
            />
          </div>

          <div className="writeFormGroup">
            <input
              onChange={(e) => setTagline(e.target.value)}
              type="text"
              placeholder="Enter Subtitle..."
              className="blogInputTagline"
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
              />
            </div>
          </div>

          <div className="writeFormGroup">
            <div className="writeQuill">
             <QuillEditor desc={desc} handleChangeDescription={handleChangeDescription}/>
            </div>
          </div>

          {/* <div dangerouslySetInnerHTML={{ __html: desc }}></div> */}
        </form>

        <Categories setCategory={setSelectedCategory} />
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
