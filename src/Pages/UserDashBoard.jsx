import React, { useEffect, useState } from "react";
import DashboardTitle from "../components/Title/DashboardTitle";
import { Col, Row, Container } from "react-bootstrap";
import axios from "axios";
import {useParams} from "react-router-dom";
import './../Styles/userDashboard.css';
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import InfoCard from './../components/Cards/InfoCard';
import {Root} from './../Config/root';

const UserDashBoard = () => {
  
  const [activeShipments,setActiveShipments]  =useState(-1)
  const [pendingShipments,setPendingShipments]  =useState(-1)
  const [completeShipments,setCompleteShipments]  =useState(-1)
  const [activeOrders,setActiveOrders]  =useState(-1)
  const [pendingOrders,setPendingOrders]  =useState(-1)
  const [completeOrders,setCompleteOrders]  =useState(-1)
  const [pendingTrips,setPendingTrips]  =useState(-1)
  const [cancelledTrips,setCancelledTrips]  =useState(-1)
  const [closedTrips,setClosedTrips]  =useState(-1)
  const [textError,setTextError] = useState('');
  const [cond,setCond] = useState(false);
  const [progress,setProgress] = useState(false);

  //getting user from storage
  var user = JSON.parse(localStorage.getItem("user"));
  var userId = user.account._id;


  useEffect(async()=>{

    // ACTIVEORDERS
    var {data} = await axios.post(`${Root.production}/trip/countCarrierActiveShipment`,{carrierId:userId})
    if(data.status==200){
      setActiveOrders(data.message)
    }

    // Active Shipments
    var {data} = await axios.post(`${Root.production}/trip/countShipperActiveShipment`,{accountId:userId})
    if(data.status==200){
      setActiveShipments(data.message)
    }
    
    // PENDING ORDERS
    var {data} = await axios.post(`${Root.production}/trip/countCarrierPendingShipment`,{carrierId:userId})
    if(data.status==200){
      setPendingOrders(data.message)
    }
    
    // PENDING shipments
    var {data} = await axios.post(`${Root.production}/trip/countCarrierShipperPendingShipment`,{accountId:userId})
    if(data.status==200){
      setPendingShipments(data.message)
    }
    
    // completed ORDERS
    var {data} = await axios.post(`${Root.production}/trip/countCarrierCompleteShipment`,{carrierId:userId})
    if(data.status==200){
      setCompleteOrders(data.message)
    }
    
    // completed shipments
    var {data} = await axios.post(`${Root.production}/trip/countCarrierShipperCompleteShipment`,{accountId:userId})
    if(data.status==200){
      setCompleteShipments(data.message)
    }
    
    // active trips
    var {data} = await axios.post(`${Root.production}/trip/countCarrierActiveTrips`,{carrierId:userId})
    if(data.status==200){
      setPendingTrips(data.message)
    }

    // closed trips
    var {data} = await axios.post(`${Root.production}/trip/countCarrierClosedTrips`,{carrierId:userId})
    if(data.status==200){
      setClosedTrips(data.message)
    }   

    // cancel trips
    var {data} = await axios.post(`${Root.production}/trip/countCarrierCancelledTrips`,{carrierId:userId})
    if(data.status==200){
      setCancelledTrips(data.message)
    }

  },[])

  return (
    <div className="main-dashboard">
      <DashboardTitle title={`Welcome Back`} />
      <Row>

     {
  progress &&
  <Col md={{span:8,offset:2}}>
  <Alert severity="success">
    <AlertTitle>Wait</AlertTitle>
    Loading...
  </Alert>
</Col>
}
{
  cond &&
  <Col md={{span:8,offset:2}}>
  <Alert severity="error">
    <AlertTitle>Error</AlertTitle>
    {textError}
  </Alert>
</Col>
}
<Row style={{marginTop:0}}>
  <Col md={4}><InfoCard accountType={"Carrier"} title={"Active Trips"} count={pendingTrips} route={`/my-trips/${user.account._id}`} /></Col>
  <Col md={4}><InfoCard accountType={"Carrier"} title={"Cancelled Trips"}  count={cancelledTrips} route={`/my-trips/${user.account._id}`}/></Col>
  <Col md={4}><InfoCard accountType={"Carrier"} title={"Closed Trips"}  count={closedTrips} route={`/my-trips/${user.account._id}`}/></Col>
</Row>
<Row>
  <Col md={4}><InfoCard accountType={"Shipper"} title={"Active Shipment"} count={activeShipments} route={`/my-shipments/${user.account._id}`} /></Col>
  <Col md={4}><InfoCard accountType={"Shipper"} title={"Pending Shipment"}  count={pendingShipments} route={`/my-shipments/${user.account._id}`}/></Col>
  <Col md={4}><InfoCard accountType={"Shipper"} title={"Completed Shipment"}  count={completeShipments} route={`/my-shipments/${user.account._id}`}/></Col>
</Row>
<Row>
  <Col md={4}><InfoCard  accountType={"Carrier"} title={"Active Orders"} count={activeOrders} route={`/my-trips/${user.account._id}`} /></Col>
  <Col md={4}><InfoCard  accountType={"Carrier"} title={"Pending Orders"}  count={pendingOrders} route={`/my-trips/${user.account._id}`}/></Col>
  <Col md={4}><InfoCard  accountType={"Carrier"} title={"Completed Orders"}  count={completeOrders} route={`/my-trips/${user.account._id}`}/></Col>
</Row>
            </Row>
    </div>
  );
};

export default UserDashBoard;
