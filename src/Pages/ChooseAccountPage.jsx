import React from 'react'
import NavBar from './../components/Navbar/Navbar';
import ChooseCarrierImg from './../Assets/choose_carrier.png';
import ChooseShipperImg from './../Assets/choose_shipper.png';
import './../Styles/chooseAccountPage.css';
import {useNavigate } from 'react-router-dom';
const ChooseAccountPage = () => {

    const navigate = useNavigate();
    return (
        <div>
        <NavBar />
        <div className="row">
            <div className="col-12 headings">
            <h1 style={{marginTop:40}}>Select One</h1>
            <p style={{marginTop:30,fontSize:20}}>I want to register as a ...</p>
            </div>
            <div className="row" >
                <div className="col-6 choose_img" style={{borderRight:"1px solid black"}}>
                <h2>Shipper</h2>
                <img src={ChooseShipperImg} alt=""   className="chooseAccountImg"
                 onClick={()=>navigate( '../AccountTypePage' , { state: { Selectedtype : 'shipper' } } )}/>
                </div>
                <div className="col-6 choose_img" style={{borderLeft:"1px solid black"}}>
                    <h2>Carrier</h2>
                    <img src={ChooseCarrierImg} alt=""   className="chooseAccountImg"
                 onClick={()=>navigate( '../AccountTypePage', { state: { Selectedtype : 'carrier' } }  )}/>
                </div>

            </div>
            </div>
        </div>
    )
}

export default ChooseAccountPage
