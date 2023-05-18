import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from 'axios';

import { Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';

export default function SubdomainForm({ open, setOpen }) {
  const [available, setAvailable] = useState(false);
  const [subdomain, setSubdomain] = useState('');

  const handleTextChange = async (event) => {
    setSubdomain(event.target.value);

    const response = await axios.post(
      'http://localhost:8800/api/admin/checksubdomainavailability',
      { subdomain: event.target.value }
    );
    const { exists } = response.data;
    console.log(exists);
    setAvailable(exists);

  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Publish</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the subdomain you want your website to be published on.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Subdomain"
            type="email"
            fullWidth
            variant="standard"
            value={subdomain}
            onChange={handleTextChange}
          />

{!available && <Typography style={{color: "red"}}> Subdomain not available </Typography>}

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose} disabled={!available}>
            Publish
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
