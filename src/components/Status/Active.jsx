
import Chip from '@mui/material/Chip';
import './Status.css';

const Active = () => {
    return ( 
        <div style={{display:'inline'}} className="status_div">
              <Chip label="ACTIVE" className="status_chip" style={{background:'#31F55D',color:'white'}}/>
        </div>
     );
}
 
export default Active;