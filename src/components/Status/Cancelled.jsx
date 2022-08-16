import Chip from '@mui/material/Chip';
import './Status.css';


const Cancelled = () => {
    return ( 
        <div style={{display:'inline'}} className="status_div">
              <Chip label="CANCELLED" className="status_chip" style={{background:'#F53131',color:'white'}}/>
        </div>
     );
}
 
export default Cancelled;