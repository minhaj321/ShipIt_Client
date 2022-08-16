import Chip from '@mui/material/Chip';
const Pending = () => {
    return ( 
        <div style={{display:'inline'}} className="status_div">
              <Chip label="PENDING" className="status_chip"  style={{background:'#E7DE1A',color:'white'}}/>
        </div>
     );
}
 
export default Pending;