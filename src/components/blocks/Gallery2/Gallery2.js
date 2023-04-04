import React, { Component } from "react";
import classes from "./Gallery2.module.css";

import DelCard from "../delCard/delCard";
import HandleBlock from "../HandleBlock/handleBlock";

import { uploadImage } from "../../../utilityFunctions/imageUpload";
import UploadImage from "../../uploadImage/uploadImage";
export default class Gallery2 extends Component {
  state = {
    displayHandleBlock: false,
    image: null,
  };

  delCard = (index) => {
    this.props.deleteCard(index, this.props.id);
  };

  handleImageChange = async (event, index) => {
    console.log("index", index);
    this.setState({
      image: event.target.files[0],
    });
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
      "gallery2"
    );
  };

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
          ></HandleBlock>
        )}

        {Object.getOwnPropertyNames(this.props.Data.data).map((index) => {
          return (
            <div key={index} className={classes.card}>
              <DelCard del={this.delCard} index={index} />
              <UploadImage
                index={index}
                top={5}
                left={5}
                handleImageChange={(event) =>
                  this.handleImageChange(event, index)
                }
                image={this.state.image}
              />
              <img
                className={classes.img}
                src={this.props.Data.data[index].bg.picture}
              />
            </div>
          );
        })}
      </div>
    );
  }
}
