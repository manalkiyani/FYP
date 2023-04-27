import React from 'react';
import styles from './AdminNavbar.module.css';
import { Link } from 'react-router-dom';

const AdminNavbar = () => {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navbarList}>
        <li className={styles.navbarItem}>
        <Link to='/adminmedicalmessages'>
          <a  className={styles.navbarLink}>Messages</a>
          </Link>
        </li>
        <li className={styles.navbarItem}>
        <Link to='/adminviewappointments'>
          <a  className={styles.navbarLink}>Appointments</a>
          </Link>
        </li>
        <li className={styles.navbarItem}>
          <Link to='/doctorspage'>
          <a  className={styles.navbarLink}>Doctors</a>
          </Link>
        </li>
        <li className={styles.navbarItem}>
        <Link to='/medicaladminhomepage'>
          <a  className={styles.navbarLink}>Home</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default AdminNavbar;
