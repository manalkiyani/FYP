import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { useContext } from 'react';
import { UserContext } from '../../../App';
import { useNavigate } from 'react-router-dom';
import { useLocalStorageState } from 'ahooks';



export default function AvailableTemplate({id,type,img,title,description}) {
   const [templateId, setTemplateId] = useLocalStorageState("templateId", "0");
  const [template, setTemplate] = useLocalStorageState("template", "")

  const navigate = useNavigate();
  const openTemplate = (id) => {
  
    setTemplateId(id);
    setTemplate({
      type: "",
      pages: {},
      data: {},
    });

    navigate(`/${type}/template/${id}`);
  };
  return (
    <Card onClick={() => openTemplate(id)} sx={{marginBottom:'30px' ,maxWidth: 300,minWidth:300 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={img}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          View
        </Button>
      </CardActions>
    </Card>
  );
}
