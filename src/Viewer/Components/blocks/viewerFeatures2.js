import React, { Component } from "react";
import classes from "../../../components/blocks/Features2/Features2.module.css";
import ContentEditable from "react-contenteditable";

export default class ViewerFeatures2 extends Component {
  render() {
    return (
      <div className={classes.panel}>
        {Object.getOwnPropertyNames(this.props.Data.data).map((index) => {
          return (
            <div key={index} className={classes.card}   style={{
                width:
                  this.props.Data.layout === 5
                    ? "17%"
                    : this.props.Data.layout === 4
                    ? "20%"
                    : "30%",
              }}>
              <img
                className={classes.img}
                src={this.props.Data.data[index].bg.picture}
              />
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
                  html={this.props.Data.data[index].s.text} // innerHTML of the editable div
                  disabled={false} // use true to disable editing
                  className={classes.subHeading}
                  style={{
                    fontSize: this.props.Data.data[index].s.size,
                    fontFamily: this.props.Data.data[index].s.family,
                    color: this.props.Data.data[index].s.color,
                    fontWeight:
                      this.props.Data.data[index].s.bold === true
                        ? "bold"
                        : "normal",
                    textDecoration:
                      this.props.Data.data[index].s.underline === true
                        ? "underline"
                        : "none",
                    fontStyle:
                      this.props.Data.data[index].s.italic === true
                        ? "italic"
                        : "normal",
                    textAlign: this.props.Data.data[index].s.align,
                  }}
                />

                <ContentEditable
                  html={this.props.Data.data[index].p.text} // innerHTML of the editable div
                  disabled={false} // use true to disable editing
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

                <ContentEditable
                  html={this.props.Data.data[index].btn.text} // innerHTML of the editable div
                  disabled={false} // use true to disable editing
                  className={classes.btn}
                  style={{
                    fontSize: this.props.Data.data[index].btn.size,
                    fontFamily: this.props.Data.data[index].btn.family,
                    color: this.props.Data.data[index].btn.color,
                    fontWeight:
                      this.props.Data.data[index].btn.bold === true
                        ? "bold"
                        : "normal",
                    textDecoration:
                      this.props.Data.data[index].btn.underline === true
                        ? "underline"
                        : "normal",
                    fontStyle:
                      this.props.Data.data[index].btn.italic === true
                        ? "italic"
                        : "normal",
                    textAlign: this.props.Data.data[index].btn.align,
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
