import React from "react";
import { useEffect, useState, useContext } from "react";
import toast, { Toaster } from "react-hot-toast";
import { UserContext } from "../../App";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import UploadIcon from "@mui/icons-material/CloudUpload";
const UploadImage = (props) => {
  const { contextImage, setContextImage } = useContext(UserContext);

  const changeImage = () => {
    console.log(props.index, contextImage);
    if (props.index) {
      props.handleImageChange(contextImage, props.index);
    } else {
      props.handleImageChange(contextImage);
    }
  };
  const setImage = (event) => {
    toast.success("Image Uploaded Successfully, Save your image Now");
    console.log(event);
    setContextImage(event);
  };
  return (
    <>
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div
        style={{
          padding: "3px",
          width: "130px",
          position: "absolute",
          left: props.left,
          marginTop: "3px",
          top: props.top,
          zIndex: "104",
          backgroundColor: "white",
          borderRadius: "25px",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
      >
        <input
          accept="image/*"
          id="avatar-image-upload"
          type="file"
          onChange={(event) => setImage(event)}
        />
        <label
          style={{ color: "#40AFC0", marginLeft: "6px" }}
          htmlFor="avatar-image-upload"
        >
          Upload
        </label>
        {
          <Button
            component="span"
            style={{
              color: "#40AFC0",
              textTransform: "none",
              fontFamily: "arial",
              textAlign: "center",
            }}
            onClick={changeImage}
          >
            Save
          </Button>
        }
      </div>
    </>
  );
};

export default UploadImage;
