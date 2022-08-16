import React,{useState} from 'react'
import {TextField,Button,Modal,Box} from '@mui/material';
import DropDown from '../DropDown/DropDown';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
const Complaint = (props) => {

  var navigate=useNavigate();
  //getting user from storage
  var user=JSON.parse(localStorage.getItem('user'));


    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    const handleOpen = () => setOpen(true);
    const [complaintType,setComplaintType] = useState('');
    const [complaintDesc,setComplaintDesc] = useState('');

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
    
      const SetComplaint = (type)=>{
        setComplaintType(type);
      }

      // sending complaint
    const handleComplaint = async()=>{
      var {data} = await axios.post('http://localhost:5000/complaint/createComplaint',{
        shipperId:props.shipperId,
        carrierId:props.carrierId,
        shipmentId:props.shipmentId,
        packageId:props.packageId,
        chatroomId:props.chatRoomId,
        complaintTitle:complaintType,
        complaintDescription:complaintDesc,
      })
      if(data.status==200){
        alert('Your complaint have been proceed.')
        navigate(`/dashboard/${user.account._id}`)
      }
}

    return (
        <div>
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      align="center"
    >
      <Box sx={style} className="verify-box">
        <h4>Enter Your Complaint.</h4>
        <br />
        <DropDown
        setData={SetComplaint}
        width={"50%"}
        type="complaint"
        inputLabel="Complaint Type" />
        <textarea style={{width:'80%'}}
        rows={6}
        value={complaintDesc}
        onChange={(e)=>setComplaintDesc(e.target.value)}
        />
        <br />
        <Button
          style={{ marginTop: 7, width: "30%" }}
          variant="contained"
          onClick={() => handleClose()}
          color="secondary"
        >
          Back
        </Button>
        <Button
          style={{ marginTop: 7, marginLeft: 10, width: "30%" }}
          variant="contained"
          onClick={() => handleComplaint()}
        >
          Submit
        </Button>
      </Box>
    </Modal>
        <Button
        variant="contained"
        color="google"
        style={{color:'#fff'}}
        onClick={()=>handleOpen()}
        >
            complaint
        </Button>
            </div>
    )
}

export default Complaint
