import React from 'react'
import {Button} from '@mui/material';
import businessAccountAvatar from './../../Assets/businessAccountAvatar.png';
import IndividualAccountAvatar from './../../Assets/IndividualAccountAvatar.png';
import { useNavigate } from 'react-router-dom';
import './AccountCard.css';
const AccountCard = ({btnText,accountHeading,accountDesc,disabled,individual,type,accType}) => {

const navigate = useNavigate();
    
const HandleSelection = (accType)=>{
    navigate(type,{state:{accountType:accType}});
}
    return (
        <div style={{position:"absolute"}}>
            <div className="accountCard" style={{marginLeft:50,marginTop:50,width:350,height:500 ,padding:30, border:'1px solid darkgray'
            ,borderRadius:'2%'}}>
                <div 
                className="cardAvatar"
                style={{
                    background:'lightgreen',marginTop:-90,marginLeft:95,borderRadius:"50%",width:100,height:100,
                    }}>
                        <img className="cardImg" src={individual ? IndividualAccountAvatar : businessAccountAvatar} alt="Account avatar" width='90px' height='90px'/>
                    </div>
                <h4 style={{marginTop:40}}>{accountHeading}</h4>
                <p style={{marginTop:50}}>{accountDesc}</p>
                <Button variant="contained" color="success" style={{fontSize:12,top:260,position:'relative'}} disabled={disabled}
                onClick={()=>HandleSelection(accType)}
                >
                    {btnText}
                </Button>
            </div> 
        </div>
    )
}

export default AccountCard
