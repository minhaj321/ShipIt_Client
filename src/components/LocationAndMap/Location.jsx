import Geolocation from 'react-geolocation';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import React,{useState} from 'react'

const Location = ({handleLocations,notShow,repeat}) => {

  const [loc,setLoc] = useState(false)

  var options = {
    enableHighAccuracy: false,
    timeout: 10000,
    maximumAge: 0
  };

  // method afer success fetching
  function success(pos) {
    var crd = pos.coords;
    handleLocations(crd.longitude,crd.latitude)
  }
  
  // method after error
  function error(err) {
  }
  
  return (
        <div>
            <Geolocation      
render={({
    position: { coords: { latitude, longitude } = {} } = {},
    error,
    getCurrentPosition,
    watchPosition
  }  ) =>{
      handleLocations(longitude,latitude)
      if(repeat){
        navigator.geolocation.watchPosition(success,error)
      }
    setLoc(true)
    return(
 <div>
            <p
            style={{cursor:'pointer'}}
            onClick={()=>getCurrentPosition()}
            >
              {(notShow!=true) &&
                <MyLocationIcon color="primary"/> 
              }
              {(notShow!=true) &&
               <> My Current Location</>
              }

                </p>    
                 {(error) &&
        <div>
          <p>
          {error.message}
        {error.message==='User denied Geolocation' && ': Plase on your location'}
          </p>
        </div> }

        {
          (loc && !error && notShow!=true) &&
          <pre>
            We get your location
      </pre>
         }
    </div>
    )
  }  
  }
/>            
</div>
    )
}

export default Location
