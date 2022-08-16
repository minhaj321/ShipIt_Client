import {Root} from './../Config/root.js';
import React,{useState,useEffect} from 'react'
import VehicleCard from '../components/Cards/VehicleCard';
import {Col,Row} from 'react-bootstrap';
import Title from './../components/Title/Title';
import {Modal,Box,Typography,Button} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AddVehicle from './AddVehicle';
import axios from 'axios';
import './../Styles/VehiclesList.css';
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

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

const VehiclesList = () => {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    var [vehiclesArray,setVehiclesArray] = useState([])
    var [loading,setLoading] = useState(false);
    var [error,setError] = useState(false);
    var userDataIs = JSON.parse(localStorage.getItem('user'))
    const userId = userDataIs.account._id;

    useEffect(async()=>{
      setError(false);
      setLoading(true)
      // fetching all vehicles w.r.t user
      try{
      var {data} = await axios.post(`${Root.production}/vehicle/getVehicleByUser`,{accountId:userId})
      console.log(data)
      if(data.status==200){
        vehiclesArray = data.message;
        setVehiclesArray(vehiclesArray)
        console.log(data.message)
      }
      else{
        setError(true)
      }
    }
    catch(err){
      setError(true)
    }
    setLoading(false)
    },[])


    return (
        <div className="my-vehicles-main-div">

{/* modal for form of 'add vehicle' */}
        <Modal
          open={open}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} className="add-new-vehicle">
            <AddVehicle closeModal={handleClose}/>
            <br />

          </Box>
        </Modal>
            <Title title="My Vehicles" />
            {
             vehiclesArray.length<5 &&

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
            }
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
    There is an error in getting your data.
  </Alert>
</Col>
}
</Row>

<Row className="vehicle_card_main">
            {
                vehiclesArray.map((v,i)=>{
                  return(                    
                <Col  md={6}
                lg={4}
                xl={3} className="vehicle-card">
                    <VehicleCard myData={v} route={`/vehicle-details/${v._id}`}/>
                </Col>
                  )
                })
            }
            </Row>
        </div>
    )
}

export default VehiclesList
