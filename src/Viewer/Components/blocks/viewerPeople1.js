import React, { useState } from "react";

import classes from "../../../components/blocks/People/People1.module.css";

import ContentEditable from "react-contenteditable";
import { Space } from "@mantine/core";

import ViewerSocialIcons from "../viewerSocialIcons/viewerSocialIcons";
const ViewerPeople1 = (props) => {
  return (
    <div className={classes.panel}>
      <div className={classes.Container}>
        {Object.getOwnPropertyNames(props.Data.data).map((index) => {
          return (
            <div
              key={index}
              className={classes.card}
              style={{
                width:
                  props.Data.layout === 3
                    ? "30%"
                    : props.Data.layout === 2
                    ? "40%"
                    : "50%",
              }}
            >
              <img
                className={classes.img}
                src={props.Data.data[index].bg.picture}
              />

              <div className={classes.container}>
                <ContentEditable
                  html={props.Data.data[index].h.text} // innerHTML of the editable div
                  disabled={true} // use true to disable editing
                  style={{
                    fontSize: props.Data.data[index].h.size,
                    fontFamily: props.Data.data[index].h.family,
                    color: props.Data.data[index].h.color,
                    fontWeight:
                      props.Data.data[index].h.bold === true
                        ? "bold"
                        : "normal",
                    textDecoration:
                      props.Data.data[index].h.underline === true
                        ? "underline"
                        : "none",
                    fontStyle:
                      props.Data.data[index].h.italic === true
                        ? "italic"
                        : "normal",
                    textAlign: props.Data.data[index].h.align,
                    letterSpacing: props.Data.data[index].h.spacing,
                    lineHeight: props.Data.data[index].h.height,
                  }}
                />
                <ContentEditable
                  html={props.Data.data[index].s.text} // innerHTML of the editable div
                  disabled={true} // use true to disable editing
                  style={{
                    fontSize: props.Data.data[index].s.size,
                    fontFamily: props.Data.data[index].s.family,
                    color: props.Data.data[index].s.color,
                    fontWeight:
                      props.Data.data[index].s.bold === true
                        ? "bold"
                        : "normal",
                    textDecoration:
                      props.Data.data[index].s.underline === true
                        ? "underline"
                        : "none",
                    fontStyle:
                      props.Data.data[index].s.italic === true
                        ? "italic"
                        : "normal",
                    textAlign: props.Data.data[index].s.align,
                    letterSpacing: props.Data.data[index].s.spacing,
                    lineHeight: props.Data.data[index].s.height,
                  }}
                />
                <Space h="md" />
                <ContentEditable
                  html={props.Data.data[index].p.text} // innerHTML of the editable div
                  disabled={true} // use true to disable editing
                  style={{
                    fontSize: props.Data.data[index].p.size,
                    fontFamily: props.Data.data[index].p.family,
                    color: props.Data.data[index].p.color,
                    fontWeight:
                      props.Data.data[index].p.bold === true
                        ? "bold"
                        : "normal",
                    textDecoration:
                      props.Data.data[index].p.underline === true
                        ? "underline"
                        : "none",
                    fontStyle:
                      props.Data.data[index].p.italic === true
                        ? "italic"
                        : "normal",
                    textAlign: props.Data.data[index].p.align,
                    letterSpacing: props.Data.data[index].p.spacing,
                    lineHeight: props.Data.data[index].p.height,
                  }}
                />
                <Space h="md" />
                <ViewerSocialIcons socialIcons={props.Data.socialIcons} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ViewerPeople1;
