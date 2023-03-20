import classes from "./ProductsPage.module.css";
import toast, { Toaster } from "react-hot-toast";
import { useContext } from "react";
import { UserContext } from "../../App";
import ProductCard from "../components/ProductsPage/ProductCard";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import DialogContentText from "@mui/material/DialogContentText";
import { uploadImage } from "../../utilityFunctions/imageUpload";

function Products({ productIds }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [displayImage, setDisplayImage] = useState(null);
  const { template, setTemplate } = useContext(UserContext);
  const [productIds1, setProductIds1] = useState(productIds);
  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = async () => {

    setLoading(true);
      setOpen(false);
    let link = "";
    try {
      link = await uploadImage(image);
      console.log(link);
    } catch (err) {
      console.log(err);
    }
    await fetch("http://localhost:8800/api/products/addproduct", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        image: link,
        name,
        price,
        description,
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        toast.dismiss();
        setLoading(false);
       toast.success("Product Added");
        setTemplate({
          ...template,
          data: {
            products: [...template.data.products, response.product._id],
          },
        });
        setProductIds1([...productIds1, response.product._id]);
        console.log(response, "Product added");
      });
  
  };

  const fileChange = (e) => {
    const newImage = e.target.files[0];

    if (newImage) {
      setImage(newImage);
      setDisplayImage(URL.createObjectURL(newImage));
    }
  };

  return (
    <>
    { loading && toast.loading("Adding Product...")}
  
    {console.log('inrender',productIds1)}
    <Toaster position="top-center" reverseOrder={false}></Toaster>
    <div className={classes.container}>
      <Button className={classes.button} onClick={handleClickOpen}>
        <p className={classes.text}> Add Product </p>
      </Button>

      <ProductCard productIds={productIds1}></ProductCard>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add Product</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add a product, please enter its information here.
          </DialogContentText>
          <center>
            <div style={{ marginBottom: "20px", marginTop: "20px" }}>
              {displayImage && (
                <img
                  style={{
                    borderRadius: "30px",
                    objectFit: "cover",
                    width: "300px",
                    height: "300px",
                  }}
                  src={displayImage}
                  alt="productImage"
                />
              )}
            </div>
          </center>

          <label
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <img
              style={{ marginRight: "10px", width: "50px", height: "50px" }}
              className="writeIcon"
              alt=""
              src="https://res.cloudinary.com/djlewzcd5/image/upload/v1670250225/plus_2_qak15o.png"
            />{" "}
            Add Image
            <input
              multiple
              className="input"
              type="file"
              name="file"
              onChange={fileChange}
            ></input>
          </label>

          <input id="fileInput" type="file" style={{ display: "none" }} />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Product Name"
            type="text"
            fullWidth
            onChange={(event) => setName(event.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="price"
            label="Price"
            type="Number"
            fullWidth
            onChange={(event) => setPrice(event.target.value)}
          />
          <TextField
            margin="dense"
            id="description"
            label="Description"
            type="text"
            fullWidth
            onChange={(event) => setDescription(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    </>
    
  );
}
export default Products;
