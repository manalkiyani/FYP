import React, { useState } from "react";
import styles from "./ProductCard.module.css";
import axios from "axios";
import { useEffect } from "react";
import { getListOfProducts } from "../../../utilityFunctions/axiosFunctions";
import ContentEditable from "react-contenteditable";

import DialogueForm from "./DialogueForm";

var num = 1;
var temp = 1;

const ProductCard = ({ searchedquery,productIds }) => {
  const [products, setProducts] = useState(null);
  const [open1, setOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  const handleClickOpen = (product) => {
    setOpen(true); /// this will open Dialogue box at the bottom of this file.
    setCurrentProduct(product);
    console.log("this is current product: " + product.name);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleted =  async (id) => {
    console.log(id);

    axios
      .delete(`http://localhost:8800/api/products/delproduct/${id}`)
      .then(function (response) {})
      .catch(function (error) {
        console.log(error);
      });
    getProducts()
    // axios
    //   .get("http://localhost:8800/api/products/getProducts")
    //   .then((response) => {
    //     setProducts(response.data.Products);
    //   });
  };
  const getProducts = async () => {
    const products = await  getListOfProducts(productIds)
    setProducts(products);
  }
  useEffect(() => {
    // console.log("in useeffect, this is search query" + searchedquery);
    // axios
    //   .get("http://localhost:8800/api/products/getProducts")
    //   .then((response) => {
    //     setProducts(response.data.Products);
    //   });

   getProducts()
  }, []);
  // axios
  //   .get("http://localhost:8800/api/products/getProducts")
  //   .then((response) => {
  //     if (products.length != response.data.Products.length) {
  //       console.log("in not euqals");
  //       setProducts(response.data.Products);
  //     }

  //     console.log(products.length);
  //     console.log("this is response length" + response.data.Products.length);
  //   });

  const AddToCart = async (id,image, name, price, description) => {
    try {
      console.log("this is productt id " + id);
      console.log("this is productt image " + image);
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
              <div
                key={product._id}
               className={styles.card}>
                <img
                  className={styles.image}
                  src={product.image}
                  alt={"image"}
                />
                <div className={styles.details}>
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

                  <div className={styles.flex}>
                    <h2 className={styles.name}>{product.name}</h2>
                    <p className={styles.price}>{product.price + "$"}</p>
                  </div>
                  <p className={styles.description}>{product.description}</p>
                  <ContentEditable
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
                    html={"Add to Cart"}
                  />
                </div>
              </div>
            );
          }

         
       
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
  );
};

export default ProductCard;
