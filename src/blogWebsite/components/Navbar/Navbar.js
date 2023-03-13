import { ClassNames } from "@emotion/react";
import { Link, Outlet } from "react-router-dom";
import classes from "./Navbar.module.css";
import { UserContext } from "../../../App";
import { useContext } from "react";
import { useParams } from "react-router-dom";

export default function Navbar() {
  const { templateId } = useContext(UserContext);

  // const { data } = useContext(UserContext);

  return (
    <>
      <div className={classes.top}>
        <div className={classes.right}>
          <h4 className={classes.logo}> My Blogs</h4>
        </div>

        <div className={classes.left}>
          <Link className={classes.link} to={`/blog/template/${templateId}`}>
            Home
          </Link>

          <Link className={classes.link} to={`/blog/template/${templateId}/blogs`}>
            Blogs
          </Link>
          <Link className={classes.link} to={`/blog/template/${templateId}/write`}>
            Write
          </Link>
          <Link className={classes.link} to={`/blog/template/${templateId}/contact`}>
            Contact Us
          </Link>
        </div>
      </div>
      <Outlet />
    </>
  );
}
