import React from "react";
import classes from "../../../components/blocks/Features2/Features2.module.css";
import ContentEditable from "react-contenteditable";
import handleButtonClick from "./HandleButtonClick";
import { useNavigate } from "react-router-dom";

const ViewerFeatures2 = ({ Data }) => {
  const navigate = useNavigate();

  return (
    <div className={classes.panel}>
      {Object.getOwnPropertyNames(Data.data).map((index) => {
        return (
          <div
            key={index}
            className={classes.card}
            style={{
              width:
                Data.layout === 5 ? "17%" : Data.layout === 4 ? "20%" : "30%",
            }}
          >
            <img className={classes.img} src={Data.data[index].bg.picture} />
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
                html={Data.data[index].s.text}
                disabled={false}
                className={classes.subHeading}
                style={{
                  fontSize: Data.data[index].s.size,
                  fontFamily: Data.data[index].s.family,
                  color: Data.data[index].s.color,
                  fontWeight: Data.data[index].s.bold ? "bold" : "normal",
                  textDecoration: Data.data[index].s.underline
                    ? "underline"
                    : "none",
                  fontStyle: Data.data[index].s.italic ? "italic" : "normal",
                  textAlign: Data.data[index].s.align,
                }}
              />

              <ContentEditable
                html={Data.data[index].p.text}
                disabled={false}
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

              <ContentEditable
                onClick={() =>
                  handleButtonClick(Data.data[index].btn?.link, navigate)
                }
                html={Data.data[index].btn.text}
                disabled={false}
                className={classes.btn}
                style={{
                  fontSize: Data.data[index].btn.size,
                  fontFamily: Data.data[index].btn.family,
                  color: Data.data[index].btn.color,
                  fontWeight: Data.data[index].btn.bold ? "bold" : "normal",
                  textDecoration: Data.data[index].btn.underline
                    ? "underline"
                    : "normal",
                  fontStyle: Data.data[index].btn.italic ? "italic" : "normal",
                  textAlign: Data.data[index].btn.align,
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ViewerFeatures2;
