import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import classes from "./Navbar.module.css";
import { useEffect, useState } from "react";
import { getTemplateData } from "../../../utilityFunctions/axiosFunctions";
import { useLocalStorageState } from "ahooks";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

import { Button, Group, Image } from "@mantine/core";
import { getTemplateId } from "../../../utilityFunctions/TemplateIdController";
import {
  deleteWebsiteData,
  getWebsiteData,
} from "../../../utilityFunctions/websiteDataController";

export default function ViewerNavbar(props) {
  // let [templateId] = useLocalStorageState("templateId", "");
  const [isloggedIn, setIsLoggedIn] = useState(true);
  const [templateId, setTemplateId] = useState(null);

  const [templateName, setTemplateName] = useState("");
  const navigate = useNavigate();

  const getTemplateName = async () => {
    console.log("templateId", templateId);
    const response = await getTemplateData(templateId);

    console.log(response);
    setTemplateName(response?.name);
  };
  useEffect(() => {
    if (templateId) {
      getTemplateName();
    }
  }, [templateId]);
  function handleGoBack() {
    navigate(-1);
  }

  async function handleLogout() {
    try {
      const response = await deleteWebsiteData(templateId);
      setIsLoggedIn(false);
      const currentPath = window.location.pathname;
      window.location.reload();
      // const parentPath = currentPath.split("/").slice(0, -1).join("/");
      // navigate(parentPath)
    } catch (error) {
      console.log(error);
    }

    //logout the user

    // localStorage.removeItem("viewerTemplateId");
    // window.location.reload();
  }
  // const viewerTemplateId = JSON.parse(localStorage.getItem("viewerTemplateId"));
  // const { id } = useParams();
  // useEffect(() => {

  //   if (id !== viewerTemplateId) {
  //     console.log("not equal");
  //     setIsLoggedIn(false);
  //   }
  // });

  const fetchTemplateId = async () => {
    const response = await getTemplateId();
    setTemplateId(response.templateId);
  };

  useEffect(() => {
    fetchTemplateId();
  });

  const checkLoggedIn = async () => {
    if (templateId) {
      const response = await getWebsiteData(templateId);
      console.log(response);
      if (response.status !== "200") {
        setIsLoggedIn(false);
      } else {
        setIsLoggedIn(true);
      }
    }
  };

  useEffect(() => {
    if (templateId) {
      checkLoggedIn();
    }
  });

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
            <Image
              width="70"
              src="https://www.turintech.ai/wp-content/uploads/2022/07/Fast-2048x1638.png"
            />
          </Group>
        </div>

        <div className={classes.left}>
          {isloggedIn ? (
            <div>
              <Button variant="default" onClick={() => handleLogout()}>
                Logout
              </Button>
            </div>
          ) : null}
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
