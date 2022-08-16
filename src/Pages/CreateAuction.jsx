import {Root} from './../Config/root.js';
import React,{useState} from 'react'
import Title from './../components/Title/Title';
import {Col,Row} from 'react-bootstrap';
import {Box,Stepper,Step,StepLabel} from '@mui/material';
import AuctionStepOne from './../components/AuctionStepper/AuctionStepOne';
import AuctionStepTwo from './../components/AuctionStepper/AuctionStepTwo';
import AuctionStepThree from './../components/AuctionStepper/AuctionStepThree';
import axios from 'axios';
import {useParams,useNavigate} from 'react-router-dom';
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import '../Styles/createAuction.css'
import io from 'socket.io-client';

// labels for stepper
const steps = [
    'Pickup & Dropoff Details',
    'Package Details',
    'Auction Details',
  ];

const CreateAuction = () => {

// getting user from storage
var user = JSON.parse(localStorage.getItem('user'));
const socket = io(`${Root.production}`)

var navigate = useNavigate()
const [stepperIndex,setStepperIndex] = useState(0); 
var [stepperData , setStepperData] =useState({});
const [cond,setCond] = useState(false);
const [textError,setTextError] = useState('');
const [progress,setProgress] = useState(false);
var {id} = useParams();

// update stepper using index
const UpdateStepper = (index)=>{
setStepperIndex(index)
}

// handle stepper data
const handleStepperData= async(val,index)=>{
  setCond(false)
  if(index){
    setProgress(true)
    stepperData={...stepperData,...val,
      accountId : id
    };
    setStepperData(stepperData);
    // BACKEND SETTINGS
try {
    // sending data to backend
    var {data} = await axios.post(`${Root.production}/auction/createAuction`,stepperData) 
    if(data.status==200){
      setCond(false)
      socket.emit('createAuction');
      navigate(`/dashboard/${user.account._id}`)
    }else{
      setTextError(data.message)
      setCond(true)
    }
      
} catch (error) {
  setTextError(error.message)
  setCond(true)
}
// end of try catch
  }
  else{
    stepperData={...stepperData,...val};
    setStepperData(stepperData);
  }
  setProgress(false)

}

    return (
        <div className='create-auction-page' style={{marginBottom:'50px'}} >
            <Title  title="Create A Shipment Auction"/>
            <Row><Col>
            <Box sx={{ width: '100%' }}>
      <Stepper activeStep={stepperIndex} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>            
    </Col> 
    </Row>
    <div style={{margin:'0px' , overflowx:'none'}}>
    {
        stepperIndex === 0 &&
    <AuctionStepOne stepperUpdate={UpdateStepper} setStepperData={handleStepperData}/>
    }
    {
        stepperIndex === 1 &&
    <AuctionStepTwo stepperUpdate={UpdateStepper} setStepperData={handleStepperData}/>
    }
    {
        stepperIndex === 2 &&
    <AuctionStepThree stepperUpdate={UpdateStepper} setStepperData={handleStepperData}/>
    }
     <Row>
     {
  progress &&
  <Col  md={{span:4,offset:6}}>
  <Alert severity="success">
    <AlertTitle>Wait</AlertTitle>
    Loading...
  </Alert>
</Col>
}
{
  cond &&
  <Col md={{span:4,offset:6}}>
  <Alert severity="error">
    <AlertTitle>Publish Error</AlertTitle>
    {textError}
  </Alert>
</Col>
}

            </Row>
    </div>           
        </div>
    )
}

export default CreateAuction
