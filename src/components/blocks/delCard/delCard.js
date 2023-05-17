import React, { useState } from "react";
import paint from "../../../assets/icons/paint.png";
import link from "../../../assets/icons/link.png";
import bin from "../../../assets/icons/delete.png";
import classes from "./delCard.module.css";
import { Button, Indicator } from "@mantine/core";
import LinkButton from "../linkButton/linkButton";

const DelCard = ({ display, del, index, handleLink }) => {
  const [show, setshow] = useState(false);

  const handleClick = (link) => {
    setshow(false);
    handleLink(link, index);
  };
  return (
    <>
      <div className={classes.container}>
        <Button.Group>
          <Button onClick={() => del(index)} variant="default">
            <img className={classes.icon} src={bin} />
          </Button>
          {display && (
            <>
              <Button variant="default">
                <img className={classes.icon} src={paint} />
              </Button>
              <Indicator
                offset={3}
                position="bottom-end"
                color="gray"
                inline
                label="Link Button"
                size={16}
              >
                <Button onClick={() => setshow(true)} variant="default">
                  <img className={classes.icon} src={link} />
                </Button>
              </Indicator>
            </>
          )}
        </Button.Group>
      </div>
      {show && <LinkButton link={handleClick} />}
    </>
  );
};

export default DelCard;
