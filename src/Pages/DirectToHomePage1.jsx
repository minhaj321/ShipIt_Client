import React,{useEffect} from 'react'
import {useNavigate} from 'react-router-dom';

const DirectToHomePage1 = () => {
    var navigate = useNavigate();

    var user = JSON.parse(localStorage.getItem('user'));
useEffect(()=>{

    navigate(`/dashboard/${user.account._id}`);

},[])

    return (
        <div>
            Loading...
        </div>
    )
}

export default DirectToHomePage1
