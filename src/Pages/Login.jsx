import React, { useState } from "react";
import { Root } from './../Config/root.js';
import NavBar from "./../components/Navbar/Navbar";
import shipments from "./../Assets/shipments.png";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Textfield from "../components/Fields/Textfield";
import { Button } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import "./../Styles/Login.css";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login";
import { Col, Row } from "react-bootstrap";
import axios from "axios";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import NewsletterFooter2 from '../components/Footer/NewsletterFooter2.jsx';

const Login = () => {
  const navigate = useNavigate();
  const [disable, setDisable] = useState(false);
  const [alertText, setAlertText] = useState("");
  const [spinner, setSpinner] = useState(false);
  const [isError, setIsError] = useState(false);

  // google login method
  const responseGoogle = async (response) => {
    setDisable(true);
    setSpinner(true);
    try {
      // getting email and pass from google
      var sendMe = {
        email: response?.profileObj.email,
        password: response?.profileObj.googleId,
      };
      // api calling
      var { data } = await axios.post(
        `${Root.production}/user/login`,
        sendMe
      );
      if (data.status === 200) {
        // checking for account verification
        if (data.message.account.verified == true) {
          localStorage.setItem("user", JSON.stringify(data.message));
          localStorage.setItem("accountType", "Shipper");
          var tripId = localStorage.getItem('tripId');
          // checking that this logic is directed from dashboard or landing page
          if (tripId != null || tripId != undefined) {
            navigate(`/trip-detail/${tripId}`)
          } else {
            navigate(`/dashboard/${data.message.account._id}`);
          }
          window.location.reload();
        } else {
          navigate(`/verify/${data.message.account._id}`);
        }
      } else if (data.status == 402) {
        setAlertText("You entered incorrect passsword");
      } else if (data.status === 403) {
        navigate(`/buildIndividualAccount/${data.userId}`);
      } else if (data.status == 404) {
        setAlertText(data.message)
      } else {
        setAlertText(data.message)
      }
    } catch (err) {
      setAlertText(err.message)
    }

    setDisable(false);
    setSpinner(false);
  };

  // login schema
  const loginValidationSchema = Yup.object({
    email: Yup.string().email("Invalid Email Address").required(),
    password: Yup.string().required("Required"),
  });

  // facebook response handle method
  const responseFacebook = async (response) => {
  };

  // facebook login handle method
  const componentClicked = async (response) => {
    setDisable(true);
    setSpinner(true);
      // getting email and pass from fb
    var sendMe = {
      email: response?.email,
      password: response?.userID,
    };
    try {
      // api calling
      var { data } = await axios.post(
        `${Root.production}/user/login`,
        sendMe
      );
      if (data.status === 200) {
        // checking for account verification
        if (data.message.verified == true) {
          localStorage.setItem("user", JSON.stringify(data.message));
          localStorage.setItem("accountType", "Shipper");
          var tripId = localStorage.getItem('tripId');

          // checking that this logic is directed from dashboard or landing page
          if (tripId != null || tripId != undefined) {
            navigate(`/trip-detail/${tripId}`)
          } else {
            navigate(`/dashboard/${data.message.account._id}`);
          }
          window.location.reload();
        } else {
          navigate(`/verify/${data.message.account._id}`);
        }
      } else if (data.status == 402) {
        setIsError(true);
        setAlertText(data.message)
        alert("You entered incorrect passsword");
      } else if (data.status == 403) {
        navigate(`/buildIndividualAccount/${data.userId}`);
      } else if (data.status == 404) {
        setIsError(true);
        setAlertText(data.message)
      } else {
        setIsError(true);
        setAlertText(data.message)
      }
    } catch (err) {
      setIsError(true);
      setAlertText(err.message)
    }

    setDisable(false);
    setSpinner(false);
  };

  return (
    <div>
      <NavBar />
      <div className="row">
        <div className="col-md-6 text-center  col-12 text-center">
          <div className="col-md-12">
            <h3>Welcome Back</h3>
            <p>Please login to continue</p>
          </div>
          <div className="col-12">
            <GoogleLogin
              clientId="1080341009220-30hcj3gumf9fn393n2o4sgo84bselgtf.apps.googleusercontent.com"
              buttonText=""
              render={(renderProps) => (
                <Button
                  onClick={renderProps.onClick}
                  startIcon={<GoogleIcon className="googleBtn" />}
                  className="social-btn"
                  variant="contained"
                  color="google"
                >
                  Log In with Google
                </Button>
              )}
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
            />
          </div>
          <div className="col-12">
            <FacebookLogin
              appId="1083641122381023"
              fields="name,email,picture"
              icon={
                <span>
                  <FacebookIcon
                    style={{ marginLeft: -20 }}
                    className="facebookBtn"
                  />
                </span>
              }
              textButton=' LOG IN WITH FACEBOOK'
              cssClass={'facebook-login'}
              onClick={componentClicked}
              callback={responseFacebook}

            />
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
              // submit handler handled by login button
              setIsError(false);
              setDisable(true);
              setSpinner(true);
              try {
                var { data } = await axios.post(
                  `${Root.production}/user/login`,
                  values
                );
                if (data.status === 200) {

          // checking account verification
                  if (data.message.account.verified == true) {
                    localStorage.setItem("user", JSON.stringify(data.message));
                    localStorage.setItem("accountType", "Shipper");
                    var tripId = localStorage.getItem('tripId');

                    // checking that this logic is directed from dashboard or landing page
                    if (tripId != null || tripId != undefined) {
                      navigate(`/trip-detail/${tripId}`)
                    } else {
                      navigate(`/dashboard/${data.message.account._id}`);
                    }
                    window.location.reload();
                  } else {
                    navigate(`/verify/${data.message.account._id}`);
                  }
                } else if (data.status == 402) {
                  setIsError(true);
                  setAlertText(data.message)
                } else if (data.status == 403) {
                  navigate(`/buildIndividualAccount/${data.userId}`);
                } else if (data.status == 404) {
                  setIsError(true);
                  setAlertText(data.message)
                } else {
                  setIsError(true);
                  setAlertText(data.message)
                }
              } catch (err) {
                setIsError(true);
                setAlertText(err.message)
              }

              setDisable(false);
              setSpinner(false);
            }}
          >
            {({ dirty, isValid }) => (
              <Form
                style={{ width: "90%", margin: "auto" }}
                className="loginForm"
              >
                <Row style={{ margin: 0 }}>
                  {isError &&
                    <Col lg={12}>
                      <Alert severity="error">
                        <AlertTitle>Login Error</AlertTitle>
                        {alertText}
                      </Alert>
                    </Col>
                  }
                  <Col lg={12}>
                    <Textfield
                      name="email"
                      label="Email"
                      type="email"
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
                <p
                  className="applyHover"
                  style={{
                    textAlign: "center",
                    cursor: "pointer",
                    textDecoration: 'underline'
                  }}
                  onClick={() => navigate("/forget-password")}
                >
                  Forgot Password ?
                </p>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  style={{ width: "45%" }}
                >
                  LogIn
                </Button>
              </Form>
            )}
          </Formik>
          <div className="col-12">
            <p
              className="applyHover"
              style={{
                marginTop: 20, cursor: "pointer",
                textDecoration: 'underline'
              }}
              onClick={() => {
                navigate({ pathname: "/register" });
              }}
            >
              New Here ? Register Instead
            </p>
          </div>
        </div>
        <div className="col-6">
          <img
            className="loginImg"
            src={shipments}
            alt="shipments"
          />
        </div>
      </div>
      <NewsletterFooter2 />
    </div>
  );
};

export default Login;
