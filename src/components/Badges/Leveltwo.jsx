import React from 'react';
import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import './Badge.css';


const shapeStyles = { bgcolor: 'primary.main', width: 100, height: 100 };
const shapeCircleStyles = { borderRadius: '50%' };

export default function BadgeLevelTwo() {
  return (
      <Badge className="level_badge leveltwo_badge" color="warning" overlap="circular" badgeContent="LEVEL TWO">      
         <Box component="span" >
          <img className="avatar_badge" src="https://cdn.pixabay.com/photo/2015/06/19/21/24/avenue-815297__340.jpg" alt="Profile Picture" />
        </Box>
      </Badge>
  );
}