
import { Link, Outlet } from "react-router-dom";
import classes from "./Navbar.module.css";
import { UserContext } from "../../../App";
import { useContext } from "react";


export default function Navbar(props) {
  const { templateId } = useContext(UserContext);
  

  return (
    <>
    
      <div className={classes.top}>
        <div className={classes.right}>
          <h4 className={classes.logo}> My Blogs</h4>
        </div>

        <div className={classes.left}>
          <Link className={classes.link} to={`/${props.type}/template/${templateId}`}>
           {props.names[0]}
          </Link>

          <Link className={classes.link} to={`/${props.type}/template/${templateId}/${props.pages[1]}`}>
            {props.names[1]}
          </Link>
          <Link className={classes.link} to={`/${props.type}/template/${templateId}/${props.pages[2]}`}>
             {props.names[2]}
          </Link>
          <Link className={classes.link} to={`/${props.type}/template/${templateId}/${props.pages[3]}`}>
              {props.names[3]}
          </Link>
        </div>
      </div>
      <Outlet />
    </>
  );
}
