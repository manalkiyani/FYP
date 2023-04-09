import React, { useState } from "react";
import styles from "./ViewerProductCard.module.css";
import toast, { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { getListOfProducts } from ".././../../../utilityFunctions/axiosFunctions";
import { Button } from "@mui/material";
import axios from "axios";
import Rating from "@mui/material/Rating";
import { styled } from "@mui/material/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import Reviews from "./Reviews";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
const ViewerProductCard = ({
  searchedquery,
  productIds,
  sortOrder,
  sortfunc,
}) => {
  const [products, setProducts] = useState(null);
  const [open, setOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [ratingValue, setRatingValue] = useState(0);
  const [productRatingChange, setProductRatingChange] = useState(false); // new state to track changes in product ratings
  const [reviews, setReviews] = useState([]);

  const StyledRating = styled(Rating)({
    "& .MuiRating-iconFilled": {
      color: "#FFD700",
    },
  });
  const handleClickOpen = async (productId) => {
    setOpen(true); /// this will open Dialogue box at the bottom of this file.
  };
  const handleClose = (product) => {
    setOpen(false); /// this will open Dialogue box at the bottom of this file.
  };

  const handleRatingChange = async (event, newValue, productId) => {
    setRatingValue(newValue);
    console.log(newValue + " this is new val");
    try {
      await axios.post("http://localhost:8800/api/products/addrating", {
        productId,
        ratingValue,
      });
      toast.success("Product Rated Successfully");
      console.log("this is product id clicked " + productId);
      setProductRatingChange(!productRatingChange); // toggle productRatingChange state to trigger useEffect hook
    } catch (err) {
      console.log("Error adding rating:", err);
      console.log("this is product id clicked in error " + productId);
    }
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

    ///sorting products
    if (sortfunc) {
      if (sortOrder == "low-to-high") {
        console.log("in if");

        setProducts([...products].sort((a, b) => a.price - b.price));
      } else {
        console.log("in else");

        setProducts([...products].sort((a, b) => b.price - a.price));
      }
    }
  };
  useEffect(() => {
    getProducts();
  }, [sortOrder, ratingValue, productRatingChange]);

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

   toast.success("Added to Cart Successfully");
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className={styles.productsContainer}>
        {products &&
          products.map((product) => {
            const productId = product._id;
            console.log("this is productid in return " + productId);
            if (
              product.name.toLowerCase().includes(searchedquery.toLowerCase())
            ) {
              return (
                <div key={product._id} className={styles.card}>
                  <StyledRating
                    className={styles.rating}
                    onChange={(event, newValue) =>
                      handleRatingChange(event, newValue, productId)
                    }
                    name="size-large"
                    defaultValue={5}
                    size="large"
                  />
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

                    <div className={styles.avgrating}>
                      <p>
                        <b>Rating</b>
                      </p>
                      <p>
                        {" "}
                        <FontAwesomeIcon
                          color="#FFD700"
                          key={""}
                          icon={faStar}
                        />{" "}
                        {product.avgRating}
                      </p>
                    </div>
                    {/* <p className={styles.description}>{product.description}</p> */}
                    <Button
                      onClick={() => {
                        handleClickOpen(productId);
                        setOpen(productId);
                      }}
                      variant="outlined"
                      className={styles.button}
                    >
                      Review
                    </Button>
                    <div className={styles.cart}>
                      <AddShoppingCartIcon
                        onClick={() => {
                          AddToCart(
                            product._id,
                            product.image,
                            product.name,
                            product.price,
                            product.description
                          );
                        }}
                      />
                    </div>
                  </div>

                  {open === productId && (
                    <Reviews
                      reviews={reviews}
                      productId={productId}
                      open={open}
                      setOpen={setOpen}
                      handleClickOpen={handleClickOpen}
                      handleClose={handleClose}
                    ></Reviews>
                  )}
                </div>
              );
            }
          })}
      </div>
    </>
  );
};

export default ViewerProductCard;
