import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {Cities} from './../Cities/Cities'

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function DropDown({width,type,inputLabel,setData,height,vehiclesArray}) {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);
  const [value, setValue] = React.useState('');
var names=[];

if(type=='city'){
  names=Cities;
}
else  if(type==='gender'){
    names = [
      'Male',
      'Female'
    ]
    }
else if(type==='auctionShipmentType'){
  names=['Electronics','Garments','Food','Glassware','Others...']
}
else if(type==='auctionDuration'){
  names=["1 day","2 day","3 day","4 day"]
}
else if(type==='complaint'){
  names = ['Late Delivery','Early Delivery','Out of Track','Parcel has Stolen'];
}
    else{
       names = [
        'Technology',
        'Food',
        'Textile',
        'Agriculture',
        'Electronics',
        'Crockery',
        'Others',
      ];
    
    }
    

  const handleChange = (event) => {
    setValue(event.target.value);


    setData(event.target.value)
  };




  return (
    <div>
      <FormControl variant="standard" sx={{ m: 1, width: '100%' }}>
        <InputLabel id="demo-simple-select-standard-label">{inputLabel}</InputLabel>
        <Select
         aria-placeholder="select me"
         style={height ? {height:height} : {},width? {width:width} :{}}
          value={value}
          onChange={handleChange}
          label="value"
        >
          {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, personName, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

    </div>
  );
}