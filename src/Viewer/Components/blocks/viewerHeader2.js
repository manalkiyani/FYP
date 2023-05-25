import React, { useState } from "react";

import ContentEditable from "react-contenteditable";
import { useNavigate } from "react-router-dom";

import handleButtonClick from "./HandleButtonClick";
import { getTemplateId } from "../../../utilityFunctions/TemplateIdController";

import {
  createStyles,
  Image,
  Container,
  Title,
  Button,
  Group,
  Text,
  rem,
} from "@mantine/core";

const useStyles = createStyles((theme) => ({
  inner: {
    display: "flex",
    justifyContent: "space-between",
    paddingTop: `calc(${theme.spacing.xl} * 4)`,
    paddingBottom: `calc(${theme.spacing.xl} * 4)`,
  },

  content: {
    maxWidth: rem(480),
    marginRight: `calc(${theme.spacing.xl} * 3)`,

    [theme.fn.smallerThan("md")]: {
      maxWidth: "100%",
      marginRight: 0,
    },
  },

  title: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: rem(44),
    lineHeight: 1.2,
    fontWeight: 900,

    [theme.fn.smallerThan("xs")]: {
      fontSize: rem(28),
    },
  },

  control: {
    [theme.fn.smallerThan("xs")]: {
      flex: 1,
    },
  },

  image: {
    flex: 1,

    [theme.fn.smallerThan("md")]: {
      display: "none",
    },
  },

  highlight: {
    position: "relative",
    backgroundColor: theme.fn.variant({
      variant: "light",
      color: theme.primaryColor,
    }).background,
    borderRadius: theme.radius.sm,
    padding: `${rem(4)} ${rem(12)}`,
  },
}));

const ViewerHeader2 = (props) => {
  const { classes } = useStyles();
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
        backgroundColor: props.Data?.data?.bgColor,
        position: "relative",
        marginBottom: "60px",
      }}
    >
      <Container>
        <div className={classes.inner}>
          <div className={classes.content}>
            <Title className={classes.title}>
              <ContentEditable
                html={props.Data.data.h.text}
                disabled={true}
                style={{
                  fontSize: props.Data.data.h.size,
                  fontFamily: props.Data.data.h.family,
                  color: props.Data.data.h.color,
                  fontWeight:
                    props.Data.data.h.bold === true ? "bold" : "normal",
                  textDecoration:
                    props.Data.data.h.underline === true ? "underline" : "none",
                  fontStyle:
                    props.Data.data.h.italic === true ? "italic" : "normal",
                  textAlign: props.Data.data.h.align,
                }}
              />
            </Title>
            <Text color="dimmed" mt="md">
              <ContentEditable
                html={props.Data.data.p.text}
                disabled={true}
                style={{
                  fontSize: props.Data.data.p.size,
                  fontFamily: props.Data.data.p.family,
                  color: props.Data.data.p.color,
                  fontWeight:
                    props.Data.data.p.bold === true ? "bold" : "normal",
                  textDecoration:
                    props.Data.data.p.underline === true ? "underline" : "none",
                  fontStyle:
                    props.Data.data.p.italic === true ? "italic" : "normal",
                  textAlign: props.Data.data.p.align,
                }}
              />
            </Text>

            <Group mt={30}>
              <Button
                onClick={handleClick}
                style={{
                  backgroundColor: props.Data.data.btn.bgColor,
                }}
                radius="xl"
                size="md"
                className={classes.control}
              >
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
            </Group>
          </div>
          <Image src={props.Data.data.img} className={classes.image} />
        </div>
      </Container>
    </div>
  );
};

export default ViewerHeader2;
