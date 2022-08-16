import {Root} from './../Config/root.js';
import React,{useState,useEffect} from 'react'
import Title from './../components/Title/Title';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import Location from './../components/LocationAndMap/Location';
import ActiveTimeline from "../components/Timeline/Timeline";
import { Col, Row } from "react-bootstrap";
import InfoIcon from '@mui/icons-material/Info';
import {Colors} from './../components/Colors/Colors';
import {Modal,Button,Box} from '@mui/material';
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

const CurrentShipments = () => {

    var {id} =useParams();

    var [shipmentsList, setShipmentsList] = useState([]);
    var [shipmentData, setShipmentData] = useState([]);
    var [departureLattitude, setDepartureLatitude] = useState(0);
    var [departureLongitude, setDepartureLongitude] = useState(0);
    var [cond, setCond] = useState(false);
    var [loading, setLoading] = useState(false);
    var [sortCond,setSortCond] =useState(false);
    var [showModal,setShowModal] = useState(false);
    var [remainedArray,setRemainedArray] = useState([])
    var [shipmentsIdArray,setShipmentsIdArray] = useState([])
    var [newShipmentList,setNewShipmentList] = useState([]);

  //styles for modal
    const style = {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 500,
      bgcolor: "background.paper",
      border: "2px solid #000",
      boxShadow: 24,
      height:500,
      p: 4,
    };
    
    // getting shipment details
    useEffect(async()=>{
      setCond(false)
      setLoading(true)
            if(departureLattitude!=0 && departureLongitude !=0){
        var {data} = await axios.post(`${Root.production}/trip/getShipmentOffersByCarrier`,{
            carrierId : id
        })
        if(data.status==200){
            // start
            newShipmentList=[]
            shipmentData=[]
            remainedArray=[]
            shipmentsIdArray=[]; 
            var count=1;
            for (let i = 0; i < data.message.length; i++) {

                // completion of insertion
                // initialization of shipmentData setting
                if (data.message[i].status == "Active") {
                  var shipmentsObj = await axios.post(
                    `${Root.production}/trip/viewShipmentOfferDetails`,
                    { shipmentOfferId: data.message[i]._id }
                  );
                  // inset in array
                  shipmentsList.push(shipmentsObj.data.message);
                  // pushing types
                  await shipmentData.push({
                    shipmentStatus: shipmentsObj.data.message.shipmentOffer.status,
                    packageId: shipmentsObj.data.message.package._id,
                    count:count,
                    shipmentId: shipmentsObj.data.message.shipmentOffer._id,
                    longitude: parseFloat(
                      shipmentsObj.data.message.shipmentOffer.pickupLongitude
                    ),
                    latitude: parseFloat(
                      shipmentsObj.data.message.shipmentOffer.pickupLattitude
                    ),
                    packageStatus: shipmentsObj.data.message.package.packageStatus,
                    longDiff:
                      parseFloat(
                        shipmentsObj.data.message.shipmentOffer.pickupLongitude
                      ) - departureLongitude,
                    latiDiff:
                      parseFloat(
                        shipmentsObj.data.message.shipmentOffer.pickupLattitude
                      ) - departureLattitude,
                    type: "from",
                  });
                  await shipmentData.push({
                    shipmentStatus: shipmentsObj.data.message.shipmentOffer.status,
                    accountId: shipmentsObj.data.message.shipmentOffer.accountId,
                    packageId: shipmentsObj.data.message.package._id,
                    count:count,
                    shipmentId: shipmentsObj.data.message.shipmentOffer._id,
                    longitude: parseFloat(
                      shipmentsObj.data.message.shipmentOffer.dropOffLongitude
                    ),
                    latitude: parseFloat(
                      shipmentsObj.data.message.shipmentOffer.dropOffLattitude
                    ),
                    packageStatus: shipmentsObj.data.message.package.packageStatus,
                    longDiff:
                      parseFloat(
                        shipmentsObj.data.message.shipmentOffer.dropOffLongitude
                      ) - departureLongitude,
                    latiDiff:
                      parseFloat(
                        shipmentsObj.data.message.shipmentOffer.dropOffLattitude
                      ) - departureLattitude,
                    type: "to",
                  });
                  count++;
                }
                // ending of shipmentData setting
              }
              if(sortCond ==false){
              if(shipmentData) {
                setSortCond(true);
                // sorting of array as per longitude and latitude distance
                shipmentData.sort((a, b) => {
                  if (a.longDiff < b.longDiff) {
                    return -1;
                  }
                  if (a.longDiff > b.longDiff) {
                    return 1;
                  }
                  if (a.latiDiff < b.latiDiff) {
                    return -1;
                  }
                  if (a.latiDiff > b.latiDiff) {
                    return 1;
                  }
                  return 0;
                });
                
            // begining of pickup and dropoff sorting
            setShipmentsList([]);
            shipmentsIdArray=[]; 
            
            // sorting list to render
            for(let i=0;i<shipmentData.length;i++){
              if(shipmentData[i].type==='from'){
                newShipmentList.push(shipmentData[i]);
                shipmentsIdArray.push(shipmentData[i].shipmentId)
              }
              else if(shipmentData[i].type==='to'){
                var indexIs= shipmentsIdArray.findIndex((val)=>val===shipmentData[i].shipmentId)
                if(indexIs!=-1){
                  newShipmentList.push(shipmentData[i]);
                  shipmentsIdArray.push(shipmentData[i].shipmentId)
                }
                else{
                  remainedArray.push(shipmentData[i])
                }
              }
            }
            remainedArray.map((v,i)=>{
              newShipmentList.push(v);
            })
              }
            }
              setShipmentsList(shipmentsList);
              setNewShipmentList(newShipmentList)
              setShipmentData(shipmentData);
              setCond(true);
    } }
    setLoading(false)
    },[departureLattitude])

    // method to handle locations
    const handleLocations =(long,lati)=>{
          departureLattitude=lati;
            departureLongitude=long;
            setDepartureLatitude(departureLattitude);
            setDepartureLongitude(departureLongitude);
    }

    return (
      <>
      
      {/* modal to display color code */}
      <Modal
        open={showModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        align="center"
        
      >
        <Box sx={style}>
          <h3>
            Colors List:
          </h3>
          <br />
          <div style={{overflow:'scroll',height:'75%',marginTop:-10}}>
          {
            Colors.map((v,i)=>(
                <Row>
                  <Col md={6}> <div style={{height:20,width:150,background:v}}></div> </Col>
                  <Col md={6}>User {i+1}</Col>
                </Row>
            ))
          }
          </div>
          <Button
            style={{ marginTop: 7, marginLeft: 10, width: '30%' }}
            variant="contained"
            onClick={() => setShowModal(false)}
          >
            Close
          </Button>
        </Box>
      </Modal>
      {/* end of modal*/}

        <div>
            <Title title="Current Shipments" />
            <Row>
              <Col style={{textAlign:'right',marginRight:100}}
              onClick={()=>setShowModal(true)}
              >
              <InfoIcon style={{color:'#d6d6d6'}}/>
              </Col>
            </Row>
            <Location notShow={true} handleLocations={handleLocations}/>
            <Row>
          {
  loading &&
  <Col  md={{span:8,offset:2}}>
  <Alert severity="success">
    <AlertTitle>Wait</AlertTitle>
    Loading...
  </Alert>
</Col>
}            
</Row>
<Row>
          {
  (newShipmentList.length<0) &&
  <Col  md={{span:8,offset:2}}>
    You don't have any active shipment .
</Col>
}            

          </Row>
            { cond && (
                    <Row style={{marginTop:-30}}>
                      <Col md={12}>
            <ActiveTimeline
              shipmentData={newShipmentList}
              from={{
                longitude: departureLongitude,
                latitude: departureLattitude,
              }}
            />
          </Col>
        </Row>
      )}



        </div>
        </>
    )
}

export default CurrentShipments
