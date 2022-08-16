import React from "react";
import NavBar from "./../components/Navbar/Navbar";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Textfield from "../components/Fields/Textfield";
import { Button } from "@mui/material";
import "./../Styles/Login.css";
import DropDown from './../components/DropDown/DropDown';
import {Col,Row} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './../Styles/BuildProfileProfessional.css';

const BuildProfileProfessional = () => {
  
  const navigate = useNavigate();

  // schema for form using yup
  const loginValidationSchema = Yup.object({
    businessname: Yup.string().required('required'),
    street: Yup.string().required("Required"),
    town: Yup.string().required("Required"),
    city: Yup.string().required("Required"),
    province: Yup.string().required("Required"),
    phonenumber: Yup.string().required("Required"),
  });

  return (
    <div>
      <NavBar />
      <div>
        <div className="text-center headings">
          <br /><br />
          <h3>Build a catchy Business profile</h3>
          <br />
          {/* start of formik form */}
          <Formik
          // beginning of submit method
            initialValues={{
              province: "",
            }}
            validationSchema={loginValidationSchema}
            onSubmit={(values) => {
              navigate({ pathname: '../VerifyAccount' })

            }}
          >
            {({ dirty, isValid }) => (
              <div>
                <Form style={{width:"45%",margin:'auto'}} className="form">
                <Row style={{margin:0}}>
                    <Col lg={12} >
                  <Textfield name="businessname" label="Business Name" type="text"  width={'100%'}/>
                  </Col>
                  </Row>
                  <Row style={{margin:0}}>
                    <Col lg={12} >
                  <DropDown width={'100%'} type="businessType"/>
                  </Col>
                  </Row>       
                  <Row style={{margin:0}} className="street streetCol">
                    <Col lg={6} >
                  <Textfield name="street" label="Street" type="text" width={'98%'} />
                    </Col>
                    <Col lg={6} className="townCol">
                  <Textfield name="town" label="Town" type="text" width={'98%'} />
                    </Col>
                  </Row>
                  <Row style={{margin:0}}>
                    <Col lg={6} style={{paddingLeft:23}} className="cityCol">
                  <Textfield name="city" label="City" type="text" width={'98%'} />
                  </Col>
                    <Col lg={6}  style={{paddingRight:12}} className="provinceCol">
                  <Textfield name="province" label="Province" type="text" width={'98%'} />
                  </Col>
                  </Row>   
                  <Row style={{margin:0}}>
                    <Col lg={12} >        
                  <Textfield name="phonenumber"label="Phone Number"type="number"  width={'100%'}/>
                  </Col>
                  </Row>
                  <Row style={{margin:0}}>
                    <Col lg={12} >        
                  <Textfield name="profile" label="" type="file"  width={'100%'}/>
                  </Col>
                  </Row>
                  <Button variant="contained" color="primary" type="submit" style={{width:'100%'}}>
                  Build My Profile
                  </Button>
                </Form>
              </div>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default BuildProfileProfessional;
