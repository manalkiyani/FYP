import React from "react";
import { blogTemplate } from "../../TemplatesData/blogTemplate";
import classes from "./Templates.module.css";
import TemplateCard from "../Card/TemplateCard";
import { Link } from "react-router-dom";

const Template = (props) => {

  return (

    <div className={classes.horizontal}>
    
      {props.data.map((template) => {
      
       return( template.key ?  
          <TemplateCard
         
            key={template.key}
            img={template.img}
            title={template.title}
            description={template.description}
            type={template.type}
          />
       :
         <TemplateCard
         
            id={template.id}
            img={template.img}
            title={template.title}
            description={template.description}
            type={template.type}
          /> )

      })}
    </div>
  );
};

export default Template;
