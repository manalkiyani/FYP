import React from "react";
import { Button, Container, Flex, Group, Space } from "@mantine/core";

import ContentEditable from "react-contenteditable";
import { useNavigate } from "react-router-dom";

import handleButtonClick from "./HandleButtonClick";
import { getTemplateId } from "../../../utilityFunctions/TemplateIdController";

import classes from "../../../components/blocks/Header3/Header3.module.css";

export default function ViewerHeader3(props) {
  const handleClick = async () => {
    const Template = await getTemplateId();

    handleButtonClick(
      props.Data.data.btn?.link,
      navigate,
      Template.type,
      Template.templateId
    );
  };
  const navigate = useNavigate();

  return (
    <div
      style={{
        backgroundColor: props.Data.data.bgColor,
        boxShadow:
          props.dragDisable === false
            ? "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
            : "none",
      }}
      className={classes.header}
    >
      <Container size="80rem">
        <Group grow gap="md">
          <img className={classes.img} src={props.Data.data.img} />

          <Flex direction="column">
            <ContentEditable
              className={classes.h}
              html={props.Data.data.h.text}
              disabled={true}
              style={{
                fontSize: props.Data.data.h.size,
                fontFamily: props.Data.data.h.family,
                color: props.Data.data.h.color,
                fontWeight: props.Data.data.h.bold === true ? "bold" : "normal",
                textDecoration:
                  props.Data.data.h.underline === true ? "underline" : "none",
                fontStyle:
                  props.Data.data.h.italic === true ? "italic" : "normal",
                textAlign: props.Data.data.h.align,
              }}
            />

            <ContentEditable
              html={props.Data.data.s.text}
              disabled={true}
              className={classes.s}
              style={{
                fontSize: props.Data.data.s.size,
                fontFamily: props.Data.data.s.family,
                color: props.Data.data.s.color,
                fontWeight: props.Data.data.s.bold === true ? "bold" : "normal",
                textDecoration:
                  props.Data.data.s.underline === true ? "underline" : "none",
                fontStyle:
                  props.Data.data.s.italic === true ? "italic" : "normal",
                textAlign: props.Data.data.s.align,
              }}
            />
            <Space h="xl" />
            <div>
              <Button onClick={handleClick} variant="default" radius="xl">
                <ContentEditable
                  html={props.Data.data.btn.text}
                  disabled={true}
                  style={{
                    fontSize: props.Data.data.btn.size,
                    fontFamily: props.Data.data.btn.family,
                    color: props.Data.data.btn.color,
                    fontWeight:
                      props.Data.data.btn.bold === true ? "bold" : "normal",
                    textDecoration:
                      props.Data.data.btn.underline === true
                        ? "underline"
                        : "none",
                    fontStyle:
                      props.Data.data.btn.italic === true ? "italic" : "normal",
                    textAlign: props.Data.data.btn.align,
                  }}
                />
              </Button>
            </div>
          </Flex>
        </Group>
      </Container>
    </div>
  );
}
