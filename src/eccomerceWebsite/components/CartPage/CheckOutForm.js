import React, { useState } from 'react';
import axios from 'axios';
import style from "./CheckOutForm.module.css"
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import StripeContainer from './StripeContainer';


const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'fixed',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    backgroundColor: 'rgba(0, 0, 0, 0.3)'
  },
  dialogContainer: {
    backgroundColor: '#fff',
    borderRadius: '2px',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.3)',
    width: '400px',
    maxWidth: '90%',
    display: 'flex',
    flexDirection: 'column',
    padding: '20px'
  },
  title: {
    fontSize: '22px',
    fontWeight: '500',
    marginBottom: '20px'
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
  },
  input: {
    height: '40px',
    padding: '10px',
    borderRadius: '2px',
    border: '1px solid #ddd',
    marginBottom: '20px',
    fontSize: '16px'
  },
};


const CheckOutForm = ({userid,removeAllFromCartAfterOrderReceived,subtotal,cartProducts,setCartProducts, open, setOpen}) => {
    const [selectedOption, setSelectedOption] = useState('');
    const [selectedEasypaisa, setSelectedEasypaisa]= useState(false);
    const [selectedCard, setSelectedCard]= useState(false);
    const [PlaceOrderDisable, setPlaceOrderDisable] = useState(false);
    const [cancelDisable, setCancelDisable] = useState(false);
    const [address,setAddress]=useState('')
    const [price,setPrice]=useState()

    const [quantity,setQuantity]=useState('')
    const [paymentMethod,setPaymentMethod]=useState('')
    const [transactionid,setTransactionid]=useState('')

    const handleTransactionid = (event)=>{
      setTransactionid(event.target.value)
    }

    const handleOptionChange = (event) => {
      setSelectedOption(event.target.value);
      console.log(event.target.value)
      
      if(event.target.value==="Easypaisa"){
        setSelectedEasypaisa(true);
        setPlaceOrderDisable(false);
        setSelectedCard(false);
        console.log("Ineasy")
      }
      else if(event.target.value ==="Card"){
        setSelectedCard(true);
        setSelectedEasypaisa(false);
        setPlaceOrderDisable(true)
        setCancelDisable(false)
      }
      else
      {
        setSelectedEasypaisa(false)
        setSelectedCard(false);
      }
    };


  const handleSubmit =async(event)  => {
    setOpen(false)


    fetch("http://localhost:8800/api/orders/orderreceived", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        userid: userid,
        products:cartProducts,
        totalprice:subtotal,
        address: address,
        paymentmethod:selectedOption,
        transactionid: transactionid,
        
      }),
    }).then((res) => res.json())
    .then((data) => {

      setCartProducts([])
      console.log("Order received");
      removeAllFromCartAfterOrderReceived();

    })
    setOpen(false);

  };
  const handleAddress = (event) =>{
    setAddress(event.target.value)

  }

  const handle = (event) =>{
    setAddress(event.target.value)
  }

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.dialogContainer}>
        <form style={styles.formContainer}>
          <input
            type="text"
            name="name"
            placeholder="Name"
        
          
            style={styles.input}
          />
          <input
            type="text"
            name="Phone Number"
            placeholder="Phone Number"
    


            style={styles.input}
          />
          <textarea
            name="Address"
            placeholder="Address"
            onChange={handleAddress}
  
     
            style={{ ...styles.input, height: '100px' }}
          />

<div className={styles.container}>
      <div className={styles.method}>
        <input
          type="radio"
          id="cod"
          name="paymentMethod"
          value="COD"
          checked={selectedOption === 'COD'}
          onChange={handleOptionChange}
        />
        <label htmlFor="cod">Cash On Delivery</label>
      </div>
      <div className={styles.method}>
        <input
          type="radio"
          id="card"
          name="paymentMethod"
          value="Card"
          checked={selectedOption === 'Card'}
          onChange={handleOptionChange}
        />
        <label htmlFor="card">Card</label>
      </div>
      <div className={styles.method}>
        <input
          type="radio"
          id="easypaisa"
          name="paymentMethod"
          value="Easypaisa"
          checked={selectedOption === 'Easypaisa'}
          onChange={handleOptionChange}
        />
        <label htmlFor="easypaisa">Easypaisa</label>
      </div>
      {selectedEasypaisa && <Input onChange={handleTransactionid} placeholder='Transaction id'></Input>}
      {selectedCard && <div className={style.cardfield}> <StripeContainer  cancelDisable={cancelDisable} setCancelDisable={setCancelDisable} PlaceOrderDisable = {PlaceOrderDisable} setPlaceOrderDisable={setPlaceOrderDisable}/> </div>}
    </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>

            <Button type="button" disabled = {cancelDisable}  onClick={handleClose}> Cancel </Button>

            <Button
            onClick={handleSubmit}
            variant='contained'
            color='primary'
            type = "submit"
            disabled = {PlaceOrderDisable}
             >Place Order</Button>
          </div>
        </form>
      </div>
      
    </div>
  );
};
export default CheckOutForm;
