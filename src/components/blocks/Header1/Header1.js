import React, { Component } from "react";

import classes from "./Header1.module.css";
import HandleBlock from "../HandleBlock/handleBlock";
import ContentEditable from "react-contenteditable";
import ButtonMenu from "../linkButton/btnMenu/buttonMenu";
import SocialIcons from "../socialIcons/socialIcons";
import { uploadImage } from "../../../utilityFunctions/imageUpload";
import UploadImage from "../../uploadImage/uploadImage";
import BgColor from "../../BackgroundColor/BgColor";

export default class Header1 extends Component {
  state = {
    showMenu: false,
    ref: null,
    displayHandleBlock: false,
    image: null,
    openColorPicker: false,
  };
  //  textFromComponent,
  //   index,
  //   tag,
  //   clickedComponentId,
  //   type

  handleTextChange = (e, tag) => {
    console.log(e.target.value);
    this.props.changeText(e.target.value, null, tag, this.props.id, "header1");
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
  handleClick = () => {
    this.props.onClick(this.props.id, "btn", null, "header1");
  };
  linkButton = (object) => {
    this.props.linkButton(object, this.props.id);

    console.log(object);
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
  changeBtnColor = (color) => {
    this.props.changeBtnColor(color.hex, this.props.id);
  };
  render() {
    return (
      <div
        style={{
          boxShadow:
            this.props.dragDisable === false
              ? "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
              : "none",
        }}
        onMouseOver={this.enableHandleBlock}
        onMouseOut={this.disableHandleBlock}
        className={classes.header}
      >
        <BgColor
          handleClose={this.handleClose}
          updateColor={this.changeBtnColor}
          open={this.state.openColorPicker}
        />
        {this.state.displayHandleBlock && (
          <HandleBlock
            del={() => this.props.deleteBlock(this.props.id)}
            enableDrag={this.props.enableDrag}
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
        <img className={classes.img} src={this.props.Data.data.img} />
        <div style={{ position: "absolute", zIndex: 1 }}>
          <ContentEditable
            className={classes.h}
            html={this.props.Data.data.h.text} // innerHTML of the editable div
            disabled={false} // use true to disable editing
            onChange={(e) => this.handleTextChange(e, "h")} // handle innerHTML change
            onClick={() =>
              this.props.onClick(this.props.id, "h", null, "header1")
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
                this.props.Data.data.h.italic === true ? "italic" : "normal",
              textAlign: this.props.Data.data.h.align,
              letterSpacing: this.props.Data.data.h.spacing,
              lineHeight: this.props.Data.data.h.height,
            }}
          />

          <ContentEditable
            html={this.props.Data.data.p.text} // innerHTML of the editable div
            disabled={false} // use true to disable editing
            className={classes.p}
            onClick={() =>
              this.props.onClick(this.props.id, "p", null, "header1")
            }
            onChange={(e) => this.handleTextChange(e, "p")} // handle innerHTML change
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
                this.props.Data.data.p.italic === true ? "italic" : "normal",
              textAlign: this.props.Data.data.p.align,
              letterSpacing: this.props.Data.data.p.spacing,
              lineHeight: this.props.Data.data.p.height,
            }}
          />

          <ContentEditable
            className={classes.btn}
            html={this.props.Data.data.btn.text}
            disabled={false}
            onClick={this.handleClick}
            onChange={(e) => this.handleTextChange(e, "btn")}
            style={{
              backgroundColor: this.props.Data.data.btn.bgColor,
              fontSize: this.props.Data.data.btn.size,
              fontFamily: this.props.Data.data.btn.family,
              color: this.props.Data.data.btn.color,
              // fontWeight:
              //   this.props.Data.data.btn.bold === true ? "bold" : "normal",
              fontWeight: this.props.Data.data.btn.weight,
              textDecoration:
                this.props.Data.data.btn.underline === true
                  ? "underline"
                  : "none",
              fontStyle:
                this.props.Data.data.btn.italic === true ? "italic" : "normal",
              textAlign: this.props.Data.data.btn.align,
              letterSpacing: this.props.Data.data.btn.spacing,
              lineHeight: this.props.Data.data.btn.height,
            }}
          />
          {console.log("", this.props.Data.data.btn.weight)}

          <SocialIcons
            socialIcons={this.props.Data.socialIcons}
            handleSocialIcons={this.handleSocialIcons}
          />
        </div>
      </div>
    );
  }
}
