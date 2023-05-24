import Blog from "./Blog";
import React from "react";
import toast, { Toaster } from "react-hot-toast";
import classes from "./Blogs.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";

import SearchIcon from "@mui/icons-material/Search";

import { addBookmark } from "../../../../utilityFunctions/axiosFunctions";
import Sidebar from "../../../../websites/blogWebsite/components/Sidebar/Sidebar";
import { Group, Input, Select } from "@mantine/core";
import { getTemplateId } from "../../../../utilityFunctions/TemplateIdController";
import { getWebsiteData } from "../../../../utilityFunctions/websiteDataController";

export default function Blogs({ blogIds }) {
  const [blogs, setBlogs] = useState(null);
  const [blogsCopy, setBlogsCopy] = useState(null);

  const [searchField, setSearchField] = useState("");
  const [changed, setChanged] = useState(false);
  const [viewerId, setViewerId] = useState(null);

  useEffect(() => {
    axios
      .post("http://localhost:8800/api/blogs/get", { blogIds })
      .then((res) => {
        setBlogs(res.data.Blogs);
        setBlogsCopy(res.data.Blogs);

        console.log(res.data.Blogs);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const bookmarkBlog = async (blogId) => {
    const Template = await getTemplateId();
    console.log(Template);
    const response = await getWebsiteData(Template.templateId);

    setViewerId(response.websiteData.viewerId);

    addBookmark(response.websiteData.viewerId, blogId)
      .then((result) => {
        console.log(result.message);
        setChanged(!changed);
        toast.success(result.message);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error);
      });
  };
  const searchBlogs = (searchField) => {
    const blogs = blogsCopy.filter((blog) => {
      return (
        blog?.title.toLowerCase().includes(searchField?.toLowerCase()) ||
        blog?.tagline.toLowerCase().includes(searchField?.toLowerCase()) ||
        blog?.category.toLowerCase().includes(searchField?.toLowerCase())
      );
    });
    setBlogs(blogs);
  };
  const searchCategory = (searchField) => {
    console.log("searchField", searchField);
    if (searchField == null) {
      console.log("in if");
      console.log("blogsCopy", blogsCopy);
      setBlogs(blogsCopy);
    }
    const blogs = blogsCopy.filter((blog) => {
      return blog?.category?.toLowerCase().includes(searchField?.toLowerCase());
    });
    setBlogs(blogs);
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className={classes.home}>
        <div className={classes.bigContainer}>
          <Box style={{ marginBottom: "50px" }}>
            <AppBar
              style={{
                backgroundColor: "white",
                marginTop: "30px",
                width: "1389px",
                boxShadow: "none",
              }}
              position="static"
            >
              <Toolbar>
                <Input
                  style={{ width: "70%", marginLeft: "30px" }}
                  icon={<SearchIcon />}
                  placeholder="Search for your favorite blogs..."
                  onChange={(e) => searchBlogs(e.target.value)}
                />

                <Select
                  searchable
                  maxDropdownHeight={280}
                  onChange={(value) => searchCategory(value)}
                  clearable
                  nothingFound="No options"
                  style={{ width: "30%", marginLeft: "20px" }}
                  placeholder="Search Popular Categories"
                  data={[
                    { label: "Arts and Design", value: "Arts and Design" },
                    { label: "Autos", value: "Autos" },
                    {
                      label: "Books and Literature",
                      value: "Books and Literature",
                    },
                    { label: "Business", value: "Business" },
                    {
                      label: "Education and Science",
                      value: "Education and Science",
                    },
                    {
                      label: "Entertainment & Media",
                      value: "Entertainment & Media",
                    },
                    {
                      label: "Family and Parenting",
                      value: "Family and Parenting",
                    },
                    {
                      label: "Fashion and Beauty",
                      value: "Fashion and Beauty",
                    },
                    { label: "Food & Cooking", value: "Food & Cooking" },
                    {
                      label: "Health and Fitness",
                      value: "Health and Fitness",
                    },
                    {
                      label: "Hobbies and Crafts",
                      value: "Hobbies and Crafts",
                    },
                    { label: "Home and Garden", value: "Home and Garden" },
                    {
                      label: "Gender and Relationships",
                      value: "Gender and Relationships",
                    },
                    { label: "Travel", value: "Travel" },
                    {
                      label: "Holiday & Celebrations",
                      value: "Holiday & Celebrations",
                    },
                    { label: "Personal Finance", value: "Personal Finance" },
                    {
                      label: "Politics and Government",
                      value: "Politics and Government",
                    },
                    {
                      label: "Religion and Spirituality",
                      value: "Religion and Spirituality",
                    },
                    { label: "Work and Career", value: "Work and Career" },
                    {
                      label: "Sports and Recreation",
                      value: "Sports and Recreation",
                    },
                    { label: "Pets and Animals", value: "Pets and Animals" },
                    {
                      label: "Technology and Electronics",
                      value: "Technology and Electronics",
                    },
                    { label: "Other", value: "Other" },
                  ]}
                />
              </Toolbar>
            </AppBar>
          </Box>

          <div className={classes.posts}>
            <div></div>
            {blogs &&
              blogs.map((blog) => {
                return (
                  <Blog
                    bookmarkBlog={bookmarkBlog}
                    key={blog._id}
                    bid={blog._id}
                    img={blog.image}
                    title={blog.title}
                    tagline={blog.tagline}
                    writer={blog.writer}
                    time={blog.readingTime}
                    desc={blog.description}
                    tags={blog.tags}
                  />
                );
              })}
          </div>
        </div>
        <Sidebar viewerId={viewerId} changed={changed} />
      </div>
    </>
  );
}
