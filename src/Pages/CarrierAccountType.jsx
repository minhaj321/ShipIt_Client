import React from "react";
import NavBar from "./../components/Navbar/Navbar";
import AccountCard from "./../components/AccountCard/AccountCard";
import './../Styles/CarrierAccountType.css';

const CarrierAccountType = () => {
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
            <div className="col-md-4 col-12 first">
            <AccountCard
            btnText="Select Personal"
            accountHeading="PERSONAL ACCOUNT"
            accountDesc="Lorem ipsum dolor sit amet consectetur adipisicing elit."
            disabled={false}
            individual={true}
            type="../BuildProfilePersonal"
            accType="Carrier"

          />
            </div>
                <div className="col-md-4 col-12 second">
              <AccountCard
                btnText="Select Professional"
                accountHeading="PROFESSIONAL ACCOUNT"
                accountDesc="Lorem ipsum dolor sit amet consectetur adipisicing elit."
                disabled={true}
                individual={false}
            type="../BuildProfileProfessional"
            accType="Carrier"

              />
              </div>
              <div className="col-md-4 col-12 third">
              <AccountCard
                btnText="Select Professional"
                accountHeading="PROFESSIONAL ACCOUNT"
                accountDesc="Lorem ipsum dolor sit amet consectetur adipisicing elit."
                disabled={true}
                individual={false}
            type="../BuildProfileProfessional"
            accType="Carrier"

              />
              </div>
      </div>



    </div>
  );
};

export default CarrierAccountType;
