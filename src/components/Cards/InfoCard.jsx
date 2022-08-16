import React,{useState} from 'react'
import './Cards.css'
import axios from 'axios';
import {Button} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import {Root} from './../../Config/root.js';

const InfoCard = ( {title,count,route,accountType} ) => {


    const [alertText,setAlertText] = useState(false);
    var navigate = useNavigate();
    var userAccountType = localStorage.getItem('accountType');
    var user = JSON.parse(localStorage.getItem('user'));

const handleNavigate=async()=>{
    if(userAccountType=='Carrier'){
        if(accountType=='Carrier'){
            navigate(route)
        }else{
            localStorage.setItem('accountType',"Shipper")
            navigate(route)
            window.location.reload();
        }
    }else if(userAccountType=='Shipper'){
        if(accountType=='Shipper'){
            navigate(route)
        }else{
            var {data}  =await axios.post(`${Root.production}/user/getUserById`,{
                accountId : user.account._id
            })
            if(data.status==200){
                console.log(data)
                if(data.message.carrierRole==true){
                    localStorage.setItem('accountType',"Carrier")
                    navigate(route)
                    window.location.reload();
                }
                else{
                    setAlertText(true);
                }
            }
        }
    }
}

    return (
        <div className="infoCard_main">
           <div style={{fontFamily:'sans-serif'}}>
            <h3>{title}</h3>
            <h5>{count==-1 ? 'Loading' : count}</h5>
            {
                alertText!="" &&
                <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                You don't have carrier account yet.
              </Alert>
            
            }
            <Button color="primary"
            style={{fontWeight:'bold'}} 
            onClick={()=>handleNavigate()}
            >View More &gt;&gt;</Button>
            </div>
        </div>
    )
}

export default InfoCard
