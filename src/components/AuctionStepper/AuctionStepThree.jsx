import React, { useState } from "react";
import { Formik, Form ,Field} from "formik";
import * as Yup from "yup";
import Textfield from "./../Fields/Textfield";
import { Button } from "@mui/material";
import "./../../Styles/Login.css";
import { Col, Row } from "react-bootstrap";
// import DropDown from "./../DropDown/DropDown";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {Duration} from '../Duration/Duration';
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import './../../Styles/auctionstepthree.css';

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

const ActionStepThree = ({stepperUpdate,setStepperData}) => {

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [object,setObject] = useState({}); 
  const [progress,setProgress] = useState(false);

  // method to call api in parent
  const publishRequest = () => {
    setStepperData(object,true)
    handleClose()
  }

  // schema of stepper 3
  const ActionPickupDropoff = Yup.object({
    startingBid : Yup.number().required('Starting bid is required'),
    auctionDuration: Yup.string().required("Please select your shipment duration"),
  });

  return (
    <div className="auction_step_three">
      <div>
        <Modal
          open={open}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Are you sure you want to publish this request?
            </Typography>
            <br />
            <Button
              variant="contained"
              color="secondary"
              style={{ width: "60px", fontSize: 10 }}
              onClick={()=>handleClose()}
            >
              Back
            </Button>
            <Button
              variant="contained"
              color="primary"
              style={{ width: "140px", fontSize: 10, marginLeft: 10 }}
              onClick={()=>publishRequest()}
            >
              Publish Request
            </Button>
          </Box>
        </Modal>
      </div>
      <Formik
        initialValues={{
          auctionDuration: "",
        }}
        validationSchema={ActionPickupDropoff}
        onSubmit={async (values) => {
          setProgress(true)

          values = {
            ...values,
          };

          
          setObject(values)
          handleOpen();

          setProgress(false)

        }}
      >
        {({errors}) => (
          <Form>
            <Row>
              <Col md={{offset:1}}>
            <Row>
              <Col xl={3} lg={5} md={6}>
                <h3>ACUTION DETAILS :</h3>
              </Col>
            </Row>
            <Row>
              <Col xl={3} lg={5} md={6} style={{ marginLeft: 0 }}>
                <span>Auction Duration :</span>
              </Col>
            </Row>
            <Row style={{ marginTop: 0 }}>
              <Col xl={3} lg={5} md={6}>
                    <Field name="auctionDuration" component="select" style={{border:'0px solid',borderBottom:'1px gray solid',width:'96%',
                    color:'grey',marginLeft:7}}>
                          <option value="">None</option>
                      {
                        Duration.map((v)=>(
                          <option value={v.value}>{v.title}</option>
                        ))
                      }
                    </Field>
                    {errors.auctionDuration &&
                        <p style={{color:'red' , fontSize:12}}>{errors.auctionDuration}</p>
                      }                      
              </Col>
            </Row>
            <Row>
              <Col xl={3} lg={5} md={6} style={{ marginLeft: 0 }}>
                <span>Starting Amount :</span>
              </Col>
            </Row>
            <Row style={{ marginTop: 0 }}>
              <Col xl={3} lg={5} md={6}>
                <Textfield
                  name="startingBid"
                  label="Rs:(PKR)"
                  type="number"
                  width={"96%"}
                  />
              </Col>
            </Row>
            </Col>
            </Row>
            <Row>
    {
  progress &&
  <Col md={{span:4,offset:6}}>
  <Alert severity="success">
    <AlertTitle>Wait</AlertTitle>
    Loading...
  </Alert>
</Col>
}
            </Row>
            <Row>
            <Col xl={{offset:1,span:3}} lg={{offset:1,span:3}} md={{offset:1,span:4}} xs={{offset:1,span:5}}>
        <Button variant='contained' color='secondary' type='button'  style={{ width: "75%" }}
        onClick={()=>stepperUpdate(1)} 
        >Back</Button>
                </Col>
                <Col xl={{offset:3,span:3}} lg={{offset:3,span:3}} md={{offset:1,span:4}} xs={{offset:1,span:5}}>
        <Button variant='contained' color='primary' disabled={progress ? true : false}  type='submit'  style={{ width: "75%" }}>Proceed</Button>
                </Col>
            </Row>
            <br />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ActionStepThree;

