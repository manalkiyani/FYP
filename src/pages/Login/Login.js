import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import {
  verifyPassword,
  getUsername,
} from "../../authentication/authFunctions";
import classes from "../SignUp/SignUp.module.css";
import FormInput from "../SignUp/formInput";
import { useState, useEffect ,useContext} from "react";

import { UserContext } from "../../App";
import join from "../../assets/login.png";

function LoginScreen() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username",
      errorMessage:
        "Username should be 3-16 characters and shouldn't include any special character!",
      label: "Username",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },

    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage:
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      label: "Password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
  ];
 
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    //send axios post request to server

    let loginPromise = verifyPassword({
      username: values.username,
      password: values.password,
    });
    toast.promise(loginPromise, {
      loading: "Checking...",
      success: <b>Login Successfully...!</b>,
      error: <b>Password Not Match!</b>,
    });

    loginPromise.then((res) => {
      let { token } = res.data;
      localStorage.setItem("token", token);
      setUser({
        username:res.data.username,
        id: res.data._id});
      navigate("/dashboard");
    });
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className={classes.app}>
        <form className={classes.form} onSubmit={handleSubmit}>
          <div className={classes.center}>
            <h1 className={classes.h1}>Signin Now!</h1>
            {inputs.map((input) => (
              <FormInput
                key={input.id}
                {...input}
                value={values[input.name]}
                onChange={onChange}
              />
            ))}
            <button className={classes.button}>Log In</button>
            <Link to="/username" style={{ textDecoration: "none" }}>
              <h6>Forgotten Password?</h6>
            </Link>
          </div>
          <div>
            <img
              src={join}
              alt="join"
              style={{ width: "500px", height: "400px", marginLeft: "30px" }}
            />
          </div>
        </form>
      </div>
    </>
  );
}

export default LoginScreen;
