import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import axios from 'axios';
import {Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { useContext,useState,useEffect } from 'react';
import { UserContext } from '../../../App';
import { useNavigate } from 'react-router-dom';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import { getUsername,getUser } from '../../../utilityFunctions/authFunctions';
import { getUserData } from '../../../utilityFunctions/axiosFunctions';


export default function SavedTemplates() {
  const [DeleteId, setDeleteId] = React.useState(null);
  const [savedTemplates, setSavedTemplates] = React.useState(null);
  const { setTemplateId, setTemplate } = useContext(UserContext);
  const [updated, setUpdated] = React.useState(false);
  const navigate = useNavigate();
 const[Deletion,setDeletion]=useState(false);

 const openDeletion = (id) => {
  console.log(id);
    setDeleteId(id);
    setDeletion(true);
  }
  const closeDeletion = () => {
    setDeletion(false);
  }
  useEffect(() => {
    getsavedTemplates();
  }, [updated]);

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
   const getUserId = async () => {
    const token = await getUsername();
    console.log(token);
    const { data } = await getUser({ username: token.username });
    console.log(data);
    return data; // Return the data retrieved from the API
  };
  const deleteTemplate = async () => {
   const data = await getUserId();
   await axios.delete(`http://localhost:8800/api/templates/${data._id}/${DeleteId}`)
  .then((response) => {
    console.log(response.data);
    setUpdated(!updated);
  })
  .catch((error) => {
    console.error(error);
  });
  
  }


  return (
    <>
     <ConfirmDeleteDialog open={Deletion} onClose ={closeDeletion} onConfirm={deleteTemplate} />
      <div style={{display:'flex',width:'70vw',flexWrap:'wrap'}}>
   {savedTemplates && savedTemplates.map((template) => {
  return ( <Card 
  key={template._id}
  
  sx={{ maxWidth: 280,minWidth:280,marginRight:'20px' ,marginBottom:'20px'}}>
      <CardActionArea>
        
        <CardContent>
          <div style={{display:'flex',width:'100%',justifyContent:'space-between',marginBottom:'10px'}}>
             <Typography gutterBottom variant="h6" component="div">
            {template.name} 
          </Typography>
            <DeleteOutlineIcon onClick={()=>openDeletion(template._id)} color="error"/>

          </div>
         <div style={{display:'flex',width:'100%',justifyContent:'space-between',marginBottom:'10px'}}>

           <Typography gutterBottom variant="body2" style={{color:'grey'}} component="div">
          <b>Type </b>
          </Typography>
           <Typography gutterBottom variant="body2" style={{color:'grey'}} component="div">
          <i> {template.type}</i>
          </Typography>
         </div>
           <div style={{display:'flex',width:'100%',justifyContent:'space-between',marginBottom:'10px'}}>

           <Typography gutterBottom variant="body2" style={{color:'grey'}} component="div">
         
          <b> Created At  </b>
          </Typography>
           <Typography gutterBottom variant="body2" style={{color:'grey'}} component="div">
          <i> {template.createdAt} </i>
          </Typography>
         </div>
          
         
        </CardContent>
      </CardActionArea>
      <CardActions>
        <div style={{display:'flex',width:'100%',justifyContent:'space-between',marginBottom:'10px'}}>

          <Button onClick={() => openAsViewer(template._id, template.type)} size="small" color="primary">
          View As Test User
        </Button>
          <Button onClick={() => openAsAdmin(template._id, template.type)} size="small" color="primary">
          Update
        </Button>
        </div>
        
      </CardActions>
    </Card>)
    
    }
   
   )
}
 </div>
    </>

   
 
 )}

 const ConfirmDeleteDialog = ({ open, onClose, onConfirm }) => {
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    await onConfirm();
    setLoading(false);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirm Deletion</DialogTitle>
      <DialogContent>
        Are you sure you want to delete this saved website? Your changes will be lost.
      </DialogContent>
      <DialogActions>
        <Button disabled={loading} onClick={onClose}>
          Cancel
        </Button>
        <Button disabled={loading} onClick={handleConfirm} color="error">
          {loading ? 'Deleting...' : 'Delete'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
