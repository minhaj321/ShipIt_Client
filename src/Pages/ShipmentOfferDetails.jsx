import {Root} from './../Config/root.js';
import React, { useState, useEffect } from "react";
import Title from "./../components/Title/Title";
import { Col, Row } from "react-bootstrap";
import Cancelled from "./../components/Status/Cancelled";
import Completed from "./../components/Status/Completed";
import Waiting from "./../components/Status/Waiting";
import Closed from './../components/Status/Closed'
import Pending from "./../components/Status/Pending";
import Active from "./../components/Status/Active";
import { Button, Modal, Box } from "@mui/material";
import {  useNavigate, useParams } from "react-router-dom";
import Rating from "@mui/material/Rating";
import axios from "axios";
import moment from 'moment';
import Complaint from '../components/Complaint/Complaint';
import './../Styles/ShipmentOfferDetails.css';
import TripRoute from './../components/LocationAndMap/TripRoute';

const OfferDetails = () => {
  const { id } = useParams();
  // getting user from storage
  var user = JSON.parse(localStorage.getItem("user"));

  // -----start of madals state management-----
  // verify modal states
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  // confirm dropoff modal states
  const [confirmPickup, setConfirmPickup] = useState(false);
  const ConfirmPickupOpen = () => setConfirmPickup(true);
  const ConfirmPickupClose = () => setConfirmPickup(false);
  // set feedback modal states
  const [rating, setRating] = useState(false);
  const setRatingOpen = () => setRating(true);
  const setRatingClose = () => setRating(false);
  // set undertaking modal states
  const [undertaking, setUndertaking] = useState(false);
  const setUndertakingOpen = () => setUndertaking(true);
  const setUndertakingClose = () => setUndertaking(false);
  // -----end of madals state management------
  // --feedback value
  const [feedback, setFeedback] = useState(2.5);
  // --state of the shipment
  const [shipmentState, setShipmentState] = useState(0);

  // --others
  var [terms, setTerms] = useState(false);
  var [mystatus, setStatus] = useState("Cancelled");
  var [statusText, setStatusText] = useState("Cancelled");
  var [responseData, setResponseData] = useState(null);
  const [loading,setLoading] = useState(true);
  const [pendingData,setPending] = useState(false);

  const navigate = useNavigate();

  useEffect(async () => {

    // getting offer details
    const { data } = await axios.post(
      `${Root.production}/trip/viewShipmentOfferDetails`,
      { shipmentOfferId: id }
    );
    if (data.status == 200) {
      var get= data.message.shipmentOffer.createdAt;

      // date checking begin
     let target = moment(get).format()
      let newtarget = moment(target).add(15 , 'minutes').format();
      let flag = moment(new Date()).isBefore( newtarget)

// checking for the expiration api
      if( !flag   && data.message.shipmentOffer.status=='Pending'){
        const response= await axios.post(`${Root.production}/trip/expireShipmentOffer` , {shipmentOfferId: id })
      }

      setResponseData(data.message);
      setLoading(false);
   

        // checking for the status of offer
        switch (data.message.shipmentOffer.status) {
        case "Active":
          mystatus = <Active />;
          setStatus(<Active />);
          break;
        case "Waiting":
          mystatus = <Waiting />;
          setStatus(<Waiting />);
          break;
        case "Completed":
          mystatus = <Completed />;
          setStatus(<Completed />);
          break;
        case "Cancelled":
          mystatus = <Cancelled />;
          setStatus(<Cancelled />);
          break;
        case "Pending":
          mystatus = <Pending />;
          setStatus(<Pending />);
          break;
        default:
          mystatus = <Closed />;
          setStatus(<Closed />)
      }
      statusText = mystatus.type().props.children.props.label;
      setStatusText(statusText);
    } else {
      alert(data.message);
    }
  }, []);


  // styles for modal
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  // method to verify shipment
  const handleVerify = () => {
    setUndertakingOpen();
    handleClose();
  };

  // method to confirm dropoff
  const handlePickUpConfirmation = async() => {

    var {data} = await axios.post(`${Root.production}/trip/confirmDropOff`,{
      shipmentOfferId : responseData.shipmentOffer._id
    })
    if(data.status==200){
      ConfirmPickupClose();
      setRatingOpen();
    }
  };

  // method to handle rating
  const handleRating = async() => {

    var {data} = await axios.post(`${Root.production}/trip/giveRating`,{
      rating:feedback,
      accountId:responseData.shipmentOffer.carrierId
    })
    if(data.status==200){
      alert(feedback);
      setRatingClose();
    }
  };

  // method to handle terms and cond
  const handleTermsConditions = async() => {
    // api will be called
    var {data} = await axios.post(`${Root.production}/trip/verifyShipment`,{
      shipmentOfferId:responseData.shipmentOffer._id
    })
    if(data.status==200){
      alert('success')
      setUndertakingClose();
    navigate(`/my-shipments/${user.account._id}`)
  }
  };

  return (
    <div className="shipper-offer-details-main">

  <div style={{ textAlign: "left" }}>
    {/* modal for verification */}
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      align="center"
    >
      <Box sx={style} className="verify-box">
        <h3>Verify Your Shipment Pickup</h3>
{
responseData!=null &&
        <img
        className="verify-img"
        src={responseData.shipmentOffer.verificationImage}
        alt="verification image"
          />
        }

        <br />
        <Button
          style={{ marginTop: 7, width: "30%" }}
          variant="contained"
          onClick={() => handleClose()}
          color="secondary"
        >
          Back
        </Button>
        <Button
          style={{ marginTop: 7, marginLeft: 10, width: "30%" }}
          variant="contained"
          onClick={() => handleVerify()}
        >
          Verify
        </Button>
      </Box>

      {/* end of verify condition */}
    </Modal>
    {/* end of verification medal */}

    {/* modal for confirm pickup Confirmation */}
    <Modal
      open={confirmPickup}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      align="center"
    >
      <Box sx={style}>
        <h3>Do you confirm delivery of your parcel</h3>

        <br />
        <Button
          style={{ marginTop: 7, width: "30%" }}
          variant="contained"
          onClick={() => ConfirmPickupClose()}
          color="secondary"
        >
          Back
        </Button>
        <Button
          style={{ marginTop: 7, marginLeft: 10, width: "30%" }}
          variant="contained"
          color="success"
          onClick={() => handlePickUpConfirmation()}
        >
          Confirm
        </Button>
      </Box>
    </Modal>
    {/* end of  confirm pickup Confirmation  medal */}

    {/* modal for Rating The Carrier */}
    <Modal
      open={rating}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      align="center"
    >
      <Box sx={style}>
        <h3>Rate the Carrier</h3>
        <Rating
          name="half-rating"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          precision={0.5}
        />
        <br />
        <Button
          style={{ marginTop: 7, marginLeft: 10, width: "30%" }}
          variant="contained"
          onClick={() => handleRating()}
        >
          Rate
        </Button>
      </Box>
    </Modal>
    {/* end of  Rating The Carrier   medal */}

    {/* modal for undertaking on shipment */}
    <Modal
      open={undertaking}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      align="center"
    >
      <Box sx={style} className="terms-and-cond">
        <h3>Terms and conditions</h3>
        <ol align="left" style={{ overflowY: "scroll", height: 300 }}>
          <li>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias
            quod, itaque temporibus eius aliquid ab ex fugit vitae dolorum
            hic aperiam, maxime asperiores iure pariatur rem. Sint,
            repellat animi! Odio.
          </li>
          <li>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias
            quod, itaque temporibus eius aliquid ab ex fugit vitae dolorum
            hic aperiam, maxime asperiores iure pariatur rem. Sint,
            repellat animi! Odio.
          </li>
          <li>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias
            quod, itaque temporibus eius aliquid ab ex fugit vitae dolorum
            hic aperiam, maxime asperiores iure pariatur rem. Sint,
            repellat animi! Odio.
          </li>
          <li>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias
            quod, itaque temporibus eius aliquid ab ex fugit vitae dolorum
            hic aperiam, maxime asperiores iure pariatur rem. Sint,
            repellat animi! Odio.
          </li>
          <li>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias
            quod, itaque temporibus eius aliquid ab ex fugit vitae dolorum
            hic aperiam, maxime asperiores iure pariatur rem. Sint,
            repellat animi! Odio.
          </li>
          <li>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias
            quod, itaque temporibus eius aliquid ab ex fugit vitae dolorum
            hic aperiam, maxime asperiores iure pariatur rem. Sint,
            repellat animi! Odio.
          </li>
          <li>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias
            quod, itaque temporibus eius aliquid ab ex fugit vitae dolorum
            hic aperiam, maxime asperiores iure pariatur rem. Sint,
            repellat animi! Odio.
          </li>
          <li>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias
            quod, itaque temporibus eius aliquid ab ex fugit vitae dolorum
            hic aperiam, maxime asperiores iure pariatur rem. Sint,
            repellat animi! Odio.
          </li>
          <li>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias
            quod, itaque temporibus eius aliquid ab ex fugit vitae dolorum
            hic aperiam, maxime asperiores iure pariatur rem. Sint,
            repellat animi! Odio.
          </li>
          <li>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias
            quod, itaque temporibus eius aliquid ab ex fugit vitae dolorum
            hic aperiam, maxime asperiores iure pariatur rem. Sint,
            repellat animi! Odio.
          </li>
          <li>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias
            quod, itaque temporibus eius aliquid ab ex fugit vitae dolorum
            hic aperiam, maxime asperiores iure pariatur rem. Sint,
            repellat animi! Odio.
          </li>
          <li>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias
            quod, itaque temporibus eius aliquid ab ex fugit vitae dolorum
            hic aperiam, maxime asperiores iure pariatur rem. Sint,
            repellat animi! Odio.
          </li>
        </ol>
        <br />
        <p align="left" style={{ marginLeft: 10 }}>
          {" "}
          <input
            type="checkbox"
            value={terms}
            onChange={() => setTerms(!terms)}
          />{" "}
          I accept all these terms and conditions
        </p>
        <Button
          color="secondary"
          style={{ marginTop: 7, width: "30%" }}
          variant="contained"
          onClick={() => {
            setTerms(false);
            setUndertakingClose();
          }}
        >
          Back
        </Button>
        <Button
          color="success"
          style={{ marginTop: 7, width: "30%" ,marginLeft:10}}
          variant="contained"
          disabled={!terms}
          onClick={() => handleTermsConditions()}
        >
          Accept
        </Button>
      </Box>
    </Modal>
    {/* end of undertaking on shipment modal */}

    <Title title={`Shipment #${id}`} />
      {/* checking for pending status */}
{
  (pendingData && responseData.shipmentOffer.status=='Pending') &&
    <Row style={{marginBottom:-30}}>
    <Col md={{ span: 5, offset: 1 }}>
        <span style={{opacity:0.5,color:'#fff',background:'#a8a457',padding:'1px 10px',borderRadius:"3%"}}>
          Your Shipment will be confirmed in {responseData.shipmentOffer.shipmentExpiryTime}</span>
      </Col>
    </Row>
}
    <Row>
      <Col md={{ span: 3, offset: 1 }} xs={{span:7}}>
        <span onMouseOver={()=>setPending(true)}
        onMouseLeave={()=>setPending(false)}
        >Status : {mystatus} </span>
      </Col>
      {/* checking for pending status */}
      {(responseData !=null && statusText!='PENDING') &&

      <Col xl={{ span: 2, offset: 6 }} lg={{ span: 3, offset: 5 }} md={{span:3,offset:5}} xs={{offset:1,span:4}}>
      <Complaint shipmentId={responseData.shipmentOffer!=null && responseData.shipmentOffer._id}
                   carrierId={responseData.shipmentOffer!=null && responseData.shipmentOffer.carrierId} 
                   packageId={responseData.package!=null && responseData.package._id} 
                   chatRoomId={responseData.shipmentOffer!=null && responseData.shipmentOffer.chatRoomId} 
                   shipperId={responseData.shipmentOffer!=null && responseData.shipmentOffer.accountId}/>
      </Col>
      }
      <br />
      <br />
      <hr />
    </Row>
      {/* checking for status */}
    {statusText != "WAITING" && statusText != "ACTIVE" && (
      <Row>
        <Col md={{ span: 3, offset: 8 }} xs={{span:8,offset:4}}>
          <Button
            variant="contained"
            color="info"
            style={{ width: "90%", fontSize: 12, color: "white" }}
            onClick={() =>
              navigate(`/profile/${responseData.shipmentOffer.carrierId}`, { state: { data: true } })
            }
          >
            Carrier's Profile
          </Button>
        </Col>
      </Row>
    )}
      {/* checking for active status */}
    {statusText == "ACTIVE" && (
      <Row style={{ margin: "0px" }}>
        {responseData.shipmentOffer.verified && (
          <Col md={{ span: 2, offset: 6 }}>
            <Button
              variant="contained"
              color="success"
              disabled={responseData.package.packageStatus=='dropped_off' ? false : true}
              style={{ width: "100%", fontSize: 12, color: "white" }}
              onClick={() => ConfirmPickupOpen()}
            >
              Confirm Dropoff
            </Button>
          </Col>
        )}
        {!responseData.shipmentOffer.verified && (
          <Col xl={{ span: 2, offset: 5 }} lg={{ span: 3, offset: 4 }}
          md={{ span: 3, offset: 4 }} xs={12}
          >
            <Button
            className="shipper_verify_btn"
              variant="contained"
              color="primary"
              style={window.innerWidth < 450 ?
                 { width: "100%", fontSize: 12, color: "white" ,marginLeft:10,marginBottom:20} : 
                 { width: "100%", fontSize: 12, color: "white" }}

              onClick={() => handleOpen()}
            >
              Confirm PickUp
            </Button>
          </Col>
        )}
        <Col xl={1} lg={1} md={1}  xs={2}
              style={window.innerWidth < 450 ? {margin:'auto'} : {} }
        >
          <Button
            className="shipper_chat-active_btn"
            variant="contained"
            color="info"
            style={{ width: "100%", fontSize: 12, color: "white" }}
            onClick={() => navigate(`/chat/${responseData.shipmentOffer.chatRoomId}`)}
          >
            Chat
          </Button>
        </Col>
        <Col xl={{ span: 3 }} lg={4} md={3} xs={7}>
          <Button
            className="shipper_profile-active_btn"
            variant="contained"
            color="info"
            style={{ width: "90%", fontSize: 12, color: "white" }}
            onClick={() =>
              navigate(`/profile/${responseData.shipmentOffer.carrierId}`, { state: { data: true } })
            }
          >
            Carrier's Profile
          </Button>
        </Col>
      </Row>
    )}
      {/* checking for WAITING status */}
    {statusText == "WAITING" && (
      <Row style={{ margin: "0px" }}>
        <Col xl={{ span: 1, offset: 8 }}
        lg={{span:1,offset:7}}
        md={{span:1,offset:6}}
        xs={{offset:1,span:2}}
        >
          <Button
            variant="contained"
            color="info"
            style={{ width: "100%", fontSize: 12, color: "white" }}
            onClick={() => navigate(`/chat/${responseData.shipmentOffer.chatRoomId}`)}
          >
            Chat
          </Button>
        </Col>
        <Col xl={{ span: 2 }}
        lg={3}
        md={{span:3,offset:1}}
        xs={8}
        >
          <Button
          className="shipper_profile-active_btn"
            variant="contained"
            color="info"
            style={{ width: "90%", fontSize: 12, color: "white" }}
            onClick={() =>
              navigate(`/profile/${responseData.shipmentOffer.carrierId}`, { state: { data: true } })
            }
          >
            Carrier's Profile
          </Button>
        </Col>
      </Row>
    )}

    <Row style={{ marginTop: 0 }}>
      <Col md={{ span: 10, offset: 1 }}>
        <h3 className="pickup-heading">PickUp Details :</h3>
      </Col>
    </Row>
    <Row>
      <Col md={{ span: 10, offset: 1 }}>
        <div
          style={{
            background: "#E3E3E3",
            borderRadius: "2%",
            padding: 20,
          }}
        >
          <p>City : {loading ? <div>Loading...</div>  : responseData.shipmentOffer.pickupCity}</p>
          <p>Address : {loading ? <div>Loading...</div>  : responseData.shipmentOffer.pickupAddress}</p>
          <p>Date : {loading ? <div>Loading...</div>  : responseData.shipmentOffer.pickupDate}</p>
        </div>
      </Col>
    </Row>
    <Row>
      <Col md={{ span: 10, offset: 1 }}>
        <h3>DropOff Details :</h3>
      </Col>
    </Row>
    <Row>
      <Col md={{ span: 10, offset: 1 }}>
        <div
          style={{
            background: "#E3E3E3",
            borderRadius: "2%",
            padding: 20,
          }}
        >
          <p>
            Contact Name :{loading ? <div>Loading...</div>  : 
              responseData.shipmentOffer.dropOffContactName
            }
          </p>
          <p>
            Contact Number :{loading ? <div>Loading...</div>  : 
              responseData.shipmentOffer.dropOffContactNumber
            }
          </p>
          <p>City : {loading ? <div>Loading...</div>  : responseData.shipmentOffer.destinationCity}</p>
          <p>Address : {loading ? <div>Loading...</div>  : responseData.shipmentOffer.destinationAddress}</p>
        </div>
      </Col>
    </Row>
    <Row>
      <Col md={{ span: 10, offset: 1 }}>
        <h3>Package Details :</h3>
      </Col>
    </Row>
    <Row>
      <Col md={{ span: 10, offset: 1 }}>
        <div
          style={{
            background: "#E3E3E3",
            borderRadius: "2%",
            padding: 20,
          }}
        >
          <p>PackageID : {loading ? <div>Loading...</div>  : responseData.package._id}</p>
          <p>
            Size : {loading ? <div>Loading...</div>  : responseData.package.packageHeight}cm X{" "}
            {loading ? <div>Loading...</div>  : responseData.package.packageWidth}cm
          </p>
          <p>Weight :{loading ? <div>Loading...</div>  : responseData.package.packageWeight}Kg</p>
          <p>Type : {loading ? <div>Loading...</div>  : responseData.package.packageType}</p>
        </div>
      </Col>
    </Row>
    <Row><Col md={{span:10,offset:1}}>
                  <TripRoute
                  departurelati={!loading ? responseData.shipmentOffer.pickupLattitude : 0}
                  departurelongi={!loading ? responseData.shipmentOffer.pickupLongitude : 0}
                  destinationlati={!loading ? responseData.shipmentOffer.dropOffLattitude : 0}
                  destinationlongi={!loading ? responseData.shipmentOffer.dropOffLongitude : 0}/>
            </Col></Row>     
    <br />
    <br />
  </div>


    </div>
  );
};

export default OfferDetails;









