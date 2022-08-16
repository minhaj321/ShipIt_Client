import React from "react";
import NavBar from "../components/Navbar/Navbar";
import AccountCard from "../components/AccountCard/AccountCard";
import './../Styles/ShipperAccountType.css';
import {useLocation} from 'react-router-dom';
const GeneralAccountType = () => {

  const {state} = useLocation();
  
  return (
    <div>
      <NavBar />
      <div className="row">
        <div className="col-12 headings">
      <h1 style={{ marginTop: 30 }}>Select One</h1>
      <p>I want to create a ...</p>
      </div>
      </div>
      <div className="row">
        <div className="col-md-4 col-12 first offset-md-2">
          <AccountCard
            btnText="Select Personal"
            accountHeading="PERSONAL ACCOUNT"
            accountDesc="Lorem ipsum dolor sit amet consectetur adipisicing elit."
            individual={true}
            disabled={false}
            type={`/buildIndividualAccount/${state.user.id}`}
            accType="Shipper"
          />
        </div>
        <div className="col-md-4 col-12 second">
          <AccountCard
            btnText="Select Professional"
            accountHeading="PROFESSIONAL ACCOUNT"
            accountDesc="Lorem ipsum dolor sit amet consectetur adipisicing elit."
            individual={false}
            disabled={true}
            type={`/BuildProfileProfessional/${state.user.id}`}
            accType="Shipper"
          />
        </div>
      </div>
    </div>
  );
};

export default GeneralAccountType;
