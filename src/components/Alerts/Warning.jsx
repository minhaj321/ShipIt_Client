import React,{useState} from 'react';
import Alert from '@mui/material/Alert';
const Warning = ({text}) => {
  const [show,setShow] =useState(true);
  return (
    <div>   
    { show &&
    <Alert  onClose={() => {setShow(!show)}} severity="warning">{text}</Alert>
      }
  </div>
  )
}
 
export default Warning;



// for testing, add it in app.js
{/* <AlertComponent color="info" text="You have a new offer"/> */}
 