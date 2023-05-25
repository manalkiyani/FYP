import React, { useState } from "react";
import styles from "./NavBar.module.css";
import { Link, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
} from "@mui/icons-material";
import { getUsername, logout } from "../../utilityFunctions/authFunctions";
import { Button } from "@mantine/core";
const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const [isloggedIn, setIsloggedIn] = useState(false);

  const handleToggleMenu = () => {
    setIsOpen(!isOpen);
  };
  React.useEffect(() => {
    getUserData();
  });

  const getUserData = async () => {
    try {
      await getUsername();
      setIsloggedIn(true);
    } catch (error) {
      setIsloggedIn(false);
    }
  };

  const userLogout = async () => {
    await logout();
    setIsloggedIn(false);
    navigate("/login");
  };
  return (
    <>
      <button className={styles.navbarToggle} onClick={handleToggleMenu}>
        {isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </button>
      <nav
        className={isOpen ? styles.navbar : `${styles.navbar} ${styles.close}`}
      >
        <div className={styles.navbarLogo}>
          <Link to="/" className={styles.ucraft}>
            uCraft
          </Link>
        </div>

        <ul className={styles.navbarList}>
          <li className={styles.navbarItem}>
            <Link to="/" className={styles.navbarLink}>
              Home
            </Link>
          </li>
          <li className={styles.navbarItem}>
            <Link to="/dashboard" className={styles.navbarLink}>
              Dashboard
            </Link>
          </li>
          <li className={styles.navbarItem}>
            <Link to="/pricing" className={styles.navbarLink}>
              Pricing
            </Link>
          </li>
          <li className={styles.navbarItem}>
            <Link to="/contact" className={styles.navbarLink}>
              Contact Us
            </Link>
          </li>
        </ul>

        {isloggedIn ? (
          <div className={styles.navbarButtons}>
            <Button
              variant="outline"
              onClick={() => userLogout()}
              className={styles.signupButton}
            >
              Logout
            </Button>
          </div>
        ) : (
          <div className={styles.navbarButtons}>
            <Button
              onClick={() => navigate("/login")}
              className={styles.loginButton}
            >
              Login
            </Button>
            <Button
              onClick={() => navigate("/signup")}
              className={styles.signupButton}
            >
              Signup
            </Button>
          </div>
        )}
      </nav>
      <Outlet />
    </>
  );
};

export default Navbar;
