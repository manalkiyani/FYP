import classes from "./HeaderAdmin.module.css";
import logo from "../../assets/logo.png";
import Button from "./Button";
import {Link} from 'react-router-dom';

const HeaderAdmin = () => {
  return (
    <div className={classes.headerDiv}>
      <div className={classes.imgDiv}>
        <img src={logo} alt="logo" className={classes.logo}></img>
      </div>

      <div className={classes.headerButtons}>
        <Button className={classes.buttons}>Users</Button>
        <Button className={classes.buttons}>Websites</Button>
        <Button className={classes.buttons}>Payments</Button>
        <Button className={classes.buttons}>Messages</Button>
      </div>
    </div>
  );
};
export default HeaderAdmin;
