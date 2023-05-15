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
            "645f98ad96c120c7214f9154",
            "645fa888efc31bb14ca8c791",
            "645faec0efc31bb14ca8c89e",
            "645bc518ac0771a5e8686e51",
          ],
        }
      );

      setBlankTemplates(response.data.Templates);
    } catch (error) {
      console.log(error);
    }
  };

  const openAsAdmin = (id, type) => {
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
      <div style={{ display: "flex", width: "70vw", flexWrap: "wrap" }}>
        {blankTemplates &&
          blankTemplates.map((template) => {
            return (
              <Card
                p="lg"
                shadow="lg"
                className={classes.card}
                radius="md"
                onClick={() => openAsAdmin(template._id, template.type)}
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
      </div>
    </>
  );
}

const useStyles = createStyles((theme) => ({
  card: {
    position: "relative",
    width: rem(300),
    height: rem(250),
    marginRight: rem(20),
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
}));
