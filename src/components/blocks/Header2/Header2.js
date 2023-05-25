import React, { Component } from "react";

import classes from "./Header2.module.css";
import HandleBlock from "../HandleBlock/handleBlock";
import ContentEditable from "react-contenteditable";
import ButtonMenu from "../linkButton/btnMenu/buttonMenu";
import BgColor from "../../BackgroundColor/BgColor";
import UploadImage from "../../uploadImage/uploadImage";
import { uploadImage } from "../../../utilityFunctions/imageUpload";
import {
  createStyles,
  Image,
  Container,
  Title,
  Button,
  Group,
  Text,
  rem,
} from "@mantine/core";

export default class Header2 extends Component {
  state = {
    showMenu: false,
    ref: null,
    displayHandleBlock: false,
    openColorPicker: false,
    image: null,
  };
  //  textFromComponent,
  //   index,
  //   tag,
  //   clickedComponentId,
  //   type

  handleTextChange = (e, tag) => {
    console.log(e.target.value);
    this.props.changeText(e.target.value, null, tag, this.props.id, "header2");
  };

  handleClick = () => {
    this.props.onClick(this.props.id, "btn", null, "header2");
    this.setState({
      showMenu: true,
    });
  };
  linkButton = (object) => {
    this.props.linkButton(object, this.props.id);

    console.log(object);
  };
  handleImageChange = async (event) => {
    this.setState({
      image: event.target.files[0],
    });
    try {
      const link = await uploadImage(event.target.files[0]);
      console.log(link);
      this.props.changeBackgroundImage(link, this.props.id);
    } catch (err) {
      console.log(err);
    }
  };

  disableHandleBlock = () => {
    this.setState({
      displayHandleBlock: false,
    });
  };
  enableHandleBlock = () => {
    this.setState({
      displayHandleBlock: true,
    });
  };
  handleSocialIcons = (socialIcons) => {
    this.props.handleSocialIcons(socialIcons, this.props.id);
  };
  handleClose = () => {
    this.setState({ openColorPicker: false });
  };
  changeBackgroundColor = (color) => {
    this.props.changeBackgroundColor(color.hex, this.props.id);
  };
  render() {
    return (
      <div
        style={{
          backgroundColor: this.props.Data?.data?.bgColor,
          position: "relative",
          marginBottom: "50px",
        }}
        onMouseOver={this.enableHandleBlock}
        onMouseOut={this.disableHandleBlock}
      >
        <BgColor
          handleClose={this.handleClose}
          updateColor={this.changeBackgroundColor}
          open={this.state.openColorPicker}
        />
        {this.state.displayHandleBlock && (
          <HandleBlock
            del={() => this.props.deleteBlock(this.props.id)}
            enableDrag={this.props.enableDrag}
            openColorPicker={() => this.setState({ openColorPicker: true })}
            linkButton={this.linkButton}
          />
        )}
        {this.state.displayHandleBlock && (
          <UploadImage
            top={55}
            left={10}
            handleImageChange={this.handleImageChange}
            image={this.state.image}
          />
        )}
        <Container className={classes.header}>
          <div className={classes.inner}>
            <div className={classes.content}>
              <Title className={classes.title}>
                <ContentEditable
                  html={this.props?.Data?.data?.h.text}
                  disabled={false}
                  onChange={(e) => this.handleTextChange(e, "h")}
                  onClick={() =>
                    this.props.onClick(this.props.id, "h", null, "header2")
                  }
                  style={{
                    fontSize: this.props.Data.data.h.size,
                    fontFamily: this.props.Data.data.h.family,
                    color: this.props.Data.data.h.color,
                    fontWeight:
                      this.props.Data.data.h.bold === true ? "bold" : "normal",
                    textDecoration:
                      this.props.Data.data.h.underline === true
                        ? "underline"
                        : "none",
                    fontStyle:
                      this.props.Data.data.h.italic === true
                        ? "italic"
                        : "normal",
                    textAlign: this.props.Data.data.h.align,
                  }}
                />
              </Title>
              <Text color="dimmed" mt="md">
                <ContentEditable
                  html={this.props.Data.data.p.text}
                  disabled={false}
                  onClick={() =>
                    this.props.onClick(this.props.id, "p", null, "header2")
                  }
                  onChange={(e) => this.handleTextChange(e, "p")}
                  style={{
                    fontSize: this.props.Data.data.p.size,
                    fontFamily: this.props.Data.data.p.family,
                    color: this.props.Data.data.p.color,
                    fontWeight:
                      this.props.Data.data.p.bold === true ? "bold" : "normal",
                    textDecoration:
                      this.props.Data.data.p.underline === true
                        ? "underline"
                        : "none",
                    fontStyle:
                      this.props.Data.data.p.italic === true
                        ? "italic"
                        : "normal",
                    textAlign: this.props.Data.data.p.align,
                  }}
                />
              </Text>

              <Group mt={30}>
                <Button
                  style={{
                    backgroundColor: this.props.Data.data.btn.bgColor,
                  }}
                  radius="xl"
                  size="md"
                  className={classes.control}
                >
                  <ContentEditable
                    html={this.props.Data.data.btn.text}
                    disabled={false}
                    onClick={this.handleClick}
                    onChange={(e) => this.handleTextChange(e, "btn")}
                    style={{
                      fontSize: this.props.Data.data.btn.size,
                      fontFamily: this.props.Data.data.btn.family,
                      color: this.props.Data.data.btn.color,
                      fontWeight:
                        this.props.Data.data.btn.bold === true
                          ? "bold"
                          : "normal",
                      textDecoration:
                        this.props.Data.data.btn.underline === true
                          ? "underline"
                          : "none",
                      fontStyle:
                        this.props.Data.data.btn.italic === true
                          ? "italic"
                          : "normal",
                      textAlign: this.props.Data.data.btn.align,
                    }}
                  />
                </Button>
              </Group>
            </div>
            <div className={classes.image}>
              <Image src={this.props.Data.data.img} />
            </div>
          </div>
        </Container>
      </div>
    );
  }
}
