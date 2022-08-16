import {Root} from './../Config/root.js';
import Title from '../components/Title/Title';
import axios from 'axios';
import { Col, Row } from "react-bootstrap";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {TextField,Button} from '@mui/material';
import DropDown from '../components/DropDown/DropDown';
import {useParams} from 'react-router-dom';
import './../Styles/EditProfile.css'
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

const EditProfile = () => {
    var {id} =useParams();
    var user = JSON.parse(localStorage.getItem('user'));
    const [city,setProfileCity] =useState(user.account.city);
    const [firstName,setFirstName] =useState(user.account.firstName);
    const [lastName,setLastName] =useState(user.account.lastName);
    const [street,setStreet] =useState(user.account.street);
    const [town,setTown] =useState(user.account.town);
    const [province,setProvince] =useState(user.account.province);
    const [errorCond,setErrorCond] = useState(false);
    const [textError,setTextError] = useState('');
    const [progress,setProgress] = useState(false);

    // set city handler
    const navigate = useNavigate();
    const SetCity =(val)=>{
        setProfileCity(val);
    }

    // submit fuction
    const handleSubmit = async () =>{
        setProgress(true)
        setErrorCond(false)
        try{
        var object = {
            firstName,
            lastName,
            province,
            city,
            town,
            street,
            accountId:id
        }
        var {data}  =await axios.post(`${Root.production}/user/editProfile`,object)
        if(data.status==200){
            navigate(`/dashboard/${id}`)
        }
        else{
            setTextError(data.message)
            setErrorCond(true)
          } 
      }catch (error) {
        setTextError(error.message)
        setErrorCond(true)
        
      }
      setProgress(false)
    }
// end of handle fuction

    return (
        <div style={{marginBottom:'180px'}} >
            <Title title="Edit Profile"/>
            <Row className="edit_profile_form">
                <Col>
                <Row>
                    <Col md={{offset:2,span:3}} style={{marginTop:14}} align="left">
                            First Name :
                        </Col>
                    <Col md={{span:4}}>
                        <TextField
                        style={{height:20}}
                        variant='standard'
                        label="first name"
                        placeholder={user.account.firstName}
                        value={firstName}
                        onChange={(e)=>setFirstName(e.target.value)}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col md={{offset:2,span:3}} style={{marginTop:14}} align="left">Last Name :</Col>
                    <Col md={{span:4}}>
                        <TextField
                        style={{height:20}}
                        variant="standard"
                        label="last name"
                        placeholder={user.account.lastName}
                        value={lastName}
                        onChange={(e)=>setLastName(e.target.value)}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col md={{offset:2,span:3}} style={{marginTop:14}} align="left">Street :</Col>
                    <Col md={{span:4}}>
                        <TextField
                        style={{height:20}}
                        variant="standard"
                        label="Street"
                        placeholder={user.account.street}
                        value={street}
                        onChange={(e)=>setStreet(e.target.value)}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col md={{offset:2,span:3}} style={{marginTop:14}} align="left">Town :</Col>
                    <Col md={{span:4}}>
                        <TextField
                        style={{height:20}}
                        variant="standard"
                        label="Town"
                        placeholder={user.account.town}
                        value={town}
                        onChange={(e)=>setTown(e.target.value)}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col md={{offset:2,span:3}} style={{marginTop:20}} align="left">City :</Col>
                    <Col md={{span:4}} style={{marginLeft:80}} className="edit_city_div">
                    <DropDown
                  setData={SetCity}
                  width={"55%"}
                  type="city"
                  inputLabel="City"
                />      
                    </Col>
                </Row>
                <Row>
                    <Col md={{offset:2,span:3}} style={{marginTop:14}} align="left">Province :</Col>
                    <Col md={{span:4}}>
                        <TextField
                        style={{height:10}}
                        variant="standard"
                        label="Province"
                        placeholder={user.account.province}
                        value={province}
                        onChange={(e)=>setProvince(e.target.value)}
                        />
                    </Col>
                </Row>
                </Col>
            </Row>
                 <Row>
     {
  progress &&
  <Col  md={{span:6,offset:3}}>
  <Alert severity="success">
    <AlertTitle>Wait</AlertTitle>
    Loading...
  </Alert>
</Col>
}
{
  errorCond &&
  <Col md={{span:6,offset:3}}>
  <Alert severity="error">
    <AlertTitle>Publish Error</AlertTitle>
    {textError}
  </Alert>
</Col>
}

            </Row>
                <Row>
                    <Col>
                    <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    >
                        Save Changes
                    </Button>
                    </Col>
                </Row>
        </div>
    )
}

export default EditProfile
