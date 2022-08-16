import Open from '../Status/Open';
import Closed from '../Status/Closed';
import Waiting from '../Status/Waiting';
import { useNavigate } from "react-router-dom";
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions ,Box} from '@mui/material';

export default function AuctionCard({myData,route}) {

  const navigate = useNavigate();
  const setRoute = ()=>{
    navigate(route);
  }


  return (
    <Card className="general-card">
      <CardActionArea>
        <CardContent align="left">
          <Typography pt={2} pl={1} gutterBottom variant="h6" component="div">
          Auction Id# {myData._id}
          </Typography>
          <Typography variant="body2" pt={1}  pl={1} color="text.secondary">
            From : {myData.pickupCity}
          </Typography>
          <Typography variant="body2" pt={1}  pl={1} color="text.secondary">
            To : {myData.destinationCity}
          </Typography>
          <Typography variant="body2" pt={1}  pl={1} color="text.secondary">
            Status : {myData.status=='Open' ? <Open/> : 
            myData.status=='Closed' ? <Closed/> : myData.status=='On Hold' ? <Waiting/> :
            <Closed/>}
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