import { useNavigate,useParams } from "react-router-dom";
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions,Box } from '@mui/material';
import Open from '../Status/Open';
import './Cards.css';

export default function AvailableTripsCard({tripData,route,notlogedIn}) {

  const navigate = useNavigate();


  const setRoute = ()=>{
    if(notlogedIn==true){
      localStorage.setItem('tripId',tripData._id)
    }
    navigate(route,{state:{tripData:tripData}});
  }

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>

        <CardContent align="left">
          <Typography pt={2} pl={1} gutterBottom variant="p" component="div">
          Trip Id # {tripData._id}
          </Typography>
          <Typography variant="body2" pt={1}  pl={1} color="text.secondary">
            From : {tripData.departureCity}
          </Typography>
          <Typography variant="body2" pt={1}  pl={1} color="text.secondary">
            To : {tripData.destinationCity}
          </Typography>
          <Typography variant="body2" pt={1}  pl={1} color="text.secondary">
            Status : <Open/>
          </Typography>
        </CardContent>
      <Box style={{cursor:'pointer'}} 
            onClick={()=>setRoute()}>
      <Typography  align="right" pr={2} variant="body2">View Details  &gt;</Typography>
      </Box>
      </CardActionArea>
      <CardActions style={{border:'1px solid #e4e4e4'}}>
      <Button color="primary" variant="contained" style={{borderRadius:'8%',fontSize:10}}
            onClick={()=>setRoute()}>
        Put Shipment Request
      </Button> 
      </CardActions>
    </Card>
  );
}