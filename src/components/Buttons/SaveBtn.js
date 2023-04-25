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
import { deepClone } from "@mui/x-data-grid/utils/utils";

const SaveBtn = () => {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const saveTemplate = async (name) => {
    // let template = localStorage.getItem("template");

    let template = JSON.parse(localStorage.getItem("template"));
    console.log("template here: ", template);

    setOpen(false);
    console.log(template);

    const templates = {
      blog: {
        homePage: "BlogHomePage",
        contentPage: "BlogsPage",
        contentSlug: "blogs",
      },
      ecommerce: {
        homePage: "EccomerceHomePage",
        contentPage: "ProductsPage",
        contentSlug: "products",
      },
      business: {
        homePage: "BusinessHomePage",
        contentPage: "JobsPage",
        contentSlug: "jobs",
      },
      medical: {
        homePage: "MedicalHomePage",
        contentPage: "DoctorsPage",
        contentSlug: "doctors",
      },
    };

    try {
      const { type } = template;
      if (!(type in templates)) {
        throw new Error("Invalid template type");
      }

      const { homePage, contentPage, contentSlug } = templates[type];
      const response = await SavedTemplate(
        template,
        homePage,
        contentPage,
        contentSlug,
        name
      );

      console.log(response);
      if (response?.status === "201") {
        toast.success("Template saved successfully");
      } else {
        toast.error("Oops! Please upgrade your plan to create new websites");
      }
    } catch (error) {
      console.error(error);
      toast.error("Oops! An error occurred. Please try again later");
    }
  };
  return (
    <>
      <FormDialog open={open} onSave={saveTemplate} onClose={handleClose} />
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <Button
        onClick={handleClickOpen}
        style={{
          position: "absolute",
          right: 10,
          top: 8,
          zIndex: 100000,
          color: "#fff",
        }}
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
