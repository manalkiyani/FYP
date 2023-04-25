import classes from "./Navigation.module.css";
import Button from "../../../../UI/Button";
import ContentEditable from 'react-contenteditable'
import { useState } from "react";

import {Link} from 'react-router-dom';
const Navigation = () => {
  const [NavButton_1, setNavButton_1] = useState("Home");
  const [NavButton_2, setNavButton_2] = useState("Dashboard");
  const [NavButton_3, setNavButton_3] = useState("Packages");
  const [NavButton_4, setNavButton_4] = useState("Contact");
    

  const HandleNavButton_1 = (event) => {
    setNavButton_1(event.target.value);
    console.log('this is navbutton1 ',{NavButton_1})

  };
  const HandleNavButton_2 = (event) => {
    setNavButton_2(event.target.value);

  };
  const HandleNavButton_3 = (event) => {
    setNavButton_3(event.target.value);

  };
  const HandleNavButton_4 = (event) => {
    setNavButton_4(event.target.value);
  };
  
  return (
    <div className={classes.headerDiv}>
      <div className={classes.headerButtons}>
        <ContentEditable html={NavButton_1} className={classes.buttons1} onChange={HandleNavButton_1}/>
        <ContentEditable html={ NavButton_2} className={classes.buttons1} onChange={HandleNavButton_2}/>
        <ContentEditable html={ NavButton_3} className={classes.buttons1} onChange={HandleNavButton_3}/>
        <ContentEditable html={ NavButton_4} className={classes.buttons1} onChange={HandleNavButton_4}/>
      </div>
    </div>
  );
};
export default Navigation;
