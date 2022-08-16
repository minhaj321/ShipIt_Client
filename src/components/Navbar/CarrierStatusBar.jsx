import React,{useState} from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import './Navbar.css';

export default function CarrierStatusBar({handleDataFilter}) {

  return (
    <ButtonGroup variant="contained" aria-label="outlined primary button group" className="carrier-status-bar">
      <Button className="CarrierOfferBtns" style={{width:"170px"}} onClick={()=>handleDataFilter('All')}>All</Button>
      <Button className="CarrierOfferBtns" style={{width:"170px"}} onClick={()=>handleDataFilter('Active')}>Active</Button>
      {/* <Button className="CarrierOfferBtns" style={{width:"170px"}} onClick={()=>handleDataFilter('Pending')}>Pending</Button> */}
      <Button className="CarrierOfferBtns" style={{width:"170px"}} onClick={()=>handleDataFilter('Completed')}>Completed</Button>
      <Button className="CarrierOfferBtns" style={{width:"170px"}} onClick={()=>handleDataFilter('Waiting')}>Waiting</Button>
    </ButtonGroup>
  );
}