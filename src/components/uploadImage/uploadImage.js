import React from "react";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import UploadIcon from "@mui/icons-material/CloudUpload";
const UploadImage = (props) => {
  return (
    <div
      style={{
        position: "absolute",
        left: "75px",
        top: "10px",
        zIndex: "104",
      }}
    >
      <input
        accept="image/*"
        id="avatar-image-upload"
        type="file"
        onChange={props.handleImageChange}
      />
      <label htmlFor="avatar-image-upload">
        {
          <Button
           
            component="span"
            style={{
            color: "white",
              marginBottom: "100px",
              width: "138px",
              borderRadius: "25px",
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
