import React, { useState } from "react";
import styles from "./ContactUs.module.css";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

import shapeIcon from "../../assets/contactus/shape.png";
import { useLocalStorageState } from "ahooks";

const ViewerContactForm = () => {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [templateId, setTemplateId] = useLocalStorageState("templateId");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8800/api/admin/addinmessagesenttoadmin",
        {
          email,
          subject,
          message,
          templateId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );

      console.log(response);
    } catch (error) {
      console.log(error);
    }
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
