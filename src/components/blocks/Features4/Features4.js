import React, { Component } from "react";
import { Paper, Button, Flex } from "@mantine/core";
import classes from "./Features4.module.css";
import DelCard from "../delCard/delCard";
import UploadImage from "../../uploadImage/uploadImage";
import ContentEditable from "react-contenteditable";
import HandleBlock from "../HandleBlock/handleBlock";
import { uploadImage } from "../../../utilityFunctions/imageUpload";

export class Features4 extends Component {
  state = {
    displayHandleBlock: false,
    cardImages: [],
    displayHandleCard: false,
  };

  handleLink = (object, index) => {
    this.props.linkCardButton(object, index, this.props.id);
    console.log(object);
  };

  delCard = (index) => {
    console.log(index);
    this.props.deleteCard(index, this.props.id);
  };

  handleImageChange = async (event, index) => {
    console.log("in here features 4 ");
    console.log("index", index);
    const cardImagesCopy = [...this.state.cardImages];
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

  handleTextChange = (e, index, tag) => {
    this.props.changeText(
      e.target.value,
      index,
      tag,
      this.props.id,
      "features4"
    );
  };

  render() {
    return (
      <Flex
        style={{ position: "relative", marginBottom: "40px" }}
        justify="center"
        gap="md"
        wrap="wrap"
        onMouseEnter={() => {
          this.setState({ displayHandleBlock: true });
        }}
        onMouseLeave={() => {
          this.setState({ displayHandleBlock: false });
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
              { text: "5 cards - width 20%", value: 4 },
              { text: "4 cards - width 30%", value: 3 },
              { text: "3 cards - width 40%", value: 2 },
            ]}
          ></HandleBlock>
        )}

        {Object.keys(this.props.Data.data).map((index) => {
          return (
            <Paper
              onMouseEnter={() => {
                this.setState({ displayHandleCard: true });
              }}
              onMouseLeave={() => {
                this.setState({ displayHandleCard: false });
              }}
              style={{
                padding: "30px",
                position: "relative",
                width:
                  this.props.Data.layout === 4
                    ? "13%"
                    : this.props.Data.layout === 3
                    ? "17%"
                    : "20%",
              }}
              key={index}
              shadow="md"
              p="xl"
              radius="md"
              sx={{
                backgroundImage: `url(${this.props.Data.data[index].bg.picture})`,
              }}
              className={classes.card}
            >
              <div>
                {this.state.displayHandleCard && (
                  <>
                    <DelCard
                      handleLink={this.handleLink}
                      del={this.delCard}
                      index={index}
                    />

                    <UploadImage
                      top={5}
                      left={5}
                      handleImageChange={(event) =>
                        this.handleImageChange(event, index)
                      }
                      index={index}
                      image={this.state.cardImages[index]}
                    />
                  </>
                )}
                <ContentEditable
                  className={classes.category}
                  html={this.props.Data.data[index].p.text}
                  disabled={false}
                  onClick={() =>
                    this.props.onClick(this.props.id, "p", index, "features4")
                  }
                  onChange={(e) => this.handleTextChange(e, index, "p")}
                  style={{
                    fontSize: this.props.Data.data[index].p.size,
                    fontFamily: this.props.Data.data[index].p.family,
                    color: this.props.Data.data[index].p.color,
                    fontWeight: this.props.Data.data[index].p.bold
                      ? "bold"
                      : "normal",
                    textDecoration: this.props.Data.data[index].p.underline
                      ? "underline"
                      : "none",
                    fontStyle: this.props.Data.data[index].p.italic
                      ? "italic"
                      : "normal",
                    textAlign: this.props.Data.data[index].p.align,
                  }}
                />
                <ContentEditable
                  className={classes.title}
                  html={this.props.Data.data[index].h.text}
                  disabled={false}
                  onClick={() =>
                    this.props.onClick(this.props.id, "h", index, "features4")
                  }
                  onChange={(e) => this.handleTextChange(e, index, "h")}
                  style={{
                    fontSize: this.props.Data.data[index].h.size,
                    fontFamily: this.props.Data.data[index].h.family,
                    color: this.props.Data.data[index].h.color,
                    fontWeight: this.props.Data.data[index].h.bold
                      ? "bold"
                      : "normal",
                    textDecoration: this.props.Data.data[index].h.underline
                      ? "underline"
                      : "none",
                    fontStyle: this.props.Data.data[index].h.italic
                      ? "italic"
                      : "normal",
                    textAlign: this.props.Data.data[index].h.align,
                  }}
                />
              </div>
              <Button
                style={{
                  backgroundColor: this.props.Data.data[index].btn.bgColor,
                }}
              >
                <ContentEditable
                  style={{
                    fontSize: this.props.Data.data[index].btn.size,
                    fontFamily: this.props.Data.data[index].btn.family,
                    color: this.props.Data.data[index].btn.color,
                    backgroundColor: this.props.Data.data[index].btn.bgColor,
                    fontWeight: this.props.Data.data[index].btn.bold
                      ? "bold"
                      : "normal",
                    textDecoration: this.props.Data.data[index].btn.underline
                      ? "underline"
                      : "normal",
                    fontStyle: this.props.Data.data[index].btn.italic
                      ? "italic"
                      : "normal",
                    textAlign: this.props.Data.data[index].btn.align,
                  }}
                  html={this.props.Data.data[index].btn.text}
                  disabled={false}
                  className={classes.btn}
                  onClick={() =>
                    this.props.onClick(this.props.id, "btn", index, "features4")
                  }
                  onChange={(e) => this.handleTextChange(e, index, "btn")}
                />
              </Button>
            </Paper>
          );
        })}
      </Flex>
    );
  }
}
