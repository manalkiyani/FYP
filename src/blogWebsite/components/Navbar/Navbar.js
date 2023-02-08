import { ClassNames } from "@emotion/react";
import {Link} from "react-router-dom";
import classes from "./Navbar.module.css";

export default function Navbar() {
    
    return (
    <div className={classes.top}>
        <div className={classes.right} >
          
            <h4 className={classes.logo}> My Blogs</h4>
        </div>
   
        <div className={classes.left}>
           
             
                    <Link className={classes.link} to="/template/blog/">
                        Home
                    </Link>
               
                
                    <Link className={classes.link} to="/template/blog/blogs">
                        Blogs
                          </Link>
              
                    <Link className={classes.link} to="/template/blog/write">
                        Write
                    </Link>
              
                  <Link className={classes.link} to="/template/blog/">
                        Contact Us
                    </Link>
                 
          
        </div>
        
    </div>
    
    
    );
}