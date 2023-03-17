import React, { Component } from "react";
import classes from "../../../components/blocks/Features1/Features1.module.css";

import ContentEditable from "react-contenteditable";

export default class ViewerFeatures1 extends Component {
  render() {
    return (
      <div className={classes.panel}>
        <div className={classes.boxes}>
          {Object.getOwnPropertyNames(this.props.Data.data).map((index) => {
            return (
              <div
                key={index}
                className={classes.box}
               style={{
                  width:
                    this.props.Data.layout === 4
                      ? "20%"
                      : this.props.Data.layout === 3
                      ? "30%"
                      : "40%",
                }}
              >
                <ContentEditable
                  html={this.props.Data.data[index].h.text} // innerHTML of the editable div
                  disabled={true} // use true to disable editing
                  style={{
                    fontSize: this.props.Data.data[index].h.size,
                    fontFamily: this.props.Data.data[index].h.family,
                    color: this.props.Data.data[index].h.color,
                    fontWeight:
                      this.props.Data.data[index].h.bold === true
                        ? "bold"
                        : "normal",
                    textDecoration:
                      this.props.Data.data[index].h.underline === true
                        ? "underline"
                        : "none",
                    fontStyle:
                      this.props.Data.data[index].h.italic === true
                        ? "italic"
                        : "normal",
                    textAlign: this.props.Data.data[index].h.align,
                  }}
                />

                <img
                  className={classes.icons}
                  src={this.props.Data.data[index].bg.picture}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
