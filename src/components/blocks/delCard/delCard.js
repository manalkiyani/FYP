import React, { useState } from "react";
import paint from "../../../assets/icons/paint.png";
import link from "../../../assets/icons/link.png";
import bin from "../../../assets/icons/delete.png";
import classes from "./delCard.module.css";
import { Button, Indicator } from "@mantine/core";
import LinkButton from "../linkButton/linkButton";

const DelCard = ({ displayLink, displayColor, del, index, handleLink }) => {
  const [show, setshow] = useState(false);
  const [showDelete, setShowDelete] = useState(true);
  const [showLink, setShowLink] = useState(true);
  const [showColor, setShowColor] = useState(true);

  const handleClick = (link) => {
    setshow(false);
    handleLink(link, index);
  };
  const deleteCard = (e, index) => {
    e.stopPropagation();
    del(index);
  };
  return (
    <>
      <div className={classes.container}>
        <Button.Group>
          <Indicator
            disabled={showDelete}
            position="top-center"
            color="gray"
            inline
            label="Delete Card"
            size={16}
          >
            <Button
              onMouseEnter={() => setShowDelete(false)}
              onMouseLeave={() => setShowDelete(true)}
              onClick={(e) => deleteCard(e, index)}
              variant="default"
            >
              <img className={classes.icon} src={bin} />
            </Button>
          </Indicator>

          {displayLink && (
            <>
              <Indicator
                disabled={showLink}
                position="top-center"
                color="gray"
                inline
                label="Link Button"
                size={16}
              >
                <Button
                  onMouseEnter={() => setShowLink(false)}
                  onMouseLeave={() => setShowLink(true)}
                  onClick={() => setshow(true)}
                  variant="default"
                >
                  <img className={classes.icon} src={link} />
                </Button>
              </Indicator>
            </>
          )}
          {displayColor && (
            <>
              <Indicator
                disabled={showColor}
                position="top-center"
                color="gray"
                inline
                label="Color Button"
                size={16}
              >
                <Button
                  onMouseEnter={() => setShowColor(false)}
                  onMouseLeave={() => setShowColor(true)}
                  variant="default"
                >
                  <img className={classes.icon} src={paint} />
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
