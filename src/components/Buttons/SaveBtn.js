import * as React from "react";

import { Button } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import SaveIcon from "@mui/icons-material/Save";
import { SavedTemplate } from "../../utilityFunctions/helperFunctions";

import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { useLocalStorageState } from "ahooks";

const SaveBtn = () => {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const saveTemplate = async (name) => {
    let template = localStorage.getItem("template");

    template = await JSON.parse(template);
    console.log("template here: ", template);
    Object.getOwnPropertyNames(template?.pages).forEach((page) =>
      template.pages.map((page) =>
      page?.blocks?.map((block) => {
        const str = block?.type;
        const capitalized = str.charAt(0).toUpperCase() + str.slice(1);

        return (block.Component = capitalized);
      })
    ))

    setOpen(false);
    console.log(template);
    let response;
    try {
      switch (template.type) {
        case "blog":
          {
            response = await SavedTemplate(
              template,
              "BlogHomePage",
              "BlogsPage",
              "blogs",
              name
            );
          }
          break;
        case "eccomerce":
          {
            response = await SavedTemplate(
              template,
              "EccomerceHomePage",
              "ProductsPage",
              "products",
              name
            );
          }
          break;
        case "business":
          {
            response = await SavedTemplate(
              template,
              "BusinessHomePage",
              "JobsPage",
              "jobs",
              name
            );
          }
          break;
        case "medical":
          {
            response = await SavedTemplate(
              template,
              "MedicalHomePage",
              "DoctorsPage",
              "doctors",
              name
            );
          }
          break;
      }
      console.log(response);
      if (response?.status === "201") {
        toast.success("Template Saved Successfully");
      } else {
        toast.error("Oops! Please Upgrade Your Plan to create new Websites");
      }
    } catch (error) {
      console.log(error);
      toast.error("Oops! An error occured. Please try again later");
    }
  };

  return (
    <>
      <FormDialog open={open} onSave={saveTemplate} onClose={handleClose} />
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <Button
        onClick={handleClickOpen}
        style={{ position: "absolute", right: 10, top: 15, zIndex: 100000 }}
        size="medium"
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

function FormDialog({ open, onSave, onClose }) {
  const [name, setName] = React.useState("");

  return (
    <div>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Name Your Website</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Pick a beautiful name for your website and click save to save your
            changes
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
          <Button onClick={() => onSave(name)}>Save Now</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
