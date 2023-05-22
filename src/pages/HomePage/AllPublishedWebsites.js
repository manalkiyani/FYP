import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import axios from "axios";
import {
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardActions } from "@mui/material";
import { useContext, useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { addTemplateId } from "../../utilityFunctions/TemplateIdController";

export default function AllPublishedWebsites() {
  const [publishedTemplates, setPublishedTemplates] = React.useState(null);

  // const { setTemplateId, setTemplate } = useContext(UserContext);

  useEffect(() => {
    getPublishedWebsites();
  }, []);

  const getPublishedWebsites = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8800/api/templates/websites"
      );
      setPublishedTemplates(response.data.Websites);
    } catch (error) {
      console.log(error);
    }
  };

  const openAsPublished = async (subdomainGot, id, type) => {
    //get subdomain in function arguments as well and put in URL
    try {
      const response = await addTemplateId(id, type);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    window.location.href = `http://${subdomainGot}.localhost:3000/view/${type}/template/${id}`;

    // navigate(`/view/${type}/template/${id}`);
  };

  const images = [
    "https://res.cloudinary.com/djlewzcd5/image/upload/v1683469821/pexels-antoni-shkraba-4348404_estoi2.jpg",
    "https://res.cloudinary.com/djlewzcd5/image/upload/v1683469821/pexels-marcelo-chagas-2183773_viqmun.jpg",
    "https://res.cloudinary.com/djlewzcd5/image/upload/v1683469816/pexels-ketut-subiyanto-4126724_iwqzw6.jpg",
    "https://res.cloudinary.com/djlewzcd5/image/upload/v1683469810/pexels-picjumbocom-196655_zaquiv.jpg",
    "https://res.cloudinary.com/djlewzcd5/image/upload/v1683469810/pexels-pixabay-35550_rqrxk6.jpg",
    "https://res.cloudinary.com/djlewzcd5/image/upload/v1683469816/pexels-cottonbro-studio-5082579_go4zvq.jpg",
    "https://res.cloudinary.com/djlewzcd5/image/upload/v1683470618/pexels-negative-space-177557_i2eqgf.jpg",
    "https://res.cloudinary.com/djlewzcd5/image/upload/v1683470614/pexels-burst-374016_zy540g.jpg",
    "https://res.cloudinary.com/djlewzcd5/image/upload/v1683470611/pexels-cottonbro-studio-3584931_jeq1ks.jpg",
    "https://res.cloudinary.com/djlewzcd5/image/upload/v1683470598/pexels-kaboompics-com-6168_i3zd5p.jpg",
    "https://res.cloudinary.com/djlewzcd5/image/upload/v1683470595/pexels-pixabay-265667_jtfquj.jpg",
    "https://res.cloudinary.com/djlewzcd5/image/upload/v1683470592/pexels-startup-stock-photos-7356_yo3msx.jpg",
    "https://res.cloudinary.com/djlewzcd5/image/upload/v1683469816/pexels-ketut-subiyanto-4126724_iwqzw6.jpg",
  ];

  return (
    <>
      {publishedTemplates && publishedTemplates.length === 0 && (
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            height: "20vh",
            fontSize: "20px",
            fontWeight: "lighter",
          }}
        >
          Your Websites Will appear here
        </div>
      )}
      <div style={{ display: "flex", width: "70vw", flexWrap: "wrap" }}>
        {publishedTemplates &&
          publishedTemplates.map((template) => {
            const randomImageIndex = Math.floor(Math.random() * images.length);

            const randomImage = images[randomImageIndex];

            return (
              <Card
                key={template._id}
                sx={{
                  maxWidth: 300,
                  minWidth: 300,
                  marginRight: "20px",
                  marginBottom: "20px",
                }}
              >
                <CardActionArea>
                  <CardMedia
                    onClick={() =>
                      openAsPublished(
                        template.subdomain,
                        template.templateid,
                        template.type
                      )
                    }
                    component="img"
                    height="150"
                    image={images[publishedTemplates.indexOf(template)]}
                    alt="Your Template"
                  />

                  <CardContent>
                    <div
                      style={{
                        display: "flex",
                        width: "100%",
                        justifyContent: "space-between",
                        marginBottom: "10px",
                      }}
                    >
                      <Typography gutterBottom variant="h6" component="div">
                        {template.name}
                      </Typography>
                    </div>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "space-between",
                      marginBottom: "10px",
                    }}
                  ></div>
                </CardActions>
              </Card>
            );
          })}
      </div>
    </>
  );
}
