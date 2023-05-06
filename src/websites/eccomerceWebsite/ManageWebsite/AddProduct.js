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
  NumberInput,
  FileButton,
  List,
  Image,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import React, { useState } from "react";
import styles from "./AddProduct.module.css";
import ReactQuill from "react-quill-fixed";
import { Box, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { SliderPicker } from "react-color";
import UploadIcon from "@mui/icons-material/FileUploadOutlined";
import { Carousel } from "@mantine/carousel";
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
const AddProduct = (props) => {
  const [name, setName] = useState("");
  const [color, setColor] = useState("#fff");
  const [files, setFiles] = useState(null);

  const [colors, setColors] = useState(["#ff7373", "#e0b8c0"]);

  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [displayImage, setDisplayImage] = useState(null);
  const [launchedDate, setLaunchedDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const [sizes, setSizes] = useState(["lg", "md", "sm"]);
  const [size, setSize] = useState("");
  const [category, setCategory] = useState("");

  const { classes } = inputStyles();

  //for sizes management
  const handleAddSizes = () => {
    if (size === "") return;
    setSizes([...sizes, size]);
    setSize("");
    setOpen(false);
  };

  const handleeDeleteSizes = (selectedSize) => {
    setSizes(sizes.filter((size) => size !== selectedSize));
  };
  const handlePopperState = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  //for colors management
  const handleColorChange = (color) => {
    setColor(color.hex);
    setColors([...colors, color.hex]);
  };
  const handleDeleteColor = (selectedColor) => {
    setColors(colors.filter((color) => color !== selectedColor));
  };

  //USE THIS FUNCTION TO STORE IMAGES IN MONGODB
  const uploadImages = async () => {
    const links = [];
    for (const file of files) {
      const link = await uploadImage(file);
      links.push(link);
    }
    return links;
  };

  //WRITE ADD PRODUCT LOGIC IN THIS FUNCTION
  const handleAddProduct = async () => {
    props.setAddProduct(false);
    const links = await uploadImages();
    console.log(links);

    //ADD PRODUCT LOGIC HERE
  };
  const handleCancelProduct = () => {
    props.setAddProduct(false);
  };

  return (
    <>
      <Flex
        mih={50}
        style={{ padding: "20px", borderRadius: "20px" }}
        bg="#FBF8F1"
      >
        <Text fw={400} fz="xl">
          Provide Basic Details
        </Text>
      </Flex>
      <div className={styles.contentContainer}>
        <Text fw={400} fz="sm">
          Product Images
        </Text>
        <UploadImage files={files} setFiles={setFiles} />
        <Space h="lg" />
        {/* Product Name */}
        <TextInput
          label="Product Title"
          placeholder="Cloksy Watches "
          classNames={classes}
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {/* Product Price */}
        <Group
          style={{
            display: "flex",

            alignItems: "center",
          }}
        >
          <NumberInput
            value={price}
            mt="md"
            style={{ width: "48.5%" }}
            classNames={classes}
            label="Price"
            step={500}
            onChange={setPrice}
          />
          <DatePickerInput
            mt="md"
            popoverProps={{ withinPortal: true }}
            label="Production date"
            classNames={classes}
            clearable={false}
            style={{ width: "50%" }}
            required
            value={launchedDate}
            onChange={setLaunchedDate}
          />
        </Group>
        {/* Categories */}
        <Select
          mt="md"
          mb={15}
          data={[
            "Category1",
            "Category2",
            "Category3",
            "Category4",
            "Category5",
          ]}
          value={category}
          onChange={setCategory}
          placeholder="Pick one"
          label="Category "
          classNames={classes}
          required
        />
        <Space h="md" />
        <Text fz="sm" fw={500}>
          Available Sizes
        </Text>
        <Space h="sm" />
        {/* sizes */}
        <div>
          {sizes.length === 0 ? (
            <>
              <Button
                leftIcon={<AddIcon />}
                variant="outlined"
                onClick={handlePopperState}
                style={{
                  borderRadius: "20px",
                  borderColor: "#9F9F9F",
                  backgroundColor: "#ebebeb",
                  color: "#47474d",
                  textTransform: "capitalize",
                }}
              >
                Add Size
              </Button>
              {open && (
                <Popper
                  setOpen={setOpen}
                  setSize={setSize}
                  handleAddSizes={handleAddSizes}
                />
              )}
            </>
          ) : (
            <>
              <Group>
                {sizes.map((size) => {
                  return (
                    <Button
                      rightIcon={<CloseIcon />}
                      variant="outlined"
                      onClick={() => handleeDeleteSizes(size)}
                      style={{
                        borderRadius: "20px",
                        marginRight: "10px",
                        borderColor: "#9F9F9F",
                        backgroundColor: "#ebebeb",
                        color: "#47474d",
                        textTransform: "capitalize",
                      }}
                    >
                      {size}
                    </Button>
                  );
                })}
                <div
                  onClick={handlePopperState}
                  style={{
                    display: "inline-block",
                    borderRadius: "50%",
                    width: "fit-content",
                    padding: "5px",
                    border: "1px solid #9F9F9F",
                    backgroundColor: "#ebebeb",
                    color: "#47474d",
                    cursor: "pointer",
                  }}
                >
                  <AddIcon />
                </div>
              </Group>
              {open && (
                <Popper
                  setOpen={setOpen}
                  setSize={setSize}
                  handleAddSizes={handleAddSizes}
                />
              )}
            </>
          )}
        </div>
        <Space h="md" />
        {/* Price */}

        {/* Colors*/}
        <Text mb="md" fz="sm" fw={500}>
          Available Colors
        </Text>
        <SliderPicker color={color} onChange={handleColorChange} />
        <Space h="md" />
        <Flex wrap="wrap">
          {colors.map((color) => {
            return (
              <Color handleDeleteColor={handleDeleteColor} color={color} />
            );
          })}
        </Flex>
      </div>
      {/* Description */}
      <Flex
        mb={10}
        mih={50}
        style={{ padding: "20px", borderRadius: "20px" }}
        bg="#FBF8F1"
      >
        <Text fw={400} fz="xl">
          More about your product
        </Text>
      </Flex>
      <div className={styles.contentContainer}>
        <div style={{ height: "200px" }}>
          <ReactQuill
            placeholder={"Write something awesome..."}
            style={{ height: "80%" }}
            theme="snow"
            value={description}
            onChange={setDescription}
          />
        </div>

        <Group mt={20} position="center">
          <Button color="green" onClick={handleAddProduct}>
            Submit
          </Button>
          <Button variant="outline" color="red" onClick={handleCancelProduct}>
            Cancel
          </Button>
        </Group>
      </div>
    </>
  );
};

export default AddProduct;
const Popper = ({ setOpen, setSize, handleAddSizes }) => {
  return (
    <div style={{ width: "fit-content" }}>
      <Box
        sx={{
          border: 1,
          p: 1,
          backgroundColor: "white",
          borderColor: "#fcf7f7",
          margin: "10px",
          borderRadius: "10px",
          padding: "10px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignContent: "center",
          }}
        >
          <h6>Enter Size </h6>
          <CloseIcon
            style={{ cursor: "pointer" }}
            onClick={() => setOpen(false)}
            size="small"
            color="#47474d"
          />
        </div>
        <div style={{ marginTop: "5px" }}>
          <TextField
            onChange={(e) => setSize(e.target.value)}
            variant="outlined"
            size="small"
          />
          <Button onClick={handleAddSizes} variant="text">
            ADD
          </Button>
        </div>
      </Box>
    </div>
  );
};
const Color = ({ color, handleDeleteColor }) => {
  return (
    <Button
      rightIcon={<CloseIcon />}
      variant="outlined"
      onClick={() => handleDeleteColor(color)}
      style={{
        height: "40px",
        width: "110px",
        borderRadius: "20px",
        marginRight: "10px",
        marginBottom: "10px",
        borderColor: "#9F9F9F",
        backgroundColor: "#ebebeb",
        color: "#47474d",
        textTransform: "capitalize",
      }}
    >
      <Button
        style={{
          borderRadius: "50%",
          backgroundColor: color,
        }}
      ></Button>
    </Button>
  );
};

const UploadImage = ({ files, setFiles }) => {
  return (
    <>
      {files && (
        <Carousel
          withIndicators
          height={200}
          slideSize="33.333333%"
          slideGap="md"
          align="start"
          slidesToScroll={3}
        >
          {files.map((file, index) => (
            <Carousel.Slide key={index}>
              <Image src={URL.createObjectURL(file)} />
            </Carousel.Slide>
          ))}
        </Carousel>
      )}
      <Space h="lg" />
      <Group position="left">
        <FileButton onChange={setFiles} accept="image/png,image/jpeg" multiple>
          {(props) => (
            <Button
              variant="outline"
              color="dark"
              leftIcon={<UploadIcon />}
              {...props}
            >
              Upload images
            </Button>
          )}
        </FileButton>
      </Group>
    </>
  );
};
///setDisplayImage(URL.createObjectURL(newImage));
