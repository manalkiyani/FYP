import React, { Component } from "react";
import classes from "../../../components/blocks/Header1/Header1.module.css";
import ContentEditable from "react-contenteditable";

export default class ViewerHeader1 extends Component {
  render() {
    return (
      <div className={classes.header}>
        <img className={classes.img} src={this.props.Data.data.img} />
        <div style={{ position: "absolute", zIndex: 1 }}>
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
