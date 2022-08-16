import React, { useState, useCallback } from "react";
import './Map.css'
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
  InfoBox,
  DirectionsRenderer
} from "@react-google-maps/api";


const TripRoute = ({departurelati,departurelongi,destinationlati,destinationlongi}) => {
    const [map, setMap] = useState(null);
    const [longitude, setLongitude] = useState(67.1229252);
    const [latitude, setLatitude] = useState(24.9515433);
    var [startData,setStartData] = useState({});


var origin;
var destination;


if(window.google){
  var directionsService = new window.google.maps.DirectionsService();
}

// start point direction
if(window.google){
  origin = { lat: parseFloat(departurelati), lng: parseFloat(departurelongi) };
  destination = { lat:parseFloat(destinationlati) , lng: parseFloat(destinationlongi) };
  
  directionsService.route(
    {
      origin: origin,
      destination: destination,
      travelMode: window.google.maps.TravelMode.DRIVING
    },
    (result, status) => {
      if (status === window.google.maps.DirectionsStatus.OK) {
        startData=result;
        setStartData(startData)
      } else {
      }
    }
  );
}



// api setting
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
  var outerWidth = window.outerWidth;

  // ui setting w.r.t view width
  var style={};
  if(outerWidth>1030){
    style={
      height:800,width:900,align:'center',
      margin:'auto'

    }
  }
  else if(outerWidth>780){
    style={
      height:400,width:700,align:'center',
      // marginLeft:-100,
      margin:'auto'
    }
  }
  else if(outerWidth>450){
    style={
      height:300,width:400,align:'center',
      margin:'auto'
      // marginLeft:-50,
    }
  }
  else if(outerWidth>380){
    style={
      height:300,width:320,align:'center',
      marginLeft:-10,
      margin:'auto',
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
return (
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
          <DirectionsRenderer directions={startData} />          
        </GoogleMap>
      ) : (
        <></>
      )}
      {/* end of integration */}
    </div>    )
}

export default TripRoute
