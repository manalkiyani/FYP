import React, { Component } from "react";
import { Button, Container, Flex, Group, Space } from "@mantine/core";
import HandleBlock from "../HandleBlock/handleBlock";
import ContentEditable from "react-contenteditable";
import ButtonMenu from "../linkButton/btnMenu/buttonMenu";
import BgColor from "../../BackgroundColor/BgColor";
import { uploadImage } from "../../../utilityFunctions/imageUpload";
import UploadImage from "../../uploadImage/uploadImage";

import classes from "./Header3.module.css";

export default class Header3 extends Component {
  state = {
    showMenu: false,
    displayHandleBlock: false,
    image: null,
    openColorPicker: false,
  };

  handleTextChange = (e, tag) => {
    console.log(e.target.value);
    this.props.changeText(e.target.value, null, tag, this.props.id, "header3");
  };

  handleClick = () => {
    this.props.onClick(this.props.id, "btn", null, "header3");
    this.setState({ showMenu: true });
  };

  linkButton = (link) => {
    this.setState({ showMenu: false });
    console.log(link);
  };

  disableHandleBlock = () => {
    this.setState({ displayHandleBlock: false });
  };

  enableHandleBlock = () => {
    this.setState({ displayHandleBlock: true });
  };

  handleSocialIcons = (socialIcons) => {
    this.props.handleSocialIcons(socialIcons, this.props.id);
  };

  handleImageChange = async (event) => {
    this.setState({ image: event.target.files[0] });
    try {
      const link = await uploadImage(event.target.files[0]);
      console.log(link);
      this.props.changeBackgroundImage(link, this.props.id);
    } catch (err) {
      console.log(err);
    }
  };

  handleClose = () => {
    this.setState({ openColorPicker: false });
  };

  changeBackgroundColor = (color) => {
    this.props.changeBackgroundColor(color.hex, this.props.id);
  };

  render() {
    const { Data, dragDisable, deleteBlock, enableDrag, id } = this.props;
    const { showMenu, displayHandleBlock, image, openColorPicker } = this.state;

    return (
      <div
        style={{
          backgroundColor: Data.data.bgColor,
          boxShadow: dragDisable
            ? "none"
            : "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        }}
        onMouseOver={this.enableHandleBlock}
        onMouseOut={this.disableHandleBlock}
        className={classes.header}
      >
        <BgColor
          handleClose={this.handleClose}
          updateColor={this.changeBackgroundColor}
          open={openColorPicker}
        />
        {displayHandleBlock && (
          <HandleBlock
            del={() => deleteBlock(id)}
            enableDrag={enableDrag}
            openColorPicker={() => this.setState({ openColorPicker: true })}
            linkButton={this.linkButton}
          />
        )}
        {displayHandleBlock && (
          <UploadImage
            top={55}
            left={10}
            handleImageChange={this.handleImageChange}
            image={image}
          />
        )}
        <Container size="80rem">
          <Group grow gap="md">
            <img className={classes.img} src={Data.data.img} />

            <Flex direction="column">
              <ContentEditable
                className={classes.h}
                html={Data.data.h.text}
                disabled={false}
                onChange={(e) => this.handleTextChange(e, "h")}
                onClick={() => this.props.onClick(id, "h", null, "header3")}
                style={{
                  fontSize: Data.data.h.size,
                  fontFamily: Data.data.h.family,
                  color: Data.data.h.color,
                  fontWeight: Data.data.h.bold ? "bold" : "normal",
                  textDecoration: Data.data.h.underline ? "underline" : "none",
                  fontStyle: Data.data.h.italic ? "italic" : "normal",
                  textAlign: Data.data.h.align,
                }}
              />

              <ContentEditable
                html={Data.data.s.text}
                disabled={false}
                className={classes.s}
                onClick={() => this.props.onClick(id, "s", null, "header3")}
                onChange={(e) => this.handleTextChange(e, "s")}
                style={{
                  fontSize: Data.data.s.size,
                  fontFamily: Data.data.s.family,
                  color: Data.data.s.color,
                  fontWeight: Data.data.s.bold ? "bold" : "normal",
                  textDecoration: Data.data.s.underline ? "underline" : "none",
                  fontStyle: Data.data.s.italic ? "italic" : "normal",
                  textAlign: Data.data.s.align,
                }}
              />
              <Space h="xl" />
              <div>
                <Button variant="default" radius="xl">
                  <ContentEditable
                    html={Data.data.btn.text}
                    disabled={false}
                    onClick={this.handleClick}
                    onChange={(e) => this.handleTextChange(e, "btn")}
                    style={{
                      fontSize: Data.data.btn.size,
                      fontFamily: Data.data.btn.family,
                      color: Data.data.btn.color,
                      fontWeight: Data.data.btn.bold ? "bold" : "normal",
                      textDecoration: Data.data.btn.underline ? "underline" : "none",
                      fontStyle: Data.data.btn.italic ? "italic" : "normal",
                      textAlign: Data.data.btn.align,
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
}
