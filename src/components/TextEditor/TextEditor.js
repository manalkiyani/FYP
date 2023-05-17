import React, { Component } from "react";
import { CompactPicker } from "react-color";

import Dropdown from "react-bootstrap/Dropdown";

import classes from "./TextEditor.module.css";
import bold from "../../assets/icons/bold.png";
import italic from "../../assets/icons/italic.png";
import underline from "../../assets/icons/underline.png";
import centerAlign from "../../assets/icons/centerAlign.png";
import leftAlign from "../../assets/icons/leftAlign.png";
import rightAlign from "../../assets/icons/rightAlign.png";

class TextEditor extends Component {
  state = {
    size: this.props.data.size,
    color: this.props.data.color,
    bold: this.props.data.bold,
    underline: this.props.data.underline,
    italic: this.props.data.italic,
    align: this.props.data.align,
    family: this.props.data.family,
    spacing: this.props.data.spacing,
    height: this.props.data.height,
  };
  componentDidUpdate(prevProps) {
    console.log("in text editor");
    console.log(this.state);
    if (this.props.data !== prevProps.data) {
      console.log("component did update");
      console.log(this.props.data);
      this.setState({
        size: this.props.data.size,
        color: this.props.data.color,
        bold: this.props.data.bold,
        underline: this.props.data.underline,
        italic: this.props.data.italic,
        align: this.props.data.align,
        family: this.props.data.family,
        spacing: this.props.data.spacing,
        height: this.props.data.height,
      });
    }
  }

  updateHeight = (height) => {
    this.setState(
      {
        height: height,
      },
      () => {
        this.props.onUpdate(this.state);
      }
    );
  };

  updateSize = (Size) => {
    this.setState(
      {
        size: Size,
      },
      () => {
        this.props.onUpdate(this.state);
      }
    );
  };
  updateSpacing = (spacing) => {
    this.setState(
      {
        spacing: spacing,
      },
      () => {
        this.props.onUpdate(this.state);
      }
    );
  };
  updateColor = (Color) => {
    this.setState(
      {
        color: Color.hex,
      },
      () => {
        this.props.onUpdate(this.state);
      }
    );
  };
  updateBold = () => {
    this.setState(
      (prevState) => {
        return {
          bold: !prevState.bold,
        };
      },
      () => {
        this.props.onUpdate(this.state);
      }
    );
  };
  updateUnderline = () => {
    this.setState(
      (prevState) => {
        return {
          underline: !prevState.underline,
        };
      },
      () => {
        this.props.onUpdate(this.state);
      }
    );
  };
  updateItalic = () => {
    this.setState(
      (prevState) => {
        return {
          italic: !prevState.italic,
        };
      },
      () => {
        this.props.onUpdate(this.state);
      }
    );
  };
  updateAlign = (choice) => {
    this.setState(
      (prevState) => {
        return { align: choice };
      },
      () => {
        this.props.onUpdate(this.state);
      }
    );
  };
  updateFamily = (Family) => {
    this.setState(
      {
        family: Family,
      },
      () => {
        this.props.onUpdate(this.state);
      }
    );
  };

  render() {
    return (
      <div
        className={
          this.props.show
            ? [classes.panel, classes.Open].join(" ")
            : [classes.panel, classes.Close].join(" ")
        }
      >
        <div className={classes.heading}>
          <p>Text Settings</p>
        </div>
        <div className={classes.content}>
          <div>
            <p className={classes.para}>Text Style</p>
            <div className={[classes.round, classes.display].join(" ")}>
              <img
                onClick={this.updateBold}
                className={classes.img}
                src={bold}
              />

              <div className={classes.box}>
                <img
                  onClick={this.updateItalic}
                  className={classes.img}
                  src={italic}
                />
              </div>
              <img
                onClick={this.updateUnderline}
                className={classes.img}
                src={underline}
              />
            </div>
          </div>

          <div>
            <p className={classes.para}>Letter Spacing</p>
            <Dropdown>
              <Dropdown.Toggle
                className={[classes.round, classes.end].join(" ")}
                variant="outline"
                id="dropdown-basic"
              >
                {this.state.spacing}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item
                  style={{ fontFamily: "0px" }}
                  onClick={() => this.updateSpacing("0px")}
                >
                  0px
                </Dropdown.Item>
                <Dropdown.Item
                  style={{ fontFamily: "1px" }}
                  onClick={() => this.updateSpacing("1px")}
                >
                  1px
                </Dropdown.Item>
                <Dropdown.Item
                  style={{ fontFamily: "2px" }}
                  onClick={() => this.updateSpacing("2px")}
                >
                  2px
                </Dropdown.Item>
                <Dropdown.Item
                  style={{ fontFamily: "3px" }}
                  onClick={() => this.updateSpacing("3px")}
                >
                  3px
                </Dropdown.Item>
                <Dropdown.Item
                  style={{ fontFamily: "4px" }}
                  onClick={() => this.updateSpacing("4px")}
                >
                  4px
                </Dropdown.Item>
                <Dropdown.Item
                  style={{ fontFamily: "5px" }}
                  onClick={() => this.updateSpacing("5px")}
                >
                  5px
                </Dropdown.Item>
                <Dropdown.Item
                  style={{ fontFamily: "6px" }}
                  onClick={() => this.updateSpacing("6px")}
                >
                  6px
                </Dropdown.Item>
                <Dropdown.Item
                  style={{ fontFamily: "10px" }}
                  onClick={() => this.updateSpacing("10px")}
                >
                  10px
                </Dropdown.Item>
                <Dropdown.Item
                  style={{ fontFamily: "-1px" }}
                  onClick={() => this.updateSpacing("-1px")}
                >
                  -1px
                </Dropdown.Item>
                <Dropdown.Item
                  style={{ fontFamily: "-2px" }}
                  onClick={() => this.updateSpacing("-2px")}
                >
                  -2px
                </Dropdown.Item>
                <Dropdown.Item
                  style={{ fontFamily: "-3px" }}
                  onClick={() => this.updateSpacing("-3px")}
                >
                  -3px
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>

          {/*Font family */}
          <div>
            <p className={classes.para}>Font family</p>
            <Dropdown>
              <Dropdown.Toggle
                className={[classes.round, classes.end].join(" ")}
                variant="outline"
                id="dropdown-basic"
              >
                {this.state.family}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item
                  style={{ fontFamily: "Monospace" }}
                  onClick={() => this.updateFamily("Monospace")}
                >
                  Monospace
                </Dropdown.Item>
                <Dropdown.Item
                  style={{ fontFamily: "Sans-serif" }}
                  onClick={() => this.updateFamily("Sans-serif")}
                >
                  Sans-serif
                </Dropdown.Item>
                <Dropdown.Item
                  style={{ fontFamily: "Serif" }}
                  onClick={() => this.updateFamily("Serif")}
                >
                  Serif
                </Dropdown.Item>
                <Dropdown.Item
                  style={{ fontFamily: "Cursive" }}
                  onClick={() => this.updateFamily("Cursive")}
                >
                  Cursive
                </Dropdown.Item>
                <Dropdown.Item
                  style={{ fontFamily: "Fantasy" }}
                  onClick={() => this.updateFamily("Fantasy")}
                >
                  Fantasy
                </Dropdown.Item>
                <Dropdown.Item
                  style={{ fontFamily: "Josefin Sans" }}
                  onClick={() => this.updateFamily("Josefin Sans")}
                >
                  Josefin Sans
                </Dropdown.Item>
                <Dropdown.Item
                  style={{ fontFamily: "Open Sans" }}
                  onClick={() => this.updateFamily("Open Sans")}
                >
                  Open Sans
                </Dropdown.Item>
                <Dropdown.Item
                  style={{ fontFamily: "Poppins" }}
                  onClick={() => this.updateFamily("Poppins")}
                >
                  Poppins
                </Dropdown.Item>
                <Dropdown.Item
                  style={{ fontFamily: "Roboto" }}
                  onClick={() => this.updateFamily("Roboto")}
                >
                  Roboto
                </Dropdown.Item>
                <Dropdown.Item
                  style={{ fontFamily: "Montserrat" }}
                  onClick={() => this.updateFamily("Montserrat")}
                >
                  Montserrat
                </Dropdown.Item>

                <Dropdown.Item
                  style={{ fontFamily: "Kadwa" }}
                  onClick={() => this.updateFamily("Kadwa")}
                >
                  Kadwa
                </Dropdown.Item>
                <Dropdown.Item
                  style={{ fontFamily: "Inter" }}
                  onClick={() => this.updateFamily("Inter")}
                >
                  Inter
                </Dropdown.Item>
                <Dropdown.Item
                  style={{ fontFamily: "Ubuntu" }}
                  onClick={() => this.updateFamily("Ubuntu")}
                >
                  Ubuntu
                </Dropdown.Item>
                <Dropdown.Item
                  style={{ fontFamily: "Comme" }}
                  onClick={() => this.updateFamily("Comme")}
                >
                  Comme
                </Dropdown.Item>
                <Dropdown.Item
                  style={{ fontFamily: "Anton" }}
                  onClick={() => this.updateFamily("Anton")}
                >
                  Anton
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>

          {/*Line height */}
          <div>
            <p className={classes.para}>Line Height </p>
            <Dropdown>
              <Dropdown.Toggle
                className={[classes.round, classes.end].join(" ")}
                variant="outline"
                id="dropdown-basic"
              >
                {this.state.height}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={() => this.updateHeight("10px")}>
                  10px
                </Dropdown.Item>
                <Dropdown.Item onClick={() => this.updateHeight("20px")}>
                  20px
                </Dropdown.Item>
                <Dropdown.Item onClick={() => this.updateHeight("30px")}>
                  30px
                </Dropdown.Item>
                <Dropdown.Item onClick={() => this.updateHeight("40px")}>
                  40px
                </Dropdown.Item>
                <Dropdown.Item onClick={() => this.updateHeight("50px")}>
                  50px
                </Dropdown.Item>
                <Dropdown.Item onClick={() => this.updateHeight("60px")}>
                  60px
                </Dropdown.Item>
                <Dropdown.Item onClick={() => this.updateHeight("70px")}>
                  70px
                </Dropdown.Item>
                <Dropdown.Item onClick={() => this.updateHeight("80px")}>
                  80px
                </Dropdown.Item>
                <Dropdown.Item onClick={() => this.updateHeight("90px")}>
                  90px
                </Dropdown.Item>
                <Dropdown.Item onClick={() => this.updateHeight("100px")}>
                  100px
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>

          <div>
            <p className={classes.para}>Alignment</p>
            <div className={[classes.round, classes.display].join(" ")}>
              <img
                onClick={() => this.updateAlign("left")}
                className={classes.img}
                src={leftAlign}
              />

              <div className={classes.box}>
                <img
                  onClick={() => this.updateAlign("center")}
                  className={classes.img}
                  src={centerAlign}
                />
              </div>
              <img
                onClick={() => this.updateAlign("right")}
                className={classes.img}
                src={rightAlign}
              />
            </div>
          </div>
          <div>
            <p className={classes.para}>Font Size</p>
            <Dropdown>
              <Dropdown.Toggle
                className={[classes.round, classes.end].join(" ")}
                variant="outline"
                id="dropdown-basic"
              >
                {this.state.size}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={() => this.updateSize("12px")}>
                  12px
                </Dropdown.Item>
                <Dropdown.Item onClick={() => this.updateSize("14px")}>
                  14px
                </Dropdown.Item>
                <Dropdown.Item onClick={() => this.updateSize("16px")}>
                  16px
                </Dropdown.Item>
                <Dropdown.Item onClick={() => this.updateSize("18px")}>
                  18px
                </Dropdown.Item>
                <Dropdown.Item onClick={() => this.updateSize("20px")}>
                  20px
                </Dropdown.Item>
                <Dropdown.Item onClick={() => this.updateSize("22px")}>
                  22px
                </Dropdown.Item>
                <Dropdown.Item onClick={() => this.updateSize("24px")}>
                  24px
                </Dropdown.Item>
                <Dropdown.Item onClick={() => this.updateSize("28px")}>
                  28px
                </Dropdown.Item>
                <Dropdown.Item onClick={() => this.updateSize("30px")}>
                  30px
                </Dropdown.Item>
                <Dropdown.Item onClick={() => this.updateSize("32px")}>
                  32px
                </Dropdown.Item>
                <Dropdown.Item onClick={() => this.updateSize("36px")}>
                  36px
                </Dropdown.Item>
                <Dropdown.Item onClick={() => this.updateSize("40px")}>
                  40px
                </Dropdown.Item>
                <Dropdown.Item onClick={() => this.updateSize("48px")}>
                  48px
                </Dropdown.Item>
                <Dropdown.Item onClick={() => this.updateSize("60px")}>
                  60px
                </Dropdown.Item>
                <Dropdown.Item onClick={() => this.updateSize("72px")}>
                  72px
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>

          <div>
            <p className={classes.para}>Font Color</p>
            <CompactPicker
              color={this.state.color}
              onChangeComplete={(color) => this.updateColor(color)}
            />
          </div>
        </div>
        <button onClick={this.props.closeEditor} className={classes.btn}>
          CLOSE
        </button>
      </div>
    );
  }
}
export default TextEditor;
