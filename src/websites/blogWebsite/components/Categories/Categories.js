import React from "react";
import classes from "./Categories.module.css";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
const categories = [
  "Arts and Design",
  "Autos",
  "Books and Literature",
  "Business",
  "Education and Science",
  "Entertainment & Media",
  "Family and Parenting",
  "Fashion and Beauty",
  "Food & Cooking",
  "Health and Fitness",
  "Hobbies and Crafts",
  "Home and Garden",
  "Gender and Relationships",
  "Travel",
  "Holiday & Celebrations",
  "Personal Finance",

  "Politics and Government",
  "Religion and Spirituality",
  "Work and Career",
  "Sports and Recreation",
  "Pets and Animals",
  "Technology and Electronics",

  "Other",
];
const Categories = (props) => {
  const [selectedCategory, setSelectedCategory] = React.useState(null);

  const selectCategory = (category) => {
    setSelectedCategory(category);
    props.setCategory(category);

  };

  return (
    <div className={classes.sidebar}>
      <Typography
        variant="h6"
        style={{ fontWeight: "bold", marginBottom: "20px", color: "#757575" }}
      >
        Choose a category for your blog
      </Typography>

      {categories.map((category) =>
        category === selectedCategory ? (
          <Button
          key={category}
            variant="outlined"
            style={{
              borderRadius: "20px",
              borderColor: "#9F9F9F",
              color: "#fff",
              backgroundColor: "#2C7A86",
              textTransform: "capitalize",
              marginBottom: "10px",
              marginRight: "5px",
            }}
          >
            {category}
          </Button>
        ) : (
          <Button
            variant="outlined"
            onClick={()=>selectCategory(category)}
            style={{
              borderRadius: "20px",
              borderColor: "#9F9F9F",
              backgroundColor: "#ebebeb",
              color: "#47474d",
              textTransform: "capitalize",
                marginBottom: "10px",
                marginRight: "5px",
            }}
          >
            {category}
          </Button>
        )
      )}
    </div>
  );
};

export default Categories;
