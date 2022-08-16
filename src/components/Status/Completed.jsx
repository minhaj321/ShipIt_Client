import Chip from '@mui/material/Chip';
import './Status.css';

const Completed = () => {
    return ( 
        <div style={{display:'inline'}} className="status_div">
              <Chip label="COMPLETED" className="status_chip" style={{background:'#3151F5',color:'white'}}/>
        </div>
     );
}
 
export default Completed;