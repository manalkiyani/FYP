import { Link, Outlet } from "react-router-dom";
import classes from "../../../blogWebsite/components/Navbar/Navbar.module.css";
import { UserContext } from "../../../App";
import { useContext, useState, useEffect } from "react";
import { getTemplateData } from "../../../utilityFunctions/axiosFunctions";

export default function ViewerNavbar(props) {
  const { templateId } = useContext(UserContext);

  const [templateName, setTemplateName] = useState("");

  const getTemplateName = async () => {
    const response = await getTemplateData(templateId);
    console.log(response);
    setTemplateName(response.name);
  };
  useEffect(() => {
    getTemplateName();
  }, []);

  return (
    <>
      <div className={classes.top}>
        <div className={classes.right}>
          <h4 className={classes.logo}> {templateName || ''}</h4>
        </div>

        <div className={classes.left}>
          {props.pages.map((page, index) => {
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
