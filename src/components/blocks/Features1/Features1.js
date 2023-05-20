import React, { useState } from "react";
import {
  Container,
  Flex,
  Image,
  SimpleGrid,
  ThemeIcon,
  createStyles,
  rem,
} from "@mantine/core";

import DelCard from "../delCard/delCard";
import HandleBlock from "../HandleBlock/handleBlock";
import ContentEditable from "react-contenteditable";
import UploadImage from "../../uploadImage/uploadImage";
import { uploadImage } from "../../../utilityFunctions/imageUpload";

const useStyles = createStyles((theme) => ({
  itemIcon: {
    marginRight: theme.spacing.md,
  },

  itemTitle: {
    marginBottom: `calc(${theme.spacing.xs} / 2)`,
  },
}));

const Features1 = (props) => {
  const [displayHandleBlock, setDisplayHandleBlock] = useState(false);
  const [cardImages, setCardImages] = useState([]);

  const { classes } = useStyles();

  const delCard = (index) => {
    props.deleteCard(index, props.id);
  };

  const handleTextChange = (e, index, tag) => {
    props.changeText(e.target.value, index, tag, props.id, "features1");
  };

 
  const handleImageChange = async (event, index) => {
    console.log("in here features 2 ");
    console.log("index", index);
    const cardImagesCopy = [...cardImages];
    cardImagesCopy[index] = event.target.files[0];
    setCardImages(cardImagesCopy);
    try {
      const link = await uploadImage(event.target.files[0]);
      console.log(link);
      props.changeCardImage(link, index, props.id);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container
      onMouseEnter={() => {
        setDisplayHandleBlock(true);
      }}
      onMouseLeave={() => {
        setDisplayHandleBlock(false);
      }}
      size={1500}
      style={{ padding: "80px", position: "relative" }}
      className={classes.wrapper}
    >
      <HandleBlock
        id={props.id}
        del={() => props.deleteBlock(props.id)}
        enableDrag={props.enableDrag}
        displayAddCard={true}
        addCard={() => props.addCard(props.id)}
        layout={props.Data.layout}
        displaySetLayout={true}
        setLayout={props.setLayout}
        options={[
          { text: "4 cards - width 20%", value: 4 },
          { text: "3 cards - width 30%", value: 3 },
          { text: "2 cards - width 40%", value: 2 },
        ]}
      ></HandleBlock>

      <SimpleGrid cols={props.Data.layout} spacing={20}>
        {Object.getOwnPropertyNames(props.Data.data).map((index) => {
          return (
            <Flex gap="md" direction="row" key={index} className={classes.item}>
              <ThemeIcon
                variant="light"
                className={classes.itemIcon}
                size={80}
                radius="md"
                p="sm"
              >
                <Image src={props.Data.data[index].bg.picture} />
              </ThemeIcon>

              <div
                onMouseEnter={() => {
                  setDisplayHandleBlock(true);
                }}
                onMouseLeave={() => {
                  setDisplayHandleBlock(false);
                }}
                style={{ position: "relative", width: "550px" }}
              >
                {displayHandleBlock && (
                  <>
                    <UploadImage
                      top={5}
                      left={5}
                      handleImageChange={(event) =>
                        handleImageChange(event, index)
                      }
                      index={index}
                      image={cardImages[index]}
                    />
                    <DelCard del={delCard} index={index} />
                  </>
                )}
                <ContentEditable
                  className={classes.itemTitle}
                  html={props.Data.data[index].h.text}
                  disabled={false}
                  onClick={() =>
                    props.onClick(props.id, "h", index, "features1")
                  }
                  onChange={(e) => handleTextChange(e, index, "h")}
                  style={{
                    fontSize: props.Data.data[index].h.size,
                    fontFamily: props.Data.data[index].h.family,
                    color: props.Data.data[index].h.color,
                    fontWeight:
                      props.Data.data[index].h.bold === true
                        ? "bold"
                        : "normal",
                    textDecoration:
                      props.Data.data[index].h.underline === true
                        ? "underline"
                        : "none",
                    fontStyle:
                      props.Data.data[index].h.italic === true
                        ? "italic"
                        : "normal",
                    textAlign: props.Data.data[index].h.align,
                  }}
                />
                <ContentEditable
                  html={props.Data.data[index].p.text}
                  disabled={false}
                  onClick={() =>
                    props.onClick(props.id, "p", index, "features1")
                  }
                  onChange={(e) => handleTextChange(e, index, "p")}
                  style={{
                    fontSize: props.Data.data[index].p.size,
                    fontFamily: props.Data.data[index].p.family,
                    color: props.Data.data[index].p.color,
                    fontWeight:
                      props.Data.data[index].p.bold === true
                        ? "bold"
                        : "normal",
                    textDecoration:
                      props.Data.data[index].p.underline === true
                        ? "underline"
                        : "none",
                    fontStyle:
                      props.Data.data[index].p.italic === true
                        ? "italic"
                        : "normal",
                    textAlign: props.Data.data[index].p.align,
                  }}
                />
              </div>
            </Flex>
          );
        })}
      </SimpleGrid>
    </Container>
  );
};

export default Features1;
