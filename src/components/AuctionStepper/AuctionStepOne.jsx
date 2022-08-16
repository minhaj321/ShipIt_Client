import React, { useState } from 'react';
import {Formik, Form,Field} from'formik';
import * as Yup from 'yup' 
import Textfield from './../Fields/Textfield'
import { Button,TextField,Typography,Modal,Box } from '@mui/material'
import './../../Styles/Login.css';
import './../../Styles/auctionStepOne.css';
import { Col, Row } from "react-bootstrap";
import {Cities} from './../Cities/Cities';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Map from '../LocationAndMap/Map';
import Location from '../LocationAndMap/Location';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  

const ActionStepOne = ({stepperUpdate,setStepperData}) => {

    let [pickupLattitude,setPickUpLattitude] = useState(0);
    let [pickupLongitude,setPickUpLongitude] = useState(0);
    let [dropOffLattitude,setDropOffLattitude] = useState(0);
    let [dropOffLongitude,setDropOffLongitude] = useState(0);
    let [locationType,setLocationType] = useState('pickup')
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [locationOpen, setLocationOpen] = useState(false);
    const handleLocationOpen = () => setLocationOpen(true);
    const handleLocationClose = () => setLocationOpen(false);
    const [cond,setCond] = useState(false);
    const [progress,setProgress] = useState(false);

    // style for location modal
  const childStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    maxHeight:200,
    p: 4,
  };


  var modalWidth = window.innerWidth > 450 ? "70%" : "50%";
 
  // fuction to handle from and to
    const handleLocations =(long,lati)=>{
        if(locationType=='pickup' ){
            pickupLattitude=lati;
            pickupLongitude=long;
            setPickUpLattitude(pickupLattitude);
            setPickUpLongitude(pickupLongitude);
        }
        else if(locationType=='dropoff'){
            dropOffLattitude=lati;
            dropOffLongitude=long;
            setDropOffLattitude(dropOffLattitude);
            setDropOffLongitude(dropOffLongitude);
        }
    }

    // schema for stepper 1 form
    const ActionPickupDropoff = Yup.object({
        pickupDate: Yup.date().required('PickUp Date is rquired'),
        pickupAddress: Yup.string().required("PickUp Address is required"),
        dropOffDate: Yup.date().required('Dropoff Date is required'),
        destinationAddress: Yup.string().required("Dropoff Address is required"),
        dropOffContactName: Yup.string().required("Dropoff Contact Name is required"),
        dropOffContactNumber: Yup.string().max(11,'Phone number should be of 11 digits').min(11,'Phone number should be of 11 digits').required('Phone Number is required'),
        destinationCity:Yup.string().required('Destination City required'),
        pickupCity:Yup.string().required('Departure City required')
  
    })

    // method to handle location type
    const handleLocationModals=(type)=>{
            setLocationType(type);
        handleOpen();
    }
      
    return ( 
        <div className="auction_step_one_main">

      {/* main modal */}
      <Modal
        align="center"
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}
          style={{ overflow: 'scroll' }} className="trip_creation_form"
        >
          <Map handleLocations={handleLocations} />
          <br />
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Select Your {locationType} location
          </Typography>
          <b>OR</b>
          <br />
          <p style={{cursor:'pointer'}} onClick={()=>handleLocationOpen()}><MyLocationIcon color="primary"/> My Current Location</p>    
          <Button
            variant="contained"
            color="secondary"
            style={{ width: "60px", fontSize: 10 }}
            onClick={() => handleClose()}
          >
            Back
          </Button>
          <Button
            variant="contained"
            color="primary"
            style={{ width: "140px", fontSize: 10, marginLeft: 10 }}
            onClick={() => handleClose()}
          >
            Confirm
          </Button>
        </Box>
      </Modal>


{/* child modal for location */}
<Modal
        align="center"
        open={locationOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={childStyle}
          style={{ overflow: 'scroll'}} className="trip_creation_form"
        >
          <Location handleLocations={handleLocations} />
          <Button
            variant="contained"
            color="primary"
            style={{ width: "140px", fontSize: 10, marginLeft: 10 }}
            onClick={() => handleLocationClose()}
          >
            My Location
          </Button>
        </Box>
      </Modal>

<Formik
initialValues={{
    pickupAddress:"",
}}

validationSchema={ActionPickupDropoff}
onSubmit={(values)=>{
  // submit method
  setCond(false)
  setProgress(true)
    if (
        pickupLattitude == 0 ||
        pickupLongitude == 0 ||
        dropOffLattitude == 0 ||
        dropOffLongitude == 0
      ) {
        setCond(true)
      } else {
    values={
        ...values,
        pickupLattitude:pickupLattitude+"",
        pickupLongitude:pickupLongitude+"",
        dropOffLattitude:dropOffLattitude+"",
        dropOffLongitude : dropOffLongitude+"",
    }
    setStepperData(values,false)
    stepperUpdate(1);
}
setProgress(false)

}}
>
{({errors})=>(
    <Form>
        <Row>
            <Col lg={{offset:1}}>
            <Row style={{marginTop:0}}>
                <Col xl={6} lg={7} md={10}>
                <h5>PICKUP DETAILS :</h5>
                </Col>
            </Row>
                    <Row>
                    <Col xl={6} lg={7} md={10}>
                            <Button
                            variant="contained"
                            color="dark"
                            style={{color:'#fff'}}
                            startIcon={<LocationOnIcon/>}
                            onClick={()=>handleLocationModals('pickup')}
                            >
                                Select PickUp
                            </Button>
                        </Col>  
                    </Row>
            <Row style={{marginTop:10}}>
                <Col xl={6} lg={7} md={10}>
            <Textfield  name="pickupDate" label="" type="date" width={"96%"} required/>
                </Col>
            </Row>
            <Row style={{marginTop:20}}>
                <Col xl={6} lg={7} md={10}>
                <Textfield  name="pickupTime" label="" type="time" width={"96%"}/>
                </Col>
            </Row>
            <Row style={{marginTop:20}}>
                <Col xl={6} lg={7} md={10}>
                <Textfield  name="pickupAddress" label="Pickup Address" type="text" width={"96%"}/>
                </Col>
            </Row>
            <Row style={{marginTop:20}}>
                <Col xl={6} lg={7} md={10}>
                <br />
                    <Field name="pickupCity" component="select" style={{border:'0px solid',borderBottom:'1px gray solid',width:"96%",
                    color:'grey',marginLeft:7}}>          
                          <option value="">None</option>
                      {
                        Cities.map((v)=>(
                          <option value={v}>{v}</option>
                        ))
                      }
                    </Field>
                    {errors.pickupCity &&
                        <p style={{color:'red' , fontSize:12}}>{errors.pickupCity}</p>
                      }
                </Col>              
            </Row>
            </Col>
            <Col lg={{span:5}} md={6}>
            <Row style={{marginTop:0}}>
                <Col xl={6} lg={8} md={10}>
                <h5>DROPOFF DETAILS :</h5>
                </Col>
            </Row>
                    <Row>
                    <Col xl={6} lg={8} md={10}>
                            <Button
                            variant="contained"
                            color="dark"
                            style={{color:'#fff'}}
                            startIcon={<LocationOnIcon/>}
                            onClick={()=>handleLocationModals('dropoff')}
                            >
                                Select DropOff
                            </Button>
                        </Col>  
                    </Row>
            <Row style={{marginTop:20}}>
                <Col xl={6} lg={7} md={10}>
            <Textfield  name="dropOffDate" label="" type="date" width={"96%"} required/>
                </Col>
            </Row>
            <Row style={{marginTop:20}}>
                <Col xl={6} lg={7} md={10}>
                <Textfield  name="dropOffTime" label="" type="time" width={"96%"}/>
                </Col>
            </Row>
            <Row style={{marginTop:20}}>
                <Col xl={6} lg={7} md={10}>
                <Textfield  name="destinationAddress" label="DropOff Address" type="text" width={"96%"}/>
                </Col>
            </Row>
            <Row style={{marginTop:20}}>
                <Col xl={6} lg={7} md={10}>
                <Textfield  name="dropOffContactName" label="DropOff Contact Name" type="text" width={"96%"}/>
                </Col>
            </Row>
            <Row style={{marginTop:20}}>
                <Col  xl={6} lg={7} md={10}>
                <Textfield  name="dropOffContactNumber" label="DropOff Contact Number" type="text" width={"96%"}/>
                </Col>
            </Row>
            <Row style={{marginTop:20}}>
                <Col xl={6} lg={7} md={10}>
                  <br />
                    <Field name="destinationCity" component="select" style={{border:'0px solid',borderBottom:'1px gray solid',width:'96%',
                    color:'grey',marginLeft:7}}>          
                          <option value="">None</option>
                      {
                        Cities.map((v)=>(
                          <option value={v}>{v}</option>
                        ))
                      }
                    </Field>
                    {errors.destinationCity &&
                        <p style={{color:'red' , fontSize:12}}>{errors.destinationCity}</p>
                      }                
                </Col>
            </Row>
            <Row>
            {
  cond &&
  <Col  md={{span:6}}>
  <Alert severity="error">
    <AlertTitle>Location Error</AlertTitle>
    Please select your locations
  </Alert>
</Col>
}
    {
  progress &&
  <Col  md={{span:4,offset:6}}>
  <Alert severity="success">
    <AlertTitle>Wait</AlertTitle>
    Loading...
  </Alert>
</Col>
}
            </Row>
            <Row>
                <Col  md={{ span: 3, offset: 7 }}>
        <Button variant='contained' color='primary' type='submit'  style={{ width: "96%" }}>Proceed</Button>
                </Col>
            </Row>            
            <br />
            </Col>
        </Row>
            </Form>
    )}
    </Formik>

        </div>
     );
}
 
export default ActionStepOne;

