import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { generateOTP, verifyOTP } from "../../utilityFunctions/authFunctions";

import password from "../../assets/password.png";
import FormInput from "../SignUp/formInput";
import classes from "../SignUp/SignUp.module.css";
import classes2 from "./otp.module.css";
import { UserContext } from "../../App";

const Otp = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const [values, setValues] = useState({
    otp: "",
  });

  useEffect(() => {
    console.log("user", user);
    const { username } = user;
    generateOTP(username).then((OTP) => {
      console.log(OTP);
      if (OTP) return toast.success("OTP has been send to your email!");
      return toast.error("Problem while generating OTP!");
    });
  }, []);
  const inputs = [
    {
      id: 1,
      name: "otp",
      type: "password",
      placeholder: "******",
      label: "Enter 6 digit OTP sent to your email",

      required: true,
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    //send axios post request to server
    try {
      let { status } = await verifyOTP({
        username: user.username,
        code: values.otp,
      });
      if (status === 201) {
        toast.success("Verify Successfully!");
        return navigate("/reset");
      }
    } catch (error) {
      return toast.error("Wrong OTP! Check email again!");
    }
  };
  // handler of resend OTP
  function resendOTP() {
    let sentPromise = generateOTP();

    toast.promise(sentPromise, {
      loading: "Sending...",
      success: <b>OTP has been send to your email!</b>,
      error: <b>Could not Send OTP!</b>,
    });

    sentPromise.then((OTP) => {
      console.log(OTP);
    });
  }

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
              OTP verification
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
            <h6>
              Didn't receive the code?
              <button onClick={resendOTP} className={classes2.recovery}>
                Resend Now
              </button>
            </h6>
          </div>
          <div>
            <img
              src={password}
              alt="recover"
              style={{ width: "500px", height: "500px" }}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default Otp;
