import {
  createStyles,
  Title,
  Text,
  Button,
  Container,
  rem,
  Flex,
} from "@mantine/core";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AvailableTemplate from "./availableTemplates/availableTemplate";

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: "relative",
    paddingTop: rem(120),
    paddingBottom: rem(80),

    [theme.fn.smallerThan("sm")]: {
      paddingTop: rem(80),
      paddingBottom: rem(60),
    },
  },

  inner: {
    position: "relative",
    zIndex: 1,
  },

  dots: {
    position: "absolute",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[5]
        : theme.colors.gray[1],

    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  dotsLeft: {
    left: 0,
    top: 0,
  },

  title: {
    textAlign: "center",
    fontWeight: 800,
    fontSize: rem(40),
    letterSpacing: -1,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    marginBottom: theme.spacing.xs,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,

    [theme.fn.smallerThan("xs")]: {
      fontSize: rem(28),
      textAlign: "left",
    },
  },

  highlight: {
    color: "#7B64FF",
  },

  description: {
    textAlign: "center",

    [theme.fn.smallerThan("xs")]: {
      textAlign: "left",
      fontSize: theme.fontSizes.md,
    },
  },

  controls: {
    marginTop: theme.spacing.lg,
    display: "flex",
    justifyContent: "center",

    [theme.fn.smallerThan("xs")]: {
      flexDirection: "column",
    },
  },

  control: {
    "&:not(:first-of-type)": {
      marginLeft: theme.spacing.md,
    },

    [theme.fn.smallerThan("xs")]: {
      height: rem(42),
      fontSize: theme.fontSizes.md,

      "&:not(:first-of-type)": {
        marginTop: theme.spacing.md,
        marginLeft: 0,
      },
    },
  },
}));

export function FavTemplates() {
  const { classes } = useStyles();

  return (
    <Container className={classes.wrapper} size={1400}>
      <div className={classes.inner}>
        <Title className={classes.title}>
          <Text component="span" className={classes.highlight} inherit>
            Website templates
          </Text>{" "}
          that set you up for success
        </Title>

        <Container p={0} size={600}>
          <Text size="lg" color="dimmed" className={classes.description}>
            Get a headstart on your journey withcustomizable website templates,
            strategically researched and tailored for every industry — or start
            from a blank canvas on our website builder.
          </Text>
        </Container>
      </div>
      <Flex style={{ marginTop: "50px" }} gap="lg">
        <AvailableTemplate
          id="001"
          type="blog"
          img="https://res.cloudinary.com/djlewzcd5/image/upload/v1679227053/WhatsApp_Image_2023-03-19_at_4.57.17_PM_ewpmih.jpg"
          title="Blog Template"
          description="A blog template is a pre-designed framework for creating a blog.  This makes it easier and quicker to launch a blog."
        ></AvailableTemplate>
        <AvailableTemplate
          id="002"
          type="eccomerce"
          img="https://res.cloudinary.com/djlewzcd5/image/upload/v1684991171/Screenshot_2023-05-25_073317_vjunri.png"
          title="Eccomerce Template"
          description="An eCommerce template is a pre-designed framework for creating an online store.  This saves time and effort"
        ></AvailableTemplate>
        <AvailableTemplate
          id="003"
          type="medical"
          img="https://res.cloudinary.com/djlewzcd5/image/upload/v1684991473/Screenshot_2023-05-25_100907_vwi06y.png"
          title="Medical Template"
          description="A medical template is a pre-designed framework for creating a website related to healthcare or medical services."
        ></AvailableTemplate>
        <AvailableTemplate
          id="004"
          type="business"
          img="https://res.cloudinary.com/djlewzcd5/image/upload/v1684991473/Screenshot_2023-05-25_101040_uadvgd.png"
          title="Business Template"
          description="A business template is a pre-designed framework for creating a website related to a company or organization"
        ></AvailableTemplate>
      </Flex>
    </Container>
  );
}
