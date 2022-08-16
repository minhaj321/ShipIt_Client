import {Root} from '../../Config/root';
import React, { useState ,useEffect} from 'react';
import { Button} from '@mui/material'
import { useParams} from 'react-router-dom';
import { Col, Row } from "react-bootstrap";
import Title from '../Title/Title';
import Open from '../Status/Open';
import axios from 'axios';
import TripRoute from '../LocationAndMap/TripRoute';

const ShipmentStepOne = ({stepperUpdate,tripData}) => {

    let [vehicle, setVehicle] = useState();
    const [spinner,setSpinner] = useState(false)

  var {id} = useParams(); 
  // getting and setting data
  var user = JSON.parse(localStorage.getItem('user'));
    var vehicleId=tripData.vehicleId;

    useEffect(async ()=>{
      var {data} = await axios.post(`${Root.production}/vehicle/getVehicleById`,{vehicleId:vehicleId});
      if(data.status==200){
        setVehicle(data.message)
      }
    },[])


const handleClick =()=>{
  setSpinner(true)
    stepperUpdate(1);
}

    return ( 
        <div style={{textAlign:'left'}}>

            {/* start */}
            <Title title={`Trip # ${id}`} />
            <Row>
                <Col md={{span:3 , offset:1}}>
                <span>Status : <Open/> </span>
                </Col>
                <br />
                <br />
                <hr/>
            </Row>

            <Row style={{marginTop:0}}><Col md={{span:10,offset:1}}>
            <h3>Carrier Details :</h3>
            </Col></Row>
            <Row><Col md={{span:10,offset:1}}>
            <div style={{background : '#E3E3E3',borderRadius:"2%",padding:20}}
            >
                <p>CarrierId : {tripData.accountId}</p>

            </div>            
            </Col></Row>
            <Row><Col md={{span:10,offset:1}}>
            <h3>Trip Details :</h3>
            </Col></Row>
            <Row><Col md={{span:10,offset:1}}>
            <div style={{background : '#E3E3E3',borderRadius:"2%",padding:20}}
            >
                <p>Trip Id : {tripData._id} :</p>
                <p>Contact Number : {user.account.phoneNumber}</p>
                <p>From: {tripData.departureCity}</p>
                <p>To: {tripData.destinationCity}</p>
                <p>Departure : {tripData.departureAddress}</p>
                <p>Destination : {tripData.destinationAddress}</p>
                <p>Departure Date : {tripData.departureDate}</p>
                <p>Departure Time : {tripData.departureTime}</p>
            </div>            
            </Col></Row>
            <Row><Col md={{span:10,offset:1}}>
            <h3>Route :</h3>
            </Col></Row>
            <Row><Col md={{span:10,offset:1}}>
                  <TripRoute
                  departurelati={tripData.departureLattitude}
                  departurelongi={tripData.departureLongitude}
                  destinationlati={tripData.destinationLattitude}
                  destinationlongi={tripData.destinationLongitude}/>
            </Col></Row>     
            <Row><Col md={{span:10,offset:1}}>
            <h3>Vehicle Details :</h3>
            </Col></Row>
            <Row><Col md={{span:10,offset:1}}>
              {
                vehicle && (
                  <div style={{background : '#E3E3E3',borderRadius:"2%",padding:20}}
            >
                <p>VehicleId : {vehicle._id}</p>
                <p>Manufacturer : {vehicle.manufacturer}</p>
                <p>Model :{vehicle.model}</p>
                <p>Year :{vehicle.year}</p>
                <p>Number Plate :{vehicle.licensePlate}</p>
            </div> 
                )
              }
                       
            </Col></Row>
            <Row>
                <Col  md={{ span: 2, offset: 9 }}  xs={{ span: 3, offset: 8 }}>
        <Button variant='contained' onClick={()=>handleClick()} color='primary' 
        type='submit'  style={{ width: "75%" }}
        disabled={tripData.accountId==user.account._id}
        >{'Proceed'}</Button>
                </Col>
            </Row>            
      <br /><br />
            {/* end */}
        </div>
     );
}
 
export default ShipmentStepOne;

