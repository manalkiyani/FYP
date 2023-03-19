import React, { useState } from "react";
import styles from "./ViewerProductCard.module.css";

import { useEffect } from "react";
import { getListOfProducts } from ".././../../../utilityFunctions/axiosFunctions";
import { Button } from "@mui/material";
import axios from "axios";

const ViewerProductCard = ({ searchedquery, productIds }) => {
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

  const AddToCart = async (id, image, name, price, description) => {
    try {
      const response = await axios.post(
        "http://localhost:8800/api/products/addtocart",
        {
          userid: "63e8df1974cc16f2b7ecacb6", ////have to get this from props when login in integrated
          productid: id,
          image,
          name,
          price,
          description,
        }
      );

      console.log(response.data.message + "in try, successful.");
    } catch (error) {
      console.error(error.message + "inerror");
    }

    return alert("Added to cart");
  };

  return (
    <div className={styles.productsContainer}>
      {products &&
        products.map((product) => {
          if (
            product.name.toLowerCase().includes(searchedquery.toLowerCase())
          ) {
            return (
              <div key={product._id} className={styles.card}>
                
                <img
                  className={styles.image}
                  src={product.image}
                  alt={"image"}
                />
               
                <div className={styles.details}>
                  <div className={styles.flex}>
                    <h2 className={styles.name}>{product.name}</h2>
                    <p className={styles.price}>{product.price + "$"}</p>
                  </div>
                  <p className={styles.description}>{product.description}</p>
                    <Button
                    onClick={() => {
                      AddToCart(
                        product._id,
                        product.image,
                        product.name,
                        product.price,
                        product.description
                      );
                    }}
                    className={styles.button}
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            );
          }
        })}

     
    </div>
  );
};

export default ViewerProductCard;
