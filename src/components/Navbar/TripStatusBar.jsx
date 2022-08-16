import React,{useState} from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import './Navbar.css';

export default function TripStatusBar({handleDataFilter}) {

  return (
    <ButtonGroup variant="contained" aria-label="outlined primary button group" className="carrier-status-bar">
      <Button className="trip_btns" style={{width:"170px"}} onClick={()=>handleDataFilter('All')}>All</Button>
      <Button className="trip_btns" style={{width:"170px"}} onClick={()=>handleDataFilter('Open')}>Open</Button>
      <Button className="trip_btns" style={{width:"170px"}} onClick={()=>handleDataFilter('Close')}>Closed</Button>
      <Button className="trip_btns" style={{width:"170px"}} onClick={()=>handleDataFilter('Cancel')}>Cancelled</Button>
    </ButtonGroup>
  );
}