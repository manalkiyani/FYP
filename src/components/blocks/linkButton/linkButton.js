import React, { useState, useEffect, useContext } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { useLocalStorageState } from "ahooks";
import { Tabs } from "@mantine/core";
import axios from "axios";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const LinkButton = (props) => {
  // const { template } = useContext(UserContext);
  const [template] = useLocalStorageState("template", {});
  const [pages, setPages] = useState([]);
  const [items, setItems] = useState([]);

  const [link, setLink] = useState({
    url: "",
    page: "",
    detail: "",
  });

  const getBlogs = async () => {
    const blogIds = template?.data?.blogs;
    axios
      .post("http://localhost:8800/api/blogs/get", { blogIds })
      .then((res) => {
        const Blogs = res.data.Blogs;
        setItems(Blogs.map((blog) => ({ value: blog._id, name: blog.title })));
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const getDoctors = async () => {
    const doctorIds = template?.data?.doctors;
    try {
      const response = await axios.post(
        `http://localhost:8800/api/doctor/get`,
        {
          doctorIds,
        }
      );
      console.log(response);
      const Doctors = response.data.Doctors;
      setItems(
        Doctors.map((doctor) => ({ value: doctor._id, name: doctor.name }))
      );
    } catch (error) {
      console.log(error);
    }
  };
  const getJobs = async () => {
    const jobIds = template?.data?.jobs;
    try {
      const res = await axios.post("http://localhost:8800/api/jobs/get", {
        jobIds,
      });
      const Jobs = res.data.jobs;
      setItems(Jobs.map((job) => ({ value: job._id, name: job.title })));
    } catch (error) {
      console.log(error);
    }
  };
  const getProducts = async () => {
    const productIds = template?.data?.products;
    try {
      const res = await axios.post("http://localhost:8800/api/products/get", {
        productIds,
      });

      const Products = res.data.Products;
      setItems(
        Products.map((product) => ({ value: product._id, name: product.name }))
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (template.type === "blog") {
      setPages([
        { value: "", name: "Home" },
        { value: "blogs", name: "Blogs" },
        { value: "contactUs", name: "Contact Us" },
      ]);

      getBlogs();
    } else if (template.type === "eccomerce") {
      setPages([
        { value: "", name: "Home" },
        { value: "products", name: "Products" },
        { value: "contactUs", name: "Contact Us" },
      ]);

      getProducts();
    } else if (template.type === "medical") {
      setPages([
        { value: "", name: "Home" },
        { value: "doctors", name: "Doctors" },
        { value: "appointments", name: "Appointments" },
        { value: "contactUs", name: "Contact Us" },
      ]);
      getDoctors();
    } else if (template.type === "business") {
      setPages([
        { value: "", name: "Home" },
        { value: "jobs", name: "Jobs" },

        { value: "contactUs", name: "Contact Us" },
      ]);

      getJobs();
    }
  }, []);

  const handleChange = (event) => {
    setLink({ url: event.target.value, page: "", detail: "" });
  };

  const handleClick = (event) => {
    event.preventDefault();
    props.link(link);
  };

  return (
    <>
      {
        <Dialog
          style={{ minWidth: 350 }}
          open={true}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClick}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{"Link to"}</DialogTitle>

          <Tabs color="cyan" variant="outline" radius="md" defaultValue="jobs">
            <Tabs.List>
              <Tabs.Tab value="URL">URL</Tabs.Tab>
              <Tabs.Tab value="Pages"> Pages</Tabs.Tab>
              <Tabs.Tab value="Items"> Items</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="URL" pt="sm">
              <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                  <TextField
                    onChange={(e) => handleChange(e)}
                    className="input"
                    id="outlined-basic"
                    label="URL"
                    variant="outlined"
                    value={link.url}
                    margin="normal"
                  />
                </DialogContentText>
              </DialogContent>
            </Tabs.Panel>

            <Tabs.Panel value="Pages" pt="sm">
              <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                  <Box sx={{ minWidth: 250, marginTop: "10px" }}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Pages
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={link.page}
                        label="Page"
                        onChange={(e) =>
                          setLink({ page: e.target.value, url: "", detail: "" })
                        }
                      >
                        {pages.map((page) => (
                          <MenuItem value={page.value}>{page.name}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                </DialogContentText>
              </DialogContent>
            </Tabs.Panel>
            <Tabs.Panel value="Items" pt="sm">
              <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                  <Box sx={{ minWidth: 250, marginTop: "10px" }}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Items
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={link.detail}
                        label="Item"
                        onChange={(e) =>
                          setLink({ detail: e.target.value, url: "", page: "" })
                        }
                      >
                        {items.map((item) => (
                          <MenuItem value={item.value}>{item.name}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                </DialogContentText>
              </DialogContent>
            </Tabs.Panel>
          </Tabs>
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
