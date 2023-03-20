import React, { Component } from "react";
import classes from "../../../components/blocks/Gallery1/Gallery1.module.css";
import ContentEditable from "react-contenteditable";
export default class Gallery1 extends Component {
  render() {
    return (
      <div className={classes.panel}>
        {Object.getOwnPropertyNames(this.props.Data.data).map((index) => {
          return (
            <div
              key={index}
              style={{
                width:
                  this.props.Data.layout === 5
                    ? "17%"
                    : this.props.Data.layout === 4
                    ? "20%"
                    : "30%",
              }}
              className={classes.card}
            >
              <img
                className={classes.img}
                src={this.props.Data.data[index].bg.picture}
              />
              <div className={classes.container}>
                <ContentEditable
                  html={this.props.Data.data[index].p.text} // innerHTML of the editable div
                  disabled={true} // use true to disable editing
                  style={{
                    fontSize: this.props.Data.data[index].p.size,
                    fontFamily: this.props.Data.data[index].p.family,
                    color: this.props.Data.data[index].p.color,
                    fontWeight:
                      this.props.Data.data[index].p.bold === true
                        ? "bold"
                        : "normal",
                    textDecoration:
                      this.props.Data.data[index].p.underline === true
                        ? "underline"
                        : "none",
                    fontStyle:
                      this.props.Data.data[index].p.italic === true
                        ? "italic"
                        : "normal",
                    textAlign: this.props.Data.data[index].p.align,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
