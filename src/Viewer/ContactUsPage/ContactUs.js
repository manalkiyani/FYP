import React, { useState } from "react";
import styles from "./ContactUs.module.css";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { getUsername,getUser } from '../../utilityFunctions/authFunctions';
import shapeIcon from "../../assets/contactus/shape.png";

const ViewerContactForm = () => {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
     const getUserId = async () => {
    const token = await getUsername();
    console.log(token);
    const { data } = await getUser({ username: token.username });
    console.log(data);
    return data; // Return the data retrieved from the API
  };
const handleSubmit = async (event) =>{
event.preventDefault();
 const user = await getUserId();


  fetch("http://localhost:8800/api/admin/addinmessagesenttoadmin", {
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
      

      axios.post("http://localhost:8800/api/admin/addmessageidinadmin",{messageID:data.message._id, ADMIN_ID:user._id})        
      .then((response) => {
        toast.success("Message Sent Successfully");
        console.log(response.data)

      });
    }
    )
    .catch((error) => console.log(error));
  }

  return (
    <>
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className={styles.container}>
      <span className={styles.bigCircle}></span>
      <img src={shapeIcon} className={styles.square} alt="" />
      <div className={styles.form}>
        <div className={styles.contactInfo}>
          <h3 className={styles.title}>Let's get in touch</h3>
          <p className={styles.text}>
            We would Love to hear from you. Send us a message and we will get
            back via email as soon as possible.
          </p>

          

          
        </div>

        <div className={styles.contactForm}>
          <span className={styles.circle + " " + styles.one}></span>
          <span className={styles.circle + " " + styles.two}></span>

          <form
            className={styles.Form}
            onSubmit={handleSubmit}
            autoComplete="off"
          >
            <h3 className={styles.title}>Contact us</h3>

            <div className={styles.inputContainer}>
              <p>Email</p>
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                name="email"
                className={styles.input}
              />
            </div>

            <div className={styles.inputContainer}>
              <p>Phone</p>
              <input type="tel" name="phone" className={styles.input} />
            </div>
            <div className={styles.inputContainer}>
              <p>Subject</p>
              <input
                onChange={(e) => setSubject(e.target.value)}
                type="text"
                name="subject"
                className={styles.input}
              />
            </div>

            <div className={styles.inputContainer}>
              <p>Message</p>
              <textarea
                onChange={(e) => setMessage(e.target.value)}
                name="message"
                className={styles.input}
              ></textarea>
            </div>
            <input type="submit" value="Send" className={styles.btn} />
          </form>
        </div>
      </div>
    </div>
      
      </>
    
  );
};

export default ViewerContactForm;
