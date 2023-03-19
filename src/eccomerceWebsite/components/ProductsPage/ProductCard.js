import React, { useState } from "react";
import styles from "./ProductCard.module.css";
import axios from "axios";
import { useEffect } from "react";
import { getListOfProducts } from "../../../utilityFunctions/axiosFunctions";
import { Button } from "@mui/material";

import DialogueForm from "./DialogueForm";

const ProductCard = ({productIds }) => {
  const [products, setProducts] = useState(null);
  const [open1, setOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  const handleClickOpen = (product) => {
    setOpen(true); /// this will open Dialogue box at the bottom of this file.
    setCurrentProduct(product);
    console.log("this is current product: " + product.name);
  };

  const deleted = async (id) => {
    console.log(id);

    axios
      .delete(`http://localhost:8800/api/products/delproduct/${id}`)
      .then(function (response) {})
      .catch(function (error) {
        console.log(error);
      });
    getProducts();
  };
  const getProducts = async () => {
    const products = await getListOfProducts(productIds);
    setProducts(products);
  };
  useEffect(() => {
    getProducts();
  }, []);


  return (
    <div className={styles.productsContainer}>
      {products &&
        products.map((product) => { 
           return  ( 
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
                    onClick={() => deleted(product._id)}
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
              </div>)
            
          })
        }

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
  );
};

export default ProductCard;
