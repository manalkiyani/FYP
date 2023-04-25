import React, { Component } from "react";
import classes from "./Features1.module.css";
import DelCard from "../delCard/delCard";
import HandleBlock from "../HandleBlock/handleBlock";
import ContentEditable from "react-contenteditable";

export default class Features1 extends Component {
  state = {
    displayHandleBlock: false,
  };

  delCard = (index) => {
    this.props.deleteCard(index, this.props.id);
  };
  // textFromComponent,
  //   index,
  //   tag,
  //   clickedComponentId,
  //   type
  handleTextChange = (e, index, tag) => {
    this.props.changeText(
      e.target.value,
      index,
      tag,
      this.props.id,
      "features1"
    );
  };

  handleBtnClick = () => {};

  render() {
    return (
      <div className={classes.panel}>
        <div
          onMouseEnter={() => {
            this.setState({
              displayHandleBlock: true,
            });
          }}
          onMouseLeave={() => {
            this.setState({
              displayHandleBlock: false,
            });
          }}
          className={classes.boxes}
        >
          {this.state.displayHandleBlock && (
            <HandleBlock
              id={this.props.id}
              del={() => this.props.deleteBlock(this.props.id)}
              enableDrag={this.props.enableDrag}
              displayAddCard={true}
              addCard={() => this.props.addCard(this.props.id)}
              layout={this.props.Data.layout}
              displaySetLayout={true}
              setLayout={this.props.setLayout}
              options={[
                { text: "4 cards - width 20%", value: 4 },
                { text: "3 cards - width 30%", value: 3 },
                { text: "2 cards - width 40%", value: 2 },
              ]}
            ></HandleBlock>
          )}

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
                      : "35%",
                }}
              >
                <DelCard del={this.delCard} index={index} />

                <ContentEditable
                  html={this.props.Data.data[index].h.text} // innerHTML of the editable div
                  disabled={false} // use true to disable editing
                  onClick={() =>
                    this.props.onClick(this.props.id, "h", index, "features1")
                  }
                  onChange={(e) => this.handleTextChange(e, index, "h")} // handle innerHTML change
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
