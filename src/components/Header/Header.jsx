import React , {useState} from 'react';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { useNavigate } from "react-router-dom";
import './Header.css';
import { Button } from '@mui/material';
import NotificationCard from '../Cards/NotificationCard'

const Header = () => {
    const navigate = useNavigate();

    const [openMenu , setOpenMenu] = useState(false)

    const handleOpenMenu = async () =>{

        setOpenMenu(!openMenu)

    }

    const LogedMeOut = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('accountType');
        localStorage.removeItem('tripId');
        navigate('/login')
        window.location.reload();
    }


    return (
        <div className="header_parent_div">
            {/* <div className="sub_div">
                <span>
            <NotificationsOutlinedIcon style={{marginTop:-5}} onClick={handleOpenMenu} />
                </span>
               
            </div> */}

            <div className="sub_div" onClick={() => LogedMeOut()}>
                <span>

                    <div className="logout">
                        <Button
                            color="secondary"
                            variant="contained"
                            startIcon={<LogoutOutlinedIcon style={{ marginTop: -5 }} />}
                        >
                            Logout
                        </Button>
                    </div>
                </span>
            </div>

            <div className="sub_div">
                {
                    openMenu === true && (
                        <div style={{width:'500px' , height:'500px', backgroundColor:'#F6F6F6', position:'absolute' , top:'50px', right:'0px' , border:'1px solid grey' , borderRadius:'10px' , overflowY:'scroll'}} >
                            <NotificationCard />
                            <NotificationCard />
                            
                         </div>
                    ) 
                }
              
            </div>

        </div>
    );
}

export default Header;