import {Root} from './../Config/root.js';
import React,{useState,useEffect} from 'react'
import Title from '../components/Title/Title';
import {Col,Row} from 'react-bootstrap';
import Cancelled from '../components/Status/Cancelled';
import Completed from '../components/Status/Completed';
import Waiting from '../components/Status/Waiting';
import Pending from '../components/Status/Pending';
import Active from '../components/Status/Active';
import Button from '@mui/material/Button';
import {useNavigate,useParams} from 'react-router-dom';
// import ActiveTimeline from '../components/Timeline/Timeline';
import axios from "axios";
import Closed from './../components/Status/Closed'
import moment from 'moment';
import './../Styles/CarrierOfferDetails.css';
import Complaint from '../components/Complaint/Complaint';
import TripRoute from '../components/LocationAndMap/TripRoute';


const CarrierOfferDetails = () => {
  
  // getting id from params
  const { id } = useParams();

  // getting user from localstorage
  var user = JSON.parse(localStorage.getItem('user'));

  const [disable,setDisable] = useState(false);
    var [mystatus, setStatus] = useState('Cancelled');
    var [statusText, setStatusText] = useState('Cancelled');
    var [responseData, setResponseData] = useState();
    const [loading,setLoading] = useState(true);
  

    const navigate = useNavigate();

    useEffect(async()=>{
      // data fetching
      const { data } = await axios.post(
        `${Root.production}/trip/viewShipmentOfferDetails`,
        { shipmentOfferId: id }
      );
  
      if (data.status == 200) {

        // date checking begin
var get= data.message.shipmentOffer.createdAt;
let target = moment(get).format()
let newtarget = moment(target).add(15 , 'minutes').format();
let flag = moment(new Date()).isBefore( newtarget)

// checking for the expiration api
if( !flag   && data.message.shipmentOffer.status=='Pending'){
  const response= await axios.post(`${Root.production}/trip/expireShipmentOffer` , {shipmentOfferId: id })
  if(response.data.status==200){
    window.location.reload();
  }
}
// end 
        setResponseData(data.message);
        setLoading(false);
      
        // checking for the status of offer
        switch(data.message.shipmentOffer.status){
            case 'Active':
                mystatus=<Active/>;
            setStatus(<Active/>);
            break;
            case 'Pending':
                mystatus=<Pending/>;
            setStatus(<Pending/>);
            break;
            case 'Waiting':
                mystatus=<Waiting/>;
            setStatus(<Waiting/>);
            break;
            case 'Completed':
                mystatus=<Completed/>;
            setStatus(<Completed/>);
            break;
            case 'Cancelled':
                mystatus=<Cancelled/>;
            setStatus(<Cancelled/>);
            break;
            default:
              mystatus = <Closed />;
              setStatus(<Closed />)
            
        }
        statusText = mystatus.type().props.children.props.label;
        setStatusText(statusText)
      }else {
      }
      },[])
    
      // handle fuction to accept offer
      const handleAcceptOffer = async ()=>{
        var {data} = await axios.post(`${Root.production}/trip/acceptShipmentOffer`,{
          shipmentOfferId:id,
          carrierId:user.account._id
        })
        if(data.status==200){
          window.location.reload();
        }
      }
      
            // handle fuction to reject offer
      const handleRejectOffer = async ()=>{
        var {data} = await axios.post(`${Root.production}/trip/rejectShipmentOffer`,{
          shipmentOfferId:id,
        })
        if(data.status==200){
          navigate(`/my-offers/${user.account._id}`)
        }
      }
      
            // handle fuction to start offer
      const handleStartShipment=async()=>{
        var {data} = await axios.post(`${Root.production}/trip/startSingleShipment`,{
          shipmentOfferId:id,
        })
        if(data.status==200){          
          window.location.reload();
        }
      }

    return (
        <div style={{textAlign:'left'}} className="carrier-offer-details-main">

            <Title title={`Order # ${id}`}/>
            <Row>
                <Col md={{span:3 , offset:1}}
                xs={6}
                >
                <span>Status : {mystatus} </span>
                </Col>
                {(responseData !=null && statusText!='PENDING') &&
// complaint column
<Col xl={{ span: 2, offset: 6 }} lg={{ span: 3, offset: 5 }} md={{span:3,offset:5}} xs={{offset:1,span:4}}>
<Complaint shipmentId={responseData.shipmentOffer!=null && responseData.shipmentOffer._id}
             carrierId={responseData.shipmentOffer!=null && responseData.shipmentOffer.carrierId} 
             packageId={responseData.package!=null && responseData.package._id} 
             chatRoomId={responseData.shipmentOffer!=null && responseData.shipmentOffer.chatRoomId} 
             shipperId={responseData.shipmentOffer!=null && responseData.shipmentOffer.accountId}/>
</Col>
}                
{/* buttons for waiting status */}
                {
        statusText == 'WAITING' &&
                <Col xl={{span:2 , offset:5}}
                lg={{span:3,offset:4}}
                md={{span:4,offset:3}}
                xs={{span:6}}
                >
                <Button
                  variant="contained"
                  color="success"
                  disabled={disable}
                  style={{ width: "85%",height:'70%',fontSize:12 ,color:'white',padding:10}}
                  onClick={()=>handleStartShipment()}
                  >Start Shipment</Button>  
                </Col>
}

{/* buttons for pending status */}
                {
        statusText == 'PENDING' &&
                <Col md={{span:1 , offset:5}}
                xs={{span:2,offset:1}}
                >
                  
                <Button
                className="reject_btn"
                  variant="contained"
                  color="google"
                  style={{ width: "100%",height:'70%',fontSize:12 ,color:'white',padding:10}}
                  onClick={()=>handleRejectOffer()}
                  disabled={disable}

                  >
                    Reject
                </Button>  
                </Col>
}

{/* buttons for pending status */}
{
        statusText == 'PENDING' && 
                <Col md={{span:1}}
                xs={2}
                >
                <Button
                className="accept_btn"
                  variant="contained"
                  color="success"
                  style={{ width: "100%",height:'70%',fontSize:12 ,color:'white',padding:10}}
                  onClick={()=>handleAcceptOffer()}
                  disabled={disable}

                  >
                    Accept
                </Button>
                </Col>
            }
                
                <br />
                <br />
                <hr/>
            </Row>
            
{/* shipper's profile buttons for active and waiting status */}
{
        (statusText != 'WAITING' && statusText != 'ACTIVE') && 
            <Row>
                <Col xl={{span : 3 , offset : 8}} lg={{span : 3 , offset : 8}} md={{span : 4 , offset : 7}} 
                xs={{span : 8 , offset : 2}}>
                <Button
                  className="profile-btn"
                  variant="contained"
                  color="info"
                  style={{ width: "85%",fontSize:12 ,color:'white'}}
                  disabled={disable}
                  onClick={()=>navigate(`/profile/${responseData.shipmentOffer.accountId}`, { state: { data: true } })}
                >
                  Shipper's Profile
                </Button>  
                </Col>
            </Row>
}

{/* chat buttons for active and waiting status */}
{
        (statusText == 'WAITING' || statusText == 'ACTIVE') &&    
            <Row style={{margin:'0px'}}>
                <Col xl={{span : 1 , offset :6}} lg={{span : 1 , offset : 7}} md={{span : 2 , offset : 6}} 
                xs={{span : 2 , offset : 2}}>
                <Button
                  variant="contained"
                  color="info"
                  style={{ width: "100%",fontSize:12 ,color:'white'}}
                  onClick={()=>navigate(`/chat/${responseData.shipmentOffer.chatRoomId}`)}
                  disabled={disable}
                >
                  Chat
                </Button>  
                </Col>
                <Col xl={{span : 3,offset:1}} lg={3} md={3}
                xs={{span : 7,offset:1 }}
                > 
                <Button
                  variant="contained"
                  color="info"
                  style={{ width: "100%",fontSize:12 ,color:'white'}}
                  onClick={()=>navigate(`/profile/${responseData.shipmentOffer.accountId}`, { state: { data: true } })}
                  disabled={disable}
                >
                  Shipper's Profile
                </Button>  
                </Col>
            </Row>
}

{/* display data */}
            <Row style={{marginTop:0}}><Col md={{span:10,offset:1}}>
            <h3>PickUp Details :</h3>
            </Col></Row>
            <Row><Col md={{span:10,offset:1}}>
            <div style={{background : '#E3E3E3',borderRadius:"2%",padding:20}}
            >
                <p>City :  {loading ? <div>Loading...</div>  : responseData.shipmentOffer.pickupCity}</p>
                <p>Address :  {loading ? <div>Loading...</div>  : responseData.shipmentOffer.pickupAddress}</p>
                <p>Date :{loading ? <div>Loading...</div>  : responseData.shipmentOffer.pickupDate}</p>
            </div>            
            </Col></Row>
            <Row><Col md={{span:10,offset:1}}>
            <h3>DropOff Details :</h3>
            </Col></Row>
            <Row><Col md={{span:10,offset:1}}>
            <div style={{background : '#E3E3E3',borderRadius:"2%",padding:20}}
            >
                <p>Contact Name : {loading ? <div>Loading...</div>  : 
              responseData.shipmentOffer.dropOffContactName
            }</p>
                <p>Contact Number : {loading ? <div>Loading...</div>  : 
              responseData.shipmentOffer.dropOffContactNumber
            }</p>
                <p>City : {loading ? <div>Loading...</div>  : responseData.shipmentOffer.destinationCity}</p>
                <p>Address : {loading ? <div>Loading...</div>  : responseData.shipmentOffer.destinationAddress}</p>
            </div>            
            </Col></Row>
            <Row><Col md={{span:10,offset:1}}>
            <h3>Package Details :</h3>
            </Col></Row>
            <Row><Col md={{span:10,offset:1}}>
            <div style={{background : '#E3E3E3',borderRadius:"2%",padding:20}}
            >
                <p>PackageID : {loading ? <div>Loading...</div>  : responseData.package._id}</p>
                <p>
                Size : {loading ? <div>Loading...</div>  : responseData.package.packageHeight}cm X{" "}
            {loading ? <div>Loading...</div>  : responseData.package.packageWidth}cm
                </p>
                <p>Weight : {loading ? <div>Loading...</div>  : responseData.package.packageWeight}Kg</p>
                <p>Type : {loading ? <div>Loading...</div>  : responseData.package.packageType}</p>
            </div>            
            </Col></Row>
            <Row><Col md={{span:10,offset:1}}>
                  <TripRoute
                  departurelati={responseData.shipmentOffer.pickupLattitude}
                  departurelongi={responseData.shipmentOffer.pickupLongitude}
                  destinationlati={responseData.shipmentOffer.dropOffLattitude}
                  destinationlongi={responseData.shipmentOffer.dropOffLongitude}/>
            </Col></Row>
            

      <br /><br />
        </div>
    )
}

export default CarrierOfferDetails


