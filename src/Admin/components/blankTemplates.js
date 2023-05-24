import * as React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocalStorageState } from "ahooks";
import {
  Card,
  Text,
  Group,
  createStyles,
  getStylesRef,
  rem,
  Container,
  Title,
  Flex,
} from "@mantine/core";

export default function BlankTemplates() {
  const [blankTemplates, setBlankTemplates] = React.useState(null);
  const [template, setTemplate] = useLocalStorageState("template", "");
  const [templateId, setTemplateId] = useLocalStorageState("templateId", "");
  const navigate = useNavigate();
  const { classes, theme } = useStyles();

  React.useEffect(() => {
    getsavedTemplates();
  }, []);

  const getsavedTemplates = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8800/api/templates/getList",
        {
          templateIds: [
            "646e2ab91be484b90505a9f2",
            "645f98ad96c120c7214f9154",
            "645fa888efc31bb14ca8c791",
            "645faec0efc31bb14ca8c89e",
          ],
        }
      );

      setBlankTemplates(response.data.Templates);
    } catch (error) {
      console.log(error);
    }
  };

  const openAsAdmin = (e, id, type) => {
    e.preventDefault();
    setTemplate({
      type: "",
      pages: {},
      data: {},
    });
    setTemplateId(id);

    navigate(`/${type}/template/${id}`);
  };

  return (
    <>
      <Container className={classes.wrapper} size={1400}>
        <div className={classes.inner}>
          <Title className={classes.maintitle}>
            Start creating a Website
            <Text component="span" className={classes.highlight} inherit>
              {" "}
              from Scratch
            </Text>{" "}
          </Title>

          <Container p={0} size={600}>
            <Text size="lg" color="dimmed" className={classes.description}>
              Drag and Drop blocks to pages - Manage Webiste through admin panel
              - Name your website- and finally publish
            </Text>
          </Container>
        </div>
        <Flex style={{ marginTop: "50px" }} gap="lg">
          {blankTemplates &&
            blankTemplates.map((template) => {
              return (
                <Card
                  p="lg"
                  shadow="lg"
                  className={classes.card}
                  radius="md"
                  onClick={(e) => openAsAdmin(e, template._id, template.type)}
                >
                  <div
                    className={classes.image}
                    style={{
                      backgroundImage: `url(${"https://res.cloudinary.com/djlewzcd5/image/upload/v1683985804/Screenshot_2023-05-13_184940_pnqbpw.png"})`,
                    }}
                  />
                  <div className={classes.overlay} />

                  <div className={classes.content}>
                    <div>
                      <Text size="lg" className={classes.title} weight={500}>
                        {template.name}
                      </Text>

                      <Group position="apart" spacing="xs">
                        <Text size="sm" className={classes.author}>
                          TYPE {template.type}
                        </Text>
                      </Group>
                    </div>
                  </div>
                </Card>
              );
            })}
        </Flex>
      </Container>
      ;
    </>
  );
}

const useStyles = createStyles((theme) => ({
  card: {
    position: "relative",

    height: rem(300),
    width: rem(322),

    border: "1px solid #ccc",
    cursor: "pointer",
  },

  image: {
    ...theme.fn.cover(),
    ref: getStylesRef("image"),
    backgroundSize: "cover",
    transition: "transform 500ms ease",
  },

  overlay: {
    position: "absolute",
    top: "20%",
    left: 0,
    right: 0,
    bottom: 0,
  },

  content: {
    height: "100%",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    zIndex: 1,
  },

  title: {
    marginBottom: rem(5),
  },

  bodyText: {
    marginLeft: rem(7),
  },

  author: {},
  wrapper: {
    position: "relative",
    paddingTop: rem(80),
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

  maintitle: {
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
