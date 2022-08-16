import React,{useState} from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import './Navbar.css';

export default function AuctionNavbar({handleDataFilter}) {

  return (
    <ButtonGroup variant="contained" aria-label="outlined primary button group" className="auction-status-bar">
      <Button className="auction_filter_btn" style={{width:"170px"}} onClick={()=>handleDataFilter('All')}>Open</Button>
      <Button className="auction_filter_btn" style={{width:"170px"}} onClick={()=>handleDataFilter('Pending')}>Pending</Button>
    </ButtonGroup>
  );
}