import * as React from "react";

import toast, { Toaster } from "react-hot-toast";
import UpdateIcon from "@mui/icons-material/Update";
import { UpdateTemplate } from "../../utilityFunctions/helperFunctions";

import { useLocalStorageState } from "ahooks";
import { getUserData } from "../../utilityFunctions/authFunctions";

import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "@mantine/core";
const UpdateBtn = () => {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // const { id } = useParams();
  const [id] = useLocalStorageState("templateId", "");
  // const [template] = useLocalStorageState("template", "");

  const updateTemplate = async (name) => {
    setOpen(false);
    const Admin = await getUserData();
    console.log(Admin);

    let template = JSON.parse(localStorage.getItem("template"));
    console.log("template", template);

    let response;
    try {
      switch (template.type) {
        case "blog":
          {
            response = await UpdateTemplate(
              name,
              template,
              "BlogHomePage",
              "BlogsPage",
              "blogs",
              id,
              Admin._id
            );
          }
          break;
        case "eccomerce":
          {
            response = await UpdateTemplate(
              name,
              template,
              "EccomerceHomePage",
              "ProductsPage",
              "products",
              id,
              Admin._id
            );
          }
          break;
        case "business":
          {
            response = await UpdateTemplate(
              name,
              template,
              "BusinessHomePage",
              "JobsPage",
              "jobs",
              id,
              Admin._id
            );
          }
          break;
        case "medical":
          {
            response = await UpdateTemplate(
              name,
              template,
              "MedicalHomePage",
              "DoctorsPage",
              "doctors",
              id,
              Admin._id
            );
          }
          break;
      }
      console.log(response);

      toast.success("Template updated Successfully");
    } catch (error) {
      console.log(error);
      toast.error("Oops! An error occured. Please try again later");
    }
  };

  return (
    <>
      <FormDialog open={open} onSave={updateTemplate} onClose={handleClose} />
      <Toaster position="top-center" reverseOrder={false}></Toaster>

      <Button
        variant="subtle"
        color="gray"
        onClick={handleClickOpen}
        leftIcon={<UpdateIcon size="1rem" />}
      >
        Save Changes
      </Button>
    </>
  );
};

export default UpdateBtn;

export function FormDialog({ open, onSave, onClose }) {
  const [name, setName] = React.useState("");
  
  return (
    <div>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Name Your Website</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Your website name will appear in the website header
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="subtle" onClick={() => onSave(name)}>
            Save Now
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
