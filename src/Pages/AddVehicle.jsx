import React,{useState} from 'react';
import {Col,Row} from 'react-bootstrap';
import { useNavigate } from 'react-router';
import Textfield from '../components/Fields/Textfield';
import { Button,Modal,Box } from '@mui/material';
import * as Yup from 'yup';
import {Formik, Form} from'formik';
import axios from 'axios';
import './../Styles/addVehicle.css'

const AddVehicle = ({closeModal}) => {

// style for modal
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

    // const [registeredCity,SetRegisteredCity] =useState('');
    const navigate = useNavigate();
    
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // fetching logined user from localstorage
    var userDataIs = JSON.parse(localStorage.getItem('user'))
    const userId = userDataIs.account._id;

    // schema for form using yup
    const vehicleSchema = Yup.object({
        licensePlate: Yup.string().required('Number Plate Date is rquired'),
        manufacturer: Yup.string().required("Manufacturer is required"),
        model: Yup.string().required('Model is required'),
        year: Yup.number().required('Model Year is required'),
        color: Yup.string().required('Vehicle Color is required')
    })

    // method after addition of new vehicle
const handleAddClose = ()=>{
  handleClose();
  closeModal();
  window.location.reload();
}

    return (
        <div>

{/* modal for sending approval msg */}
<Modal
          open={open}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} className="add-new-vehicle">
            <p>Your vehicle has been send for approval.</p>

            <br />
            <Button
            onClick={()=>handleAddClose()}
            >Close</Button>
          </Box>
        </Modal>


            <Row style={{marginTop:0}} align="center">
                <Col>
                <h2>Add a Vehicle</h2>
                </Col>
            </Row>

            {/* start of formik form */}
            <Formik
initialValues={{
    licensePlate:"",
}}

validationSchema={vehicleSchema}
onSubmit={async(values)=>{
  // beginning of submit method
  values={
        ...values,
        accountId: userId
    }
    var {data} = await axios.post('http://localhost:5000/vehicle/addVehicle',values)
    if(data.status==200){
        handleOpen();

    }
}}
// end of submit

>
{()=>(
    <Form className="add-vehicle-form">

            <Row align="center">
                <Col md={6} sm={12}  className="create_vehicle_first_div">

            <Row style={{marginTop:20}}>
                <Col md={11} className="vehicleField" >
                <Textfield  name="licensePlate" label="Number Plate" type="text" width={"100%"}/>
                </Col>
            </Row>
                <Row style={{marginTop:10}}>
                <Col md={11} className="vehicleField" >
            <Textfield name="manufacturer" label="Manufacturer" type="text" width={"100%"}/>
                </Col>
            </Row>
            <Row style={{marginTop:20}}>
                <Col md={11} className="vehicleField" >
                <Textfield name="model" label="Model" type="text" width={"100%"}/>
                </Col>
            </Row>
                </Col>
                <Col md={6} sm={12}  className="create_vehicle_first_div">

                <Row style={{marginTop:20}}>
                <Col md={11}>
                <Textfield  name="color" label="Color" type="text" width={"100%"}/>
                </Col>
            </Row>
                <Row style={{marginTop:10}}>
                <Col md={11}>
                <Textfield  name="year" label="Model Year" type="text" width={"100%"}/>
                </Col>
            </Row>
                </Col>
            </Row>
            <Row>
            <Col xl={6} md={7} xs={6}>
            <Button
              variant="contained"
              color="secondary"
              style={{ width: "100px"}}
              onClick={()=>closeModal()}
            >
              Cancel
            </Button>
            </Col>
                <Col xl={{offset:2,span:3}} md={5}
                xs={6}
                >
                <Button
              variant="contained"
              color="primary"
              type="submit"
              style={{ width: "100px"}}
            >
              Create
            </Button>
            </Col>
            </Row>
            </Form>
    )}
    </Formik>            
        </div>
    )
}

export default AddVehicle
