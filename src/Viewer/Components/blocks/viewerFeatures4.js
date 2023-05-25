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
import handleButtonClick from "./HandleButtonClick";
import { useNavigate } from "react-router-dom";
import { getTemplateId } from "../../../utilityFunctions/TemplateIdController";

import ContentEditable from "react-contenteditable";

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

export function ViewerFeatures4({ Data }) {
  const { classes } = useStyles();
  const handleClick = async (index) => {
    const Template = await getTemplateId();

    handleButtonClick(
      Data.data[index].btn?.link,
      navigate,
      Template.type,
      Template.templateId
    );
  };
  const navigate = useNavigate();

  return (
    <Flex
      style={{ position: "relative", marginBottom: "40px" }}
      justify="center"
      gap="md"
      wrap="wrap"
      className={classes.panel}
    >
      {Object.keys(Data.data).map((index) => {
        return (
          <Paper
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
              <ContentEditable
                className={classes.category}
                html={Data.data[index].p.text}
                disabled={true}
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
                disabled={true}
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
              onClick={() => handleClick(index)}
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
                disabled={true}
                className={classes.btn}
              />
            </Button>
          </Paper>
        );
      })}
    </Flex>
  );
}
