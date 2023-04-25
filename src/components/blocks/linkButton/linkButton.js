import React, { useState, useEffect, useContext } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { UserContext } from "../../../App";
import { useLocalStorageState } from "ahooks";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const LinkButton = (props) => {
  // const { template } = useContext(UserContext);
  const [template] = useLocalStorageState("template", {});
  const [pages, setPages] = useState([]);
  const [url, setUrl] = useState("");
  const [Urlpage, setUrlpage] = useState(true);
  const [page, setPage] = useState("");
  const [pagesPage, setPagespage] = useState(false);

  useEffect(() => {
    if (template.type === "blog") {
      setPages([
        { value: "", name: "Home" },
        { value: "blogs", name: "Blogs" },
        { value: "contactUs", name: "Contact Us" },
      ]);
    } else if (template.type === "eccomerce") {
      setPages([
        { value: "", name: "Home" },
        { value: "products", name: "Products" },
        { value: "contactUs", name: "Contact Us" },
      ]);
    }
  }, []);

  const handleChange = (event) => {
    setUrl(event.target.value);
  };

  const handleClick = (event) => {
    event.preventDefault();
    props.link(url);
  };
  const openURLpage = () => {
    setUrlpage(true);
    setPagespage(false);
  };
  const openPagespage = () => {
    setUrlpage(false);
    setPagespage(true);
  };

  return (
    <>
      {
        <Dialog
          style={{ minWidth: 250 }}
          open={true}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClick}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{"Link to"}</DialogTitle>
          <Divider style={{ fontWeight: "bolder" }} />
          <DialogTitle>
            <div>
              <Button variant="text" onClick={openURLpage}>
                URL
              </Button>
              <Button variant="text" onClick={openPagespage}>
                Pages
              </Button>
            </div>
          </DialogTitle>
          <Divider style={{ fontWeight: "bolder" }} />
          {Urlpage && (
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                <TextField
                  onChange={(e) => handleChange(e)}
                  className="input"
                  id="outlined-basic"
                  label="URL"
                  variant="outlined"
                  value={url}
                  margin="normal"
                />
              </DialogContentText>
            </DialogContent>
          )}
          {pagesPage && (
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                <Box sx={{ minWidth: 250, marginTop: "10px" }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Pages</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={page}
                      label="Page"
                      onChange={(e) => setPage(e.target.value)}
                    >
                      {pages.map((page) => (
                        <MenuItem value={page.value}>{page.name}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </DialogContentText>
            </DialogContent>
          )}
          <DialogActions>
            <Button variant="text" onClick={handleClick}>
              LINK
            </Button>
          </DialogActions>
        </Dialog>
      }
    </>
  );
};

export default LinkButton;
