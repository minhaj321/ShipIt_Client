import React,{useState,useEffect} from "react";
import NavBar from "./../components/Navbar/Navbar";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Textfield from "../components/Fields/Textfield";
import { Button} from "@mui/material";
import {Row} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './../Styles/EmailVerificationForPassword.css';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import {Root} from './../Config/root.js';
import NewsletterFooter2 from '../components/Footer/NewsletterFooter2.jsx';

const ChangePassword = () => {

  let [verification,setVerification] = useState(false);
  let [loading,setLoading] = useState(true);
  const params=useParams();
  
// checking for link validation
  useEffect(async()=>{
    var {data} = await axios.post(`${Root.production}/user/checkResetPasswordCode`,{id:params.id});
    if(data.status==200){
      verification=true;
      setVerification(verification);
    }
    else if(data.status==404){
      alert(data.message)
      verification=false;
      setVerification(verification);
    }
    else{
      alert('You may have some internet problems.')
      verification=false;
      setVerification(verification);

    }
    loading=false;
    setLoading(loading);

  },[])

  const navigate = useNavigate();

  // schema for form using yup
  const loginValidationSchema = Yup.object({
    password: Yup.string().required('Please Enter your password'),
    reenterpassword: Yup.string().required("Required")
    .oneOf([Yup.ref("password"),null],"password must match"),
})
  return (
    <div>
      <NavBar />
{
  !loading &&
      <div className="row">
        {
          verification &&
      <div className="col-12 text-center m-auto">
          <div className="col-12 text-center m-auto headings">
          <h3>Reset Your Password</h3>
          </div>
          <br />
          <Formik
          // start of formik form
            initialValues={{
              password: "",
              reenterpassword: "",
            }}
            validationSchema={loginValidationSchema}
              // beginning of submit method
            onSubmit={async(values) => {
              var {data} = await axios.post(`${Root.production}/user/resetUserPassword`,
              {code:params.id,password:values.password})
              if(data.status==200){
                alert(data.message);
                navigate(`/login`)
              }
              else{
                alert('There are some issues on reset your password.')
              }
            }}
              // end of submit
          >
            {({ dirty, isValid }) => (
              <div className="row">
                <Form style={{width:"65%",margin:'auto'}}>
                <Row style={{margin:'auto'}}>
                <div className="col-lg-6 m-auto col-12">
                  <Textfield name="password" label="Enter your new password" type="text" width={'100%'} />
                  </div>
                  </Row>
                  <Row style={{margin:'auto'}}>
                <div className="col-lg-6 m-auto col-12">
                  <Textfield name="reenterpassword" label="Re-enter your password" type="text" width={'100%'} />
                  </div>
                  </Row>
                  <br /><br />
                  <Row style={{margin:0}}>
                    <div className="col-lg-8 col-12 m-auto submit">
                  <Button variant="contained" color="primary" type="submit" style={{width:'80%'}}
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
        }
        {
          !verification &&
          <h1>You are not a valid user</h1>
        } 
      </div>
}
{
  loading &&
  <div>
    <h1 style={{marginTop:150}}>
    Loading...
    </h1>
    </div>
}
<NewsletterFooter2/>

    </div>
  );
};

export default ChangePassword;
