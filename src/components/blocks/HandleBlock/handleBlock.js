import React from "react";

import move from "../../../assets/icons/move.png";
import del from "../../../assets/icons/delete.png";
import add from "../../../assets/icons/plus.png";
import paint from "../../../assets/icons/paint.png";
import classes from "./handleBlock.module.css";
import Dropdown from "react-bootstrap/Dropdown";

const handleBlock = (props) => {
  return (
    <div className={classes.container}>
      {props.displaySetLayout ? (
        <Dropdown className={classes.icon3}>
          <Dropdown.Toggle variant="outline" id="dropdown-basic">
            {props.layout}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item
              onClick={() => props.setLayout(props.options[0].value, props.id)}
            >
              {props.options[0].text}
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => props.setLayout(props.options[1].value, props.id)}
            >
              {props.options[1].text}
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => props.setLayout(props.options[2].value, props.id)}
            >
              {props.options[2].text}
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ) : null}
      {props.displayAddCard ? (
        <div onClick={props.addCard} className={classes.icon1}>
          <img className={classes.icon} src={add} />
        </div>
      ) : null}
      {props.openColorPicker ? (
        <div onClick={props.openColorPicker} className={classes.icon1}>
          <img className={classes.icon} src={paint} />
        </div>
      ) : null}

      <div onClick={props.enableDrag} className={classes.icon2}>
        <img className={classes.icon} src={move} />
      </div>

      <div onClick={props.del} className={classes.icon2}>
        <img className={classes.icon} src={del} />
      </div>
    </div>
  );
};

export default handleBlock;
