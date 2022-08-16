import {Root} from './../Config/root.js';
import React,{useState,useEffect} from 'react'
import Title from './../components/Title/Title';
import {Col,Row} from 'react-bootstrap';
import Open from './../components/Status/Open';
import { Button,Modal,Box,Typography } from '@mui/material';
import {TextField} from '@mui/material';
import {useParams,useNavigate} from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import './../Styles/carrierauctiondetails.css';
import TripRoute from '../components/LocationAndMap/TripRoute';

const CarrierAuctionDetails = () => {

  var navigate = useNavigate();
    var {id} = useParams();
    var [auctionData,setAuctionData] = useState({});
    var [openTill,setOpenTill]=useState(); 
    var [myLatest,setMyLatest]=useState({}); 
    var [myBid,setMyBid] = useState();
    var [latestBid,setLatestBid] = useState(0);
    var userId = JSON.parse(localStorage.getItem('user'));
    var [vehiclesArray, setVehiclesArray] = useState([])
    var [vehicle, setVehicle] = useState('');
    
 // fetching auction details  
    useEffect(async()=>{
      var {data} = await axios.post(`${Root.production}/auction/getAuctionById`,{auctionId:id})
      if(data.status==200){
        auctionData=data.message;
        setAuctionData(auctionData);
        // fetching latest bid
        setLatestBid(auctionData.auctionData.bids.length>0 ? auctionData.auctionData.bids[auctionData.auctionData.bids.length-1].response.bidAmount : 0);
        // setting closing date of auction
        openTill = moment(auctionData.auctionData.updatedAt,'YYYY-MM-DD');        
        openTill = openTill.add(auctionData.auctionData.auctionDuration,'days').format('DD-MM-YYYY');
        setOpenTill(openTill)

        // check for update Bid
        if(auctionData.auctionData.bids.length>0){
        myLatest = auctionData.auctionData.bids.reverse().filter(val=>{
              if(val.response.carrierId==userId.account._id){
                return val
              }
        })
        setMyLatest(myLatest)
      }
      // end of checking

          // fetch vehicles
    var { data } = await axios.post(`${Root.production}/vehicle/getVehicleByUser`, { accountId: userId.account._id })
    if (data.status == 200) {
      vehiclesArray = data.message;
      setVehiclesArray(vehiclesArray)
    }
    else {
    }
    }
    var today=moment().format('DD-MM-YYYY');
    if(today>openTill){
      // terminate auction if date exceeded
      var {data} = await axios.post(`${Root.production}/auction/terminateAuction`,{
        auctionId : id
      })
      if(data.status==200){
        window.location.reload();
      }
      else{
        alert(data.message)
      }
    }
      setCond(true)
    },[])

    // states for popup
    const [open, setOpen] = useState(false);
    const [cond, setCond] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

// handle fuction for accept offer on auction
    const handleAcceptAuction=async()=>{
      var {data} =await axios.post(`${Root.production}/auction/acceptShipmentOffer`,{
        auctionId : id,
        shipmentId : auctionData.auctionData.shipmentOfferId
      })
      if(data.status==200){
        navigate('/available-auction');
      }
      else{
        alert('There is an error on accpeting offer')
      }
    }

// handle fuction for reject offer on auction
const handleRejecttAuction=async ()=>{
      var {data} =await axios.post(`${Root.production}/auction/rejectShipmentOffer`,{
        auctionId : id,
        shipmentId : auctionData.auctionData.shipmentOfferId
      })
      if(data.status==200){
        navigate('/available-auction');
      }
      else{
        alert('There is an error on accpeting offer')
      }
    }

    // handle function for popup of bid 
    const closePopUp=async()=>{
      if(auctionData.auctionData.bids.length==0 && Number(myBid) > auctionData.auctionData.startingBid){
        alert('Your bid should be less than or equal to starting bid.')
      }
     else if(auctionData.auctionData.bids.length>0 && Number(myBid) > latestBid-10){
        alert('Your bid should be atleast 10 Rs less than current bid.')
      }
      else if(vehicle==""){
        alert('Please Select Vehicle first');
      }
      else{
        
      var {data} = await axios.post(`${Root.production}/auction/createBid`,{
          bidAmount:myBid,
          auctionId:auctionData.auctionData._id,
          carrierId : userId.account._id,
          vehicleId:vehicle
        })
        if(data.status==200){
          console.log('success bid==>>',data)
          window.location.reload();
        }else{
          console.log('error bid==>>',data)
        }
        handleClose();
    }
    }

    // styles for modal
    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 500,
        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
        p: 4,
      };

    return (
      <div>
      {cond &&
        <div style={{textAlign:'left'}} className="auction_carrier_main">
          <div>
            {/* modal for bid */}
        <Modal
          open={open}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} className="create_bid">

            <Typography id="modal-modal-title" variant="h6" component="h2">
            Latest Bid :{auctionData ? latestBid+'Rs' : 'Loading'}
            </Typography>
            <Typography id="modal-modal-title" variant="h6" component="h2">
            Enter your bid here :
            </Typography>
            <Row style={{ marginTop: 35 }}>
                  <Col md={11} lg={12}>
                  <p>Select Vehicle:</p>
                    <select onChange={(e)=>setVehicle(e.target.value)}  style={{
                      border: '0px solid', borderBottom: '1px gray solid', width:'100%',
                      color: 'grey'
                    }}>
                      <option value="" disabled selected>None</option>
                      {
                        vehiclesArray.map((v) => {
                          if(v.status=='Active'){
                            return(
                            <option value={v._id}>{v.model}-{v.year}</option>
                          )
                          }
                      })
                      }
                    </select>
                  </Col>
                </Row>
 
            <TextField
            variant="standard"
            type="number"
            placeholder="Place Your Bid"
            value={myBid}
            inputProps={{max :latestBid -5}}
            required={true}
            onChange={(e)=>setMyBid(e.target.value)}
            style={{margin:'10px 0px' , width:'100%' }}
            />
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
              color={myLatest.length>0 &&
                myLatest[0].response.bidAmount!=0 ? 'info' :  'primary'}
              style={{ width: "10%", fontSize: 10, marginLeft: 10,color:'#fff' }}
              onClick={()=>{
                if(myBid<1){
                  alert('Please enter your bid first')
                }else{
                  closePopUp()
                }
                }}
            >{myLatest.length>0 &&
              myLatest[0].response.bidAmount!=0 ? 'Update' : 'Bid'
            }
            </Button>
          </Box>
        </Modal>

      </div>
            <Title title={`Auction # ${id}`} />
            <Row>
                <Col md={{span:3 , offset:1}} xs={5}>
                <span>Status : <Open/> </span>
                </Col>
                {/* button to open modal */}
                <Col md={{span:3,offset:5}} xs={{span:3,offset:3}}>           
                <Button
                  variant="contained"
                  color={myLatest.length>0 && myLatest[0].response.bidAmount!=0 ? 'info' : 'success'}
                  style={{ width: "45%",fontSize:12 ,color:'white'}}
                  disabled={auctionData.auctionData.status!=='Open' ? true : false}
                  onClick={()=>handleOpen()}
                >
                  {myLatest.length>0 && myLatest[0].response.bidAmount!=0 ? 'Update Bid' : 'Bid' }
                </Button>
                </Col>
                <br />
                <br />
                <hr/>
            </Row>
            
        {/* validating for buttons of accept and reject */}
{ auctionData.auctionData.choosenCarrierId &&
(auctionData.auctionData.status === 'On Hold' && auctionData.auctionData.choosenCarrierId == userId.account._id) &&
            <Row>
              <Col md={{offset:1,span:5}}>
              <Button
          color="google"
          style={{ marginTop: 7, width: "30%" ,marginLeft:10}}
          variant="contained"
          onClick={() => handleRejecttAuction()}
        >
          Reject
        </Button>
              </Col>
              <Col md={5}>
              <Button
          color="success"
          style={{ marginTop: 7, width: "30%" ,marginLeft:10}}
          variant="contained"
          // disabled={}
          onClick={() => handleAcceptAuction()}
        >
          Accept
        </Button>
              </Col>
            </Row>
          }
            {/* displaying latest bid */}
            <Row style={{margin:0}} ><Col lg={{span:3 ,offset : 9 }} md={{offset:8,span:4}}
            xs={{span:8}}
            >
            <h4>
            Latest Bid :{auctionData ? latestBid+'Rs' : 'Loading'}
              </h4>
              {myLatest.length>0 &&
              <h4>
            Your bid :{myLatest.length>0 && myLatest[0].response.bidAmount}Rs
              </h4>
              }
            </Col></Row>
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
            <Row><Col md={{span:10,offset:1}}>
            <h3>Package Details :</h3>
            </Col></Row>
            <Row><Col md={{span:10,offset:1}}>
            <div style={{background : '#E3E3E3',borderRadius:"2%",padding:20}}>
                <img className="auction_display_img" src={auctionData ? auctionData.packageData.packageImageUrl : 'Loading...'}/>
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
            
      <br /><br />
        </div>
            }
            </div>
    )
}

export default CarrierAuctionDetails


