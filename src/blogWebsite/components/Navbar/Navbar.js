import { ClassNames } from "@emotion/react";
import { Link,Outlet } from "react-router-dom";
import classes from "./Navbar.module.css";
import { UserContext } from "../../../App";
import { useContext } from "react";

export default function Navbar() {
 // const { data } = useContext(UserContext);

  return (
    <>
    <div className={classes.top}>
      <div className={classes.right}>
        <h4 className={classes.logo}> My Blogs</h4>
      </div>

      <div className={classes.left}>
       
          <Link className={classes.link} to={`/blog/template`}>
            Home
          </Link>
    
        <Link className={classes.link} to="/blog/template/blogs">
          Blogs
        </Link>
        <Link className={classes.link} to="/blog/template/write">
          Write
        </Link>
        <Link className={classes.link} to="/template/blog/contact">
          Contact Us
        </Link>
       
      </div>
    </div>
     <Outlet/>
    </>
  );
}
