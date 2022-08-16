import React, { useState } from "react";
import { Formik, Form,Field } from "formik";
import * as Yup from "yup";
import Textfield from "./../Fields/Textfield";
import { Button, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import "./../../Styles/Login.css";
import { Col, Row } from "react-bootstrap";
import {useParams} from 'react-router-dom';
import { packageType } from '../PackageType/packageType';
import firebase from '../Firebase/Firebase';
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

const ActionStepTwo = ({ stepperUpdate,setStepperData }) => {
  const [file,setFile]=useState('');
  var {id} = useParams();
  const [cond,setCond] = useState(false);
  const [progress,setProgress] = useState(false);
  const [textError,setTextError] = useState('');

  const [fragile, setFragile] = useState('');


  // schema for stepper two
  const ActionPickupDropoff = Yup.object({
    packageHeight : Yup.number().required('Please enter your package height in cm'),
    packageWidth : Yup.number().required("Please enter your package width in cm"),
    packageWeight : Yup.number().required('Please enter your package weight in KG'),
    packageType: Yup.string().required("Please Select your package type"),
    packageWorth: Yup.number().required("Please enter your package worth"),
  });

  return (
    <div>
      <Formik
        initialValues={{
          packageHeight: "",
        }}
        validationSchema={ActionPickupDropoff}
        onSubmit={async(values) => {
          // submit method for stepper two
            setCond(false)
            setProgress(true)
              var urlWidth = values.packageWidth + '';
              var urlWorth = values.packageWorth + '';
          if(file !=='') {

            // start of main try
            try{
              await firebase.storage().ref(`packageImages/${id}/${values.packageType}/${urlWidth+urlWorth}`).put(file);
              await  firebase.storage().ref(`packageImages/${id}/${values.packageType}`).child(urlWidth+urlWorth)
              .getDownloadURL().then(async (uri)=>{

                if (fragile == "") {
                  setTextError("Please select Fragile")
                  setCond(true)
                } else {
                  values={
                      ...values,
                      fragile,
                      packageImageUrl:uri
                  }
                setStepperData(values,false)         
                stepperUpdate(2);
                }
              })}
              catch(err){
              }
            }
            else{
              setTextError("Please select your package image")
              setCond(true)
            }
setProgress(false)
       
       // end of onSubmit==> 
        }}

      >
        {({errors}) => (
          <Form>
            <Row style={{marginTop:50}}>
              <Col xl={6} lg={7} md={8}>
                <h3>PACKAGE DETAILS :</h3>
              </Col>
            </Row>

            
            <Row>
              <Col md={{span:5,offset:1}}>
 {/* START OF FIRST DIV  */}
            <Row style={{marginTop:0}}>
              <Col xl={6} lg={9} md={10} style={{ marginLeft: 0,marginTop:0 }}>
                <span>Shipment Size:</span>
              </Col>
            </Row>
            <Row style={{ marginTop: -10 }}>
              <Col xl={6} lg={9} md={10}>
                <Textfield
                  name="packageHeight"
                  label="Height(cm)"
                  type="number"
                  width={"96%"}
                />
              </Col>
            </Row>
            <Row style={{marginTop:10}}>
              <Col xl={6} lg={9} md={10}>
                <Textfield
                  name="packageWidth"
                  label="Width(cm)"
                  type="number"
                  width={"96%"}
                />
              </Col>
            </Row>
            <Row style={{marginTop:20}}>
              <Col xl={6} lg={7} md={10} style={{ marginLeft: 0 }}>
                <span>Shipment Weight:</span>
              </Col>
            </Row>
            <Row style={{ marginTop: 0 }}>
              <Col xl={6} lg={9} md={10}>
                <Textfield
                  name="packageWeight"
                  label="Weight (Kg)"
                  type="number"
                  width={"96%"}
                />
              </Col>
            </Row>
            </Col>
 {/* End OF FIRST DIV  */}

   <Col md={{span:5}}>
 {/* START OF SECOND DIV  */}

            <Row style={{marginTop:0}}>
              <Col xl={6} lg={9} md={10} style={{ marginLeft: 0 }}>
                <span>Fragile : </span>
              </Col>
            </Row>
            <Row style={{marginTop:10}}>
              <Col xl={6} lg={9} md={10} style={{ marginLeft: 10 }}>
                <RadioGroup
                  row
                  aria-label="fragile"
                  name="row-radio-buttons-group"
                  onChange={(e) => setFragile(e.target.value)}
                >
                  <FormControlLabel
                    value="yes"
                    control={<Radio />}
                    label="yes"
                  />
                  <FormControlLabel value="no" control={<Radio />} label="no" />
                </RadioGroup>
              </Col>
            </Row>

            <Row style={{marginTop:20}}>
              <Col xl={6} lg={10} md={10} style={{ marginLeft: 0 }}>
                <span>What best describe your shipment :</span>
              </Col>
            </Row>
            <Row style={{marginTop:20}}>
              <Col xl={6} lg={9} md={10}>
                    <Field name="packageType" component="select" style={{border:'0px solid',borderBottom:'1px gray solid',width:"96%",
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
            <Row style={{marginTop:10}}>
              <Col xl={6} lg={9} md={10}>
                <Textfield
                  name="packageWorth"
                  label="Total Value of Shipment(PKR)"
                  type="number"
                  width={"96%"}
                />
              </Col>
            </Row>
            <Row style={{marginTop:10}}>
              <Col xl={6} lg={9} md={10}>
              <input for="files" style={file ? {color:'green',fontFamily:'cursive'} : {color:'red'}} type="file" accept="image/*" onChange={e=>setFile(e.target.files[0])}/>
              </Col>
            </Row>
   </Col>
 </Row>
 {/* END OF SECOND DIV  */}
 <Row>
            {
  cond &&
  <Col md={{span:4,offset:6}}>
  <Alert severity="error">
    <AlertTitle>Error</AlertTitle>
    {textError}
  </Alert>
</Col>
}
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
            <Col  md={{ span: 3 }}>
        <Button variant='contained' color='secondary' type='button'  style={{ width: "75%" }}
        onClick={()=>stepperUpdate(0)}
        >Back</Button>
                </Col>
                <Col  md={{ span: 3, offset: 4 }}>
        <Button variant='contained' color='primary' type='submit'  style={{ width: "75%" }}>Proceed</Button>
                </Col>
            </Row>
            <br />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ActionStepTwo;
