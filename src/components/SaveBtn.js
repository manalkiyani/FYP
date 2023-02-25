import * as React from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import { Button } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { SavedTemplate } from "../utilityFunctions/helperFunctions";
import { useContext } from "react";
import { UserContext } from "../App"
const SaveBtn = () => {
   const { template, setTemplate } = useContext(UserContext);
  return (
    <Button
      onClick={()=>SavedTemplate(template,setTemplate)}
      style={{ position: "sticky", top: 0,zIndex: 1000 }}
      size="small"
      color="primary"
      startIcon={<SaveIcon />}
      variant="contained"
    >
      <span>Save Changes</span>
    </Button>
  );
};

export default SaveBtn;
