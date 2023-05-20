import React, { useState } from "react";
import { Button, Container, Flex, Group, Space } from "@mantine/core";
import HandleBlock from "../HandleBlock/handleBlock";
import ContentEditable from "react-contenteditable";
import ButtonMenu from "../linkButton/btnMenu/buttonMenu";
import BgColor from "../../BackgroundColor/BgColor";
import { uploadImage } from "../../../utilityFunctions/imageUpload";
import UploadImage from "../../uploadImage/uploadImage";

import classes from "./Header3.module.css";

export default function Header3(props) {
  const [showMenu, setShowMenu] = useState(false);
  const [displayHandleBlock, setDisplayHandleBlock] = useState(false);
  const [image, setImage] = useState(null);
  const [openColorPicker, setOpenColorPicker] = useState(false);

  const handleTextChange = (e, tag) => {
    console.log(e.target.value);
    props.changeText(e.target.value, null, tag, props.id, "header3");
  };

  const handleClick = () => {
    props.onClick(props.id, "btn", null, "header3");
    setShowMenu(true);
  };

  const linkButton = (link) => {
    setShowMenu(false);
    console.log(link);
  };

  const disableHandleBlock = () => {
    setDisplayHandleBlock(false);
  };

  const enableHandleBlock = () => {
    setDisplayHandleBlock(true);
  };

  const handleSocialIcons = (socialIcons) => {
    props.handleSocialIcons(socialIcons, props.id);
  };

  const handleImageChange = async (event) => {
    setImage(event.target.files[0]);
    try {
      const link = await uploadImage(event.target.files[0]);
      console.log(link);
      props.changeBackgroundImage(link, props.id);
    } catch (err) {
      console.log(err);
    }
  };

  const handleClose = () => {
    setOpenColorPicker(false);
  };

  const changeBackgroundColor = (color) => {
    props.changeBackgroundColor(color.hex, props.id);
  };

  return (
    <div
      style={{
        backgroundColor: props.Data.data.bgColor,
        boxShadow:
          props.dragDisable === false
            ? "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
            : "none",
      }}
      onMouseOver={enableHandleBlock}
      onMouseOut={disableHandleBlock}
      className={classes.header}
    >
      <BgColor
        handleClose={handleClose}
        updateColor={changeBackgroundColor}
        open={openColorPicker}
      />
      {displayHandleBlock && (
        <HandleBlock
          del={() => props.deleteBlock(props.id)}
          enableDrag={props.enableDrag}
          openColorPicker={() => setOpenColorPicker(true)}
          linkButton={linkButton}
        />
      )}
      {displayHandleBlock && (
        <UploadImage
          top={55}
          left={10}
          handleImageChange={handleImageChange}
          image={image}
        />
      )}
      <Container size="80rem">
        <Group grow gap="md">
          <img className={classes.img} src={props.Data.data.img} />

          <Flex direction="column">
            <ContentEditable
              className={classes.h}
              html={props.Data.data.h.text}
              disabled={false}
              onChange={(e) => handleTextChange(e, "h")}
              onClick={() => props.onClick(props.id, "h", null, "header3")}
              style={{
                fontSize: props.Data.data.h.size,
                fontFamily: props.Data.data.h.family,
                color: props.Data.data.h.color,
                fontWeight: props.Data.data.h.bold === true ? "bold" : "normal",
                textDecoration:
                  props.Data.data.h.underline === true ? "underline" : "none",
                fontStyle: props.Data.data.h.italic === true ? "italic" : "normal",
                textAlign: props.Data.data.h.align,
              }}
            />

            <ContentEditable
              html={props.Data.data.s.text}
              disabled={false}
              className={classes.s}
              onClick={() => props.onClick(props.id, "s", null, "header3")}
              onChange={(e) => handleTextChange(e, "s")}
              style={{
                fontSize: props.Data.data.s.size,
                fontFamily: props.Data.data.s.family,
                color: props.Data.data.s.color,
                fontWeight: props.Data.data.s.bold === true ? "bold" : "normal",
                textDecoration:
                  props.Data.data.s.underline === true ? "underline" : "none",
                fontStyle: props.Data.data.s.italic === true ? "italic" : "normal",
                textAlign: props.Data.data.s.align,
              }}
            />
            <Space h="xl" />
            <div>
              <Button variant="default" radius="xl">
                <ContentEditable
                  html={props.Data.data.btn.text}
                  disabled={false}
                  onClick={handleClick}
                  onChange={(e) => handleTextChange(e, "btn")}
                  style={{
                    fontSize: props.Data.data.btn.size,
                    fontFamily: props.Data.data.btn.family,
                    color: props.Data.data.btn.color,
                    fontWeight: props.Data.data.btn.bold === true ? "bold" : "normal",
                    textDecoration:
                      props.Data.data.btn.underline === true ? "underline" : "none",
                    fontStyle: props.Data.data.btn.italic === true ? "italic" : "normal",
                    textAlign: props.Data.data.btn.align,
                  }}
                />
              </Button>
            </div>
          </Flex>
        </Group>
      </Container>
    </div>
  );
}
