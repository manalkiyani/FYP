import React, { useState } from "react";
import axios from "axios";
import style from "./PlanPaymentForm.module.css";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import StripeContainer from "./StripeContainer";
import toast, { Toaster } from "react-hot-toast";
import { ApprovalRounded } from "@mui/icons-material";
import { TextField as Muiinput } from "@mui/material";

import { getUsername, getUser } from "../../utilityFunctions/authFunctions";
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "fixed",
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  dialogContainer: {
    backgroundColor: "#fff",
    borderRadius: "2px",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.3)",
    width: "400px",
    maxWidth: "90%",
    display: "flex",
    flexDirection: "column",

    padding: "30px",
  },
  title: {
    fontSize: "22px",
    fontWeight: "500",
    marginBottom: "20px",
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  input: {
    height: "40px",
    padding: "10px",
    borderRadius: "2px",
    border: "1px solid #ddd",
    marginBottom: "20px",
    fontSize: "16px",
  },
};

const PlanPaymentForm = ({ setOpen, activePlan, amount }) => {
  const [selectedOption, setSelectedOption] = useState("Card");
  const [selectedEasypaisa, setSelectedEasypaisa] = useState(false);
  const [selectedCard, setSelectedCard] = useState(true);
  const [PlaceOrderDisable, setPlaceOrderDisable] = useState(true);
  const [cancelDisable, setCancelDisable] = useState(false);
  const [transactionid, setTransactionid] = useState("");
  const [approvedTrans, setApprovedTrans] = useState(true);
  const [paymentID, setPaymentID] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTransactionid = (event) => {
    event.preventDefault();
    setTransactionid(event.target.value);
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    console.log(event.target.value + "this is selected");

    if (event.target.value === "Easypaisa") {
      setSelectedEasypaisa(true);
      setPlaceOrderDisable(false);
      setSelectedCard(false);
      setApprovedTrans(false);
      console.log("Ineasy");
    } else if (event.target.value === "Card") {
      setSelectedCard(true);
      setSelectedEasypaisa(false);
      setPlaceOrderDisable(true);
      setCancelDisable(false);
      setApprovedTrans(true);
    }
  };
  const getUserId = async () => {
    const token = await getUsername();
    console.log(token);
    const { data } = await getUser({ username: token.username });
    console.log(data);
    return data; // Return the data retrieved from the API
  };

  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    const user = await getUserId();
    console.log(user._id);
    setOpen(false);
    console.log(
      "this is data amount " +
        amount +
        "/n activePlan " +
        activePlan +
        " /n transID " +
        transactionid +
        " /n pM " +
        selectedOption
    );

    fetch("http://localhost:8800/api/admin/buyplan", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        amount,
        activePlan,
        paymentMethod: selectedOption,
        transID: transactionid,
        approvedTrans,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        axios
          .put("http://localhost:8800/api/admin/addpaymentidinadmin", {
            paymentID: data.payment._id,
            adminID: user._id,
          })
          .then((response) => {
            console.log(response.data);
          });

        ///////// now storing the same payment id in super admin (ID is of superadmin, will remain as it is)
        axios
          .post("http://localhost:8800/api/admin/addpaymentidinsuperadmin", {
            paymentID: data.payment._id,
            adminID: "6403a03f270a91ab0e2925ad",
          })
          .then((response) => {
            console.log(response.data);
          });

        axios
          .put("http://localhost:8800/api/admin/updateactiveplan", {
            adminID: user._id,
            activePlan,
          })
          .then((response) => {
            setLoading(false);
            console.log(response.data);
          });
      })
      .catch((error) => console.log(error));

    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false}></Toaster>
    
      <div style={styles.container}>
        <div style={styles.dialogContainer}>
          <form onSubmit={handleSubmit} style={styles.formContainer}>
            <h5 className={style.heading}> Personal Details</h5>
            <hr />

            <Muiinput
              style={{ marginTop: "10px" }}
              label="Name"
              name="name"
              placeholder="Name"
              variant="outlined"
            />

            <Muiinput
              style={{ marginTop: "10px" }}
              label="Contact"
              type="number"
              name="Phone Number"
              placeholder="Contact"
              variant="outlined"
            />

            <div style={{ marginTop: "30px" }} className={styles.container}>
              <h5 className={style.heading}> Select Payment Method</h5>
              <hr />
              <div className={styles.method}>
                <label>
                  <input
                    type="radio"
                    id="card"
                    name="paymentMethod"
                    value="Card"
                    checked={selectedOption === "Card"}
                    onChange={handleOptionChange}
                  />
                  &nbsp; &nbsp; &nbsp;
                </label>
                <label htmlFor="card">Card</label>
              </div>

              <h5 className={style.heading}> Payment Details</h5>
              <hr />
              {selectedEasypaisa && (
                <Muiinput
                  variant="outlined"
                  onChange={handleTransactionid}
                  placeholder="Transaction id"
                ></Muiinput>
              )}
              {selectedCard && (
                <div className={style.cardfield}>
                  {" "}
                  <StripeContainer
                    cancelDisable={cancelDisable}
                    setCancelDisable={setCancelDisable}
                    PlaceOrderDisable={PlaceOrderDisable}
                    setPlaceOrderDisable={setPlaceOrderDisable}
                  />{" "}
                </div>
              )}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "20px",
              }}
            >
              <Button
                type="button"
                disabled={cancelDisable}
                onClick={handleClose}
              >
                {" "}
                Cancel{" "}
              </Button>

              <Button
                onClick={handleSubmit}
                variant="contained"
                color="primary"
                type="submit"
                disabled={PlaceOrderDisable}
              >
                Buy
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default PlanPaymentForm;
