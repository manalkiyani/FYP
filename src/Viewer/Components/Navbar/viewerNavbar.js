import { Link, Outlet, useNavigate } from "react-router-dom";
import classes from "./Navbar.module.css";
import { useEffect, useState } from "react";
import { getTemplateData } from "../../../utilityFunctions/axiosFunctions";
import { useLocalStorageState } from "ahooks";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

import { Group } from "@mantine/core";

export default function ViewerNavbar(props) {
  const [templateId] = useLocalStorageState("templateId", "");

  const [templateName, setTemplateName] = useState("");
  const navigate = useNavigate();

  const getTemplateName = async () => {
    const response = await getTemplateData(templateId);
    console.log(response);
    setTemplateName(response.name);
  };
  useEffect(() => {
    getTemplateName();
  }, []);
  function handleGoBack() {
    navigate(-1);
  }

  return (
    <>
      <div className={classes.top}>
        <div className={classes.right}>
          <Group
            style={{
              cursor: "pointer",
            }}
          >
            <ArrowBackIosIcon onClick={handleGoBack} />
            <h4 className={classes.logo}> {templateName || ""}</h4>
          </Group>
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
