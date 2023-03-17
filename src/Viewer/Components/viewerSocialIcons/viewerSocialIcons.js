import React from "react";
import classes from "../../../components/blocks/socialIcons/socialIcons.module.css";

const viewerSocialIcons = (props) => {
  const handleIconClick = (event, link) => {
    event.preventDefault();
    window.open(link, "_blank");
  };

  return (
    <>
      <div>
        {props.socialIcons.map(({ icon, url, link }) => {
          return (
            <a
              href={link}
              key={icon}
              onClick={(event) => handleIconClick(event, link)}
            >
              <img className={classes.icon} alt={icon} src={url} />
            </a>
          );
        })}
      </div>
    </>
  );
};

export default viewerSocialIcons;
