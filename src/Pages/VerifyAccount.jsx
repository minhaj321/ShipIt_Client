import React,{useState} from "react";
import NavBar from "./../components/Navbar/Navbar";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Textfield from "../components/Fields/Textfield";
import { Button} from "@mui/material";
import {Row} from 'react-bootstrap';
import { useNavigate,useParams } from 'react-router-dom';
import axios from "axios";
import './../Styles/EmailVerificationForPassword.css';
import {Root} from './../Config/root.js';
import NewsletterFooter2 from '../components/Footer/NewsletterFooter2.jsx';


const VerifyAccount = () => {

  const navigate = useNavigate();
  const [disable,setDisable] = useState(false);
  const [spinner,setSpinner] = useState(false);
  var {id} = useParams();

 // schema for email code
  const loginValidationSchema = Yup.object({
    emailCode: Yup.number().required('required'),

  });

  return (
    <div>
      <NavBar />

      <div className="row">
        <div className="col-12 text-center m-auto">
          <div className="col-12 text-center m-auto headings">
          <h3>Verify Your Account</h3>
          <p>We’ve sent you codes two your registered email. Please enter it below. </p>
          </div>
          <br />
          <Formik
            initialValues={{
              emailCode: 0,
            }}
            validationSchema={loginValidationSchema}
            onSubmit={async(values) => {
              // submit method for page
              setDisable(true);
              setSpinner(true);
              values={
                ...values,
                accountId : id
              }
              try{
                // verification of email code
                const {data} = await axios.post(`${Root.production}/user/verify`,values);
                if(data.status===200){
                  localStorage.setItem('user',JSON.stringify(data.message))
                  navigate(`/dashboard/${data.message.account._id}`)
                  window.location.reload();
                }
              }
              catch(err){
              }
              setDisable(false);
              setSpinner(false);

            }}
          > 
            {({ dirty, isValid }) => (
              <div className="row">
                <Form style={{width:"65%",margin:'auto'}}>
                <Row style={{margin:'auto'}}>
                <div className="col-lg-6 m-auto col-12">
                  <Textfield name="emailCode" label="Email Verification Code" type="number" width={'100%'} />
                </div>
                  </Row>
                  <span>The code will expire in 2 minutes </span>
                  <Button variant="contained" color="primary" type="submit">
                    Resend
                  </Button>
                  <br /><br />
                  <Row style={{margin:0}}>
                    <div className="col-lg-10 col-12 m-auto verify">
                  <Button variant="contained" color="primary" type="submit" style={{width:'400px'}}
                  >
                    Verify
                  </Button>
                  </div>
                  </Row>
                </Form>
              </div>
            )}
          </Formik>
        </div>
      </div>
      <NewsletterFooter2/>
    </div>
  );
};

export default VerifyAccount;
