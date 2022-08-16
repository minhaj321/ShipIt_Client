import React,{useState} from "react";
import {Root} from './../Config/root.js';
import NavBar from "./../components/Navbar/Navbar";
import register from "./../Assets/register.png";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Textfield from "../components/Fields/Textfield";
import { Button } from "@mui/material";
import FacebookLogin from 'react-facebook-login';
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import "./../Styles/Login.css";
import axios from "axios";
import { useNavigate , Link } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import { GoogleLogin } from 'react-google-login';
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import NewsletterFooter2 from '../components/Footer/NewsletterFooter2.jsx';



const Register = () => {


  const navigate = useNavigate();
  const [disable,setDisable] = useState(false);
  const [spinner,setSpinner] = useState(false);
  const [alertText, setAlertText] = useState("");
  const [isError,setIsError] = useState(false);
  
  // facebook response handle method
  const responseFacebook = (response) => {
  }

  // facebook register handle method
  const componentClicked =async (response) => {
    setDisable(true);
    setSpinner(true);
      // getting email,name and pass from fb
    var sendMe = {
      username : response?.name,
      email : response?.email,
      password : response?.userID
  }
  
  try {
    // api calling
    const { data } = await axios.post(
      `${Root.production}/user/register`,sendMe
    );
   
    if(data.status===200){
      navigate(`/buildIndividualAccount/${data.message._id}`);
    }
    else if(data.status===409){
      setIsError(true);
      setAlertText(data.message)
    }
    else{
      setIsError(true);
      setAlertText(data.message)
    }
  } 
  catch (err) {
    setIsError(true);
    setAlertText(err.message)
  } 

  setDisable(false);
  setSpinner(false);
  }

  // google register method
  const responseGoogle =async (response) => {
    setDisable(true);
    setSpinner(true);
    try {
      // getting email,name and pass from google
        var sendMe = {
            username : response?.profileObj.givenName+" " +response.profileObj.familyName,
            email : response?.profileObj.email,
            password : response?.profileObj.googleId
        }
        // api calling
        const { data } = await axios.post(
          `${Root.production}/user/register`,sendMe
        );
        if(data.status===200){
          navigate(`/buildIndividualAccount/${data.message._id}`);
        }
        else if(data.status===409){
          setIsError(true);
          setAlertText(data.mesaage)
        }
        else{
          setIsError(true);
          setAlertText(data.message)
        }
      } 
      catch (err) {
        setIsError(true);
        setAlertText(err.message)
      }
      setDisable(false);
      setSpinner(false);

    };

  // register schema
  const loginValidationSchema = Yup.object({
    username: Yup.string().required(),
    password: Yup.string().min(8).required("Please Enter your password"),
    email: Yup.string().email("Invalid Email Address").required(),
    confirmPassword: Yup.string().min(8)
      .required("Required")
      .oneOf([Yup.ref("password"), null], "password must match"),
  });

  return (
    <div>
      <NavBar />
      <div className="row">
        <div className="col-md-6  col-12 text-center">
          <div className="col-md-12">
            <h3>Welcome to ShipIt</h3>
            <p>To begin, sign up with an option below</p>
          </div>
          <div className="col-md-12">
            <GoogleLogin
              clientId="1080341009220-30hcj3gumf9fn393n2o4sgo84bselgtf.apps.googleusercontent.com"
              buttonText=""
              render={(renderProps) => (
                <Button
                  onClick={renderProps.onClick}
                  startIcon={<GoogleIcon  className="googleBtn"/>}
                  className="social-btn"
                  variant="contained"
                  color="google"
                  >
                    Sign Up with Google
                </Button>
              )}
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={"single_host_origin"}
            />
          </div>
          <div className="col-12">
          <FacebookLogin
    appId="1083641122381023"
    fields="name,email,picture"
    icon={<span><FacebookIcon style={{marginLeft:-20}} className="facebookBtn"/></span>}
    textButton=" SIGN UP WITH FACEBOOK"
    cssClass={'facebook-login'}
    onClick={componentClicked}
    callback={responseFacebook} />
              </div>
          <div className="col-12">
            <div className="or-section">
              <hr /> <span className="or"> or </span> <hr />
            </div>
          </div>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={loginValidationSchema}
            onSubmit={async (values) => {
              // submit method
              setDisable(true);
              setSpinner(true);

              let sendMe = {
                username: values.username,
                email: values.email,
                password: values.password,
              };
              try {
                // api calling
                const { data } = await axios.post(
                  `${Root.production}/user/register`,
                  sendMe
                );
                if(data.status===200){
                  navigate(`/buildIndividualAccount/${data.message._id}`);
                }
                else if(data.status===409){
                  setIsError(true);
                  setAlertText(data.message)
                }
                else{
                  setIsError(true);
                  setAlertText(data.message)
                }
              } 
              catch (err) {
                setIsError(true);
                setAlertText(err.message)
              }
              setDisable(false);
              setSpinner(false);
            }}
          >
            {({ dirty, isValid }) => (
              <Form style={{ width: "90%",margin:'auto'}} className="Registerform">
                <Row style={{ margin: "0" }}>
                { isError &&
                  <Col lg={12}>
                    <Alert severity="error">
                      <AlertTitle>Login Error</AlertTitle>
                      {alertText}
                    </Alert>
                  </Col>
                }                  
                  <Col lg={12}>
                    <Textfield
                      name="username"
                      label="Username"
                      type="text"
                      width={"100%"}
                    />
                  </Col>
                </Row>
                <Row style={{ margin: 0 }}>
                  <Col lg={12}>
                    <Textfield
                      name="email"
                      label="Email"
                      type="text"
                      width={"100%"}
                    />
                  </Col>
                </Row>
                <Row style={{ margin: 0 }}>
                  <Col lg={12}>
                    <Textfield
                      className="passwordInput"
                      name="password"
                      label="Password"
                      type="password"
                      width={"100%"}
                    />
                  </Col>
                </Row>
                <Row style={{ margin: 0 }}>
                  <Col lg={12}>
                    <Textfield
                      className="passwordInput"
                      name="confirmPassword"
                      label="Confirm Password"
                      type="password"
                      width={"100%"}
                    />
                  </Col>
                </Row>
                <p>By registering, You agree to our <Link to='/termsandconditions'>Terms and Conditions</Link>  </p>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  style={{ width: "45%" }}
                  // disabled={disable}
                >Sign Up
                </Button>
              </Form>
            )}
          </Formik>
          <div className="col-12">
            <p
              style={{ marginTop: 20 ,cursor:'pointer',
              textDecoration:'underline'
            }}
              className="applyHover"
              onClick={() => {
                navigate({ pathname: "/login" });
              }}
            >
              Already have an account ? Log In
            </p>
          </div>
        </div>
        <div className="col-md-6">
          <img className="registerImg" src={register} style={{width:'80%'}}  alt="register" />
        </div>
      </div>
      <NewsletterFooter2/>
    </div>
  );
};

export default Register;
