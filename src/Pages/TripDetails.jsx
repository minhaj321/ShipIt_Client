import TripRoute from '../components/LocationAndMap/TripRoute';
import {Root} from './../Config/root.js';
import React, { useState, useEffect } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import Title from "../components/Title/Title";
import Open from "../components/Status/Open";
import Closed from "../components/Status/Closed";
import axios from "axios";
import "./../Styles/TripDetails.css";
import {accordionDetailsClasses, Button } from '@mui/material'
import moment from 'moment';
import Cancelled from "../components/Status/Cancelled";


const TripDetails = () => {
  var { id } = useParams();
  var [details, setDetails] = useState({});
  var [vehicleDetails, setVehicleDetails] = useState({});
  var navigate = useNavigate();
  
  //getting user from storage
  var user = JSON.parse(localStorage.getItem("user"));

  useEffect(async () => {
    // fetching trip by id
    var { data } = await axios.post(`${Root.production}/trip/getTripById`, {
      tripId: id,
    });
    if (data.status == 200) {
      details = data.message;
      // getting vehicle details
      var {data} = await axios.post(
        `${Root.production}/vehicle/getVehicleById`,
        { vehicleId: data.message.vehicleId }
      );
      if (data.status == 200) {
        vehicleDetails = data.message;
        setVehicleDetails(vehicleDetails);
        setDetails(details);
      }
    }

    //checking for closing of trips
    var today = moment().format('YYYY-MM-DD');
    var check = moment(today).isBefore(details.departureDate)
    if(today>details.departureDate && details.status == 'Open'){
      var {data} = await axios.post(`${Root.production}/trip/closeTrip`,{
        tripId : details._id
      })
      if(data.status==200){
      window.location.reload();
      }
    }
  }, [])

  // fuction to cancel trip
  const handleCancel = async()=>{
    var {data} =await axios.post(`${Root.production}/trip/cancelTrip`,{
      tripId:details._id
    });
    if(data.status==200){
      navigate(`/my-trips/${user.account._id}`);
    }
  }

  return (
    <div style={{ textAlign: "left" }} className="trip-details-main-div">
      <Title title={"Trip Details"} />
      <Row>
        <Col md={{span:3 , offset:1}} xs={6}>
          <span>
            Status : {details.status && details.status =='Open' ? <Open/> : 
             details.status =='Close' ? <Closed/> : <Cancelled/>} {" "}
          </span>
        </Col>
        {/* checking for open status of trip */}
        { details.status=='Open' &&
        <Col md={{ span: 2, offset: 3 }} xs={{offset:6,span:4}}>
        <Button color="info" variant="contained" style={{color:"#fff"}}
        onClick={()=>navigate(`/my-offers/${user.account._id}`,{state:{data:details.shipmentOffers}})}
        >View Offers</Button>
        </Col>
        }

        {/* checking for open status of trip */}
        { details.status=='Open' &&
        <Col md={{ span: 2}} xs={{offset:2,span:4}}>
        <Button color="google" variant="contained" style={{color:"#fff"}}
        onClick={()=>handleCancel()}
        >Cancel Trip</Button>
        </Col>          
        }

        {/* checking for open's others status of trip */}
        { details.status!='Open' &&
        <Col md={{span:3,offset:5}} xs={{span:5,offset:1}}>
        <Button color="info" variant="contained" style={{color:"#fff"}}
        onClick={()=>navigate(`/my-offers/${user.account._id}`,{state:{data:details.shipmentOffers}})}
        >View Offers</Button>
        </Col>
        }

        <br />
        <br />
        <hr />
      </Row>
      <Row>
        <Col md={{ span: 10, offset: 1 }}>
          <h3>Trip # {details ? details._id : <div>Loading... </div>}</h3>
        </Col>
      </Row>
      <Row>
        <Col md={{ span: 10, offset: 1 }}>
          <div
            style={{ background: "#E3E3E3", borderRadius: "2%", padding: 20 }}
          >
            <p>Departure City: {details ? details.departureCity : <div>Loading... </div>}</p>
            <p>Departure Address: {details ? details.departureAddress : <div>Loading... </div>}</p>
            <p>Destination City: {details ? details.destinationCity : <div>Loading... </div>}</p>
            <p>Destination Address: {details ? details.destinationAddress : <div>Loading... </div>}</p>
            <p>Departure Date : {details ? details.departureDate : <div>Loading... </div>}</p>
            <p>Departure Time : {details ? details.departureTime : <div>Loading... </div>}</p>
          </div>
        </Col>
      </Row>
      <Row>
        <Col md={{ span: 10, offset: 1 }}>
          <h3>Vehicle Details :</h3>
        </Col>
      </Row>
      <Row>
        <Col md={{ span: 10, offset: 1 }}>
          <div
            style={{ background: "#E3E3E3", borderRadius: "2%", padding: 20 }}
          >
            <p>VehicleId : {vehicleDetails ? vehicleDetails._id : <div>Loading... </div>}</p>
            <p>Manufacturer : {vehicleDetails ? vehicleDetails.manufacturer : <div>Loading... </div>}</p>
            <p>Model :{vehicleDetails ? vehicleDetails.model : <div>Loading... </div>}</p>
            <p>Year :{vehicleDetails ? vehicleDetails.year : <div>Loading... </div>}</p>
            <p>Number Plate :{vehicleDetails ? vehicleDetails.licensePlate : <div>Loading... </div>}</p>
          </div>
        </Col>
      </Row>
            <Row><Col md={{span:10,offset:1}}>
                  <TripRoute
                  departurelati={details.departureLattitude}
                  departurelongi={details.departureLongitude}
                  destinationlati={details.destinationLattitude}
                  destinationlongi={details.destinationLongitude}/>
            </Col></Row>
      <br />
      <br />
    </div>
  );
};

export default TripDetails;
