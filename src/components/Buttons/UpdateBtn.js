import * as React from "react";
import { Button } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import UpdateIcon from '@mui/icons-material/Update';
import { UpdateTemplate } from "../../utilityFunctions/helperFunctions";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../App";
const UpdateBtn = () => {
  const { id } = useParams();
  const { template } = useContext(UserContext);
   const updateTemplate = async () => {

  UpdateTemplate(template, id)
  .then(() => {
    toast.success('Template Updated Successfully');
  })
  .catch(() => {
    toast.error('Oops! Something went wrong');
  });

  };

  return (
    <>
    <Toaster position="top-center" reverseOrder={false}></Toaster>
    <Button
      onClick={updateTemplate}
      style={{ position: "sticky", top: 0, zIndex: 1000 }}
      size="small"
      color="primary"
      startIcon={<UpdateIcon />}
      variant="contained"
    >
      <span>Update Template</span>
    </Button>
    </>
  );
};

export default UpdateBtn;
