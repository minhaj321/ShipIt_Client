import {Root} from './../Config/root.js';
import React,{useState,useEffect} from 'react';
import {Button,Modal,Typography,Box} from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {Col,Row} from 'react-bootstrap';
import Title from './../components/Title/Title';
import {useLocation,useNavigate,useParams} from 'react-router-dom';
import axios from 'axios';
import './../Styles/VehicleDetails.css';

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

const VehicleDetails = () => {

    var {id} = useParams();

    const {state} = useLocation();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    var [vehicle,setVehicle] =useState({});
    const Navigate = useNavigate();

    // getting user from storage
    var userDataIs = JSON.parse(localStorage.getItem('user'))
    const userId = userDataIs.account._id;

    useEffect( async ()=>{
      // getting vehicle by id
        var {data} = await axios.post(`${Root.production}/vehicle/getVehicleById`,{vehicleId:id});
        if(data.status==200){
            vehicle=data.message;
            setVehicle(vehicle);
        }
    },[])

    // delete vehicle function
    const ConfirmDeletion =async () =>{
        const {data} = await axios.post(`${Root.production}/vehicle/deleteVehicle`,{vehicleId:id})
        if(data.status==200){
            alert(data.message);
            Navigate(`/my-vehicles/${userId}`);
        }
    }

    return (
        <div className="main-vehicle-details">

            {/* confirmation of deletion of vehicle */}
            <Modal
          open={open}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} className="delete_vehicle_popup">
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Are you sure you want to delete this vehicle?
            </Typography>
            <br />
            <Button
              variant="contained"
              color="secondary"
              style={{ width: "60px", fontSize: 10 }}
              onClick={()=>handleClose()}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="danger"
              style={{ width: "100px", fontSize: 10, marginLeft: 10,color:'#fff',background:'#ff0000' }}
              onClick={()=>ConfirmDeletion()}
            >
              Delete
            </Button>
          </Box>
        </Modal>
            {/* confirmation of deletion end */}

            <Title title="Vehicle Details"/>
            <Row>
                <Col md={{span :6}} xs={12}>
                    <h5>Vehicle Id # {vehicle._id}</h5>
                    </Col>
                <Col md={{span : 2 , offset : 3 }}>
                    <Button style={{color:'#fff',background:'#ff0000'}} variant="contained"
                    startIcon={<DeleteOutlineIcon color="light"/>}
                    onClick={()=>handleOpen()}
                    >
                        Delete
                    </Button>
                </Col>
            </Row>
            <Row style={{textDecoration:'underline'}}>
                <Col xs={{offset:1,span:5}} md={{offset : 2 , span : 3}}>Number Plate :</Col>
                <Col xs={5} md={{offset : 1 , span : 4}}>{vehicle.licensePlate}</Col>
            </Row>
            <Row style={{textDecoration:'underline'}}>
                <Col  xs={{offset:1,span:5}} md={{offset : 2 , span : 3}}>Manufacturer :</Col>
                <Col  xs={5} md={{offset : 1 , span : 4}}>{vehicle.manufacturer}</Col>
            </Row>
            <Row style={{textDecoration:'underline'}}>
                <Col  xs={{offset:1,span:5}} md={{offset : 2 , span : 3}}>Model :</Col>
                <Col  xs={5} md={{offset : 1 , span : 4}}>{vehicle.model}</Col>
            </Row>
            <Row style={{textDecoration:'underline'}}>
                <Col  xs={{offset:1,span:5}} md={{offset : 2 , span : 3}}>Model Year :</Col>
                <Col xs={5} md={{offset : 1 , span : 4}}>{vehicle.year}</Col>
            </Row>
            <Row style={{textDecoration:'underline'}}>
                <Col  xs={{offset:1,span:5}} md={{offset : 2 , span : 3}}>Color :</Col>
                <Col xs={5} md={{offset : 1 , span : 4}}>{vehicle.color}</Col>
            </Row>
        </div>
    )
}

export default VehicleDetails
