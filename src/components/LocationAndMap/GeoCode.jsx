import Geocode from "react-geocode";
import React,{useState,useEffect} from 'react';

Geocode.setApiKey("AIzaSyDhX60syaCg5jYirejPmeWfLHubpa2kPXo");
Geocode.setLanguage("en");


export function GeoCoder({lat,longi}){
    
    const [address,setAddress] = useState('');

    useEffect(()=>{
        Geocode.fromLatLng(lat,longi).then(
            (response) => {
                setAddress(response.results[1].address_components);
                console.log(address)
            },
            (error) => {
                console.error(error.message);
            }
            );
        },[lat,longi])
        return(
            <div>
                { address &&
                <p>
{address[0].long_name},{address[1].long_name},{address[2].long_name},{address[4].long_name},
{address[5].long_name},{address[6].long_name},{address[7].long_name}
</p>
}
            </div>
        )
}