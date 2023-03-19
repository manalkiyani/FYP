import React, { useState } from 'react';
import styles from "./NavBar.module.css"
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ExpandMore as ExpandMoreIcon, ExpandLess as ExpandLessIcon } from '@mui/icons-material';   
import { getUsername, logout} from '../../utilityFunctions/authFunctions';
const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const [isloggedIn, setIsloggedIn] = useState(false);

  const handleToggleMenu = () => {
    setIsOpen(!isOpen);
  };
   React.useEffect(() => {
    getUserData()
      
  });

  const getUserData = async () => {
    try {
    await getUsername();
    setIsloggedIn(true);
   
  } catch (error) {
    setIsloggedIn(false);
  
  }
   
  };

  const userLogout= async()=>{
    await logout();
    setIsloggedIn(false);
    navigate('/login');
  }
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

   {isloggedIn ?
   <div className={styles.navbarButtons}>
        <button onClick={()=>userLogout()} className={styles.signupButton}>Logout</button>
      
      </div>
      :
   
   <div className={styles.navbarButtons}>
        <button onClick={()=>navigate('/login')} className={styles.loginButton}>Login</button>
        <button onClick={()=>navigate('/signup')} className={styles.signupButton}>Signup</button>
      </div>

      
      }


    </nav>
  )
}

export default Navbar
