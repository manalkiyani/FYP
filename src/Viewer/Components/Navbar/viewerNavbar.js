
import { Link, Outlet } from "react-router-dom";
import classes from "../../../blogWebsite/components/Navbar/Navbar.module.css";
import { UserContext } from "../../../App";
import { useContext } from "react";


export default function ViewerNavbar(props) {
  const { templateId } = useContext(UserContext);

  return (
    <>
      <div className={classes.top}>
        <div className={classes.right}>
          <h4 className={classes.logo}> My Blogs</h4>
        </div>

        <div className={classes.left}>
            {props.pages.map((page,index) => {
            return (
              <Link
                key={page}
                className={classes.link}
                to={`/view/${props.type}/template/${templateId}/${page}`}
              >
               {props.names[index]}
              </Link>
            );
            })}
       
         
        </div>
      </div>
      <Outlet />
    </>
  );
}
