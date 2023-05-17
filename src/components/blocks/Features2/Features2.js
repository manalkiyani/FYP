import React, { useState } from "react";
import classes from "./Features2.module.css";
import DelCard from "../delCard/delCard";
import HandleBlock from "../HandleBlock/handleBlock";
import ContentEditable from "react-contenteditable";
import { uploadImage } from "../../../utilityFunctions/imageUpload";
import UploadImage from "../../uploadImage/uploadImage";

const Features2 = ({
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
}) => {
  const [displayHandleBlock, setDisplayHandleBlock] = useState(false);
  const [cardImages, setCardImages] = useState([]);

  const handleLink = (object, index) => {
    linkCardButton(object, index, id);
    console.log(object);
  };

  const delCard = (index) => {
    console.log(index);
    deleteCard(index, id);
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
      changeCardImage(link, index, id);
    } catch (err) {
      console.log(err);
    }
  };

  const handleTextChange = (e, index, tag) => {
    changeText(e.target.value, index, tag, id, "features2");
  };



  return (
    <div
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
            { text: "5 cards - width 20%", value: 5 },
            { text: "4 cards - width 30%", value: 4 },
            { text: "3 cards - width 40%", value: 3 },
          ]}
        ></HandleBlock>
      )}

      {Object.keys(Data.data).map((index) => {
        return (
          <div
            key={index}
            style={{
              width:
                Data.layout === 5 ? "17%" : Data.layout === 4 ? "20%" : "24%",
            }}
            className={classes.card}
          >
            <DelCard display={'display'}handleLink={handleLink} del={delCard} index={index} />

            <UploadImage
              top={5}
              left={5}
              handleImageChange={(event) => handleImageChange(event, index)}
              index={index}
              image={cardImages[index]}
            />
            <img className={classes.img} src={Data.data[index].bg.picture} />
            <div className={classes.container}>
              <ContentEditable
                html={Data.data[index].h.text}
                disabled={false}
                onClick={() => onClick(id, "h", index, "features2")}
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
              />{" "}
              <ContentEditable
                html={Data.data[index].s.text}
                disabled={false}
                className={classes.subHeading}
                onClick={() => onClick(id, "s", index, "features2")}
                onChange={(e) => handleTextChange(e, index, "s")}
                style={{
                  fontSize: Data.data[index].s.size,
                  fontFamily: Data.data[index].s.family,
                  color: Data.data[index].s.color,
                  fontWeight: Data.data[index].s.bold ? "bold" : "normal",
                  textDecoration: Data.data[index].s.underline
                    ? "underline"
                    : "none",
                  fontStyle: Data.data[index].s.italic ? "italic" : "normal",
                  textAlign: Data.data[index].s.align,
                }}
              />
              <ContentEditable
                html={Data.data[index].p.text}
                disabled={false}
                onClick={() => onClick(id, "p", index, "features2")}
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
                html={Data.data[index].btn.text}
                disabled={false}
                className={classes.btn}
                onClick={() => onClick(id, "btn", index, "features2")}
                onChange={(e) => handleTextChange(e, index, "btn")}
                style={{
                  fontSize: Data.data[index].btn.size,
                  fontFamily: Data.data[index].btn.family,
                  color: Data.data[index].btn.color,
                  fontWeight: Data.data[index].btn.bold ? "bold" : "normal",
                  textDecoration: Data.data[index].btn.underline
                    ? "underline"
                    : "normal",
                  fontStyle: Data.data[index].btn.italic ? "italic" : "normal",
                  textAlign: Data.data[index].btn.align,
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default Features2;
