import React, { useState } from "react";

import classes from "../../../components/blocks/People/People2.module.css";

import ContentEditable from "react-contenteditable";
import { Flex, Space } from "@mantine/core";
import { Carousel } from "@mantine/carousel";

const ViewerPeople2 = (props) => {
  return (
    <div className={classes.panel}>
      <div>
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
                  <Flex
                    p="lg"
                    justify="center"
                    align="center"
                    direction="column"
                  >
                    <img
                      className={classes.img}
                      src={props.Data.data[index].bg.picture}
                    />
                    <Space h="sm" />
                    <ContentEditable
                      html={props.Data.data[index].p.text} // innerHTML of the editable div
                      disabled={true} // use true to disable editing
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
                      disabled={true} // use true to disable editing
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
                      disabled={true} // use true to disable editing
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

export default ViewerPeople2;
