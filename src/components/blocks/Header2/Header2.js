import React, { useState } from "react";
import styles from "./Header2.module.css";
import HandleBlock from "../HandleBlock/handleBlock";
import ContentEditable from "react-contenteditable";
import ButtonMenu from "../linkButton/btnMenu/buttonMenu";
import BgColor from "../../BackgroundColor/BgColor";
import UploadImage from "../../uploadImage/uploadImage";
import { uploadImage } from "../../../utilityFunctions/imageUpload";
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

const Header2 = (props) => {
  const { classes } = useStyles();
  const [showMenu, setShowMenu] = useState(false);
  const [displayHandleBlock, setDisplayHandleBlock] = useState(false);
  const [openColorPicker, setOpenColorPicker] = useState(false);
  const [image, setImage] = useState(null);

  const handleTextChange = (e, tag) => {
    console.log(e.target.value);
    props.changeText(e.target.value, null, tag, props.id, "header2");
  };

  const handleClick = () => {
    props.onClick(props.id, "btn", null, "header2");
    setShowMenu(true);
  };

  const linkButton = (link) => {
    setShowMenu(false);
    console.log(link);
  };

  const handleImageChange = async (event) => {
    setImage(event.target.files[0]);
    try {
      const link = await uploadImage(event.target.files[0]);
      console.log(link);
      props.changeBackgroundImage(link, props.id);
    } catch (err) {
      console.log(err);
    }
  };

  const disableHandleBlock = () => {
    setDisplayHandleBlock(false);
  };

  const enableHandleBlock = () => {
    setDisplayHandleBlock(true);
  };

  const handleSocialIcons = (socialIcons) => {
    props.handleSocialIcons(socialIcons, props.id);
  };

  const handleClose = () => {
    setOpenColorPicker(false);
  };

  const changeBackgroundColor = (color) => {
    props.changeBackgroundColor(color.hex, props.id);
  };

  return (
    <div
      style={{
        backgroundColor: props.Data?.data?.bgColor,
        position: "relative",
        marginBottom:'50px'
      }}
      onMouseOver={enableHandleBlock}
      onMouseOut={disableHandleBlock}
    >
      <BgColor
        handleClose={handleClose}
        updateColor={changeBackgroundColor}
        open={openColorPicker}
      />
      {displayHandleBlock && (
        <HandleBlock
          del={() => props.deleteBlock(props.id)}
          enableDrag={props.enableDrag}
          openColorPicker={() => setOpenColorPicker(true)}
          linkButton={linkButton}
        />
      )}
      {displayHandleBlock && (
        <UploadImage
          top={55}
          left={10}
          handleImageChange={handleImageChange}
          image={image}
        />
      )}
      <Container>
        <div className={classes.inner}>
          <div className={classes.content}>
            <Title className={classes.title}>
              <ContentEditable
                html={props.Data.data.h.text}
                disabled={false}
                onChange={(e) => handleTextChange(e, "h")}
                onClick={() => props.onClick(props.id, "h", null, "header2")}
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
                disabled={false}
                onClick={() => props.onClick(props.id, "p", null, "header2")}
                onChange={(e) => handleTextChange(e, "p")}
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
                style={{
                  backgroundColor: props.Data.data.btn.bgColor,
                }}
                radius="xl"
                size="md"
                className={classes.control}
              >
                <ContentEditable
                  html={props.Data.data.btn.text}
                  disabled={false}
                  onClick={handleClick}
                  onChange={(e) => handleTextChange(e, "btn")}
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

export default Header2;
