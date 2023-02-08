import React, {Component} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
class LinkButton extends Component {

    state = {
        value: ''
    };
    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleClick = (event) => {
        event.preventDefault();
        this.props.link(this.state.value)
    }
   


    render() {


        return (
            <>
            { <Dialog
        open={true}
        TransitionComponent={Transition}
        keepMounted
        onClose={this.handleClick}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Paste Your URL here"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
             <TextField    onChange={(e) => this.handleChange(e)} className="input" 
             id="outlined-basic" label="URL" variant="outlined" value={this.state.value} margin="normal"/>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClick}>LINK</Button>
          
        </DialogActions>
      </Dialog>}
            
            </>
            // <form>
            //     <label>
            //         Link
                    
            //             <TextField    onChange={(e) => this.handleChange(e)} className="input" 
            //             id="outlined-basic" label="Title" variant="outlined" value={this.state.value} margin="normal"/>
            //     </label>
            //     <button onClick={
            //         (e) => this.handleClick(e)
            //     }>click</button>

            //    </form>
        )
    }
}

export default LinkButton
