import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import username from "../../assets/username.png";
import FormInput from "../SignUp/formInput";
import classes from "../SignUp/SignUp.module.css";

import { UserContext } from "../../App";

const Username = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const [values, setValues] = useState({
    username: "",
  });

  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "",
      label: "Please Enter Your Username to Find Your Account",

      required: true,
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    //send axios post request to server
    console.log(values);
 await setUser({
      username: values.username,
    });

    navigate("/recovery");
  };
  // handler of resend OTP

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className={classes.app}>
        <form className={classes.form} onSubmit={handleSubmit}>
          <div>
            <h1 style={{ marginBottom: "40px" }} className={classes.h1}>
              Password Recovery
            </h1>

            {inputs.map((input) => (
              <FormInput
                key={input.id}
                {...input}
                value={values[input.name]}
                onChange={onChange}
              />
            ))}
            <button className={classes.button}>Submit</button>
          </div>
          <div>
            <img
              src={username}
              alt="recover"
              style={{ width: "500px", height: "500px" }}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default Username;
