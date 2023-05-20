import React, { useState } from "react";

import move from "../../../assets/icons/move.png";
import del from "../../../assets/icons/delete.png";
import add from "../../../assets/icons/plus.png";
import paint from "../../../assets/icons/paint.png";
import link from "../../../assets/icons/link.png";
import classes from "./handleBlock.module.css";
import Dropdown from "react-bootstrap/Dropdown";
import { Button, ButtonGroup, IconButton } from "@mui/material";
import LinkButton from "../linkButton/linkButton";
import { Indicator } from "@mantine/core";

const HandleBlock = (props) => {
  const [show, setshow] = useState(false);
  const [showDelete, setShowDelete] = useState(true);
  const [showLink, setShowLink] = useState(true);
  const [showColor, setShowColor] = useState(true);
  const [showMove, setShowMove] = useState(true);
  const [showAdd, setShowAdd] = useState(true);
  const [showLayout, setShowLayout] = useState(true);

  const handleClick = (link) => {
    setshow(false);
    props?.linkButton(link);
  };
  return (
    <div className={classes.container}>
      <ButtonGroup variant="outlined" aria-label="outlined button group">
        <Indicator
          disabled={showDelete}
          position="top-center"
          color="gray"
          inline
          label="Delete Block"
          size={16}
        >
          <Button
            onMouseEnter={() => setShowDelete(false)}
            onMouseLeave={() => setShowDelete(true)}
            onClick={props.del}
          >
            <img className={classes.icon} src={del} />
          </Button>
        </Indicator>
        <Indicator
          disabled={showMove}
          position="top-center"
          color="gray"
          inline
          label="Reposition Block"
          size={16}
        >
          <Button
            onMouseEnter={() => setShowMove(false)}
            onMouseLeave={() => setShowMove(true)}
            onClick={props.enableDrag}
          >
            <img className={classes.icon} src={move} />
          </Button>
        </Indicator>

        {props.displayAddCard ? (
          <Indicator
            disabled={showAdd}
            position="top-center"
            color="gray"
            inline
            label="Add Card"
            size={16}
          >
            <Button
              onMouseEnter={() => setShowAdd(false)}
              onMouseLeave={() => setShowAdd(true)}
              onClick={props.addCard}
            >
              <img className={classes.icon} src={add} />
            </Button>
          </Indicator>
        ) : null}
        {props.openColorPicker ? (
          <Indicator
            disabled={showColor}
            position="top-center"
            color="gray"
            inline
            label="Color Background"
            size={16}
          >
            <Button
              onMouseEnter={() => setShowColor(false)}
              onMouseLeave={() => setShowColor(true)}
              onClick={props.openColorPicker}
            >
              <img className={classes.icon} src={paint} />
            </Button>
          </Indicator>
        ) : null}
        {props.displaySetLayout ? (
          <Indicator
            disabled={showLayout}
            position="top-center"
            color="gray"
            inline
            label="Handle Layout"
            size={16}
          >
            <Button
              onMouseEnter={() => setShowLayout(false)}
              onMouseLeave={() => setShowLayout(true)}
            >
              <Dropdown>
                <Dropdown.Toggle variant="outline" id="dropdown-basic">
                  {props.layout}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() =>
                      props.setLayout(props.options[0].value, props.id)
                    }
                  >
                    {props.options[0].text}
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() =>
                      props.setLayout(props.options[1].value, props.id)
                    }
                  >
                    {props.options[1].text}
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() =>
                      props.setLayout(props.options[2].value, props.id)
                    }
                  >
                    {props.options[2].text}
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Button>
          </Indicator>
        ) : null}

        {props.linkButton ? (
          <Indicator
            disabled={showLink}
            position="top-center"
            color="gray"
            inline
            label="Link Button"
            size={16}
          >
            <Button
              onMouseEnter={() => setShowLink(false)}
              onMouseLeave={() => setShowLink(true)}
              onClick={() => setshow(true)}
            >
              <img alt="" className={classes.icon} src={link} />
            </Button>
          </Indicator>
        ) : null}
        {show && <LinkButton link={handleClick} />}
      </ButtonGroup>
    </div>
  );
};

export default HandleBlock;
