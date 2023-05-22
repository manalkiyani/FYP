import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import classes from "./Navbar.module.css";

import { useLocalStorageState } from "ahooks";
import SaveBtn from "../../../components/Buttons/SaveBtn";
import UpdateBtn from "../../../components/Buttons/UpdateBtn";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { ActionIcon, Button, Group, Menu } from "@mantine/core";
import IconDots from "@mui/icons-material/MoreHorizOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

// Create a custom theme with Google Sans font

export default function Navbar(props) {
  const { id } = useParams();
  const [templateId] = useLocalStorageState("templateId", "");
  const navigate = useNavigate();

  function handleGoBack() {
    navigate(-1);
  }

  //get the templateId from the context and use it to fetch the template from the database

  return (
    <div style={{ position: "relative" }}>
      <div className={classes.top}>
        <div className={classes.right}>
          <Group
            style={{
              cursor: "pointer",
            }}
          >
            <ArrowBackIosIcon onClick={handleGoBack} />

            <h4 className={classes.logo}>Untitled Site</h4>
          </Group>
        </div>

        <div className={classes.left}>
          <Link className={classes.link} to={`/dashboard`}>
            Dashboard
          </Link>

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

          <Menu withinPortal position="bottom-end" shadow="sm">
            <Menu.Target>
              <ActionIcon>
                <IconDots size="1rem" />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item
                color="gray"
                onClick={() => navigate("manage")}
                icon={<SettingsOutlinedIcon size="1rem" />}
              >
                Manage Website
              </Menu.Item>
              <Menu.Item
                color="gray"
                onClick={() => navigate("style")}
                icon={<SettingsOutlinedIcon size="1rem" />}
              >
                Style Navbar
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
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
