import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { withStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import { useState } from 'react';
import axios from 'axios';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const styles = {
    label: {
      color: '#000000', // Change the label text color to black
      paddingLeft: '8px', // Add padding on the left side of the label
      '&.focused': {
        color: '#40AFC0', // Change the label text color to blue when focused
      },
    },
    input: {
      color: '#000000', // Change the input text color to black
      paddingLeft: '8px', // Add padding on the left side of the input text
    },
    divider: {
      backgroundColor: '#40AFC0', // Change the color of the divider
      '&.focused': {
        backgroundColor: 'black', // Change the color of the divider to blue when focused
      },
    },
  };
function FullScreenDialog(props) {
  const { open, setOpen, classes } = props;
  const [isFocused, setIsFocused] = useState(false);
  const [review, setReview] = useState('')
  const productId = props.productId;
  console.log("this is product id outside "+productId)


  const handleReview =  async (event)=>{
     setReview(event.target.value);
    console.log("this is review "+ review);



  }

  const handleSubmit = async () => {
    console.log("this is product id clicked " + productId);
    console.log("this is review in final "+ review)
  
    try {
  
      const response = await fetch('http://localhost:8800/api/products/addreviewindb', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({

        }),
      });
      console.log(response.status); // check the response status
  
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };
  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open full-screen dialog
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Reviews
            </Typography>

          </Toolbar>
        </AppBar>
        <TextField
            onChange={handleReview}
          id="standard-multiline-static"
          label="Write Your Review Here"
          multiline
          rows={3}
          variant="standard"
          onFocus={handleFocus}
          onBlur={handleBlur}
          InputLabelProps={{
            classes: {
              root: `${classes.label} ${isFocused ? 'focused' : ''}`,
            },
          }}
          InputProps={{
            classes: {
              root: classes.input,
            },
          }}
        />
        <Button onClick={handleSubmit}  sx={{ color: '#40AFC0' }}>Submit</Button>
        <List>
          <ListItem button>

            <ListItemText primary="Phone ringtone" secondary="Titania" />
          </ListItem>
          <Divider classes={{ root: classes.divider }} /> {/* Add classes prop to Divider */}
          <ListItem button>
            <ListItemText
              primary="Default notification ringtone"
              secondary="Tethys"
            />
          </ListItem>
        </List>
      </Dialog>
    </div>
  );
}

export default withStyles(styles)(FullScreenDialog);
