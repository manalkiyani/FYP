import {
  Button,
  Checkbox,
  ColorPicker,
  Container,
  Divider,
  Flex,
  Group,
  Image,
  NumberInput,
  Paper,
  Select,
  Space,
  Text,
  TextInput,
  Textarea,
  Title,
  createStyles,
  rem,
} from "@mantine/core";
import { useLocalStorageState } from "ahooks";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
const inputStyles = createStyles((theme) => ({
  container: {
    width: rem(350),
  },
  root: {
    position: "relative",
  },
  time: {
    height: rem(35),
    border: "1px solid #ccc",
    width: rem(150),

    marginBottom: rem(16),
  },

  input: {
    height: rem(50),
    paddingTop: rem(18),
  },

  label: {
    position: "absolute",
    pointerEvents: "none",
    fontSize: theme.fontSizes.xs,
    paddingLeft: theme.spacing.sm,
    paddingTop: `calc(${theme.spacing.sm} / 2)`,
    zIndex: 1,
  },
  text: {
    fontSize: theme.fontSizes.xs,
    paddingLeft: theme.spacing.sm,
    paddingTop: `calc(${theme.spacing.sm} / 2)`,
    zIndex: 1,
    fontWeight: 500,
  },
}));
const ManageViewerNavbar = () => {
  const [pages, setPages] = useState([]);
  const [template, setTemplate] = useLocalStorageState("template");
  const [style, setStyle] = useState("");
  console.log(style);

  useEffect(() => {
    if (template.type === "blog") {
      setPages([
        { value: "", name: "Home" },
        { value: "blogs", name: "Blogs" },
        { value: "contactUs", name: "Contact Us" },
      ]);
    } else if (template.type === "eccomerce") {
      setPages([
        { value: "", name: "Home" },
        { value: "products", name: "Products" },
        { value: "contactUs", name: "Contact Us" },
      ]);
    } else if (template.type === "medical") {
      setPages([
        { value: "", name: "Home" },
        { value: "doctors", name: "Doctors" },
        { value: "appointments", name: "Appointments" },
        { value: "contactUs", name: "Contact Us" },
      ]);
    } else if (template.type === "business") {
      setPages([
        { value: "", name: "Home" },
        { value: "jobs", name: "Jobs" },

        { value: "contactUs", name: "Contact Us" },
      ]);
    }
  }, []);
  const { classes } = inputStyles();
  return (
    <>
      <Toaster position="top-center" />
      <Container mb="xl" size="80rem">
        <Divider my="sm" />
        <Title order={3}>Manage Navbar</Title>
        <Divider my="sm" />
        <Space h="xl" />

        <Checkbox.Group
          value={style}
          onChange={setStyle}
          defaultValue={["style1"]}
          label="Select your favorite NavBar Style"
          withAsterisk
        >
          {/* nav1 */}
          <Checkbox value="style1" label="Style 1" />
          <Paper mb="md" maw={800} shadow="sm" p="sm">
            <Image
              maw={800}
              src="https://res.cloudinary.com/djlewzcd5/image/upload/v1684354806/nav1_tqszbs.png"
            />
          </Paper>
          <Checkbox value="style2" label="Style 2" />
          {/* nav2 */}
          <Paper mb="md" maw={800} shadow="sm" p="sm">
            <Image
              maw={800}
              src="https://res.cloudinary.com/djlewzcd5/image/upload/v1684354806/nav2_aubfwi.png"
            />
          </Paper>
          {/* nav3 */}
          <Checkbox value="style3" label="Style 3" />
          <Paper mb="md" maw={800} shadow="sm" p="sm">
            <Image
              maw={800}
              src="https://res.cloudinary.com/djlewzcd5/image/upload/v1684354806/nav3_qquoho.png"
            />
          </Paper>
        </Checkbox.Group>
        <Space h="md" />
        <Text fw={400} fz="md">
          Rename Pages
        </Text>
        <Space h="sm" />

        {pages.map((page) => (
          <TextInput
          mb="md"
            label={`Rename ${page.name}`}
            placeholder={`${page.name}`}
            classNames={classes}
            required
          />
        ))}

        <Space h="md" />
        <Group gap="sm">
          <div>
            <Text fw={400} fz="md">
              Pick Background Color
            </Text>
            <Space h="sm" />
            <ColorPicker
              format="hex"
              swatches={[
                "#25262b",
                "#868e96",
                "#fa5252",
                "#e64980",
                "#be4bdb",
                "#7950f2",
                "#4c6ef5",
                "#228be6",
                "#15aabf",
                "#12b886",
                "#40c057",
                "#82c91e",
                "#fab005",
                "#fd7e14",
              ]}
            />
          </div>

          <Space h="sm" />
          <div>
            <Text fw={400} fz="md">
              Pick Font Color
            </Text>
            <ColorPicker
              format="hex"
              swatches={[
                "#25262b",
                "#868e96",
                "#fa5252",
                "#e64980",
                "#be4bdb",
                "#7950f2",
                "#4c6ef5",
                "#228be6",
                "#15aabf",
                "#12b886",
                "#40c057",
                "#82c91e",
                "#fab005",
                "#fd7e14",
              ]}
            />
          </div>
        </Group>

        <Group position="center" mt="xl">
          <Button variant="default">Cancel</Button>
          <Button color="cyan">Save Changes</Button>
        </Group>
      </Container>
    </>
  );
};

export default ManageViewerNavbar;
