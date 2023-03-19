import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { useContext } from 'react';
import { UserContext } from '../../../App';
import { useNavigate } from 'react-router-dom';

import { useEffect } from 'react';
import { getUsername } from '../../../utilityFunctions/authFunctions';
import { getUserData } from '../../../utilityFunctions/axiosFunctions';



export default function SavedTemplates() {
  const [savedTemplates, setSavedTemplates] = React.useState(null);
  const { setTemplateId, setTemplate } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    getsavedTemplates();
  }, []);

  const getsavedTemplates = async () => {
    try {
      const { username } = await getUsername();
      const user = await getUserData(username);

      setSavedTemplates(user.savedTemplates);
    } catch (error) {
      console.log(error);
    }
  };

  const openAsViewer = (id, type) => {
    setTemplate({
      type: "",
      pages: {},
      data: {},
    });
    setTemplateId(id);

    navigate(`/view/${type}/template/${id}`);
  };
  const openAsAdmin = (id, type) => {
    setTemplate({
      type: "",
      pages: {},
      data: {},
    });
    setTemplateId(id);

    navigate(`/${type}/template/${id}`);
  };
  return (
    <div style={{display:'flex',width:'70vw',flexWrap:'wrap'}}>
   {savedTemplates && savedTemplates.map((template) => {
    console.log(template)
          return ( <Card sx={{ maxWidth: 280,minWidth:280,marginRight:'20px' ,marginBottom:'20px'}}>
      <CardActionArea>
        
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {template.title}
          </Typography>
           <Typography gutterBottom variant="body2" style={{color:'grey'}} component="div">
          Type:  {template.type}
          </Typography>
         
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button onClick={() => openAsViewer(template._id, template.type)} size="small" color="primary">
          View
        </Button>
          <Button onClick={() => openAsAdmin(template._id, template.type)} size="small" color="primary">
          Update
        </Button>
      </CardActions>
    </Card>)
    
    }
   
   )
}
 </div>)}