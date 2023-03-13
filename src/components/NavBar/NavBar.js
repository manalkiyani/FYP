import React, { useState } from 'react';
import styles from './Navbar.module.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ExpandMore as ExpandMoreIcon, ExpandLess as ExpandLessIcon } from '@mui/icons-material';   

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);

  const handleToggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (  
    
    <nav className={isOpen ? styles.navbar:`${styles.navbar} ${styles.close}`}>
       <div className={styles.navbarLogo}>
        <Link to="/"
          className={styles.ucraft}>
            uCraft
        </Link>
      </div>
      
      <button className={styles.navbarToggle} onClick={handleToggleMenu}>
          {isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      
      </button>
      <ul className={styles.navbarList}>
        <li className={styles.navbarItem}><Link to="/" className={styles.navbarLink}>Home</Link></li>
        <li className={styles.navbarItem}><Link to="/dashboard" className={styles.navbarLink}>Dashboard</Link></li>
        <li className={styles.navbarItem}><Link to="/pricing" className={styles.navbarLink}>Pricing</Link></li>
         <li className={styles.navbarItem}><Link to="/contact" className={styles.navbarLink}>Contact Us</Link></li>
      </ul>
      <div className={styles.navbarButtons}>
        <button onClick={()=>navigate('/login')} className={styles.loginButton}>Login</button>
        <button onClick={()=>navigate('/signup')} className={styles.signupButton}>Signup</button>
      </div>
    </nav>
  )
}

export default Navbar
