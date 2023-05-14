import axios from "axios";
import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import {
  createStyles,
  Text,
  Avatar,
  Group,
  TypographyStylesProvider,
  Paper,
  rem,
  Flex,
  Title,
  Space,
} from "@mantine/core";
import {
  Box,
  Button,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import classes from "./BlogDetail.module.css";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";

import BeatLoader from "react-spinners/BeatLoader";
import { useLocalStorageState } from "ahooks";
import {
  getBlog,
  getBlogsByCategory,
  addReview,
} from "../../../utilityFunctions/axiosFunctions";
import { formatDate } from "../../../utilityFunctions/helperFunctions";

const bull = (
  <Box
    component="h5"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);
const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  initialSlide: 0,
};
const AdminBlogDetail = () => {
  //comment
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");

  //blog
  const [blog, setBlog] = React.useState(null);
  //get blog id from url
  const { blogId } = useParams();

  //related blogs list
  const [relatedBlogs, setRelatedBlogs] = useState([]);

  const getRelatedBlogs = async (category) => {
    try {
      const data = await getBlogsByCategory(category);
      console.log(data);
      if (data?.status === 404) {
        console.log("No related blogs found");
      }
      setRelatedBlogs(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getBlogData = async () => {
    try {
      const data = await getBlog(blogId);
      if (data?.success) {
        setBlog(data.blog);
        getRelatedBlogs(data.blog.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddReview = async (e) => {
    e.preventDefault();
    try {
      const data = await addReview(blogId, name, email, comment);
      console.log("Review added successfully");
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBlogData();
  }, [blogId]);

  return (
    <>
      <div className={classes.container}>
        <Paper shadow="sm" p="xl">
          {blog ? (
            <>
              <h1 style={{ fontWeight: "bold" }}>{blog.title}</h1>
              <div>
                <h5>{blog.tagline}</h5>
              </div>

              <div className={classes.flex}>
                <Typography
                  sx={{ mt: 3, mb: 1 }}
                  color="text.secondary"
                  variant="body1"
                  component="div"
                >
                  {blog.publishedDate} {bull} {blog.readingTime} read {bull}{" "}
                  {blog.writer}
                </Typography>
                <div style={{ cursor: "pointer" }}>
                  <BookmarkAddOutlinedIcon />
                  <ShareOutlinedIcon />
                </div>
              </div>

              <img className={classes.blogImage} src={blog.image} />

              <div dangerouslySetInnerHTML={{ __html: blog.description }} />

              <div style={{ display: "flex" }}>
                {blog.tags.map((tag) => (
                  <Button
                    style={{
                      borderRadius: "20px",
                      borderColor: "#9F9F9F",
                      color: "#fff",
                      backgroundColor: "#2C7A86",
                      textTransform: "capitalize",
                      marginBottom: "10px",
                      marginRight: "10px",
                    }}
                  >
                    {tag}
                  </Button>
                ))}
              </div>
            </>
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "70vh",
              }}
            >
              <BeatLoader color="#40AFCE" loading={true} size={20} />
            </div>
          )}
        </Paper>
        <Space h="xl" />
        <Space h="xl" />
        <Title order={1}> All Comments </Title>
        <Flex mt="xl" wrap="wrap" justify="flex-start" gap="md">
          {blog &&
            blog.reviews.map((review) => <ViewComments comment={review} />)}
        </Flex>
      </div>
    </>
  );
};

export default AdminBlogDetail;

const useStyles = createStyles((theme) => ({
  comment: {
    width: rem(650),
    padding: `${theme.spacing.lg} ${theme.spacing.xl}`,
  },

  body: {
    paddingLeft: rem(54),
    paddingTop: theme.spacing.sm,
    fontSize: theme.fontSizes.sm,
  },

  content: {
    "& > p:last-child": {
      marginBottom: 0,
    },
  },
}));
function ViewComments({ comment }) {
  const { classes } = useStyles();

  return (
    <Paper withBorder radius="md" className={classes.comment}>
      <Group>
        <Avatar
          style={{ width: "60px", height: "60px" }}
          src={comment.image}
          alt={comment.name}
          radius="xl"
        />
        <div>
          <Text fz="lg">{comment.name}</Text>
          <Text fz="sm" c="dimmed">
            Posted At {formatDate(comment.date)}
          </Text>
        </div>
      </Group>
      <TypographyStylesProvider className={classes.body}>
        <div
          className={classes.content}
          dangerouslySetInnerHTML={{ __html: comment.comment }}
        />
      </TypographyStylesProvider>
    </Paper>
  );
}
