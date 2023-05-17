import React from "react";
import classes from "../../../components/blocks/Features3/Features3.module.css";
import ContentEditable from "react-contenteditable";

const ViewerFeatures3 = ({ Data }) => {
  return (
    <div className={classes.panel}>
      <div className={classes.Container}>
        {Object.getOwnPropertyNames(Data.data).map((index) => {
          return (
            <div
              key={index}
              className={classes.card}
              style={{
                width:
                  Data.layout === 3
                    ? "30%"
                    : Data.layout === 2
                    ? "40%"
                    : "50%",
              }}
            >
              <div className={classes.container}>
                <ContentEditable
                  html={Data.data[index].h.text}
                  disabled={true}
                  style={{
                    fontSize: Data.data[index].h.size,
                    fontFamily: Data.data[index].h.family,
                    color: Data.data[index].h.color,
                    fontWeight: Data.data[index].h.bold ? "bold" : "normal",
                    textDecoration: Data.data[index].h.underline
                      ? "underline"
                      : "none",
                    fontStyle: Data.data[index].h.italic ? "italic" : "normal",
                    textAlign: Data.data[index].h.align,
                  }}
                />

                <ContentEditable
                  html={Data.data[index].p.text}
                  disabled={true}
                  style={{
                    fontSize: Data.data[index].p.size,
                    fontFamily: Data.data[index].p.family,
                    color: Data.data[index].p.color,
                    fontWeight: Data.data[index].p.bold ? "bold" : "normal",
                    textDecoration: Data.data[index].p.underline
                      ? "underline"
                      : "none",
                    fontStyle: Data.data[index].p.italic ? "italic" : "normal",
                    textAlign: Data.data[index].p.align,
                  }}
                />
              </div>
              <img
                className={classes.img}
                src={Data.data[index].bg.picture}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ViewerFeatures3;
