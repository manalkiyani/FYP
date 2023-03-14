
import { Link, Outlet } from "react-router-dom";
import classes from "../../../blogWebsite/components/Navbar/Navbar.module.css";
import { UserContext } from "../../../App";
import { useContext } from "react";


export default function ViewerNavbar() {
  const { templateId } = useContext(UserContext);

  return (
    <>
      <div className={classes.top}>
        <div className={classes.right}>
          <h4 className={classes.logo}> My Blogs</h4>
        </div>

        <div className={classes.left}>
          <Link className={classes.link} to={`/view/blog/template/${templateId}`}>
            Home
          </Link>

          <Link className={classes.link} to={`/view/blog/template/${templateId}/blogs`}>
            Blogs
          </Link>
          <Link className={classes.link} to={`/view/blog/template/${templateId}/contactUs`}>
            Contact Us
          </Link>
         
        </div>
      </div>
      <Outlet />
    </>
  );
}
