import "./Write.css";
import React, { useEffect } from "react";
import { Carousel } from "react-bootstrap";
import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import axios from "axios";
import { uploadImage } from "../../utilityFunctions/imageUpload";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Write() {
  const [open, setOpen] = React.useState(false);
  const [content, setContent] = React.useState("");

  const [title, setTitle] = useState("");
  const [tagline, setTagline] = useState("");
  const [tags, setTags] = useState("");
  const [writer, setWriter] = useState("");
  const [time, setTime] = useState("");
  const [desc, setdesc] = useState("");
  const [image, setImage] = useState(null);

  const [images, setImages] = useState([]);

  const fileChange = (e) => {
    const newImage = e.target.files[0];

    if (newImage) {
      setImage(newImage);
      setImages([...images, URL.createObjectURL(newImage)]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let link = "";
    try {
      link = await uploadImage(image);
      console.log(link);
      setImages([...images, link]);
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
      .then((data) => {
        setOpen(true);

        setContent(data.message);
      });
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <div>
        {open && (
          <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle>{"Blog Publishing"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                {content}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>CLOSE</Button>
            </DialogActions>
          </Dialog>
        )}
      </div>
      <div className="write">
        <Carousel fade={true} pause={false}>
          {images.map((image) => {
            return (
              <Carousel.Item interval={2000}>
                <img className="writeImg" src={image} alt="First slide" />
              </Carousel.Item>
            );
          })}
        </Carousel>

        <form className="writeForm">
          <div className="writeFormGroup">
            <label>
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
            </label>

            <input id="fileInput" type="file" style={{ display: "none" }} />
            <input
              className="writeInput"
              placeholder="Title"
              type="text"
              autoFocus={true}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="writeFormGroup">
            <input
              id="writeTagline"
              className="writeInput"
              placeholder="Tagline"
              type="text"
              autoFocus={true}
              onChange={(e) => setTagline(e.target.value)}
            />
          </div>
          <div className="writeFormGroup">
            <input
              id="writeTagline"
              className="writeInput"
              placeholder="Tags: Development, Technology ..."
              type="text"
              autoFocus={true}
              onChange={(e) => setTags(e.target.value)}
            />
          </div>

          <div className="writeFormGroup">
            <textarea
              className="writeInput writeText"
              placeholder="Tell your story..."
              type="text"
              autoFocus={true}
              onChange={(e) => setdesc(e.target.value)}
            />
          </div>
          <div className="writeFormGroup">
            <input
              id="writeTagline"
              className="writeInput"
              placeholder="WriterName: John Doe  "
              type="text"
              autoFocus={true}
              onChange={(e) => setWriter(e.target.value)}
            />
          </div>
          <div className="writeFormGroup">
            <input
              id="writeTagline"
              className="writeInput"
              placeholder="ReadingTime: 20 minutes"
              type="text"
              autoFocus={true}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>

          <button onClick={handleSubmit} className="writeSubmit" type="submit">
            Publish
          </button>
        </form>
      </div>
      <div>
        {/* {imageData && imageData.map((singleData)=>{
        const base64String =String.fromCharCode(...new Uint8Array(singleData.img.data.data))
        
        return <img alt="im" src={`data:image/png;base64,${base64String}`}/>
      })} */}
      </div>
    </>
  );
}
//tags
//tagline
//readingTime
//writer
//images
