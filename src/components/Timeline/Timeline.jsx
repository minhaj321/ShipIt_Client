import { Root } from '../../Config/root.js';
import React, { useState, useEffect } from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import { Row, Col } from 'react-bootstrap';
import { Modal, Box, Button, TextField } from '@mui/material';
import firebase from '../Firebase/Firebase';
import Rating from '@mui/material/Rating';
import axios from 'axios';
import RoutedMap from '../LocationAndMap/routedMap';
import moment from 'moment';
import './Timeline.css';
import {Colors} from './../Colors/Colors';

// style for modal
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

export default function ActiveTimeline({ shipmentData, from }) {

  const [timelineState, setTimelineState] = useState(0);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [feedback, setFeedback] = useState(2.5);
  const handleFeedbackOpen = () => setFeedbackOpen(true);
  const handleFeedbackClose = () => setFeedbackOpen(false);
  const [disable, setDisable] = useState(false);
  const [file, setFile] = useState('');
  const [currentPackage, setCurrentPackage] = useState('');
  const [currentShipment, setCurrentShipment] = useState('');
  var [listForRoute, setListForRoute] = useState([]);
  const [accountId, setAccountId] = useState('');
  var [timeArray, setTimeArray] = useState([]);
  var startTime = new Date();


  useEffect(() => {
    setListForRoute([]);
    setTimelineState(0);
    for(let i=0;i<shipmentData.length;i++){
        if(shipmentData[i].type=='from'){
      if(shipmentData[i].packageStatus==='not_picked_up' || shipmentData[i].packageStatus==='NOT_PICKED_UP' ||
       shipmentData[i].packageStatus==='picked_up'){
          listForRoute.push(shipmentData[i])
        }
      }
     // end of if
      else if(shipmentData[i].type=='to'){
      if(shipmentData[i].packageStatus!=='dropped_off'){
              listForRoute.push(shipmentData[i])
      }
        } // end of else
    } // end of for loop
    setListForRoute(listForRoute)
  }, [])

  // fuction to verify shipment
  const handleVerify = (packageId, shipmentId) => {
    setCurrentPackage(packageId)
    setCurrentShipment(shipmentId)
    handleOpen();
  }

  // function to handle rating
  const handleRating = async () => {
    var { data } = await axios.post(`${Root.production}/trip/giveRating`, {
      rating: feedback,
      accountId: accountId
    })
    if (data.status == 200) {
      handleFeedbackClose();
      window.location.reload();
    }
  }

  // function to send data to check verification
  const handleCheckVerification = async () => {
    try {
      await firebase.storage().ref(`/verify/${currentPackage}`).put(file);
      await firebase.storage().ref('/verify').child(currentPackage)
        .getDownloadURL().then(async (uri) => {
          var { data } = await axios.post(`${Root.production}/trip/uploadShipmentVerificationImage`, {
            shipmentOfferId: currentShipment,
            verificationImage: uri
          })
          if (data.status == 200) {
            window.location.reload();
          }
          handleClose();
        })
    }
    catch (err) {
    }
  }

  // function to identify pickup
  const handlePickedUp = async (packageId) => {
    var { data } = await axios.post(`${Root.production}/trip/pickupPackage`, {
      packageId: packageId
    })
    if (data.status == 200) {
      window.location.reload();
    }
  }

  // function to identify dropoff
  const handleDropOff = async (shipmentId, accountId) => {
    var { data } = await axios.post(`${Root.production}/trip/dropOff`, {
      shipmentOfferId: shipmentId
    })
    if (data.status == 200) {
      setAccountId(accountId)
      handleFeedbackOpen();
    }
  }

  // method to get times as per route distance
  const getTimes = async (times) => {
    var hoursToMinutes;
    for (let i = 0; i < times.length; i++) {
      times[i] = times[i].split(" ");
      if (times[i].length == 4) {
        hoursToMinutes = Number(times[i][0] * 60);
        timeArray[i] = hoursToMinutes + Number(times[i][2])
      }
      else if (times[i].length == 2) {
        timeArray[i] = Number(times[i][0]);
      }
      if (i == times.length - 1) {
      }
      timeArray = timeArray;
      await setTimeArray(timeArray)
    }

  }

// called after 1 second to ensure rendering of other dependent vairables 
  setTimeout(() => {
    setDisable(true)
  }, 1000)

  // method to skip shipment
  const handleSkip = async (shipmentId) => {

    var { data } = await axios.post(`${Root.production}/trip/cancelShipment`, {
      shipmentOfferId: shipmentId
    })
    if (data.status == 200) {
      window.location.reload();
    }

  }
  return (

    <React.Fragment>
      {/* modal for verification */}
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="verification_box">
          <h3>
            Choose Image for verification
          </h3>
          <br />
          <TextField type="file" accept="image/*" onChange={e => setFile(e.target.files[0])} />
          <br />
          <Button
            style={{ marginTop: 7, width: '30%' }}
            variant="contained"
            onClick={() => handleClose()}
            color="secondary"
          >
            Back
          </Button>
          <Button
            style={{ marginTop: 7, marginLeft: 10, width: '30%' }}
            variant="contained"
            onClick={() => handleCheckVerification()}
          >
            Send
          </Button>
        </Box>

        {/* end of verify condition */}
      </Modal>
      {/* end of medal */}

      {/* modal for feedback */}
      <Modal
        open={feedbackOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        align="center"
      >
        {/* start of feedback condition */}

        <Box sx={style}>
          <h3>
            Feedback
          </h3>
          <Rating name="half-rating" value={feedback} onChange={(e) => setFeedback(e.target.value)} precision={0.5} />
          <br />
          <Button
            style={{ marginTop: 7, marginLeft: 10, width: '30%' }}
            variant="contained"
            onClick={() => handleRating()}
          >
            Send
          </Button>
        </Box>
        {/* end of verify condition */}
      </Modal>
      {/* end of feedback modal*/}

{/* timeline */}
      <Row className="timeline_parent">
        <Col className="timeline_sequence" lg={{ offset: 1, span: 5 }} md={10} xs={12} style={{ marginLeft: 120, overflow: 'scroll',height:400 }} align="center">
          {disable &&
            shipmentData.map((v, i) => {
              if (v.type == 'from') {
                var newTime = moment(startTime, 'HH:mm')
                var currentTime = newTime.add(timeArray[i], 'minutes').format('HH:mm')
                var current = moment(currentTime, 'HH:mm')
                var delay = current.add(15, 'minutes').format('HH:mm');
                startTime = delay;
                return (
                  <Timeline position="left">
                      <TimelineItem>
                        <TimelineOppositeContent>
                          <Button 
                          // color="success"
                            variant="contained"
                            className="pickedUp_btn"
                            style={{ fontSize: 10, marginTop: -2, width: '30%',background:Colors[v.count-1] }}
                        disabled={(v.packageStatus=='NOT_PICKED_UP' || v.packageStatus=="not_picked_up") ? false : true}
                            onClick={() => handlePickedUp(v.packageId)}
                          >Confirm Picked Up
                          </Button>
                        </TimelineOppositeContent>
                        <TimelineSeparator>
                          <TimelineDot />
                          <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent>User {v.count}  <b>Picked Up</b>
                        </TimelineContent>
                      </TimelineItem>
                      <TimelineItem>
                        <TimelineOppositeContent>
                          <Button
                            variant="contained"
                            className="verify_btn"
                            style={{ fontSize: 10, marginTop: -2, width: '20%',background:Colors[v.count-1] }}
                        disabled={v.packageStatus =='picked_up' ? false : true}
                        onClick={() => handleVerify(v.packageId, v.shipmentId)}
                          >
                            Image Verification
                          </Button>
                        </TimelineOppositeContent>
                        <TimelineSeparator>
                          <TimelineDot />
                          <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent>User {v.count}<b> Verification</b>
                        </TimelineContent>
                      </TimelineItem>
                  </Timeline>
                )
              }
              else if (v.type = 'to') {
                var newTime = moment(startTime, 'HH:mm')
                var currentTime = newTime.add(timeArray[i], 'minutes').format('HH:mm')
                var current = moment(currentTime, 'HH:mm')
                var delay = current.add(5, 'minutes').format('HH:mm');
                startTime = delay;
                return (

                  <Timeline position="left">
                      <TimelineItem>
                        <TimelineOppositeContent>
                          <Button 
                            variant="contained"
                            className="dropOff_btn"
                            style={{ fontSize: 10, marginTop: -2, width: '20%',background:Colors[v.count-1] }}
                            disabled={v.packageStatus=='delivery_in_progress' ? false : true}
                            onClick={() => handleDropOff(v.shipmentId, v.accountId)}>
                            Confirm Drop Off
                          </Button>
                        </TimelineOppositeContent>
                        <TimelineSeparator>
                          <TimelineDot />
                          <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent>
                          User {v.count}<b> Drop Off</b>
                        </TimelineContent>
                      </TimelineItem>
                  </Timeline>
                )
              }
            })
          }
        </Col>
        <Col className="routed_map_div" lg={5} align="left">
          {
            shipmentData[0] &&
          <RoutedMap
            shipmentData={listForRoute}
            from={from}
            getTimes={getTimes}
          />
        }
        </Col>
      </Row>
    </React.Fragment>
  );
}
