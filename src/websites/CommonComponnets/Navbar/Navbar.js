import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import classes from "./Navbar.module.css";

import { useLocalStorageState } from "ahooks";
import SaveBtn from "../../../components/Buttons/SaveBtn";
import UpdateBtn from "../../../components/Buttons/UpdateBtn";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Group } from "@mantine/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

// Create a custom theme with Google Sans font
const theme = createMuiTheme({
  typography: {
    fontFamily: ["Google Sans", "sans-serif"].join(","),
  },
});

export default function Navbar(props) {
  const { id } = useParams();
  const [templateId] = useLocalStorageState("templateId", "");
  const navigate = useNavigate();

  function handleGoBack() {
    navigate("/dashboard");
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
            <ThemeProvider theme={theme}>
              <h4 className={classes.logo}>Untitled Site</h4>
            </ThemeProvider>
          </Group>
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
