import Open from '../Status/Open';
import { useNavigate } from "react-router-dom";
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions,Box } from '@mui/material';
import './Cards.css';
import Closed from './../Status/Closed';
import Cancelled from './../Status/Cancelled';

export default function TripCard({tripData,route}) {

  const navigate = useNavigate();
  const setRoute = ()=>{
    navigate(route);
  }


  return (
    <Card sx={{ maxWidth: 345 }}  className="general-card">
      <CardActionArea>

        <CardContent align="left">
          <Typography pt={2} pl={1} gutterBottom variant="p" component="div">
          Trip Id#{tripData._id}
          </Typography>
          <Typography variant="body2" pt={1}  pl={1} color="text.secondary">
            From : {tripData.departureCity}
          </Typography>
          <Typography variant="body2" pt={1}  pl={1} color="text.secondary">
            To : {tripData.destinationCity}
          </Typography>
          <Typography variant="body2" pt={1}  pl={1} color="text.secondary">
            Status : {tripData.status=='Open' ? <Open/> : tripData.status=='Cancel' ? <Cancelled/> :
            <Closed/>}
          </Typography>
        </CardContent>
      <Box style={{cursor:'pointer'}} 
            onClick={()=>setRoute()}>
      <Typography  align="right" pr={2} variant="body2">View Details  &gt;</Typography>
      </Box>
      </CardActionArea>
      <CardActions/>
    </Card>
  );
}