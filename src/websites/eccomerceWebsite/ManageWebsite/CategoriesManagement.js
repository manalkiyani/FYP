import {
  Flex,
  Select,
  Space,
  Text,
  TextInput,
  createStyles,
  Button,
  rem,
  Group,
  FileButton,
  Image,
  Textarea,
  Card,
} from "@mantine/core";

import React, { useState } from "react";
import styles from "./AddProduct.module.css";

import UploadIcon from "@mui/icons-material/FileUploadOutlined";

import { uploadImage } from "../../../utilityFunctions/imageUpload";

const inputStyles = createStyles((theme) => ({
  root: {
    position: "relative",
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
const CategoriesManagement = (props) => {
  const [name, setName] = useState("");

  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  const [operation, setOperation] = useState("add");

  const { classes } = inputStyles();

  //handle Edit logic inside this function, do not delete what is already there

  const handleEdit = (id) => {
    setOperation("edit");
  };
  const handleDelete = (id) => {
    console.log("delete");
  };

  return (
    <>
      {/*ADD CATEGORY */}
      <Flex
        mih={50}
        style={{ padding: "20px", borderRadius: "20px" }}
        bg="#FBF8F1"
      >
        <Text fw={400} fz="xl">
          Manage Categories
        </Text>
      </Flex>
      <div className={styles.contentContainer}>
        <UploadImage image={image} setImage={setImage} />
        <Space h="lg" />
        {/* Product Name */}
        <TextInput
          label="Name Category"
          placeholder="Latest Collection "
          classNames={classes}
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Space h="lg" />
        <Textarea
          label="Description"
          autoSize
          minRows={3}
          placeholder="Latest Collection "
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <Space h="lg" />
        <Group mt={20} position="center">
          {operation === "add" ? (
            <Button variant="outline" color="green">
              Add
            </Button>
          ) : (
            <Button variant="outline" color="green">
              Edit
            </Button>
          )}

          <Button variant="subtle" color="red">
            Cancel
          </Button>
        </Group>
      </div>

      {/*VIEW CATEGORIES */}
      <Flex wrap="wrap">
        <ViewCategory
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          id={1}
          name="Latest Collection"
          image="https://res.cloudinary.com/djlewzcd5/image/upload/v1682715743/ruqwigg3flbsy5vhly8g.jpg"
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptates."
        />{" "}
        <ViewCategory
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          id={2}
          name="Mens Collection"
          image="https://res.cloudinary.com/djlewzcd5/image/upload/v1682715743/ruqwigg3flbsy5vhly8g.jpg"
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptates."
        />
      </Flex>
    </>
  );
};

const UploadImage = ({ image, setImage }) => {
  return (
    <>
      {image && <Image maw={240} src={URL.createObjectURL(image)} />}
      <Space h="lg" />

      <Group position="left">
        <FileButton onChange={setImage} accept="image/png,image/jpeg">
          {(props) => (
            <Button
              variant="outline"
              color="dark"
              leftIcon={<UploadIcon />}
              {...props}
            >
              Upload image
            </Button>
          )}
        </FileButton>
      </Group>
    </>
  );
};

const ViewCategory = ({
  name,
  image,
  description,
  handleEdit,
  handleDelete,
}) => {
  return (
    <Card mb={10} mr={20} style={{ width: "620px" }} withBorder padding="lg">
      <Group>
        <Card.Section>
          <Image src={image} alt={name} height={100} />
        </Card.Section>

        <Flex ml={10} direction="column" mt="xl">
          <Text fz="sm" fw={700}>
            {name}
          </Text>
          <Text style={{ width: "400px" }} mt="sm" mb="md" c="dimmed" fz="xs">
            {description}
          </Text>
        </Flex>
      </Group>
      <Group mt={20} position="center">
        <Button onClick={handleEdit} variant="default" color="dark">
          Edit
        </Button>
        <Button onClick={handleDelete} variant="subtle" color="red">
          Delete
        </Button>
      </Group>
    </Card>
  );
};
export default CategoriesManagement;
