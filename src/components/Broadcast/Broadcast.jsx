import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Modal from 'react-bootstrap/Modal';
import TextField from '@mui/material/TextField';

const BroadCast = () => {

    return ( 
        <div>
 <Modal.Dialog>
  <Modal.Header closeButton>
    <Modal.Title>Broadcast Message</Modal.Title>
  </Modal.Header>

  <Modal.Body>
      <TextField  label="Enter Your Message" fullWidth={true} color="primary" multiline={true} rows={5}/>
  </Modal.Body>

  <Modal.Footer>
    <Button variant="outlined" color='secondary'style={{marginRight:10}}>Close</Button>
    <Button variant="contained" color='primary'>Send</Button>
  </Modal.Footer>
</Modal.Dialog>
        </div>
     );
}
 
export default BroadCast;