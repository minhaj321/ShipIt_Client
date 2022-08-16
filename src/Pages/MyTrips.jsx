import {Root} from './../Config/root.js';
import React,{useState,useEffect} from 'react';
import TripCard from '../components/Cards/TripCard';
import {Row , Col} from 'react-bootstrap';
import Title from '../components/Title/Title';
import AddIcon from '@mui/icons-material/Add';
import {Modal,Box,Button} from '@mui/material';
import CreateTrip from './CreateTrip';
import axios from 'axios';
import './../Styles/MyTrips.css';
import TripStatusBar from '../components/Navbar/TripStatusBar';
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

// width w.r.t screen size
var modalWidth = window.innerWidth>430 ? "30%" : "30%"; 

// styles for modal
const style = {
    position: "absolute",
    top: "50%",
    left: modalWidth,
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

export default function MyTrips(){
    
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    var [loading,setLoading] = useState(false);
    var [error,setError] = useState(false);
    var [errorMsg,setErrorMsg] = useState('');
    var [myTrips,setMyTrips] = useState([]);
    var [display,setDisplay] = useState([]);
    let [filter, setFilter] = useState('');
    
    // getting user from storage
    var userDetails = JSON.parse(localStorage.getItem('user'))
    const userId = userDetails.account._id;

    useEffect(async()=>{
      setError(false);
      setLoading(true)
      //fetching trips by id
      try{
      var {data} = await axios.post(`${Root.production}/trip/getTripByCarrier`,{
        carrierId : userId
      });
      if(data.status==200){
        myTrips = data.message;
        setMyTrips(myTrips);
        setDisplay(data.message)
      }
      else if(data.status==404){
        setError(true);
        setErrorMsg('You do not have any trip.')
      }
      else{
        setError(true);
        setErrorMsg('There is an error in getting your trips.')
      }
    }
    catch(err){
      setError(true);
      setErrorMsg('There is an error in getting your trips.')
    }
    setLoading(false)

    },[])


    const handleDataFilter = (val)=>{
    // checking of 'all' option
      if(val!='All'){
    display = [];
        filter= val;
    setFilter(filter);
    display.push(
      myTrips.filter((val) => {
        var check = val.status == filter;
        if (check) {
          return val;
        }
      })
    );
    display = display[0];
    setDisplay(display);
    
    
    }
      // checking the status condition
      else{
      display=myTrips;
      setDisplay(display)
    }
      }
    
return(
    <div className="my_trip_main">
        {/* starting of create new trip */}
``    <Modal
          open={open}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} className="add-new-trip" style={{overflow:'scroll'}}>
            <CreateTrip closeModal={handleClose}/>
            <br />

          </Box>
        </Modal>
        {/* end of create new trip */}
         {/* starting of main display */}
        <Title title="My Trips" />
        <Row align="right">
        <Col md={{offset : 8 ,span:3}}>
                    <Button 
                    color="primary"
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={()=>handleOpen()}
                    >
                        Add new
                    </Button>
                </Col>
        </Row>
        
      <br />
      <TripStatusBar handleDataFilter={handleDataFilter}/>
      <br />
      <Row>
     {
  loading &&
  <Col  md={{span:8,offset:2}}>
  <Alert severity="success">
    <AlertTitle>Wait</AlertTitle>
    Loading...
  </Alert>
</Col>
}
{
  error &&
  <Col  md={{span:8,offset:2}}>
  <Alert severity="error">
    <AlertTitle>Error</AlertTitle>
    {errorMsg}
  </Alert>
</Col>
}
</Row>

<Row className="trip_cards_main">
  {
    display.map((v,i)=>{
      return(
      <Col md={6}
      lg={4}
      xl={3}
      >
    <TripCard tripData={v} route={`/trip-detail/${v._id}`}/>
    </Col>
      )
    })
  }
</Row>

    </div>
)

}