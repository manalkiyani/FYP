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
import axios from "axios";

import UploadIcon from "@mui/icons-material/FileUploadOutlined";

import { uploadImage } from "../../../utilityFunctions/imageUpload";
import ConfirmDeleteDialog from "../../../components/ConfirmDeleteDialog";
import { Toaster, toast } from "react-hot-toast";

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

  const [categories, setCategories] = useState([]);
  const [Deletion, setDeletion] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [editId, setEditId] = useState(null);

  const { classes } = inputStyles();

  //handle Edit logic inside this function, do not delete what is already there

  const handleEdit = (id, name, image, description) => {
    setOperation("edit");
    setEditId(id);
    setName(name);
    setImage(image);
    console.log(image);
    setDescription(description);
  };
  const editCategory = async () => {
    if (name === "" || description === "" || image === "") {
      toast.error("Please fill all the fields");
      return;
    }
    const imageUrl = await uploadImage(image);
    console.log(imageUrl);
    const response = await axios.patch(
      `http://localhost:8800/api/categories/${editId}`,
      {
        name,
        description,
        image: imageUrl,
      }
    );

    console.log(response);
    setName("");
    setImage("");
    setDescription("");
    setOperation("add");
    getCategories();
  };

  const handleDeleteCategory = async () => {
    const response = await axios.delete(
      `http://localhost:8800/api/categories/${deleteId}`
    );
    console.log(response);
    getCategories();
  };

  const addCategory = async () => {
    if (name === "" || description === "" || image === "") {
      toast.error("Please fill all the fields");
      return;
    }
    const imageUrl = await uploadImage(image);
    console.log(imageUrl);
    const response = await axios.post("http://localhost:8800/api/categories", {
      name,
      description,
      image: imageUrl,
    });

    console.log(response);
    setName("");
    setImage("");
    setDescription("");
    setOperation("add");
    getCategories();
  };

  const getCategories = async () => {
    const response = await axios.get("http://localhost:8800/api/categories");
    setCategories(response.data.categories);
    console.log(response);
  };

  React.useEffect(() => {
    getCategories();
  }, []);

  const openDeletion = (id) => {
    console.log(id);
    setDeleteId(id);
    setDeletion(true);
  };
  const closeDeletion = () => {
    setDeletion(false);
  };

  const handlSetImage = (file) => {
    setImage(file);
    setOperation("add");
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <ConfirmDeleteDialog
        text="category"
        open={Deletion}
        onClose={closeDeletion}
        onConfirm={handleDeleteCategory}
      />
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
        <UploadImage
          image={image}
          setImage={handlSetImage}
          operation={operation}
        />
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
          autosize
          minRows={3}
          placeholder="Latest Collection "
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <Space h="lg" />
        <Group mt={20} position="center">
          {operation === "add" ? (
            <Button onClick={addCategory} variant="outline" color="green">
              Add
            </Button>
          ) : (
            <Button onClick={editCategory} variant="outline" color="green">
              Update
            </Button>
          )}

          <Button variant="subtle" color="red">
            Cancel
          </Button>
        </Group>
      </div>

      {/*VIEW CATEGORIES */}
      <Flex wrap="wrap">
        {categories.map((category) => (
          <ViewCategory
            key={category._id}
            handleEdit={handleEdit}
            handleDelete={openDeletion}
            id={category._id}
            name={category.name}
            image={category.image}
            description={category.description}
          />
        ))}
      </Flex>
    </>
  );
};

const UploadImage = ({ image, setImage, operation }) => {
  return (
    <>
      {operation === "add" && image ? (
        <Image maw={240} src={URL.createObjectURL(image)} />
      ) : (
        <Image maw={240} src={image} />
      )}

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
  id,
  name,
  image,
  description,
  handleEdit,
  handleDelete,
}) => {
  return (
    <Flex direction="row">
      <Card mb={10} mr={2} style={{ width: "200px" }} padding="lg">
        <Card.Section>
          <Image src={image} alt={name} height="170" />
        </Card.Section>
      </Card>
      <Card mb={10} mr={20} style={{ width: "400px" }} withBorder padding="sm">
        <Flex ml={10} direction="column" mt="xl">
          <Text fz="sm" fw={700}>
            {name}
          </Text>
          <Text style={{ width: "400px" }} mt="sm" mb="md" c="dimmed" fz="xs">
            {description}
          </Text>
        </Flex>

        <Group mt={20} position="center">
          <Button
            onClick={() => handleEdit(id, name, image, description)}
            variant="default"
            color="dark"
          >
            Edit
          </Button>
          <Button onClick={() => handleDelete(id)} variant="subtle" color="red">
            Delete
          </Button>
        </Group>
      </Card>
    </Flex>
  );
};
export default CategoriesManagement;
