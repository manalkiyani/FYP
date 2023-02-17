import React, { Component } from "react";
import classes from "./Features2.module.css";

import sample1 from "../../../assets/imgs/sample1.jpg";
import sample2 from "../../../assets/imgs/sample2.jpg";
import sample3 from "../../../assets/imgs/sample3.jpg";
import DelCard from "../delCard/delCard";
import HandleBlock from "../HandleBlock/handleBlock";
import ContentEditable from "react-contenteditable";

export default class Features2 extends Component {
  state = {
    displayHandleBlock: false,
  };

  handleAddCard = () => {
    console.log("here");
    this.props.addCard(this.props.id);
  };
  delBlock = () => {
    this.props.deleteBlock(this.props.id);
  };

  delCard = (index) => {
    this.props.deleteCard(index, this.props.id);
  };

  handleTextChange = (e, index) => {
    this.props.changeText(e.target.value, index);
  };

  handleBtnClick = () => {};
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

  render() {
    return (
      <div
        onMouseOver={this.enableHandleBlock}
        onMouseOut={this.disableHandleBlock}
        className={classes.panel}
      >
        {this.state.displayHandleBlock && (
          <HandleBlock
            id={this.props.id}
            del={this.delBlock}
            enableDrag={this.props.enableDrag}
            displayAddCard={true}
            addCard={this.handleAddCard}
            layout={this.props.Data.layout}
            displaySetLayout={true}
            setLayout={this.props.setLayout}
          />
        )}

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
              <DelCard del={this.delCard} index={index} />

              <img
                className={classes.img}
                src={this.props.Data.data[index].bg.picture}
              />
              <div className={classes.container}>
                <ContentEditable
                  html={this.props.Data.data[index].h.text} // innerHTML of the editable div
                  disabled={false} // use true to disable editing
                  onClick={() => this.props.onClick(this.props.id, "h", index)}
                  onChange={(e) => this.handleTextChange(e, index)} // handle innerHTML change
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
                  onClick={() => this.props.onClick(this.props.id, "s", index)}
                  onChange={(e) => this.handleTextChange(e, index)} // handle innerHTML change
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
                  onClick={() => this.props.onClick(this.props.id, "p", index)}
                  onChange={(e) => this.handleTextChange(e, index)} // handle innerHTML change
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
                  onClick={() =>
                    this.props.onClick(this.props.id, "btn", index)
                  }
                  onChange={(e, index) => this.handleTextChange(e, index)} // handle innerHTML change
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
