import React, { Component } from "react";
import classes from "./Features3.module.css";

import DelCard from "../delCard/delCard";
import HandleBlock from "../HandleBlock/handleBlock";
import ContentEditable from "react-contenteditable";
import UploadImage from "../../uploadImage/uploadImage";
import { uploadImage } from "../../../utilityFunctions/imageUpload";

export default class Features3 extends Component {
  state = {
    displayHandleBlock: false,

    cardImages: [],
  };
  handleImageChange = async (event, index) => {
    console.log("in here features 2 ");
    console.log("index", index);
    const cardImages = { ...this.state.cardImages };
    cardImages[index] = event.target.files[0];
    this.setState({ cardImages });
    try {
      const link = await uploadImage(event.target.files[0]);
      console.log(link);
      this.props.changeCardImage(link, index, this.props.id);
    } catch (err) {
      console.log(err);
    }
  };
  delCard = (index) => {
    this.props.deleteCard(index, this.props.id);
  };

  handleTextChange = (e, index, tag) => {
    this.props.changeText(
      e.target.value,
      index,
      tag,
      this.props.id,
      "features3"
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
                <UploadImage
                  top={5}
                  left={5}
                  handleImageChange={this.handleImageChange}
                  index={index}
                  image={this.state.cardImages[index]}
                />

                <div className={classes.container}>
                  <ContentEditable
                    html={this.props.Data.data[index].h.text} // innerHTML of the editable div
                    disabled={false} // use true to disable editing
                    onClick={() =>
                      this.props.onClick(this.props.id, "h", index, "features3")
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
                      this.props.onClick(this.props.id, "p", index, "features3")
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
