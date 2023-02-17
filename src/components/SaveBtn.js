import * as React from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import { Button } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";

const SaveBtn = () => {
  return (
    <Button
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
