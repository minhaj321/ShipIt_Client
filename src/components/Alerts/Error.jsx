import React,{useState} from 'react';
import Alert from '@mui/material/Alert';
const Error = ({text}) => {
  const [show,setShow] =useState(true);
  return (
    <div>   
    { show &&
    <Alert  onClose={() => {setShow(!show)}} severity="error">{text}</Alert>
      }
  </div>
  )
}
 
export default Error;

