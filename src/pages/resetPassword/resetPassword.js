import { useState ,useContext} from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import join from "../../assets/join.png";
import { resetPassword } from "../../authentication/authFunctions";


import FormInput from "../SignUp/formInput";
import classes from "../SignUp/SignUp.module.css";
import { UserContext } from "../../App";



const ResetPassword = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
   
    password: "",
    confirmPassword: "",
  });
  const { user } = useContext(UserContext);

  const inputs = [
   
    {
      id: 1,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage:
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      label: "Enter new password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
    {
      id: 2,
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
    const username = user.username;
    let resetPromise = resetPassword({ username, password: values.password })

      toast.promise(resetPromise, {
        loading: 'Updating...',
        success: <b>Reset Successfully...!</b>,
        error : <b>Could not Reset!</b>
      });

      resetPromise.then(function(){ navigate('/') })

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
            <h1 style={{ marginBottom: "40px" }} className={classes.h1}>Reset Password</h1>
          
            {inputs.map((input) => (
              <FormInput
                key={input.id}
                {...input}
                value={values[input.name]}
                onChange={onChange}
              />
            ))}
            <button className={classes.button}>Reset</button>
          </div>
          <div>
            
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

export default ResetPassword  ;
