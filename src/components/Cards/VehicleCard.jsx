import Active from '../Status/Active';
import Pending from '../Status/Pending';
import { useNavigate } from "react-router-dom";
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions,Box } from '@mui/material';
import './Cards.css';
export default function VehicleCard({myData,route}) {
  const navigate = useNavigate();

  const setRoute = ()=>{
    navigate(route);
  }


  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        {/* <CardMedia
        className="card_image"
          component="img"
          height="140"
          image="https://cdn.pixabay.com/photo/2015/06/19/21/24/avenue-815297__340.jpg"
          alt="green iguana"
        /> */}
        <CardContent align="left">
          <Typography pt={2} pl={1} gutterBottom variant="p" component="div">
          Vehicle Id#{myData._id}
          </Typography>
          <Typography variant="body2" pt={1}  pl={1} color="text.secondary">
          Manufacturer : {myData.manufacturer}
          </Typography>
          <Typography variant="body2" pt={1}  pl={1} color="text.secondary">
          Model : {myData.model}
          </Typography>
          <Typography variant="body2" pt={1}  pl={1} color="text.secondary">
          Model Year : {myData.year}
          </Typography>
          <Typography variant="body2" pt={1}  pl={1} color="text.secondary">
          Status : {myData.status=='Active' ? <Active/> : <Pending/>}
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