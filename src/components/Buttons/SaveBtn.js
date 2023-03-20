import * as React from "react";

import { Button } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import SaveIcon from "@mui/icons-material/Save";
import { SavedTemplate } from "../../utilityFunctions/helperFunctions";
import { useContext } from "react";
import { UserContext } from "../../App";

import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
const SaveBtn = () => {
  const { template, setTemplate } = useContext(UserContext);

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const saveTemplate = async (name) => {
    console.log(name);
    setOpen(false);
    SavedTemplate(template, name)
      .then((result) => {
        if (result.data.message === "success") {
          toast.success(<b>Template Saved Successfully</b>);
        } else {
          toast.error(
            <b>Oops! Please Upgrade Your Plan to create new Websites</b>
          );
        }
      })
      .catch((error) => {
        toast.error(
          <b>Oops! Please Upgrade Your Plan to create new Websites</b>
        );
      });
  };

  return (
    <>
      <FormDialog open={open} onSave={saveTemplate} onClose={handleClose} />
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <Button
        onClick={handleClickOpen}
        style={{ position: "sticky", left: 10, top: -200, zIndex: 1000 }}
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
