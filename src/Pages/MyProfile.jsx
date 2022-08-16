import React,{useState,useEffect} from 'react';
import Title from '../components/Title/Title';
import BadgeLevelOne from '../components/Badges/Levelone';
import {Col,Row} from 'react-bootstrap';
import Rating from '@mui/material/Rating';
import {Button} from '@mui/material';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import {useNavigate,useLocation,useParams} from 'react-router-dom';
import axios from 'axios';
import './../Styles/Profile.css';
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import {Root} from './../Config/root.js';

const MyProfile = () => {
    
    var [userData,setUserData] = useState();
    
    const navigate = useNavigate();
    const {state} = useLocation();
    const [errorCond,setErrorCond] = useState(false);
    const [textError,setTextError] = useState('');
    const [progress,setProgress] = useState(false);
    var {id} = useParams();

    useEffect(async()=>{
        setProgress(true)
        setErrorCond(false)
        // fetching user profile data to display
        try{
        var {data} = await axios.post(`${Root.production}/user/getUserById`,{accountId:id})
        if(data.status==200){
            userData=data.message;
            setUserData(data.message);
        }else{
            setTextError(data.message)
            setErrorCond(true)
          }
            
      }catch (error) {
        setTextError(error.message)
        setErrorCond(true)
        
      }
      setProgress(false)
    },[])
    
var outerWidth= window.outerWidth;
    return (
        <div className="main-profile-div">
            {
                userData &&
        <div>
            <Title title="My Profile"/>
            {
                // checking that is the logged user is same as this user
            !state.data &&
                <Col sm={{span : 3 , offset : 8}} xs={{span:6,offset:6}}>
                    <Button 
                    variant="contained"
                    color="primary"
                    style={{fontSize:12}}
                    startIcon={<ModeEditOutlineOutlinedIcon/>}
                    onClick={()=>navigate(`/edit-profile/${id}`)}
                    >
                        Edit Profile
                    </Button>
                </Col>
        }
            {/* self */}
            <Row>
                <Col md={{offset:4,span:4}} xs={{span : 4, offset:4}}>
                    <BadgeLevelOne imgPath={userData.profilePic}/>
                </Col>
            </Row>
            <Row style={{margin:0,paddingTop:10}}>
                <Col md={{offset:4,span:4}} xs={{span:6,offset:3}}>
                    <p className="profile-name">
                     {userData.firstName} {userData.lastName}
                    </p>
                </Col>
            </Row>
            <Row style={{margin:0,paddingTop:10}}>
                <Col md={{offset:4,span:4}} xs={{span : 3, offset:4}}>
                    <p className="profile-rating">
                <Rating value={userData.rating}  readOnly precision={0.5}/>
                    </p>
                </Col>

        {/* self */}

            </Row>
            <Row>
                <Col md={{offset:2,span:4}} align={outerWidth>750 ? 'left' : 'center'}>Current Address :</Col>
                <Col md={5}>Street # {userData.street} {userData.town} {userData.province},{userData.city}.</Col>
            </Row>
            <Row>
                <Col md={{offset:2,span:4}}  align={outerWidth>750 ? 'left' : 'center'}>Date Of Birth : </Col>
                <Col md={5}>{userData.dateOfBirth}</Col>
            </Row>
            <Row>
                <Col md={{offset:2,span:4}} align={outerWidth>750 ? 'left' : 'center'}>Phone Number :</Col>
                <Col md={5}>{userData.phoneNumber}</Col>
            </Row>
            <Row>
                <Col md={{offset:2,span:4}} align={outerWidth>750 ? 'left' : 'center'}>Gender :</Col>
                <Col md={5}>{userData.gender}</Col>
            </Row>
            <Row>
                <Col md={{offset:2,span:4}} align={outerWidth>750 ? 'left' : 'center'}>Carrier Role :</Col>
                <Col md={5}
                style={userData.carrierRole ? {color:'darkgreen'} : {color:'red'}}
                className="changeOnHover"
                >{userData.carrierRole ? 'Enabled' : 'Disabled '}</Col>
            </Row>
            <Row>
                <Col md={{offset:2,span:4}} align={outerWidth>750 ? 'left' : 'center'}>Shipper Role :</Col>
                <Col md={5}
                style={userData.shipperRole ? {color:'darkgreen'} : {color:'red'}}
                className="changeOnHover"
                >{userData.shipperRole ? 'Enabled' : 'Disabled '}</Col>
            </Row>
            <Row>
            </Row>
            <br /><br />
        </div>

            }
                 <Row style={{marginTop:100}}>
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
        </div>
    )
}

export default MyProfile
