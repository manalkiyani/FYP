import React, { useState } from "react";
import styles from "./ProductCard.module.css";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { getListOfProducts } from "../../../../utilityFunctions/axiosFunctions";
import { Button } from "@mui/material";

import DialogueForm from "./DialogueForm";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useLocalStorageState } from "ahooks";
const ConfirmDeleteDialog = ({ open, onClose, onConfirm }) => {
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    await onConfirm();
    setLoading(false);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirm Deletion</DialogTitle>
      <DialogContent>
        Are you sure you want to delete this Product?
      </DialogContent>
      <DialogActions>
        <Button disabled={loading} onClick={onClose}>
          Cancel
        </Button>
        <Button disabled={loading} onClick={handleConfirm} color="error">
          {loading ? "Deleting..." : "Delete"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
const ProductCard = ({ productIds }) => {
  const [products, setProducts] = useState(null);
  const [open1, setOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [ProductDeleteId, setProductDeleteId] = useState(null);
  const [productDeletion, setProductDeletion] = useState(false);
  //  const { template, setTemplate } = useContext(UserContext);
  const [template, setTemplate] = useLocalStorageState("template", "");
  const handleClickOpen = (product) => {
    setOpen(true); /// this will open Dialogue box at the bottom of this file.
    setCurrentProduct(product);
    console.log("this is current product: " + product.name);
  };
  const openproductDeletion = (id) => {
    setProductDeleteId(id);
    setProductDeletion(true);
  };
  const closeproductDeletion = () => {
    setProductDeletion(false);
  };
  const delProduct = async () => {
    axios
      .delete(
        `http://localhost:8800/api/products/delproduct/${ProductDeleteId}`
      )
      .then(function (response) {
        setTemplate({
          ...template,

          data: {
            products: products.filter(
              (productId) => productId !== ProductDeleteId
            ),
          },
        });

        toast.success("Product Deleted Successfully");
        setProducts(
          products.filter((product) => product._id !== ProductDeleteId)
        );
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const getProducts = async () => {
    const products = await getListOfProducts(productIds);
    setProducts(products);
  };
  useEffect(() => {
    getProducts();
  }, [productIds]);

  return (
    <>
      {console.log("this is product card " + productIds)}
      <ConfirmDeleteDialog
        open={productDeletion}
        onClose={closeproductDeletion}
        onConfirm={delProduct}
      />
      <div className={styles.productsContainer}>
        {products &&
          products.map((product) => {
            return (
              <div key={product._id} className={styles.card}>
                <img
                  className={styles.image}
                  src={product.image}
                  alt={"image"}
                />
                <div className={styles.editDeleteIconDiv}>
                  <img
                    alt=""
                    className={styles.icon1}
                    onClick={() => {
                      handleClickOpen(product);
                    }}
                    src="https://res.cloudinary.com/djlewzcd5/image/upload/v1670362324/edit_zevkr0.png"
                  />

                  <img
                    alt=""
                    className={styles.icon2}
                    onClick={() => openproductDeletion(product._id)}
                    src="https://res.cloudinary.com/djlewzcd5/image/upload/v1670362234/delete_wpauco.png"
                  />
                </div>
                <div className={styles.details}>
                  <div className={styles.flex}>
                    <h2 className={styles.name}>{product.name}</h2>
                    <p className={styles.price}>{product.price + "$"}</p>
                  </div>
                  <p className={styles.description}>{product.description}</p>
                </div>
              </div>
            );
          })}

        {open1 && (
          <DialogueForm
            product={currentProduct}
            products={products}
            setProducts={setProducts}
            open={open1}
            setOpen={setOpen}
          ></DialogueForm>
        )}
      </div>
    </>
  );
};

export default ProductCard;
