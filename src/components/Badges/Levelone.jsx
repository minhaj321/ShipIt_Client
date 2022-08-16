import React from 'react';
import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import './Badge.css';


const shapeStyles = { bgcolor: 'primary.main', width: 100, height: 100 };
const shapeCircleStyles = { borderRadius: '50%' };

export default function BadgeLevelOne({imgPath}) {
  return (
      <Badge className="level_badge levelone_badge" overlap="circular" 
      anchorOrigin={{horizontal : 'right',vertical : 'bottom'}} 
      badgeContent="LEVEL ONE">      
         <Box component="span" >
          <img className="avatar_badge" src={imgPath} alt="Profile Picture" />
        </Box>
      </Badge>
  );
}