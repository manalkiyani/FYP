import React from "react";
import classes from "./ViewBlockPanelBtn.module.css";
import addIcon from "../../assets/icons/add.png";
import close from "../../assets/icons/close.png";
const ViewBlockPanelBtn = (props) => {
  return (
    <div onClick={props.click} className={classes.circle}>
      {props.status ? (
        <img
          style={{ width: "20px", height: "20px" }}
          src={close}
          alt="Close"
        />
      ) : (
        <img
          style={{ width: "25px", height: "25px" }}
          src={addIcon}
          alt="Open"
        />
      )}
    </div>
  );
};

export default ViewBlockPanelBtn;
