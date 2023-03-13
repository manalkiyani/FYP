import React, { Component } from "react";
import classes from "./Features3.module.css";


import DelCard from "../delCard/delCard";
import HandleBlock from "../HandleBlock/handleBlock";
import ContentEditable from "react-contenteditable";


export default class Features3 extends Component {
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
      "features2"
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
          className={classes.Container}
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
                { text: "3 cards - width 30%", value: 3 },
                { text: "2 cards - width 40%", value: 2 },
                { text: "1 card - width 50%", value: 1 },
              ]}
            ></HandleBlock>
          )}

          {Object.getOwnPropertyNames(this.props.Data.data).map((index) => {
            return (
              <div
                key={index}
                className={classes.card}
                style={{
                  width:
                    this.props.Data.layout === 3
                      ? "30%"
                      : this.props.Data.layout === 2
                      ? "40%"
                      : "50%",
                }}
              >
                <DelCard del={this.delCard} index={index} />

                <div className={classes.container}>
                  <ContentEditable
                    html={this.props.Data.data[index].h.text} // innerHTML of the editable div
                    disabled={false} // use true to disable editing
                    onClick={() =>
                      this.props.onClick(this.props.id, "h", index, "features2")
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

                  <ContentEditable
                    html={this.props.Data.data[index].p.text} // innerHTML of the editable div
                    disabled={false} // use true to disable editing
                    onClick={() =>
                      this.props.onClick(this.props.id, "p", index, "features2")
                    }
                    onChange={(e) => this.handleTextChange(e, index, "p")} // handle innerHTML change
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
