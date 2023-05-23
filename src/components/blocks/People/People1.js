import React, { Component } from "react";
import classes from "./People1.module.css";

import DelCard from "../delCard/delCard";
import HandleBlock from "../HandleBlock/handleBlock";
import ContentEditable from "react-contenteditable";
import { Space } from "@mantine/core";
import SocialIcons from "../socialIcons/socialIcons";
import UploadImage from "../../uploadImage/uploadImage";
import { uploadImage } from "../../../utilityFunctions/imageUpload";

class People1 extends Component {
  state = {
    displayHandleBlock: false,

    cardImages: [],
  };

  handleImageChange = async (event, index) => {
    const { cardImages } = this.state;
    const cardImagesCopy = [...cardImages];
    cardImagesCopy[index] = event.target.files[0];
    this.setState({ cardImages: cardImagesCopy });
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
    this.props.changeText(e.target.value, index, tag, this.props.id, "people1");
  };

  handleSocialIcons = (socialIcons) => {
    this.props.handleSocialIcons(socialIcons, this.props.id);
  };

  render() {
    const { displayHandleBlock, cardImages } = this.state;
    const { Data } = this.props;

    return (
      <div className={classes.panel}>
        <div
          onMouseEnter={() => {
            this.setState({ displayHandleBlock: true });
          }}
          onMouseLeave={() => {
            this.setState({ displayHandleBlock: false });
          }}
          className={classes.Container}
        >
          {displayHandleBlock && (
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

          {Object.getOwnPropertyNames(Data.data).map((index) => {
            return (
              <div
                key={index}
                className={classes.card}
                style={{
                  width:
                    Data.layout === 3
                      ? "30%"
                      : Data.layout === 2
                      ? "40%"
                      : "50%",
                }}
              >
                <img
                  className={classes.img}
                  src={Data.data[index].bg.picture}
                />
                {displayHandleBlock && (
                  <>
                    <DelCard del={this.delCard} index={index} />
                    <UploadImage
                      top={5}
                      left={5}
                      handleImageChange={(event) =>
                        this.handleImageChange(event, index)
                      }
                      index={index}
                      image={cardImages[index]}
                    />
                  </>
                )}

                <div className={classes.container}>
                  <ContentEditable
                    html={Data.data[index].h.text}
                    disabled={false}
                    onClick={() =>
                      this.props.onClick(this.props.id, "h", index, "people1")
                    }
                    onChange={(e) => this.handleTextChange(e, index, "h")}
                    style={{
                      fontSize: Data.data[index].h.size,
                      fontFamily: Data.data[index].h.family,
                      color: Data.data[index].h.color,
                      fontWeight: Data.data[index].h.bold ? "bold" : "normal",
                      textDecoration: Data.data[index].h.underline
                        ? "underline"
                        : "none",
                      fontStyle: Data.data[index].h.italic
                        ? "italic"
                        : "normal",
                      textAlign: Data.data[index].h.align,
                      letterSpacing: Data.data[index].h.spacing,
                      lineHeight: Data.data[index].h.height,
                    }}
                  />
                  <ContentEditable
                    html={Data.data[index].s.text}
                    disabled={false}
                    onClick={() =>
                      this.props.onClick(this.props.id, "s", index, "people1")
                    }
                    onChange={(e) => this.handleTextChange(e, index, "s")}
                    style={{
                      fontSize: Data.data[index].s.size,
                      fontFamily: Data.data[index].s.family,
                      color: Data.data[index].s.color,
                      fontWeight: Data.data[index].s.bold ? "bold" : "normal",
                      textDecoration: Data.data[index].s.underline
                        ? "underline"
                        : "none",
                      fontStyle: Data.data[index].s.italic
                        ? "italic"
                        : "normal",
                      textAlign: Data.data[index].s.align,
                      letterSpacing: Data.data[index].s.spacing,
                      lineHeight: Data.data[index].s.height,
                    }}
                  />
                  <Space h="md" />
                  <ContentEditable
                    html={Data.data[index].p.text}
                    disabled={false}
                    onClick={() =>
                      this.props.onClick(this.props.id, "p", index, "people1")
                    }
                    onChange={(e) => this.handleTextChange(e, index, "p")}
                    style={{
                      fontSize: Data.data[index].p.size,
                      fontFamily: Data.data[index].p.family,
                      color: Data.data[index].p.color,
                      fontWeight: Data.data[index].p.bold ? "bold" : "normal",
                      textDecoration: Data.data[index].p.underline
                        ? "underline"
                        : "none",
                      fontStyle: Data.data[index].p.italic
                        ? "italic"
                        : "normal",
                      textAlign: Data.data[index].p.align,
                      letterSpacing: Data.data[index].p.spacing,
                      lineHeight: Data.data[index].p.height,
                    }}
                  />
                  <Space h="md" />
                  <SocialIcons
                    socialIcons={Data.socialIcons}
                    handleSocialIcons={this.handleSocialIcons}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default People1;
