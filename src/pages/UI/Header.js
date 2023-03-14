import classes from "./Header.module.css";
import logo from "../../assets/logo.png";
import Button from "./Button";
import {Link} from 'react-router-dom';

const Header = () => {
  return (
    <div className={classes.headerDiv}>
      <div className={classes.imgDiv}>
        <img src={logo} alt="logo" className={classes.logo}></img>
      </div>
      <div className={classes.headerButtons}>
        <Button className={classes.buttons}>Home</Button>
        <Button className={classes.buttons}>Dashboard</Button>
        <Button className={classes.buttons}>Packages</Button>
        <Link to='/contactsuperadmin'>
          <Button className={classes.buttons}>Contact</Button>
        </Link>
      </div>
    </div>
  );
};
export default Header;
