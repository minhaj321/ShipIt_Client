import React from "react";
import NavBar from "./../components/Navbar/Navbar";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Textfield from "../components/Fields/Textfield";
import { Button} from "@mui/material";
import {Row} from 'react-bootstrap';
import { useLocation,useNavigate } from 'react-router-dom';
import './../Styles/EmailVerificationForPassword.css';

const EmailVerificationForPassword = () => {

  const navigate = useNavigate();
  const {state} = useLocation();

  // validation for email code
  const loginValidationSchema = Yup.object({
    emailcode: Yup.number().required('required'),

  });

  return (
    <div>
      <NavBar />

      <div className="row">
        <div className="col-12 text-center m-auto">
          <div className="col-12 text-center m-auto headings">
          <h3>We’ve sent you code to your registered email</h3>
          <p>please enter it below. </p>
          </div>
          <br />
          <Formik 
            initialValues={{
              emailcode: "",
            }}
            validationSchema={loginValidationSchema}
            onSubmit={(values) => {
              navigate('../ChangePassword')
            }}
          >
            {() => (
              <div className="row">
                <Form style={{width:"90%",margin:'auto'}}>
                <Row style={{margin:'auto'}}>
                <div className="col-lg-6 m-auto col-12">
                  <Textfield name="emailcode" label="Code recieved on email" type="text" width={'100%'} />
                  </div>
                  </Row>
                  <br /><br />
                  <Row style={{margin:0}}>
                    <div className="col-lg-6 m-auto">
                  <Button variant="contained" color="primary" type="submit" style={{marginLeft:12,width:'80%'}}
                  >
                    Submit
                  </Button>
                  </div>
                  </Row>
                </Form>
              </div>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationForPassword;
