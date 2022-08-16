import {Root} from '../../Config/root';
import React,{useState} from 'react';
import {Row,Col} from 'react-bootstrap';
// switch button code
import {Modal,Box,Button} from '@mui/material'
import { alpha, styled } from '@mui/material/styles';
import { pink } from '@mui/material/colors';
import Switch from '@mui/material/Switch';
import {Typography} from '@mui/material'
import './Title.css';
import {useNavigate,useParams} from 'react-router-dom';
// redux imports 
import axios from 'axios';


const GreenSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: pink[600],
    '&:hover': {
      backgroundColor: alpha(pink[600], theme.palette.action.hoverOpacity),
    },
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: pink[600],
  },
}));

const label = { inputProps: { 'aria-label': 'Switch demo' } };
// end of switch suporting code.
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  maxHeight:150,
  scroll:false,
  p: 4,
};



function DashboardTitle({title}) {
  
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [Message,setMessage] = useState('');
      var {id} = useParams();

     
      let accountType = localStorage.getItem('accountType')

    const handleAccountSwitch =async()=>{
      var {data} = await axios.post(`${Root.production}/user/findorCreateCarrierRole`,{accountId:id});
      if(data.status==200){
        if(accountType == 'Shipper'){
          localStorage.setItem('accountType','Carrier')
          window.location.reload()
        }else{
          localStorage.setItem('accountType','Shipper')
          window.location.reload()
        }
      }
    else if(data.status==405){

      setMessage(data.message)
      console.log('405==>',data.message)
      handleOpen();
     
    }else{
      setMessage(data.message)
      console.log('else==>',data.message)
      handleOpen();
        }
  

    }


    return (
      <div >


      {/* main modal */}
      <Modal
        align="center"
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}
          style={{ overflow: 'scroll' }} className="trip_creation_form"
        >
          <p>{Message}</p>
          <Button
          variant="contained"
          onClick={()=>handleClose()}
          >
            Close
          </Button>
        </Box>
      </Modal>


        <Row style={{marginTop:0}}>
        <Col md={6} align="left">
        <h1>{title}</h1>
        </Col>
        
        <Col md={5} align="right">
        <Typography>{'Shipper'}
        <Switch {...label} color="primary"
        checked={ accountType == 'Shipper' ? false : true }
        onChange={()=>handleAccountSwitch()}/>
        {'Carrier'}</Typography>
        </Col>
        </Row>
      </div>
    );
  }
  
  export default DashboardTitle;
  