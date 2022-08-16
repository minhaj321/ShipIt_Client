import {Root} from './../Config/root.js';
import React,{useState,useEffect} from 'react'
import Title from '../components/Title/Title';
import {Col,Row} from 'react-bootstrap';
import Open from '../components/Status/Open';
import Closed from '../components/Status/Closed';
import Waiting from '../components/Status/Waiting';
import { Button,Modal,Box,Typography } from '@mui/material';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import './../Styles/shipperAuctionDetails.css';
import TripRoute from '../components/LocationAndMap/TripRoute';

const ShipperAuctionDetails = () => {


    var {id} = useParams();
    var [auctionData,setAuctionData] = useState();
    var [openTill,setOpenTill]=useState(); 
    var [bidList,setBidList] = useState([]);
    const [auctionStatus,setauctionStatus] = useState('Open');
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [cond, setCond] = useState(false);

    // close auction method
    const closeAuction=async()=>{
      var {data} = await axios.post(`${Root.production}/auction/terminateAuction`,{
        auctionId : id
      })
      if(data.status==200){
        setauctionStatus('Closed');
        handleClose();
      }
      else{
        alert(data.message)
      }
    }

    
    useEffect(async()=>{
      // fetching auction by id 
      var {data} = await axios.post(`${Root.production}/auction/getAuctionById`,{auctionId:id})
      if(data.status==200){
        auctionData=data.message;
        setAuctionData(auctionData);
        bidList=data.message.auctionData.bids;
        setBidList(bidList);
        setauctionStatus(auctionData.auctionData.status)

        // setting closing date of auction
        openTill = moment(auctionData.auctionData.updatedAt,'YYYY-MM-DD');        
        openTill = openTill.add(auctionData.auctionData.auctionDuration,'days').format('DD-MM-YYYY');
        setOpenTill(openTill)
      }
      var today=moment().format('DD-MM-YYYY');
      if(today>openTill){
        var {data} = await axios.post(`${Root.production}/auction/terminateAuction`,{
          auctionId : id
        })
        if(data.status==200){
          window.location.reload();
        }
      }
      setCond(true)
    },[])
    
    // method to choose any bid
const handleChooseBid=async(auctionId,bidId)=>{
  var {data} = await axios.post(`${Root.production}/auction/chooseBid`,{auctionId,bidId})
  if(data.status==200){
    window.location.reload()
  }
}

// setting width as per screen
var windowWidth = window.outerWidth;
var modalWidth = windowWidth>1400 ? '50%' : windowWidth>440 ? '80%' : "80%" 

// styles for modal
const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: modalWidth,
        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
        p: 4,
      };
          
    return (
      
      <div className="shipper_auction_details_main">
      {cond &&
        <div style={{textAlign:'left'}}>
          {/* confirmation of close auction */}
                  <div>                 
        <Modal
          open={open}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
            Are you sure you want to close this auction and decalre Bid #skdfsldfl as the winner
            </Typography>
            <br />
            <Button
              variant="contained"
              color="secondary"
              style={{ width: "60px", fontSize: 10 }}
              onClick={()=>handleClose()}
            >
              Back
            </Button>
            <Button
              variant="contained"
              color="primary"
              style={{ width: "60px", fontSize: 10, marginLeft: 10 }}
              onClick={()=>closeAuction()}
            >
              Yes
            </Button>
          </Box>
        </Modal>
      </div>
      <Title title={`Auction # ${id}`} />
            <Row>
                <Col md={{span:3 , offset:1}}
                xs={{span:5}}
                >
                <span>Status : {
                      auctionStatus=='Open' ? <Open/> : 
                      auctionStatus=='On Hold' ? <Waiting/> :
                      <Closed/>
                    }
                </span>
                </Col>
                <Col xl={{span:2,offset:6}} lg={{span:3,offset:4}} md={{span:4,offset:3}}
                xs={{span:7}}
                >
                  {/* checking for open status */}
                    { auctionStatus=='Open' &&
                <Button
                  variant="contained"
                  color="google"
                  style={{ width: "75%",fontSize:12 ,color:'white'}}
                  onClick={()=>handleOpen()}
                >
                  Close Auction
                </Button>
                    }
                </Col>
                <br /><br /><hr/>
            </Row>
            <Row
            ><Col md={{span:10,offset:1}}>
              
                  {/* checking for open status */}
                {(auctionStatus=='Open') &&
                    <h3>Current Winning Bid :</h3>} 
                {!auctionStatus &&
                    <h3>Winner Bid :</h3>}                 
            </Col></Row>
{auctionData.auctionData.bids.length >0 &&
            <Row><Col md={{span:10,offset:1}}>
            <div style={{background : '#E3E3E3',borderRadius:"2%",padding:20}}
            >
                <p>Bidding carrier Id # {auctionData.auctionData.bids[auctionData.auctionData.bids.length-1] ? auctionData.auctionData.bids[auctionData.auctionData.bids.length-1].response.carrierId : 'No bid yet'}</p>
                <p>Bid : {auctionData.auctionData.bids[auctionData.auctionData.bids.length-1] ? auctionData.auctionData.bids[auctionData.auctionData.bids.length-1].response.bidAmount+'Rs' : 'No bid yet'} </p>
            </div>
            </Col></Row>
          }
          {auctionData.auctionData.bids.length ==0 &&
            <Row><Col md={{span:10,offset:1}}>
            <div style={{background : '#E3E3E3',borderRadius:"2%",padding:20}}
            >
                <p>There haven,t been any bids for this auction.</p>
            </div>
            </Col></Row>
          }
            {/* pickup details */}
            <Row style={{marginTop:0}}><Col md={{span:10,offset:1}}>
            <h3>PickUp Details :</h3>
            </Col></Row>
            <Row><Col md={{span:10,offset:1}}>
            <div style={{background : '#E3E3E3',borderRadius:"2%",padding:20}}
            >
                <p>City : {auctionData ? auctionData.auctionData.pickupCity : 'Loading...'}</p>
                <p>Address : {auctionData ? auctionData.auctionData.pickupAddress : 'Loading...'}</p>
                <p>Date : {auctionData ? auctionData.auctionData.pickupDate : 'Loading...'}</p>
                <p>Time : {auctionData ? auctionData.auctionData.pickupTime : 'Loading...'}</p>
            </div>            
            </Col></Row>
            {/* dropOff details */}
            <Row><Col md={{span:10,offset:1}}>
            <h3>DropOff Details :</h3>
            </Col></Row>
            <Row><Col md={{span:10,offset:1}}>
            <div style={{background : '#E3E3E3',borderRadius:"2%",padding:20}}
            >
                <p>Contact Name :{auctionData ? auctionData.auctionData.dropOffContactName : 'Loading...'} </p>
                <p>Contact Number :{auctionData ? auctionData.auctionData.dropOffContactNumber : 'Loading...'} </p>
                <p>City : {auctionData ? auctionData.auctionData.destinationCity : 'Loading...'}</p>
                <p>Address : {auctionData ? auctionData.auctionData.destinationAddress : 'Loading...'}</p>
                <p>Date : {auctionData ? auctionData.auctionData.dropOffDate : 'Loading...'}</p>
                <p>Time : {auctionData ? auctionData.auctionData.dropOffTime : 'Loading...'}</p>
            </div>            
            </Col></Row>
            {/* Package details */}
            <Row><Col md={{span:10,offset:1}}>
            <h3>Package Details :</h3>
            </Col></Row>
            <Row><Col md={{span:10,offset:1}}>
            <div style={{background : '#E3E3E3',borderRadius:"2%",padding:20}}>
                <img className="package_image" src={auctionData ? auctionData.packageData.packageImageUrl : 'Loading...'}/>
                <p>PackageID :{auctionData ? auctionData.packageData._id : 'Loading...'}</p>
                <p>Size :{auctionData ? auctionData.packageData.packageHeight : 'Loading...'}cm X {auctionData ? auctionData.packageData.packageWidth : 'Loading...'}cm</p>
                <p>Weight :{auctionData ? auctionData.packageData.packageWeight : 'Loading...'}Kg</p>
                <p>Type :{auctionData ? auctionData.packageData.packageType : 'Loading...'}</p>
            </div>            
            </Col></Row>
            <Row><Col md={{span:10,offset:1}}>
            <h3>Auction Details :</h3>
            </Col></Row>
            <Row><Col md={{span:10,offset:1}}>
            <div style={{background : '#E3E3E3',borderRadius:"2%",padding:20}}
            >
                <p>Starting Bid : {auctionData ? auctionData.auctionData.startingBid : 'Loading...'}Rs</p>
                <p>Auction Open Till : {openTill}</p>
            </div>            
            </Col></Row>
            <Row><Col md={{span:10,offset:1}}>
            <h3>Route :</h3>
            </Col></Row>
            <Row><Col md={{span:10,offset:1}}>
                  <TripRoute
                  departurelati={auctionData.auctionData.pickupLattitude}
                  departurelongi={auctionData.auctionData.pickupLongitude}
                  destinationlati={auctionData.auctionData.dropOffLattitude}
                  destinationlongi={auctionData.auctionData.dropOffLongitude}/>
            </Col></Row>
            <Row className="bids_list" align="center" style={{width:'80%',background : '#F7F7FA',padding:6,margin:'auto',marginTop:40,color:'#656262'}}>
            <Col md={5}>
           <span>CarrierID</span>     
            </Col>       
            <Col md={4}>
            <span>Bid</span> 
            </Col>       
            <Col md={3}>
            <span>Choose</span> 
            </Col>
            </Row>

            <Row className="bids_list" style={{border:'#656262 1px solid',width:'80%',margin:'0px auto'}}>
            {bidList &&
                bidList.map((val,index)=>{
                    return(
                        <Row align="center" style={index%2 === 0 ? {width:'100%',margin:'auto',padding:6} : 
                        {width:'100%',margin:'auto',padding:6,background:'#C0C0C0'}}>
                        <Col md={5}>
                       <span>{val.response.carrierId}</span>     
                        </Col>       
                        <Col md={4}>
                        <span> {val.response.bidAmount}</span> 
                        </Col>       
                        <Col md={3}>
                        <Button
                        disabled={auctionStatus!='Open'}
                        onClick={()=>handleChooseBid(val.response.auctionId,val.response._id)}
                         variant="contained" color="success" style={{fontSize:11}}>Select</Button> 
                        </Col>       
                        </Row>        
                    )
                })
            }       
            </Row>
        <br /><br />

        </div>
            }
            </div>
    )
}

export default ShipperAuctionDetails
