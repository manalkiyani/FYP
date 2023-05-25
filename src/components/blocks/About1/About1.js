import React, { Component } from "react";

import classes from "./About1.module.css";
import HandleBlock from "../HandleBlock/handleBlock";
import ContentEditable from "react-contenteditable";

import BgColor from "../../BackgroundColor/BgColor";

export default class About1 extends Component {
  state = {
    ref: null,
    displayHandleBlock: false,
    openColorPicker: false,
  };

  handleTextChange = (e, tag) => {
    console.log(e.target.value);
    this.props.changeText(e.target.value, null, tag, this.props.id, "about1");
  };

  handleClick = () => {
    this.props.onClick(this.props.id, "btn", null, "about1");
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
          backgroundColor: this.props.Data.data.bgColor,
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
          updateColor={this.changeBackgroundColor}
          open={this.state.openColorPicker}
        />
        {this.state.displayHandleBlock && (
          <HandleBlock
            del={() => this.props.deleteBlock(this.props.id)}
            enableDrag={this.props.enableDrag}
            openColorPicker={() => this.setState({ openColorPicker: true })}
          />
        )}
        <div className={classes.content}>
          <ContentEditable
            html={this.props.Data.data.h.text} // innerHTML of the editable div
            disabled={false} // use true to disable editing
            onChange={(e) => this.handleTextChange(e, "h")} // handle innerHTML change
            onClick={() =>
              this.props.onClick(this.props.id, "h", null, "about1")
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
            }}
          />
          <hr className={classes.line} />

          <ContentEditable
            html={this.props.Data.data.p.text} // innerHTML of the editable div
            disabled={false} // use true to disable editing
            className={classes.p}
            onClick={() =>
              this.props.onClick(this.props.id, "p", null, "about1")
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
            }}
          />

          <ContentEditable
            className={classes.btn}
            html={this.props.Data.data.btn.text}
            disabled={false}
            onClick={this.handleClick}
            onChange={(e) => this.handleTextChange(e, "btn")}
            style={{
              fontSize: this.props.Data.data.btn.size,
              fontFamily: this.props.Data.data.btn.family,
              color: this.props.Data.data.btn.color,
              fontWeight:
                this.props.Data.data.btn.bold === true ? "bold" : "normal",
              textDecoration:
                this.props.Data.data.btn.underline === true
                  ? "underline"
                  : "none",
              fontStyle:
                this.props.Data.data.btn.italic === true ? "italic" : "normal",
              textAlign: this.props.Data.data.btn.align,
            }}
          />
        </div>
      </div>
    );
  }
}
