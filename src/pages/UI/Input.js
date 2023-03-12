import React from "react";

import classes from "./Input.module.css";

const Input = (props) => {
  return (
    <div>
      <input
        placeholder={props.placeholder}
        className={`${classes.input} ${props.className}`}
        onChange={props.onChange}
      />
    </div>
  );
};

export default Input;
