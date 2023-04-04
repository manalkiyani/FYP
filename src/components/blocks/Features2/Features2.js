import React, { Component } from "react";
import classes from "./Features2.module.css";

import DelCard from "../delCard/delCard";
import HandleBlock from "../HandleBlock/handleBlock";
import ContentEditable from "react-contenteditable";
import { uploadImage } from "../../../utilityFunctions/imageUpload";
import UploadImage from "../../uploadImage/uploadImage";
export default class Features2 extends Component {
  state = {
    displayHandleBlock: false,

    cardImages: [],
  };

  delCard = (index) => {
    console.log(index);
    this.props.deleteCard(index, this.props.id);
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
        className={classes.panel}
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
              { text: "5 cards - width 20%", value: 5 },
              { text: "4 cards - width 30%", value: 4 },
              { text: "3 cards - width 40%", value: 3 },
            ]}
          ></HandleBlock>
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

              <UploadImage
                top={5}
                left={5}
                handleImageChange={this.handleImageChange}
                index={index}
                image={this.state.cardImages[index]}
              />
              <img
                className={classes.img}
                src={this.props.Data.data[index].bg.picture}
              />
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
                  html={this.props.Data.data[index].s.text} // innerHTML of the editable div
                  disabled={false} // use true to disable editing
                  className={classes.subHeading}
                  onClick={() =>
                    this.props.onClick(this.props.id, "s", index, "features2")
                  }
                  onChange={(e) => this.handleTextChange(e, index, "s")} // handle innerHTML change
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

                <ContentEditable
                  html={this.props.Data.data[index].btn.text} // innerHTML of the editable div
                  disabled={false} // use true to disable editing
                  className={classes.btn}
                  onClick={() =>
                    this.props.onClick(this.props.id, "btn", index, "features2")
                  }
                  onChange={(e) => this.handleTextChange(e, index, "btn")} // handle innerHTML change
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
