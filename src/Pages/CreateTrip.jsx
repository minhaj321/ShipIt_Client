import { Cities } from './../components/Cities/Cities';
import React, { useState, useEffect } from 'react';
import {Root} from '../Config/root.js';
import { Col, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router';
import Textfield from '../components/Fields/Textfield';
import { Button, Typography, Box, Modal } from '@mui/material';
import * as Yup from 'yup';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Map from '../components/LocationAndMap/Map';
import Location from '../components/LocationAndMap/Location';
import { Formik, Form, Field } from 'formik';
import axios from 'axios';
import './../Styles/CreateTrip.css';
import MyLocationIcon from '@mui/icons-material/MyLocation';

const CreateTrip = ({ closeModal }) => {

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [locationOpen, setLocationOpen] = useState(false);
  const handleLocationOpen = () => setLocationOpen(true);
  const handleLocationClose = () => setLocationOpen(false);
  const navigate = useNavigate();
  let [departureLattitude, setDepartureLatitude] = useState(0);
  let [departureLongitude, setDepartureLongitude] = useState(0);
  let [destinationLattitude, setDestinationLatitude] = useState(0);
  let [destinationLongitude, setDestinationLongitude] = useState(0);
  let [locationType, setLocationType] = useState('Starting')
  var [vehiclesArray, setVehiclesArray] = useState([])

  var { id } = useParams();

  // setting modal's width w.r.t page length
  var modalWidth = window.innerWidth > 450 ? "60%" : "50%";
 
  // styles for map modal
  const style = {
    position: "absolute",
    top: "50%",
    left: modalWidth,
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  // styles for location modal
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

  // validations for trip creation.
  const ActionPickupDropoff = Yup.object({
    departureAddress: Yup.string().required('Departure Address is rquired'),
    destinationAddress: Yup.string().required("Destination Address is required"),
    vehicleId: Yup.string().required('Vehicle is required'),
    pricePerShipmentOrder: Yup.string().required('price per shipmentis required'),
    destinationCity: Yup.string().required('Destination City required'),
    departureCity: Yup.string().required('Departure City required')
  })

  // getting user 
  var userDataIs = JSON.parse(localStorage.getItem('user'))
  const userId = userDataIs.account._id;

  // getting vehicles fuction to select them
  useEffect(async () => {
    var { data } = await axios.post(`${Root.production}/vehicle/getVehicleByUser`, { accountId: userId })
    if (data.status == 200) {
      vehiclesArray = data.message;
      setVehiclesArray(vehiclesArray)
    }
    else {
      alert(data.message)
    }
  }, [])

  // fuction to handle locations coords
  const handleLocations = (long, lati) => {
    if (locationType == 'Starting') {
      departureLattitude = lati;
      departureLongitude = long;
      setDepartureLatitude(departureLattitude);
      setDepartureLongitude(departureLongitude);
    }
    else if (locationType == 'Ending') {
      destinationLattitude = lati;
      destinationLongitude = long;
      setDestinationLatitude(destinationLattitude);
      setDestinationLongitude(destinationLongitude);
    }
  }

  // fuction to open modal of location
  const handleLocationModals = (type) => {
    setLocationType(type);
    handleOpen();
  }

  return (
    <div>

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

      <Row style={{ marginTop: 0 }} align="center">
        <Col>
          <h2 className="add_a_trip">Add a trip</h2>
        </Col>
      </Row>

      <Formik
        initialValues={{
          departureAddress: "",
        }}

        validationSchema={ActionPickupDropoff}
        onSubmit={async (values) => {
          // form submit method
          if (
            departureLattitude == 0 ||
            departureLongitude == 0 ||
            destinationLattitude == 0 ||
            destinationLongitude == 0
          ) {
            alert("Please select your locations");
          } else {

            values = {
              ...values,
              accountId: id,
              departureLattitude: departureLattitude + "",
              departureLongitude: departureLongitude + "",
              destinationLattitude: destinationLattitude + "",
              destinationLongitude: destinationLongitude + "",
            }
            var { data } = await axios.post(`${Root.production}/trip/createTrip`, values);
            if (data.status == 200) {
              closeModal();
              navigate(`/my-trips/${userId}`);
              window.reload()
            } else {
            }
          }

          // end of onSubmit==> 
        }}>
        {({ touched, errors }) => (
          <Form className="create-trip-form">

            <Row align="center">
              <Col lg={6} md={11} xs={11} className="create_trip_first_div">

                <Row style={{ marginTop: 10 }}>
                  <Col md={11} lg={12}>
                    <h5>From Details:</h5>
                  </Col>
                </Row>
                <Row>
                  <Col md={11} lg={12}>
                    <Button
                      variant="contained"
                      color="dark"
                      style={{ color: '#fff', fontSize: 10 }}
                      startIcon={<LocationOnIcon />}
                      onClick={() => handleLocationModals('Starting')}
                    >
                      Select{'/n'} Departure
                    </Button>
                  </Col>
                </Row>
                <Row style={{ marginTop: 10 }}>
                  <Col md={11} lg={12}>
                    <Textfield name="departureAddress" label="Address" type="text" width={"100%"} />
                  </Col>
                </Row>
                <Row style={{ marginTop: 20 }}>
                  <Col md={11} lg={12}>
                  <p>Select Departure City:</p>
                    <Field name="departureCity" component="select" style={{
                      border: '0px solid', borderBottom: '1px gray solid',width:'100%',
                      color: 'grey',marginLeft:7
                    }}>
                      <option value="">None</option>
                      {
                        Cities.map((v) => (
                          <option value={v}>{v}</option>
                        ))
                      }
                    </Field>
                    {errors.departureCity &&
                      <p style={{ color: 'red', fontSize: 12 }}>{errors.departureCity}</p>
                    }
                  </Col>
                </Row>
                <Row style={{ marginTop: 20 }}>
                  <Col md={11} lg={12}>
                    <Textfield name="departureDate" label="" type="date" width={"100%"} />
                  </Col>
                </Row>
                <Row style={{ marginTop: 20 }}>
                  <Col md={11} lg={12}>
                    <Textfield name="departureTime" label="" type="time" width={"100%"} />
                  </Col>
                </Row>
              </Col>
              <Col lg={6} md={11} xs={11} className="create_trip_first_div">
                <Row style={{ marginTop: 10 }}>
                  <Col md={11}>
                    <h5>To Details:</h5>
                  </Col>
                </Row>
                <Row>
                  <Col md={11} lg={12}>
                    <Button
                      variant="contained"
                      color="dark"
                      style={{ color: '#fff', fontSize: 10 }}
                      startIcon={<LocationOnIcon />}
                      onClick={() => handleLocationModals('Ending')}
                    >
                      Select Destionation
                    </Button>
                  </Col>
                </Row>
                <Row style={{ marginTop: 10 }}>
                  <Col md={11} lg={12}>
                    <Textfield name="destinationAddress" label="Address" type="text" width={"100%"} />
                  </Col>
                </Row>
                <Row style={{ marginTop: 20 }}>
                  <Col md={11} lg={12}>
                  <p>Select Destination City:</p>
                    <Field name="destinationCity" component="select" style={{
                      border: '0px solid', borderBottom: '1px gray solid', width:'100%',
                      color: 'grey',marginLeft:7
                    }}>
                      <option value="">None</option>
                      {
                        Cities.map((v) => (
                          <option value={v}>{v}</option>
                        ))
                      }
                    </Field>
                    {errors.destinationCity &&
                      <p style={{ color: 'red', fontSize: 12 }}>{errors.destinationCity}</p>
                    }
                  </Col>
                </Row>
                <Row style={{ marginTop: 35 }}>
                  <Col md={11} lg={12}>
                  <p>Select Vehicle:</p>
                    <Field name="vehicleId" component="select" style={{
                      border: '0px solid', borderBottom: '1px gray solid', width:'100%',
                      color: 'grey',marginLeft:7
                    }}>
                      <option value="">None</option>
                      {
                        vehiclesArray.map((v) => {
                          if(v.status=='Active'){
                            return(
                            <option value={v._id}>{v.model}-{v.year}</option>
                          )
                          }
                      })
                      }
                    </Field>
                    {errors.vehicleId &&
                      <p style={{ color: 'red', fontSize: 12 }}>{errors.vehicleId}</p>
                    }
                  </Col>
                </Row>
                <Row style={{ marginTop: 10 }}>
                  <Col md={11} lg={12}>
                    <Textfield name="pricePerShipmentOrder" label="Price Per Shipment"
                      type="number" width={"100%"} />
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col md={6} xs={3}>
                <Button
                  variant="contained"
                  color="secondary"
                  style={{ width: "100px" }}
                  onClick={() => closeModal()}
                >
                  Cancel
                </Button>
              </Col>
              <Col md={{ offset: 2, span: 3 }} xs={{ offset: 3, span: 4 }}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  style={{ width: "100px" }}
                >
                  Create
                </Button>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default CreateTrip
