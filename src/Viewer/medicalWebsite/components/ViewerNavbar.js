import React from 'react';
import styles from './ViewerNavbar.module.css';
import { Link } from 'react-router-dom';


const ViewerNavbar = () => {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navbarList}>
        <li className={styles.navbarItem}>
        <Link to='/contactUs'>
          <a  className={styles.navbarLink}>Contact Us</a>
          </Link>
        </li>
        <li className={styles.navbarItem}>
        <Link to='/viewerviewappointments'>
          <a  className={styles.navbarLink}>Appointments</a>
          </Link>
        </li>
        <li className={styles.navbarItem}>
          <Link to='/viewerdoctorspage'>
          <a  className={styles.navbarLink}>Doctors</a>
          </Link>
        </li>
        <li className={styles.navbarItem}>
        <Link to='/medicaladminhomepage'>
          <a  className={styles.navbarLink}>Home</a>
          </Link>
        </li>
        <li className={styles.navbarItem}>
          <Link to='/patientloginpage'>
          <a  className={styles.navbarLink}>Log In</a>
          </Link>
        </li>

      </ul>
    </nav>
  );
}

export default ViewerNavbar;
