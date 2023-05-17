import React from "react";
import classes from "../../../components/blocks/Header1/Header1.module.css";
import ContentEditable from "react-contenteditable";
import ViewerSocialIcons from "../viewerSocialIcons/viewerSocialIcons";
import { useNavigate } from "react-router-dom";

import handleButtonClick from "./HandleButtonClick";

const ViewerHeader1 = (props) => {
  const navigate = useNavigate();
  return (
    <div className={classes.header}>
      <img className={classes.img} src={props.Data.data.img} />
      <div style={{ position: "absolute", zIndex: 1 }}>
        <ContentEditable
          className={classes.h}
          html={props.Data.data.h.text}
          disabled={true}
          style={{
            fontSize: props.Data.data.h.size,
            fontFamily: props.Data.data.h.family,
            color: props.Data.data.h.color,
            fontWeight: props.Data.data.h.bold ? "bold" : "normal",
            textDecoration: props.Data.data.h.underline ? "underline" : "none",
            fontStyle: props.Data.data.h.italic ? "italic" : "normal",
            textAlign: props.Data.data.h.align,
          }}
        />

        <ContentEditable
          html={props.Data.data.p.text}
          disabled={true}
          className={classes.p}
          style={{
            fontSize: props.Data.data.p.size,
            fontFamily: props.Data.data.p.family,
            color: props.Data.data.p.color,
            fontWeight: props.Data.data.p.bold ? "bold" : "normal",
            textDecoration: props.Data.data.p.underline ? "underline" : "none",
            fontStyle: props.Data.data.p.italic ? "italic" : "normal",
            textAlign: props.Data.data.p.align,
          }}
        />

        <ContentEditable
          onClick={() => handleButtonClick(props.Data.data.btn?.link,navigate)}
          className={classes.btn}
          html={props.Data.data.btn.text}
          disabled={true}
          style={{
            fontSize: props.Data.data.btn.size,
            fontFamily: props.Data.data.btn.family,
            color: props.Data.data.btn.color,
            fontWeight: props.Data.data.btn.bold ? "bold" : "normal",
            textDecoration: props.Data.data.btn.underline
              ? "underline"
              : "none",
            fontStyle: props.Data.data.btn.italic ? "italic" : "normal",
            textAlign: props.Data.data.btn.align,
          }}
        />
        <ViewerSocialIcons socialIcons={props.Data.socialIcons} />
      </div>
    </div>
  );
};

export default ViewerHeader1;
