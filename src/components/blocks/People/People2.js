import React, { useState } from "react";
import classes from "./People2.module.css";

import DelCard from "../delCard/delCard";
import HandleBlock from "../HandleBlock/handleBlock";
import ContentEditable from "react-contenteditable";
import { Flex, Space } from "@mantine/core";
import { Carousel } from "@mantine/carousel";

const People2 = (props) => {
  const [displayHandleBlock, setDisplayHandleBlock] = useState(false);

  const delCard = (index) => {
    props.deleteCard(index, props.id);
  };

  const handleTextChange = (e, index, tag) => {
    props.changeText(e.target.value, index, tag, props.id, "people1");
  };
  const handleSocialIcons = (socialIcons) => {
    props.handleSocialIcons(socialIcons, props.id);
  };

  return (
    <div className={classes.panel}>

      <div
        onMouseEnter={() => {
          setDisplayHandleBlock(true);
        }}
        onMouseLeave={() => {
          setDisplayHandleBlock(false);
        }}
        
      >
        {displayHandleBlock && (
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
              { text: "3 cards - width 30%", value: 3 },
              { text: "2 cards - width 40%", value: 2 },
              { text: "1 card - width 50%", value: 1 },
            ]}
          ></HandleBlock>
        )}
 <Carousel
      withIndicators
      height={300}
      slideSize="35%"
      slideGap="md"
      loop
      align="start"
      slidesToScroll={3}
    >
        {Object.getOwnPropertyNames(props.Data.data).map((index) => {
          return (
            <Carousel.Slide>
            <div key={index} className={classes.card}>
              <DelCard del={delCard} index={index} />

              <Flex p="lg" justify="center"  align="center" direction="column">
                <img
                  className={classes.img}
                  src={props.Data.data[index].bg.picture}
                />
                 <Space h="sm" />
<ContentEditable
                  html={props.Data.data[index].p.text} // innerHTML of the editable div
                  disabled={false} // use true to disable editing
                  onClick={() => props.onClick(props.id, "p", index, "people1")}
                  onChange={(e) => handleTextChange(e, index, "p")} // handle innerHTML change
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
                    letterSpacing: props.Data.data[index].p.spacing,
                  }}
                />
                 <Space h="sm" />
                <ContentEditable
                  html={props.Data.data[index].h.text} // innerHTML of the editable div
                  disabled={false} // use true to disable editing
                  onClick={() => props.onClick(props.id, "h", index, "people1")}
                  onChange={(e) => handleTextChange(e, index, "h")} // handle innerHTML change
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
                    letterSpacing: props.Data.data[index].h.spacing,
                  }}
                />
                <ContentEditable
                  html={props.Data.data[index].s.text} // innerHTML of the editable div
                  disabled={false} // use true to disable editing
                  onClick={() => props.onClick(props.id, "s", index, "people1")}
                  onChange={(e) => handleTextChange(e, index, "s")} // handle innerHTML change
                  style={{
                    fontSize: props.Data.data[index].s.size,
                    fontFamily: props.Data.data[index].s.family,
                    color: props.Data.data[index].s.color,
                    fontWeight:
                      props.Data.data[index].s.bold === true
                        ? "bold"
                        : "normal",
                    textDecoration:
                      props.Data.data[index].s.underline === true
                        ? "underline"
                        : "none",
                    fontStyle:
                      props.Data.data[index].s.italic === true
                        ? "italic"
                        : "normal",
                    textAlign: props.Data.data[index].s.align,
                    letterSpacing: props.Data.data[index].s.spacing,
                  }}
                />
                <Space h="sm" />
                
              </Flex>
              <Space h="sm" />
            </div>
            </Carousel.Slide>
          );
        })}
        </Carousel>
      </div>
    </div>
  );
};

export default People2;
