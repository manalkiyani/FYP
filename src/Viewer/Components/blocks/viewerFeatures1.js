import React from "react";
import {
  Container,
  Flex,
  Image,
  SimpleGrid,
  ThemeIcon,
  createStyles,
  rem,
} from "@mantine/core";

import ContentEditable from "react-contenteditable";

const useStyles = createStyles((theme) => ({
  itemIcon: {
    marginRight: theme.spacing.md,
  },

  itemTitle: {
    marginBottom: `calc(${theme.spacing.xs} / 2)`,
  },
}));

const ViewerFeatures1 = (props) => {
  const { classes } = useStyles();

  return (
    <Container
      size={1500}
      style={{ padding: "80px", position: "relative" }}
      className={classes.wrapper}
    >
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

              <div style={{ position: "relative", width: "550px" }}>
                <ContentEditable
                  className={classes.itemTitle}
                  html={props.Data.data[index].h.text}
                  disabled={true}
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
                  disabled={true}
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

export default ViewerFeatures1;
