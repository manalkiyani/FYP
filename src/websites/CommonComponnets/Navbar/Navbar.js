import { Link, Outlet, useParams } from "react-router-dom";
import classes from "./Navbar.module.css";

import { useLocalStorageState } from "ahooks";
import SaveBtn from "../../../components/Buttons/SaveBtn";
import UpdateBtn from "../../../components/Buttons/UpdateBtn";

export default function Navbar(props) {
  const { id } = useParams();
  const [templateId] = useLocalStorageState("templateId", "");

  //get the templateId from the context and use it to fetch the template from the database

  return (
    <div style={{ position: "relative" }}>
      <div className={classes.top}>
        <div className={classes.right}>
          <h5 className={classes.logo}>{props.type} Template</h5>
        </div>

        <div className={classes.left}>
          <Link
            className={classes.link}
            to={`/${props.type}/template/${templateId}`}
          >
            {props.names[0]}
          </Link>

          <Link
            className={classes.link}
            to={`/${props.type}/template/${templateId}/${props.pages[1]}`}
          >
            {props.names[1]}
          </Link>
          <Link
            className={classes.link}
            to={`/${props.type}/template/${templateId}/${props.pages[2]}`}
          >
            {props.names[2]}
          </Link>
          <Link
            className={classes.link}
            to={`/${props.type}/template/${templateId}/${props.pages[3]}`}
          >
            {props.names[3]}
          </Link>
          {id === "001" || id === "002" || id === "003" || id === "004" ? (
            <SaveBtn />
          ) : (
            <UpdateBtn />
          )}
        </div>
      </div>
      <Outlet />
    </div>
  );
}