import React, { Component } from "react";

import classes from "../../../components/blocks/Header3/Header3.module.css";

import ContentEditable from "react-contenteditable";

export default class ViewerHeader3 extends Component {
  render() {
    return (
      <div
        style={{
          backgroundColor: this.props.Data.data.bgColor,
        }}
        className={classes.header}
      >
        <img
          style={{ zIndex: "100", height: "500px" }}
          src={this.props.Data.data.img}
        />

        <div>
          <ContentEditable
            className={classes.h}
            html={this.props.Data.data.h.text} // innerHTML of the editable div
            disabled={true} // use true to disable editing
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

          <ContentEditable
            html={this.props.Data.data.p.text} // innerHTML of the editable div
            disabled={true} // use true to disable editing
            className={classes.p}
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
            html={this.props.Data.data.s.text} // innerHTML of the editable div
            disabled={true} // use true to disable editing
            className={classes.s}
            style={{
              fontSize: this.props.Data.data.s.size,
              fontFamily: this.props.Data.data.s.family,
              color: this.props.Data.data.s.color,
              fontWeight:
                this.props.Data.data.s.bold === true ? "bold" : "normal",
              textDecoration:
                this.props.Data.data.s.underline === true
                  ? "underline"
                  : "none",
              fontStyle:
                this.props.Data.data.s.italic === true ? "italic" : "normal",
              textAlign: this.props.Data.data.s.align,
            }}
          />

          <ContentEditable
            className={classes.btn}
            html={this.props.Data.data.btn.text}
            disabled={true}
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
