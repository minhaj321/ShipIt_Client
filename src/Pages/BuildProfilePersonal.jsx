import React, { useState } from "react";
import NavBar from "./../components/Navbar/Navbar";
import { Formik, Form,Field } from "formik";
import * as Yup from "yup";
import {Root} from './../Config/root.js';
import Textfield from "../components/Fields/Textfield";
import { Button} from "@mui/material";
import "./../Styles/BuildProfilePersonal.css";
import { Col, Row } from "react-bootstrap";
import firebase from './../components/Firebase/Firebase';
import { useLocation,useNavigate,useParams } from 'react-router-dom';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import NewsletterFooter2 from '../components/Footer/NewsletterFooter2.jsx';

const BuildProfilePersonal = () => {

  const navigate = useNavigate();
  const {state} = useLocation();
  const [disable,setDisable] = useState(false);
  const [spinner,setSpinner] = useState(false);
  const [file,setFile]=useState('');
  
  var params=useParams();

  // schema for form using yup
  const loginValidationSchema = Yup.object({
    firstName: Yup.string().required("Your first name is required"),
    lastName: Yup.string().required("Your last name is required"),
    cnic: Yup.string().min(13).required("Your CNIC is required"),
    street: Yup.string().required("Please enter your street number"),
    town: Yup.string().required("Please enter your town name"),
    city: Yup.string().required("Please select your city"),
    gender: Yup.string().required("Please select your gender"),
    province: Yup.string().required("Please select your province"),
    phoneNumber: Yup.string().min(10,"phone number must be of 11 digits").required("Please enter your phone number"),
    dateOfBirth : Yup.date().required('Your Date of birth is required'),
    // profile:Yup.mixed().required('File is required'),
  });

  return (
    <div>
      <NavBar />
      <div className="row">
      <div className="col-12 text-center main-profile-build-div">
          <div className="col-12 text-center headings">
          <h3>Time to build a catchy profile</h3>
          </div>
          <br />
          {/* start of formik form */}
          <Formik
            validationSchema={loginValidationSchema}
            initialValues={{
              firstName:"",
          }}

            onSubmit={async (values) => {
              // beginning of submit method
              setDisable(true);
              setSpinner(true);

              if(file !=='') {

              // start of main try
              try{
                await firebase.storage().ref(`/avatars/${values.cnic}`).put(file);
                await  firebase.storage().ref('/avatars').child(values.cnic)
                .getDownloadURL().then(async (uri)=>{
                  var userId = params.id;
                  values={
                    ...values,
                    accountType:state.accountType,
                    userId,
                    profilePic:uri
                  }
                  // try for database communication
                  try{
                    var {data} = await axios.post(`${Root.production}/user/buildIndiviualAccount`,values);
                    if(data.status===200){
                      localStorage.setItem('buildProfileUser',data.message.account._id);
                      navigate(`/verify/${data.message.account._id}`);
                    }
                    else{
                      console.log(data.message)
                    }

                  }
                  // end of try box to communicate with database
                  catch(err){
                    console.log(err.message)
                  }
                })
                // end of firebase function
              }
              // end of main try

              catch(err){
                console.log(err.message)
              }
              // end of main try_catch
              // end of if condition ==>
            }
            else{
              alert('Please select your profile picture first')
            }
            // end of function body
            setDisable(false);
            setSpinner(false);
            
          }
          // end of submit 
          
        }
 
          >
            {({ errors,touched }) => (
              <div>
                <Form className="form" style={{ width: "45%", margin: "auto" }}>
                  <Row style={{ margin: 0 }}>
                    <Col md={5}>
                      <Textfield
                        name="firstName"
                        label="First Name"
                        type="text"
                        width={"98%"}
                      />
                    </Col>
                    <Col md={{span:5,offset:1}}>
                      <Textfield
                        name="lastName"
                        label="Last Name"
                        type="text"
                        width={"100%"}
                      />
                    </Col>
                  </Row>
                  <Row style={{ margin: 0 }}>
                    <Col md={5}>
                    <Field name="gender" component="select" style={{border:'0px solid',borderBottom:'1px gray solid',width:200,
                    color:'grey'}}>
                          <option value="">None</option>
                          <option value="Male">Male</option>
                          <option value="feMale">Female</option>
                    </Field>
                    {errors.gender && touched.gender &&
                        <p style={{color:'red' , fontSize:12}}>{errors.gender}</p>
                      }
                {/* <DropDown
                  setData={HandleGender}
                  width={"100%"}
                  type="gender"
                  inputLabel="Gender"
                /> */}
                    </Col>
                    <Col  md={{span:5,offset:1}} style={{marginTop:15 }}>
                    <Textfield  name="dateOfBirth"  type="date" width={"100%"}/>
                    </Col>
                  </Row>

                  <Row style={{ margin: 0 }} className="street">
                    <Col md={5}>
                      <Textfield
                        name="street"
                        label="Street"
                        type="text"
                        width={"98%"}
                      />
                    </Col>
                    <Col  md={{span:5,offset:1}}>
                      <Textfield
                        name="town"
                        label="Town"
                        type="text"
                        width={"100%"}
                      />
                    </Col>
                  </Row>
                  <Row style={{ margin: 0 }}>
                    <Col md={5}>
                      <Textfield
                        name="city"
                        label="City"
                        type="text"
                        width={"98%"}
                      />
                    </Col>
                    <Col  md={{span:5,offset:1}}>
                      <Textfield
                        name="province"
                        label="Province"
                        type="text"
                        width={"100%"}
                      />
                    </Col>
                  </Row>
                  <Row style={{ margin: 0 }}>
                    <Col md={5} sm={12}>
                      <Textfield
                        name="cnic"
                        label="CNIC"
                        type="text"
                        width={"100%"}
                      />
                    </Col>
                    <Col  md={{span:5,offset:1}}>
                      <Textfield
                        name="phoneNumber"
                        label="Phone Number"
                        type="text"
                        width={"100%"}
                      />
                    </Col>
                  </Row>
                  <Row style={{ margin: 0 ,borderBottom:'1px solid black'}}>
                    <Col lg={12} align="left">
                    <span>Select Profile Picture: </span>
                      <input for="files" style={file ? {color:'green',fontFamily:'cursive'} : {color:'red'}} type="file" accept="image/*" onChange={e=>setFile(e.target.files[0])}/>
                    </Col>
                    <br />
                    <br />
                  </Row>
                  <br />
                  <Row style={{ margin: 0 }}>
                    <Col>
                      <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        style={{ width: "100%" }}
                        disabled={disable}
                      > Build My Profile
                      </Button>
                    <br />
                    <br />
                    </Col>
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

export default BuildProfilePersonal;
