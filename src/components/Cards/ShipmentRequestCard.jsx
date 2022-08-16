import Waiting from './../Status/Waiting';
import Completed from './../Status/Completed';
import Active from './../Status/Active';
import Cancelled from './../Status/Cancelled';
import Pending from './../Status/Pending';
import Closed from './../Status/Closed';
import { useNavigate } from "react-router-dom";
import React,{useState,useEffect} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions,Box } from '@mui/material';
import './Cards.css';

export default function ShipmentRequestCard({myData,route}) {


  const navigate = useNavigate();

  const setRoute = ()=>{
    navigate(route);
  }


  return (
    <Card className="general-card">
      <CardActionArea>
        <CardContent align="left">
          <Typography pt={2} pl={1} gutterBottom variant="P" component="div">
          Request Id# {myData._id}
          </Typography>
          <Typography variant="body2" pt={1}  pl={1} color="text.secondary">
            From : {myData.pickupCity}
          </Typography>
          <Typography variant="body2" pt={1}  pl={1} color="text.secondary">
            To : {myData.destinationCity}
          </Typography>
          <Typography variant="body2" pt={1}  pl={1} color="text.secondary">
            Status : {myData.status=='Active' ? <Active/> : 
            myData.status=="Pending" ? <Pending/> : myData.status=='Waiting' ? <Waiting/> :
            myData.status=='Cancelled' ? <Cancelled/> : myData.status=='Completed' ? <Completed/> :
            <Closed/> }
          </Typography>

        </CardContent>
      <Box style={{cursor:'pointer'}} 
            onClick={()=>setRoute()}>
      <Typography  align="right" pr={2} variant="body2">View Details  &gt;</Typography>
      </Box>
      </CardActionArea>
      <CardActions>
      </CardActions>
    </Card>
  );
}
