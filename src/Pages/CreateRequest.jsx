import {Root} from './../Config/root.js';
import React,{useState} from 'react'
import Title from './../components/Title/Title';
import {Col,Row} from 'react-bootstrap';
import {Box,Stepper,Step,StepLabel} from '@mui/material';
import ShipmentStepOne from './../components/ShipmentRequestStepper/ShipmentStepOne';
import ShipmentStepTwo from './../components/ShipmentRequestStepper/ShipmentStepTwo';
import {useLocation,useNavigate} from 'react-router-dom';
import axios from 'axios';
import './../Styles/CreateRequest.css';

// stepper labels
const steps = [
    'View Carrier Details',
    'Put Shipment Request',
  ];


const CreateRequest = () => {
const [stepperIndex,setStepperIndex] = useState(0); 
const [stepperOne , setStepperOne] =useState({});
const {state} =useLocation();
const navigate=useNavigate();

// stepper updation fuction
const UpdateStepper = (index)=>{
setStepperIndex(index)
}

// handle fuction to manage data
const setStepperData= async(val)=>{
  setStepperOne(val);
    // BACKEND SETTINGS
    var {data} = await axios.post(`${Root.production}/trip/createShipmentRequest`,val) 
    if(data.status===200){
      // navigate from here
      navigate(`/shipment-offer/${data.message._id}`)
    }
}

    return (
        <div className="create-request-main">
            <Title  title="Create A Shipment Request"/>
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
    <Row>
        <Col>
    {
        stepperIndex === 0 &&
    <ShipmentStepOne tripData={state.tripData} stepperUpdate={UpdateStepper} />
    }
    {
        stepperIndex === 1 &&
    <ShipmentStepTwo stepperUpdate={UpdateStepper} tripData={state.tripData} setStepperData={setStepperData}/>
    }

    </Col>
    </Row>            
        </div>
    )
}

export default CreateRequest
