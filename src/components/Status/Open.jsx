import Chip from '@mui/material/Chip';
const Open = () => {
    return ( 
        <div style={{display:'inline'}} className="status_div">
              <Chip label="OPEN" className="status_chip" style={{background:'#6EFF8E',color:'white'}}/>
        </div>
     );
}
 
export default Open;