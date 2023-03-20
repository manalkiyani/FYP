import React from "react";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import UploadIcon from "@mui/icons-material/CloudUpload";
const UploadImage = (props) => {
  const changeImage = (event) => {
    if (props.index) {
      console.log('index',props.index)
      props.handleImageChange(event, props.index);
    } else {
      props.handleImageChange(event);
    }
  };
  return (
    <div
      style={{
        position: "absolute",
        left: props.left,
        top: props.top,
        zIndex: "104",
        backgroundColor: "white",
        borderRadius: "25px",
      }}
    >
      <input
        accept="image/*"
        id="avatar-image-upload"
        type="file"
        onChange={changeImage}
      />
      <label htmlFor="avatar-image-upload">
        {
          <Button
            component="span"
            style={{
              color: "#40AFC0",

              width: "138px",

              fontFamily: "arial",
              textAlign: "center",
              padding: "5px",
            }}
            startIcon={props.image ? <DeleteIcon /> : <UploadIcon />}
          >
            {props.image ? "uploaded" : "upload"}
          </Button>
        }
      </label>
    </div>
  );
};

export default UploadImage;
