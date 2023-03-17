import * as React from "react";

import { Button } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import SaveIcon from "@mui/icons-material/Save";
import { SavedTemplate } from "../../utilityFunctions/helperFunctions";
import { useContext } from "react";
import { UserContext } from "../../App";
import { blogTemplate } from "../../TemplatesData/blogTemplate";
const SaveBtn = () => {
  const { template, setTemplate } = useContext(UserContext);

  const saveTemplate = async () => {

    SavedTemplate(template, setTemplate)
  .then((result) => {
    console.log('blogTemplate',blogTemplate)
    toast.success(<b>Template Saved Successfully</b>);
  })
  .catch((error) => {
    toast.error(<b>Oops! Please Upgrade Your Plan to create new Websites</b>);
  });

  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <Button
        onClick={saveTemplate}
        style={{ position: "sticky", top: 0, zIndex: 1000 }}
        size="small"
        color="primary"
        startIcon={<SaveIcon />}
        variant="contained"
      >
        <span>Save Changes</span>
      </Button>
    </>
  );
};

export default SaveBtn;
