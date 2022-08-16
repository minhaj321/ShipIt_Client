import React, { useState, useCallback,useEffect } from "react";
import './Map.css'
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
  InfoBox,
  DirectionsRenderer
} from "@react-google-maps/api";
import {Colors} from './../Colors/Colors';
import {Modal,Button,Box} from '@mui/material'
import { Col, Row } from "react-bootstrap";
import { setSeconds } from "date-fns";
import Location from './Location';

const RoutedMap = ({shipmentData,from,getTimes}) => {

  const [map, setMap] = useState(null);
    const [longitude, setLongitude] = useState(67.1229252);
    const [latitude, setLatitude] = useState(24.9515433);
    var [data,setData] = useState([]);
    var [startData,setStartData] = useState({});
    var [dataTime,setDataTime] = useState([]);
    var [startTime,setStartTime] = useState('');
    var [showDetails,setShowDetails] = useState(false)
    var [displayData,setDisplayData] = useState({})
    var [departureLattitude, setDepartureLatitude] = useState(0);
    var [departureLongitude, setDepartureLongitude] = useState(0);
    var [cond,setCond] = useState(false)
var origin;
var destination;
var lengthOfArray = shipmentData.length;

if(window.google){
  var directionsService = new window.google.maps.DirectionsService({
    suppressMarkers: true
  });
}

// handle location method    
const handleLocations =(long,lati)=>{
  departureLattitude=lati;
    departureLongitude=long;
    setDepartureLatitude(departureLattitude);
    setDepartureLongitude(departureLongitude);
}


// method to handle details modal
const handleDetailsModal=(val)=>{
  setDisplayData(val)
  setShowDetails(true)
}

  // start point direction
  if(window.google){
    origin = { lat: departureLattitude, lng: departureLongitude };
    destination = { lat:shipmentData[0].latitude , lng: shipmentData[0].longitude };
    
    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: window.google.maps.TravelMode.DRIVING
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          startData=result;
          setStartData(result)
          // setStartData(startData)
          startTime=result.routes[0].legs[0].duration.text;
          // setStartTime(startTime);
        } else {
          // console.error(`error fetching start directions ${result}`);
        }
      }
    );
  }

// middle points
        if(window.google){
      for(let i=0;i<lengthOfArray-1;i++){

     origin = { lat: shipmentData[i].latitude, lng: shipmentData[i].longitude };
     destination = { lat: shipmentData[i+1].latitude, lng: shipmentData[i+1].longitude };
            
            directionsService.route(
              {
                origin: origin,
                destination: destination,
                travelMode: window.google.maps.TravelMode.DRIVING
              },
              (result, status) => {
                if (status === window.google.maps.DirectionsStatus.OK) {
                  data.push(result);
                  dataTime=[...dataTime,result.routes[0].legs[0].duration.text];
                  setData(data)
                  // setDataTime(dataTime)
                } else {
                  // console.error(`error fetching directions ${result}`);
                }
              }
            );
            }
          }

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDhX60syaCg5jYirejPmeWfLHubpa2kPXo",
    
  });

  // map configuration
  var containerStyle;
  if(window.innerWidth>330){
    
    containerStyle = {
       width: "100%",
       height: "100%",
     };
  }
  else{
    containerStyle = {
      width: window.innerWidth-50,
      height: window.innerWidth-50,
    };
 } 
  const center = {
    lat: latitude,
    lng: longitude,
  };
  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

// function call
  // getTimes([startTime,...dataTime])
  var outerWidth = window.outerWidth;

  // styling as per view width
  var style={};
  if(outerWidth>1030){
    style={
      height:800,width:900,align:'center'
    }
  }
  else if(outerWidth>780){
    style={
      height:400,width:500,align:'center',
      marginLeft:-100,
    }
  }
  else if(outerWidth>450){
    style={
      height:300,width:400,align:'center',
      marginLeft:-50,
    }
  }
  else if(outerWidth>380){
    style={
      height:300,width:320,align:'center',
      marginLeft:-10,
      marginBottom:20
    }
  }
  else if(outerWidth>330){
    style={
      height:300,width:320,align:'center',
      marginLeft:-30,
      marginBottom:20
    }
  }
  else if(outerWidth<330){
    style={
      height:300,width:320,align:'center',
      marginLeft:-50,
      marginBottom:20
    }
  }
if(outerWidth>780){
  style={height:"100%",width:'100%',align:'center'}
}else{
  style={height:"90%",width:'100%',align:'center'}
}

// modal styles
const style1 = {
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
  backgroundColor:Colors[displayData?.count-1]
};


return (
  <>
            <Location notShow={true} handleLocations={handleLocations} repeat={true}/>
        {/* modal for details */}
        <Modal
        open={showDetails}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        align="center"
        
      >
        <Box sx={style1}>
          <h3  style={{color:'#fff'}}>
            User:
          </h3>
          <br />
          <div style={{overflow:'scroll',height:'75%',marginTop:-10}}>
                <Row>
                  <Col xs={12}><p style={{color:'#fff'}}>User {displayData.count}</p></Col>
                  <Col xs={12}><p style={{color:'#fff'}}>{displayData.type == 'from' ? 'Its a Recieving Point' : 'Its a dropoff Point'}</p></Col>
                  <Col xs={12}><p style={{color:'#fff'}}>shipmentStatus: {'\n' + displayData.shipmentStatus}</p></Col>
                  <Col xs={12}><p style={{color:'#fff'}}>packageStatus: {displayData.packageStatus=='dropped_off' ? `\nYou Dropped Your Parcel but Shipper Have not confirmed it yet` : displayData.packageStatus}</p></Col>
                  <Col xs={12}><p style={{color:'#fff'}}>Package Id: {displayData.packageId}</p></Col>
                  <Col xs={12}><p style={{color:'#fff'}}>shipment Id: {displayData.shipmentId}</p></Col>
                </Row>
          </div>
          <Button
            style={{ marginTop: 7, marginLeft: 10, width: '30%' }}
            variant="contained"
            onClick={() => setShowDetails(false)}
          >
            Close
          </Button>
        </Box>
        {/* end of verify condition */}
      </Modal>
      {/* end of feedback modal*/}

    <div 
    style={style}
>
      {/* beginning of map ui integration  */}

      {isLoaded ? (
        <GoogleMap
        // style={{width:"100%"}}
          mapContainerStyle={containerStyle}
          center={center}
          zoom={15}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          <Marker 
          position={{lat:from.latitude,lng:from.longitude}}
          icon={{url:`http://maps.google.com/mapfiles/ms/icons/red-dot.png`,fillColor:'black',strokeColor:'black'}}
>
  <InfoWindow>
    <div>
      You are here
    </div>
  </InfoWindow>
</Marker>
<Marker 
          position={{lat:shipmentData[0].latitude,lng:shipmentData[0].longitude}}
          icon={{url:`http://maps.google.com/mapfiles/ms/icons/${Colors[shipmentData[0]?.count-1]}-dot.png`,fillColor:'black',strokeColor:'black'}}
          onClick={()=>handleDetailsModal(shipmentData[0])}
/>

          <DirectionsRenderer 
          options={{suppressMarkers:true}}
          directions={startData} 
          />
          { data && 
          data.map((v,i)=>{
              // if(i!=shipmentData.length-1){
              return(
              <DirectionsRenderer
              options={{suppressMarkers:true,polylineOptions:{
                strokeColor:'black'
              }}}
            
              directions={v} 
              />
              )
            }
            // }
              )
            }
            {
            shipmentData.map((v,i)=>{
              // alert(i)
              if(i!=shipmentData.length-1){

                return(
    <Marker 
              position={{lat:shipmentData[i+1]?.latitude,lng:shipmentData[i+1]?.longitude}}
              icon={{url:`http://maps.google.com/mapfiles/ms/icons/${Colors[shipmentData[i+1]?.count-1]}-dot.png`}}
              onClick={()=>handleDetailsModal(shipmentData[i+1] ) }
    />
                )
              }
          }
            )
          }
        </GoogleMap>
      ) : (
        <></>
      )}
      {/* end of integration */}
    </div>    
    </>
    )
}

export default RoutedMap
