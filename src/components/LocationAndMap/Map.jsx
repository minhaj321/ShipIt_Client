import React, { useState, useCallback } from "react";
import './Map.css'
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
  InfoBox,
} from "@react-google-maps/api";

const Map = ({handleLocations}) => {
  const [map, setMap] = useState(null);
  const [longitude, setLongitude] = useState(67.1229252);
  const [latitude, setLatitude] = useState(24.9515433);

  // api setting
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDhX60syaCg5jYirejPmeWfLHubpa2kPXo",
  });

  // map configuration
  var containerStyle;
  if(window.innerWidth>330){
    
    // container size
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

  return (
    <div 
    className="map"
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
          {/* Child components, such as markers, info windows, etc. */}

          <Marker
            draggable
            icon={{
              // url:'data:image/png;base64,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',
              // anchor: new window.google.maps.Point(-87, 46),

              scaledSize: new window.google.maps.Size(37, 37),
            }}
            position={center}

            onDragEnd={(coords) => {
              handleLocations(coords.latLng.lng(),coords.latLng.lat())
              setLatitude(coords.latLng.lat());
              setLongitude(coords.latLng.lng())

            }}
          >

            <InfoWindow>
              <div style={{ color: "black" }}>Drag Marker</div>
            </InfoWindow>
          </Marker>
        </GoogleMap>
      ) : (
        <></>
      )}
      {/* end of integration */}
    </div>
  );
};

export default Map;
