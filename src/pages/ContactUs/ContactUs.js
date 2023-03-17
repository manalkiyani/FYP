import React, { useState } from "react";
import styles from "./ContactUs.module.css";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";

import shapeIcon from "../../assets/contactus/shape.png";
import locationIcon from "../../assets/contactus/location.png";
import emailIcon from "../../assets/contactus/email.png";
import phoneIcon from "../../assets/contactus/phone.png";

const ContactForm = () => {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const handleSubmit = (e) => {
    console.log(email, subject, message);
    e.preventDefault();

    axios
      .post("http://localhost:8800/api/admin/addinmessagesenttosuperadmin", {
        email,
        subject,
        message,
      })
      .then((response) => {
    
        axios
          .post("http://localhost:8800/api/admin/addmessageidinsuperadmin", {
            messageID: response.data.message._id,
            adminID: "6403a03f270a91ab0e2925ad",
          })
          .then((response) => {
           toast.success('We have received your message. Thank you!')
          });
      })
      .catch((error) =>
       
      { toast.error('Something went wrong. Please try again later.')
        
        console.log(error)});
  };

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

          <div className={styles.info}>
            <div className={styles.information}>
              <img src={locationIcon} className={styles.icon} alt="" />
              <p>Comsats Institue of Information Technology</p>
            </div>
            <div className={styles.information}>
              <img src={emailIcon} className={styles.icon} alt="" />
              <p>manalkiyani687@gmail.com</p>
            </div>
            <div className={styles.information}>
              <img src={phoneIcon} className={styles.icon} alt="" />
              <p>123-456-789</p>
            </div>
          </div>

          <div className={styles.socialMedia}>
            <p>Connect with us :</p>
            <div className={styles.socialIcons}>
              <a href="#">
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
              <a href="#">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a href="#">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a href="#">
                <FontAwesomeIcon icon={faLinkedinIn} />
              </a>
            </div>
          </div>
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

export default ContactForm;
