import React, { Component } from "react";
import classes from "../../../components/blocks/Features3/Features3.module.css";
import ContentEditable from "react-contenteditable";

export default class ViewerFeatures3 extends Component {
  render() {
    return (
      <div className={classes.panel}>
        <div className={classes.Container}>
          {Object.getOwnPropertyNames(this.props.Data.data).map((index) => {
            return (
              <div key={index} className={classes.card}>
                <div className={classes.container}>
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
                <img
                  className={classes.img}
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
