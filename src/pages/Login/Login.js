import classes from "./Login.module.css";
import axios from "axios";
import Button from "../UI/Button";

import { useState } from "react";
import Header from "../UI/Header";
import { Link } from "react-router-dom";
import { TextField } from "@mui/material";

function LoginScreen() {
  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    //send axios post request to server
    try {
      const response = await axios.post("http://localhost:8800/api/", {
        username,
        password,
      });
      console.log(response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
    } catch (error) {
      console.error(error);
    }
  };

  const handleUsername = (event) => {
    event.preventDefault();
    setUsername(event.target.value);
    console.log(username);
  };

  const handlePassword = (event) => {
    event.preventDefault();
    setPassword(event.target.value);
    console.log(password);
  };

  return (
    <>
      <div className={classes.App}>
        <div className={classes.leftbox}>
          <h1 className={classes.header}> Login To Your Account</h1>
          <div className={classes.center}>
            <div className={classes.borderBottom}></div>
            <p className={classes.borderTop}>OR</p>
            <div className={classes.borderBottom}> </div>
          </div>

          <div className={classes.form}>
            <TextField
              id="standard-basic"
              onChange={handleUsername}
              label="Username"
              variant="standard"
            />
            <TextField
              id="standard-basic"
              onChange={handlePassword}
              label="Password"
              variant="standard"
            />

            <Button onClick={handleSubmit} className={classes.SigninButton}>
              {" "}
              Sign In
            </Button>
          </div>
        </div>

        <div className={classes["App-rightbox"]}>
          <p className={classes.header} style={{ marginBottom: "10px" }}>
            New Here?
          </p>
          <p className={classes.text}>Sign up and start</p>
          <p className={classes.text}>creating your websites!</p>
          <Link to="/signup">
            <Button className={classes.SigninButton}> Sign Up</Button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default LoginScreen;
