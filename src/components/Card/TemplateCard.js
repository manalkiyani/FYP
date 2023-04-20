import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../App";
import { useLocalStorageState } from "ahooks";

export default function (props) {
  const [templateId, setTemplateId] = useLocalStorageState("count", "0");
  
  const navigate = useNavigate();
  const openTemplate = (id) => {
    console.log("in open template");
    setTemplateId(id);

    navigate(`/${props.type}/template/${id}`);
  };
  return (
    <>
      {console.log("in template card")}
      <Card onClick={() => openTemplate(props.id)} sx={{ maxWidth: 300 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={props.img}
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h1" component="div">
              hello
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {props.description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
}

//https://res.cloudinary.com/djlewzcd5/image/upload/v1670359345/istockphoto-1177339095-170667a_qnpg6m.jpg
