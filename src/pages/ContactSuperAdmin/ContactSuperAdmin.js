
import classes from "./ContactSuperAdmin.module.css";
import Input from "../UI/Input";
import Button from "../UI/Button";
import Header from "../UI/Header";
import React from "react";
import { useState } from "react";
import axios from "axios";

function ContactSuperAdmin() {

  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')


  const handleEmail = (event)=>{
    setEmail(event.target.value);

  }
  const handleSubject= (event)=>{
    setSubject(event.target.value);
    
  }

  const handleMessage = (event)=>{
    setMessage(event.target.value);
    
  }

  const handleSubmit = ()=>{

    fetch("http://localhost:8800/api/admin/addinmessagesenttosuperadmin", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email,
        subject,
        message

      }),
    }).then((res) => res.json())
    .then((data) => {
//////////SUPER ADMIN ID HARDCODED**********

      axios.post("http://localhost:8800/api/admin/addmessageidinsuperadmin",{messageID:data.message._id, adminID:'6403a03f270a91ab0e2925ad'})        
      .then((response) => {
        console.log(response.data)

      });
    }
    )
    .catch((error) => console.log(error));



  }


  return (
<>
    <Header></Header>

      <div className={classes.App}>

      <div className={classes.leftbox}>
          <p className={classes.header}>
            Get In Touch
          </p>
          <p className={classes.text}>Want to get in touch? We would love to hear .</p>
          <p className={classes.text}>from you. Here’s how you can reach us</p>

        </div>

        
        <div className={classes["App-rightbox"]}>

          <p className={classes.tagline}>Fill the form</p>


          <div className={classes.form}>
            <Input onChange={handleEmail} placeholder="Email"></Input>
            <Input onChange={handleSubject} placeholder="Subject"></Input>
            <Input onChange={handleMessage} placeholder="Messagge"></Input>

            <Button onClick={handleSubmit} className={classes.submitbutton}> Submit</Button>
          </div>
        </div>


      </div>
    </>
  );
}

export default ContactSuperAdmin;
