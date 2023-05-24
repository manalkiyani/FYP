import React from "react";
import styles from "./CartPage.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import CheckOutForm from "../components/CartPage/CheckOutForm";
import { Divider } from "@mui/material";
import { getUser, getUsername } from "../../../utilityFunctions/authFunctions";

import { getTemplateId } from "../../../../src/utilityFunctions/TemplateIdController";
import { getWebsiteData } from "../../../../src/utilityFunctions/websiteDataController";

const CartPage = (props) => {
  //we have to receive userid here in the props to make this code work

  // const viewer = JSON.parse(localStorage.getItem("viewer"));


const [viewer, setViewer] = useState();
  
  const [cartProducts, setCartProducts] = useState([]);
  const [open, setOpen] = useState(false);

  const getUserId = async () => {
    const token = await getUsername();
    console.log(token);
    const { data } = await getUser({ username: token.username });
    console.log(data);
    return data; // Return the data retrieved from the API
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const incrementQuantity = async (pid) => {
    let temp = cartProducts.filter((element) => {
      if (element._id == pid) {
        element.quantity = element.quantity + 1;
        console.log(
          "quantity of " + element.name + " is now " + element.quantity
        );
        return element;
      } else {
        return element;
      }
    });

    setCartProducts(temp);

    console.log("this is viewerid "+viewer )
    const response = await axios.put(
      "http://localhost:8800/api/products/editquantityincart",
      {
        userid: viewer, // update it by getting the user id in props
        cart: temp,
      }
    );
    console.log("this is response lets see" + response.status);
  };

  const decrementQuantity = async (pid) => {
    let temp = cartProducts.filter((element) => {
      if (element.quantity > 0) {
        if (element._id == pid) {
          if (element.quantity > 0) {
            element.quantity = element.quantity - 1;
            console.log("This is if 1 " + element.quantity);
          }
          if (element.quantity == 0) {
            return false;
          } else {
            return true;
          }
        } else {
          return true;
        }
      }
    });

    const response = await axios.put(
      "http://localhost:8800/api/products/editquantityincart",
      {
        userid: viewer,
        cart: temp,
      }
    );
    setCartProducts(temp);
    console.log("this is response " + response.message);
  };

  const removeAllFromCartAfterOrderReceived = async () => {
    console.log("in remove all");

    const response = await axios.put(
      "http://localhost:8800/api/products/editquantityincart",
      {
        userid: viewer,
        cart: [],
      }
    );

    console.log("this is response " + response.status);

    console.log("in remove all");
    //const response1 = await axios.put("http://localhost:8800/api/products/addordersintemplate", {});
    //console.log("this is respons1e "+response1.message)
  };

  const removeProductFromCart = async (pid) => {
    let temp = cartProducts.filter((element) => {
      if (element._id == pid) {
        return false;
      } else {
        return true;
      }
    });

    const response = await axios.put(
      "http://localhost:8800/api/products/editquantityincart",
      {
        userid: viewer,
        cart: temp,
      }
    );
    setCartProducts(temp);
    console.log("this is response " + response.status);
  };

  useEffect(() => {
    
    const fetchCartProducts = async () => {
      const Template = await getTemplateId();
      console.log(Template)
      const response = await getWebsiteData(Template.templateId);
     
      // await setViewer(response.websiteData.viewerId);
      const viewer =response.websiteData.viewerId;
      setViewer(response.websiteData.viewerId);
      console.log("in use effect "+ viewer)
      

  
      try {

        const response = await fetch(
          "http://localhost:8800/api/products/getfromcart/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId: viewer }),
          }
        );
        const cart = await response.json();

        const productRequests = cart.map((product) => {
          return fetch(
            `http://localhost:8800/api/products/getproduct/${product.productId}`
          ).then((res) => res.json());
        });

        const products = await Promise.all(productRequests);

        setCartProducts(
          cart.map((product, index) => {
            return { ...product, ...products[index] };
          })
        );
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchCartProducts();
  }, []);

  const totalAmount = cartProducts.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );
  const shippingFee = 5;
  const tax = 0.1;
  const subtotal = totalAmount + shippingFee + totalAmount * tax;

  return (
    <>
      <div className={styles.container}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.header}>Image</th>
              <th className={styles.header}>Product Name</th>
              <th className={styles.header}>Quantity</th>
              <th className={styles.header}>Price</th>
              <th className={styles.header}></th>
            </tr>
          </thead>
          <tbody>
            {cartProducts.map((product) => (
              <tr key={product.productId} className={styles.row}>
                <td className={styles.cell}>
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className={styles.productImage}
                  />
                </td>
                <td className={styles.cell}>{product.name}</td>
                <td className={styles.cell}>
                  <span
                    className={styles.icons}
                    onClick={() => decrementQuantity(product.productId)}
                  >
                    -
                  </span>
                  {product.quantity}
                  <span
                    className={styles.icons}
                    onClick={() => incrementQuantity(product.productId)}
                  >
                    +
                  </span>
                </td>
                <td className={styles.cell}>
                  ${product.price * product.quantity}
                </td>
                <td className={styles.cell}>
                  <span
                    style={{ color: "red", fontWeight: "bold" }}
                    onClick={() => removeProductFromCart(product.productId)}
                  >
                    X
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <div className={styles.summaryBox}>
            <h2>Summary</h2>
            <div className={styles.summaryInfo}>
              <div className={styles.spacebetween}>
                <span>Order Total:</span>
                &nbsp; &nbsp; <span>${totalAmount}</span>
              </div>
              <Divider style={{ color: " black" }} />
              <div className={styles.spacebetween}>
                <span>Shipping Fee:</span>
                &nbsp; &nbsp; &nbsp; <span>${shippingFee}</span>
              </div>
              <div className={styles.spacebetween}>
                <span>Tax:</span>
                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;{" "}
                <span>{tax * 100}%</span>
              </div>
              <div className={styles.spacebetween}>
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <Button
                variant="contained"
                color="error"
                className={styles.spacebutton}
                onClick={handleOpen}
              >
                Checkout
              </Button>
            </div>
          </div>
        </div>
      </div>
      {
        open && (
          <CheckOutForm
            userid={viewer}
            removeAllFromCartAfterOrderReceived={
              removeAllFromCartAfterOrderReceived
            }
            subtotal={subtotal}
            cartProducts={cartProducts}
            setCartProducts={setCartProducts}
            open={open}
            setOpen={setOpen}
          ></CheckOutForm>
        )
        //update the above user id from props.userid once u integrate with login
      }
    </>
  );
};

export default CartPage;
