import React from "react";
import { blogTemplate } from "../../TemplatesData/blogTemplate";
import classes from "./Templates.module.css";
import TemplateCard from "../Card/TemplateCard";


const Template = (props) => {
  return (
    <div className={classes.horizontal}>
      {props.data.map((template) => {
        return (
          <TemplateCard
            id={template.id}
            key={template.id}
            img={template.img}
            title={template.title}
            description={template.description}
            type={template.type}
          />
        );
      })}
    </div>
  );
};

export default Template;
