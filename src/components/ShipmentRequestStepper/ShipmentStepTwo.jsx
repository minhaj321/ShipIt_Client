import React, { useState } from "react";
import { Formik, Form ,Field} from "formik";
import * as Yup from "yup";
import Textfield from "../Fields/Textfield";
import { Button,Radio,RadioGroup,FormControlLabel,Typography,Modal,Box} from "@mui/material";
import "./../../Styles/Login.css";
import { Col, Row } from "react-bootstrap";
// import DropDown from "../DropDown/DropDown";
import { packageType } from '../PackageType/packageType';
import { Cities } from "../Cities/Cities";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Map from "../LocationAndMap/Map";
import Location from "../LocationAndMap/Location";
import "./../../Styles/CreateRequest.css";
import { GeoCoder } from "../LocationAndMap/GeoCode";
import MyLocationIcon from '@mui/icons-material/MyLocation';


var modalWidth = window.innerWidth > 450 ? "70%" : "50%";

// modal style
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

// second style
const childStyle = {
  position: "absolute",
  top: "50%",
  left: modalWidth,
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  maxHeight:200,
  p: 4,
};

const ShipmentStepTwo = ({ stepperUpdate, setStepperData, tripData }) => {
  
  // some states for handling data
  const [fragile, setFragile] = useState(undefined);
  const [type, setType] = useState("");
  let [pickUpLatitude, setPickUpLatitude] = useState(0);
  let [pickUpLongitude, setPickUpLongitude] = useState(0);
  let [dropOffLatitude, setDropOffLatitude] = useState(0);
  let [dropOffLongitude, setDropOffLongitude] = useState(0);
  let [locationType, setLocationType] = useState("pickup");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [locationOpen, setLocationOpen] = useState(false);
  const handleLocationOpen = () => setLocationOpen(true);
  const handleLocationClose = () => setLocationOpen(false);
  const [disable, setDisable] = useState(false);

  // method to handle location coords
  const handleLocations = (long, lati) => {
    if (locationType == "pickup") {
      pickUpLatitude = lati;
      pickUpLongitude = long;
      setPickUpLatitude(pickUpLatitude);
      setPickUpLongitude(pickUpLongitude);
    } else if (locationType == "dropoff") {
      dropOffLatitude = lati;
      dropOffLongitude = long;
      setDropOffLatitude(dropOffLatitude);
      setDropOffLongitude(dropOffLongitude);
    }
  };

  // method to handle location modal
  const handleLocationModals = (type) => {
    setLocationType(type);
    handleOpen();
  };

// modal to handle shipment type
  const setShipmentType = (val) => {
    setType(val);
  };

  // getting user from storage
  var user = JSON.parse(localStorage.getItem("user"));

  // schema for stepper 2
  const ActionPickupDropoff = Yup.object({
    pickupAddress: Yup.string().required("Pick Up Address is required"),
    destinationAddress: Yup.string().required("Drop off Address is required"),
    dropOffContactName: Yup.string().required(
      "Dropoff Contact Name is required"
    ),
    dropOffContactNumber: Yup.string()
      .max(11, "Phone number should be of 11 digits")
      .min(11, "Phone number should be of 11 digits")
      .required("Phone Number is required"),
    packageHeight: Yup.string().required("Please enter dimensions of shipment"),
    packageWidth: Yup.string().required("Please enter dimensions of shipment"),
    packageWeight: Yup.string().required("Please enter weight of shipment"),
    packageWorth: Yup.string().required("Required"),
    packageType: Yup.string().required("Required"),
    destinationCity:Yup.string().required('Destination City required'),
    pickupCity:Yup.string().required('Departure City required'),

  });

  return (
    <div style={disable ? { opacity: 0.2 } : { opacity: 1 }}>
      {/* start of coords modal */}

      {/* main modal */}
      <Modal
        align="center"
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}
          style={{ overflow: 'scroll' }} className="trip_creation_form"
        >
          <Map handleLocations={handleLocations} />
          <br />
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Select Your {locationType} location
          </Typography>
          <b>OR</b>
          <br />
          {/* <Location handleLocations={handleLocations} /> */}
          <p style={{cursor:'pointer'}} onClick={()=>handleLocationOpen()}><MyLocationIcon color="primary"/> My Current Location</p>    
          <Button
            variant="contained"
            color="secondary"
            style={{ width: "60px", fontSize: 10 }}
            onClick={() => handleClose()}
          >
            Back
          </Button>
          <Button
            variant="contained"
            color="primary"
            style={{ width: "140px", fontSize: 10, marginLeft: 10 }}
            onClick={() => handleClose()}
          >
            Confirm
          </Button>
        </Box>
      </Modal>
{/* child modal for location */}
<Modal
        align="center"
        open={locationOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={childStyle}
          style={{ overflow: 'scroll'}} className="trip_creation_form"
        >
          <Location handleLocations={handleLocations} />
          <Button
            variant="contained"
            color="primary"
            style={{ width: "140px", fontSize: 10, marginLeft: 10 }}
            onClick={() => handleLocationClose()}
          >
            My Location
          </Button>
        </Box>
      </Modal>
      {/* end of coords modal */}
      <Formik
        initialValues={{
          pickupAddress: "",
        }}
        validationSchema={ActionPickupDropoff}
        onSubmit={(values) => {
          // main submit method
          setDisable(true);
          if (
            fragile == "" ||
            pickUpLatitude == 0 ||
            pickUpLongitude == 0 ||
            dropOffLatitude == 0 ||
            dropOffLongitude == 0
          ) {
            alert("Please fill form completely");
          } else {
            values = {
              ...values,
              fragile,
              pickupLattitude: pickUpLatitude + "",
              pickupLongitude: pickUpLongitude + "",
              dropOffLattitude: dropOffLatitude + "",
              dropOffLongitude: dropOffLongitude + "",
              tripId: tripData._id,
              accountId: user.account._id,
              pickupDate: tripData.departureDate,
              carrierId: tripData.accountId,
            };
            setStepperData(values);
          }
          setDisable(false);
        }}
      >
        {({errors}) => (
          <Form className="shipment-step-two-form">
            <Row>
              <Col md={5} xl={{ span: 5, offset: 1 }} lg={5}>
                <Row style={{ marginTop: 0 }}>
                  <Col lg={10} xl={7}>
                    <h4>PICKUP DETAILS :</h4>
                  </Col>
                </Row>
                <Row>
                  <Col lg={10} xl={6}>
                    <Button
                      className="step-two-pickup-btn"
                      variant="contained"
                      color="dark"
                      style={{ color: "#fff" }}
                      startIcon={<LocationOnIcon />}
                      onClick={() => handleLocationModals("pickup")}
                    >
                      Select PickUp
                    </Button>
                  </Col>
                </Row>
                {/* {pickUpLatitude != 0 && pickUpLongitude != 0 && (
                  <Row>
                    <Col lg={10} xl={6}>
                      <GeoCoder
                        lat={pickUpLatitude}
                        longi={pickUpLongitude}
                      />
                    </Col>
                  </Row>
                )} */}

                <Row style={{ marginTop: 20 }}>
                  <Col lg={10} xl={7}>
                    <Textfield
                      name="pickupAddress"
                      label="pickup Address"
                      type="text"
                      width={"100%"}
                    />
                  </Col>
                </Row>
                <Row style={{ marginTop: 20 }}>
                  <Col lg={10} xl={7}>
                <Field name="pickupCity" component="select" style={{border:'0px solid',borderBottom:'1px gray solid',width:'100%',marginLeft:7,
                    color:'grey'}}>
                          <option value="">None</option>
                      {
                        Cities.map((v)=>(
                          <option value={v}>{v}</option>
                        ))
                      }
                    </Field>
                    {errors.pickupCity &&
                        <p style={{color:'red' , fontSize:12}}>{errors.pickupCity}</p>
                      }                    
                  </Col>
                </Row>
                <Row mt={5}>
                  <Col lg={10} xl={7}>
                    <h4>DROPOFF DETAILS :</h4>
                  </Col>
                </Row>
                <Row>
                  <Col lg={10} xl={7}>
                    <Button
                      className="step-two-dropoff-btn"
                      variant="contained"
                      color="dark"
                      style={{ color: "#fff" }}
                      startIcon={<LocationOnIcon />}
                      onClick={() => handleLocationModals("dropoff")}
                    >
                      Select DropOff
                    </Button>
                  </Col>
                </Row>
                <Row style={{ marginTop: 20 }}>
                  <Col lg={10} xl={7}>
                    <Textfield
                      name="destinationAddress"
                      label="DropOff Address"
                      type="text"
                      width={"100%"}
                    />
                  </Col>
                </Row>
                <Row style={{ marginTop: 20 }}>
                  <Col lg={10} xl={7}>
                    <Textfield
                      name="dropOffContactName"
                      label="DropOff Contact Name"
                      type="text"
                      width={"100%"}
                    />
                  </Col>
                </Row>
                <Row style={{ marginTop: 20 }}>
                  <Col lg={10} xl={7}>
                    <Textfield
                      name="dropOffContactNumber"
                      label="DropOff Contact Number"
                      type="text"
                      width={"100%"}
                    />
                  </Col>
                </Row>
                <Row style={{ marginTop: 20 }}>
                  <Col lg={10} xl={7}>
              <Field name="destinationCity" component="select" style={{border:'0px solid',borderBottom:'1px gray solid',width:'100%',marginLeft:7,
                    color:'grey'}}>
                          <option value="">None</option>
                      {
                        Cities.map((v)=>(
                          <option value={v}>{v}</option>
                        ))
                      }
                    </Field>
                    {errors.destinationCity &&
                        <p style={{color:'red' , fontSize:12}}>{errors.destinationCity}</p>
                      }                    
                  </Col>
                </Row>
              </Col>

              <Col md={{ span: 5 }}>
                <Row style={{ marginTop: 0 }}>
                  <Col lg={10} xl={7}>
                    <h4>SHIPMENT DETAILS :</h4>
                  </Col>
                </Row>
                <Row style={{ marginTop: 20 }}>
                  <Col lg={10} xl={4} style={{ marginLeft: 0, marginTop: 0 }}>
                    <span>Shipment Size:</span>
                  </Col>
                </Row>
                <Row style={{ marginTop: -10 }}>
                  <Col lg={10} xl={7}>
                    <Textfield
                      name="packageHeight"
                      label="Height (cm)"
                      type="text"
                      width={"100%"}
                    />
                  </Col>
                </Row>
                <Row style={{ marginTop: 10 }}>
                  <Col lg={10} xl={7}>
                    <Textfield
                      name="packageWidth"
                      label="Width (cm)"
                      type="text"
                      width={"100%"}
                    />
                  </Col>
                </Row>
                <Row style={{ marginTop: 20 }}>
                  <Col lg={10} xl={5} style={{ marginLeft: 0 }}>
                    <span>Shipment Weight:</span>
                  </Col>
                </Row>
                <Row style={{ marginTop: 0 }}>
                  <Col lg={10} xl={7}>
                    <Textfield
                      name="packageWeight"
                      label="Weight (Kg)"
                      type="text"
                      width={"100%"}
                    />
                  </Col>
                </Row>
                <Row style={{ marginTop: 20 }}>
                  <Col lg={10} xl={3} style={{ marginLeft: 0 }}>
                    <span>Fragile : </span>
                  </Col>
                </Row>
                <Row style={{ marginTop: 10 }}>
                  <Col lg={10} xl={7} style={{ marginLeft: 10 }}>
                    <RadioGroup
                      row
                      aria-label="fragile"
                      name="row-radio-buttons-group"
                      onChange={(e) => setFragile(e.target.value)}
                    >
                      <FormControlLabel
                        value="yes"
                        control={<Radio 
                        defaultChecked={true}
                        />}
                        label="yes"
                        defaultChecked={true}
                      />
                      <FormControlLabel
                        value="no"
                        control={<Radio />}
                        label="no"
                      />
                    </RadioGroup>
                  </Col>
                </Row>

                <Row style={{ marginTop: 20 }}>
                  <Col lg={10} xl={8} style={{ marginLeft: 0 }}>
                    <span>What best describe your shipment :</span>
                  </Col>
                </Row>
                <Row style={{ marginTop: 20 }}>
                  <Col lg={10} xl={7}>
                    <Field name="packageType" component="select" style={{border:'0px solid',borderBottom:'1px gray solid',width:'100%',marginLeft:7,
                    color:'grey'}}>
                          <option value="">None</option>
                      {
                        packageType.map((v)=>(
                          <option value={v}>{v}</option>
                        ))
                      }
                    </Field>
                    {errors.packageType &&
                        <p style={{color:'red' , fontSize:12}}>{errors.packageType}</p>
                      }     
                  </Col>
                </Row>
                <Row style={{ marginTop: 10 }}>
                  <Col lg={10} xl={7}>
                    <Textfield
                      name="packageWorth"
                      label="Total Value of Shipment"
                      type="number"
                      width={"100%"}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col md={2}>
                <Button
                  variant="contained"
                  color="secondary"
                  type="button"
                  style={{ width: "75%" }}
                  onClick={() => stepperUpdate(0)}
                >
                  Back
                </Button>
              </Col>
              <Col md={{ span: 2, offset: 7 }}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  style={{ width: "75%" }}
                  disabled={disable}
                >
                  Proceed
                </Button>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
      <br />
    </div>
  );
};

export default ShipmentStepTwo;
