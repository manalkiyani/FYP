import {
  createStyles,
  Paper,
  Text,
  Title,
  Button,
  rem,
  Flex,
} from "@mantine/core";
import React, { useState } from "react";
import DelCard from "../delCard/delCard";
import UploadImage from "../../uploadImage/uploadImage";
import ContentEditable from "react-contenteditable";
import HandleBlock from "../HandleBlock/handleBlock";
import { uploadImage } from "../../../utilityFunctions/imageUpload";

const useStyles = createStyles((theme) => ({
  card: {
    height: rem(520),
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },

  title: {
    fontFamily: `Greycliff CF ${theme.fontFamily}`,
    fontWeight: 900,
    color: theme.white,
    lineHeight: 1.2,
    fontSize: rem(32),
    marginTop: theme.spacing.xs,
  },

  category: {
    color: theme.white,
    opacity: 0.7,
    fontWeight: 700,
    textTransform: "uppercase",
  },
}));

export function Features4({
  linkCardButton,
  id,
  deleteCard,
  changeCardImage,
  changeText,
  deleteBlock,
  enableDrag,
  addCard,
  setLayout,
  onClick,
  Data,
}) {
  const { classes } = useStyles();
  const [displayHandleBlock, setDisplayHandleBlock] = useState(false);
  const [cardImages, setCardImages] = useState([]);
  const [displayHandleCard, setDisplayHandleCard] = useState(false);

  const handleLink = (object, index) => {
    linkCardButton(object, index, id);
    console.log(object);
  };

  const delCard = (index) => {
    console.log(index);
    deleteCard(index, id);
  };

  const handleImageChange = async (event, index) => {
    console.log("in here features 4 ");
    console.log("index", index);
    const cardImagesCopy = [...cardImages];
    cardImagesCopy[index] = event.target.files[0];
    setCardImages(cardImagesCopy);
    try {
      const link = await uploadImage(event.target.files[0]);
      console.log(link);
      changeCardImage(link, index, id);
    } catch (err) {
      console.log(err);
    }
  };

  const handleTextChange = (e, index, tag) => {
    changeText(e.target.value, index, tag, id, "features4");
  };

  return (
    <Flex
      style={{ position: "relative",marginBottom:'40px' }}
      justify="center"
      gap="md"
      wrap="wrap"
      onMouseEnter={() => {
        setDisplayHandleBlock(true);
      }}
      onMouseLeave={() => {
        setDisplayHandleBlock(false);
      }}
      className={classes.panel}
    >
      {displayHandleBlock && (
        <HandleBlock
          id={id}
          del={() => deleteBlock(id)}
          enableDrag={enableDrag}
          displayAddCard={true}
          addCard={() => addCard(id)}
          layout={Data.layout}
          displaySetLayout={true}
          setLayout={setLayout}
          options={[
            { text: "5 cards - width 20%", value: 4 },
            { text: "4 cards - width 30%", value: 3 },
            { text: "3 cards - width 40%", value: 2 },
          ]}
        ></HandleBlock>
      )}

      {Object.keys(Data.data).map((index) => {
        return (
          <Paper
            onMouseEnter={() => {
              setDisplayHandleCard(true);
            }}
            onMouseLeave={() => {
              setDisplayHandleCard(false);
            }}
            style={{
              padding: "30px",
              position: "relative",
              width:
                Data.layout === 4 ? "13%" : Data.layout === 3 ? "17%" : "20%",
            }}
            key={index}
            shadow="md"
            p="xl"
            radius="md"
            sx={{ backgroundImage: `url(${Data.data[index].bg.picture})` }}
            className={classes.card}
          >
            <div>
              {displayHandleCard && (
                <>
                  <DelCard
                    handleLink={handleLink}
                    del={delCard}
                    index={index}
                  />

                  <UploadImage
                    top={5}
                    left={5}
                    handleImageChange={(event) =>
                      handleImageChange(event, index)
                    }
                    index={index}
                    image={cardImages[index]}
                  />
                </>
              )}
              <ContentEditable
                className={classes.category}
                html={Data.data[index].p.text}
                disabled={false}
                onClick={() => onClick(id, "p", index, "features4")}
                onChange={(e) => handleTextChange(e, index, "p")}
                style={{
                  fontSize: Data.data[index].p.size,
                  fontFamily: Data.data[index].p.family,
                  color: Data.data[index].p.color,
                  fontWeight: Data.data[index].p.bold ? "bold" : "normal",
                  textDecoration: Data.data[index].p.underline
                    ? "underline"
                    : "none",
                  fontStyle: Data.data[index].p.italic ? "italic" : "normal",
                  textAlign: Data.data[index].p.align,
                }}
              />
              <ContentEditable
                className={classes.title}
                html={Data.data[index].h.text}
                disabled={false}
                onClick={() => onClick(id, "h", index, "features4")}
                onChange={(e) => handleTextChange(e, index, "h")}
                style={{
                  fontSize: Data.data[index].h.size,
                  fontFamily: Data.data[index].h.family,
                  color: Data.data[index].h.color,
                  fontWeight: Data.data[index].h.bold ? "bold" : "normal",
                  textDecoration: Data.data[index].h.underline
                    ? "underline"
                    : "none",
                  fontStyle: Data.data[index].h.italic ? "italic" : "normal",
                  textAlign: Data.data[index].h.align,
                }}
              />
            </div>
            <Button
              style={{
                backgroundColor: Data.data[index].btn.bgColor,
              }}
            >
              <ContentEditable
                style={{
                  fontSize: Data.data[index].btn.size,
                  fontFamily: Data.data[index].btn.family,
                  color: Data.data[index].btn.color,
                  backgroundColor: Data.data[index].btn.bgColor,
                  fontWeight: Data.data[index].btn.bold ? "bold" : "normal",
                  textDecoration: Data.data[index].btn.underline
                    ? "underline"
                    : "normal",
                  fontStyle: Data.data[index].btn.italic ? "italic" : "normal",
                  textAlign: Data.data[index].btn.align,
                }}
                html={Data.data[index].btn.text}
                disabled={false}
                className={classes.btn}
                onClick={() => onClick(id, "btn", index, "features4")}
                onChange={(e) => handleTextChange(e, index, "btn")}
              />
            </Button>
          </Paper>
        );
      })}
    </Flex>
  );
}
