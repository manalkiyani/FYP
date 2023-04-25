import React, { useEffect, useState } from "react";
import SideDrawer from "../SideDrawer/SideDrawer";
import classes from "./SocialIconsPanel.module.css";
import { TextField } from "@mui/material";

import del from "../../assets/icons/delete.png";

import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";

const SocialIconsPanel = ({
  show,
  closePanel,
  socialIcons,
  handleSocialIcons,
}) => {
  const [icons, setIcons] = useState([
    {
      icon: "Facebook",
      url: "https://res.cloudinary.com/djlewzcd5/image/upload/v1670229851/facebook_nunoeq.png",
      link: "",
    },
    {
      icon: "Twitter",
      url: "https://res.cloudinary.com/djlewzcd5/image/upload/v1670230136/twitter_xtgade.png",
      link: "",
    },
    {
      icon: "Instagram",
      url: "https://res.cloudinary.com/djlewzcd5/image/upload/v1670230168/instagram_ft5yeo.png",
      link: "",
    },
    {
      icon: "LinkedIn",
      url: "https://res.cloudinary.com/djlewzcd5/image/upload/v1670230193/linkedin_s4wzkh.png",
      link: "",
    },
    {
      icon: "Whatsapp",
      url: "https://res.cloudinary.com/djlewzcd5/image/upload/v1670230148/whatsapp_lg8yre.png",
      link: "",
    },
    {
      icon: "Gmail",
      url: "https://res.cloudinary.com/djlewzcd5/image/upload/v1670249983/-11597283055r5ynokf2kb_ym9yeb.png",
      link: "",
    },
    {
      icon: "SnapChat",
      url: "https://res.cloudinary.com/djlewzcd5/image/upload/v1670249895/snapchat-logo-icon-png-snapchat-logo-circle-11562922134qgu9m89jgh_jrxlj2.png",
      link: "",
    },
    {
      icon: "Youtube",
      url: "https://res.cloudinary.com/djlewzcd5/image/upload/v1670249662/free-youtube-logo-icon-2431-thumb_wssgc7.png",
      link: "",
    },
    {
      icon: "Pinterest",
      url: "https://res.cloudinary.com/djlewzcd5/image/upload/v1670232984/pinterest_g6aazw.png",
      link: "",
    },
  ]);
  useEffect(() => {
    if (socialIconsCopy !== socialIcons) {
      console.log("in useEffect");
      setSocialIconsCopy(socialIcons);
    }
  }, []);
  const filteredIcons = [];
  const addIcon =
    "https://res.cloudinary.com/djlewzcd5/image/upload/v1670250225/plus_2_qak15o.png";
  const [linkIcon, setLinkIcon] = React.useState("");
  const [socialIconsCopy, setSocialIconsCopy] = useState("");

  const deleteIcon = (iconn) => {
    let array = socialIconsCopy.filter((obj) => obj.icon !== iconn);
    console.log(array);
    setSocialIconsCopy(array);
  };
  const updateLink = (e, icon) => {
    socialIconsCopy.map((obj) => {
      if (obj.icon === icon) {
        obj.link = e.target.value;
      }
    });
  };
  const sendUpdatedSocialIcons = () => {
    console.log(socialIconsCopy);
    handleSocialIcons(socialIconsCopy);
  };
  const applyhoverEffect = (icon) => {
    setIcons(
      icons.map((obj) => {
        if (obj.icon === icon) {
          const temp = obj.url;
          // [obj.url,linkIcon] =  [linkIcon,obj.url]
          obj.url = addIcon;
          setLinkIcon(temp);
        }
        return obj;
      })
    );
  };
  const removehoverEffect = (icon) => {
    setIcons(
      icons.map((obj) => {
        if (obj.icon === icon) {
          obj.url = linkIcon;
        }
        return obj;
      })
    );
  };
  const handleAddIcon = (icon) => {
    removehoverEffect(icon);
    const object = icons.find((obj) => obj.icon === icon);
    const newObject = JSON.parse(JSON.stringify(object));
    newObject.url = linkIcon;
    console.log(newObject);

    setSocialIconsCopy([...socialIconsCopy, newObject]);
  };
  return (
    <SideDrawer show={show} width="23%">
      <>
       <div className={classes.heading}>
        <p style={{ fontSize: "20px", margin: 0 }}> Social Media Links</p>
        <ClearOutlinedIcon onClick={closePanel} />
      </div>
      <div className={classes.container}>
        <div className={classes.box}>
          {socialIconsCopy &&
            socialIconsCopy.map(({ icon, url, link }) => {
              filteredIcons.push(icon);
              return (
                <div key={icon} className={classes.group}>
                  <img className={classes.item} alt="" src={url} />
                  <TextField
                    onChange={(e) => updateLink(e, icon)}
                    defaultValue={link}
                    id="outlined-basic"
                    label={icon}
                    variant="outlined"
                    size="small"
                  />
                  <img
                    className={classes.item}
                    alt="delete"
                    src={del}
                    onClick={() => deleteIcon(icon)}
                  />
                </div>
              );
            })}
          <button className={classes.btn} onClick={sendUpdatedSocialIcons}>
            Link
          </button>
        </div>

        {icons
          .filter((val) => {
            return !filteredIcons.includes(val.icon);
          })
          .map(({ icon, url }) => {
            return (
              <img
                key={icon}
                onClick={() => handleAddIcon(icon)}
                onMouseEnter={() => applyhoverEffect(icon)}
                onMouseLeave={() => removehoverEffect(icon)}
                className={classes.icon}
                alt=""
                src={url}
              />
            );
          })}
      </div>
      </>
     
    </SideDrawer>
  );
};

export default React.memo(SocialIconsPanel);
