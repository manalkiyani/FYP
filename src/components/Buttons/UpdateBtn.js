import * as React from "react";
import { Button } from "@mui/material";
import UpdateIcon from '@mui/icons-material/Update';
import { UpdateTemplate } from "../../utilityFunctions/helperFunctions";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../App";
const UpdateBtn = () => {
  const { id } = useParams();
  const { template, setTemplate } = useContext(UserContext);

  return (
    <Button
      onClick={() => UpdateTemplate(template, id)}
      style={{ position: "sticky", top: 0, zIndex: 1000 }}
      size="small"
      color="primary"
      startIcon={<UpdateIcon />}
      variant="contained"
    >
      <span>Update Template</span>
    </Button>
  );
};

export default UpdateBtn;
