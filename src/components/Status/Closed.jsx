import Chip from '@mui/material/Chip';
import './Status.css';


const Closed = () => {
    return ( 
        <div style={{display:'inline'}} className="status_div">
              <Chip label="CLOSED" className="status_chip" style={{background:'#FF7171',color:'white'}}/>
        </div>
     );
}
 
export default Closed;