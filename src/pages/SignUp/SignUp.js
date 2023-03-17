import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import join from "../../assets/join.png";
import FormInput from "./formInput";
import classes from "./SignUp.module.css";
import { registerUser } from "../../utilityFunctions/authFunctions";
const Signup = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    email: "",
    birthday: "",
    password: "",
    confirmPassword: "",
  });

  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username",
      errorMessage:
        "Username should be 3-16 characters and no special character!",
      label: "Username",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "Please provide a valid email address!",
      label: "Email",
      required: true,
    },
    {
      id: 3,
      name: "birthday",
      type: "date",
      placeholder: "Birthday",
      label: "Birthday",
    },
    {
      id: 4,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage:
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      label: "Password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
    {
      id: 5,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      errorMessage: "Passwords don't match!",
      label: "Confirm Password",
      pattern: values.password,
      required: true,
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    //send axios post request to server

    let registerPromise = registerUser({
      username: values.username,
      password: values.password,
      email: values.email,
    });

    toast.promise(registerPromise, {
      loading: "Creating...",
      success: <b>Register Successfully...!</b>,
      error: <b>Could not Register.</b>,
    });

    registerPromise.then(function () {
      navigate("/login");
    });
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className={classes.app}>
        <form className={classes.form} onSubmit={handleSubmit}>
          <div>
            {inputs.map((input) => (
              <FormInput
                key={input.id}
                {...input}
                value={values[input.name]}
                onChange={onChange}
              />
            ))}
            <button className={classes.button}>Register</button>
          </div>
          <div>
            <h1 className={classes.h1}>Create a New Account!</h1>
            <img
              src={join}
              alt="join"
              style={{ width: "500px", height: "500px" }}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default Signup;
