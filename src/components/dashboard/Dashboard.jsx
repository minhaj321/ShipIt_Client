import  NewsletterFoot from './../Footer/NewsletterFoot';
import React, { useState,useEffect } from 'react';
import CommuteIcon from '@mui/icons-material/Commute';
import { styled, useTheme } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import HomeSharpIcon from '@mui/icons-material/HomeSharp';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Header from './../Header/Header';
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List';
import GavelIcon from '@mui/icons-material/Gavel';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DepartureBoardIcon from '@mui/icons-material/DepartureBoard';
import CarRepairIcon from '@mui/icons-material/CarRepair';

const drawerWidth = 250;

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
}));

export default function Dashboard(props) {

  var windowWidth = window.innerWidth;
  let dashboard_options = [];
  if (props.user == "Carrier") {
    dashboard_options = [
      
      {
        name: 'My Profile', navigate_function: () => {
          navigate(`/profile/${userId}`, { state: { data: false } })
          setOpen(false)
        },
        icon:<PersonIcon/>
      },
      {
        name: 'Dashboard',
         navigate_function: () => {
          navigate(`/dashboard/${userId}`)
          setOpen(false)
        },
        icon:<DashboardIcon/>
      },
      {
        name: 'Shipment Auctions', navigate_function: () => {
          navigate('/available-auction')
          window.location.reload();
          setOpen(false)
        },
        icon:<GavelIcon/>
      },
      {
        name: 'Manage Vehicles', navigate_function: () => {
          navigate(`/my-vehicles/${userId}`)
          setOpen(false)
        },
        icon:<CommuteIcon/>
      },
      {
        name: 'My Trips', navigate_function: () => {
          navigate(`/my-trips/${userId}`)
          setOpen(false)
        },
        icon:<CarRepairIcon/>
      },
      {
        name: 'My Orders', navigate_function: () => {
          navigate(`/my-offers/${userId}`)
          setOpen(false)
        },
        icon:<ListAltIcon/>
      },
      {
        name: 'Current Shipments', navigate_function: () => {
          navigate(`/current-shipments/${userId}`)
          setTimeout(()=>{
            window.location.reload()
          },1000)
          setOpen(false)
        },
        icon:<DepartureBoardIcon/>
      },
    ]
  }
  else if (props.user === 'Shipper') {
    dashboard_options = [
      
      {
        name: 'My Profile', navigate_function: () => {
          navigate(`/profile/${userId}`, { state: { data: false } })
          setOpen(false)
        },
        icon:<PersonIcon/>

      },
      {
        name: 'Dashboard', navigate_function: () => {
          navigate(`/dashboard/${userId}`)
          setOpen(false)
        },
        icon:<DashboardIcon/>

      },
      {
        name: 'Home', navigate_function: () => {
          navigate('/available-trips')
          setOpen(false)
        },
        icon:<HomeSharpIcon/>
      },
      {
        name: 'Create an Offer', navigate_function: () => {
          navigate(`/create-auction/${userId}`)
          setOpen(false)
        },
        icon:<AddBoxIcon/>
      },
      {
        name: 'My Auctions', navigate_function: () => {
          navigate(`/My-Auctions/${userId}`)
          setOpen(false)
        },
        icon:<ListAltIcon/>

      },
      {
        name: 'My Shipments', navigate_function: () => {
          navigate(`/my-shipments/${userId}`)
          setOpen(false)
        },
        icon:<AirportShuttleIcon/>
      },
    ]
  }

  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  var userDetails = JSON.parse(localStorage.getItem('user'))
  var imgPath = userDetails.account.profilePic;
  const userId = userDetails.account._id;
  const userName = userDetails.account.firstName
  
  useEffect(async()=>{

    // active trips checking
      // var {data} = await axios.post('http://localhost:5000/trip/getAllActiveShipmentsOfCarrier');
      // if(data.status==200){
      // setCond(true)

      // }
  },[])

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));
  

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };



  return (
    <div>
    <AppBar position="fixed" open={open} className="appbar_main">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginLeft: '10px',
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <div style={{position:'absolute',right:0}}>
          <Header/>
          </div>
        </Toolbar>
      </AppBar>
        <React.Fragment key={'left'}>
          <Drawer
            anchor={'left'}
            open={open}
            onClose={()=>handleDrawerClose()}
          >
    <Box
      sx={{ width: 250 }}
      role="presentation"
    >
               <div className="sidebar_drawer_Styled" >

        <DrawerHeader>
          <IconButton onClick={handleDrawerClose} style={{ color: 'white' }} className="drawer-btn">
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        {  open &&
        <div className="dashboard_profile_div">
             <img className="dashboard_avatar" src={imgPath} alt="" />
            <h4>{userName}</h4>
           </div>
        }

      <List>
      {dashboard_options.map((text, index) => (
            <ListItem button key={text} onClick={text.navigate_function}
            className="dashboard_list_item"
            >
              <ListItemIcon style={{color:'#d6d6d6'}}>
                {text.icon}
              </ListItemIcon>
              <ListItemText primary={text.name} />
            </ListItem>
          ))}
      </List>
        </div>


    </Box>
          </Drawer>

          {/* START OF SECOND DRAWER */}
          {windowWidth > 750 &&

          <Drawer variant="permanent" open={open} >
          <DrawerHeader>
        </DrawerHeader>
        <List className="drawer_styled">
          {dashboard_options.map((text, index) => (
            <ListItem button key={text.name}>
              <ListItemIcon style={{color:"#fff" , marginTop:5,marginLeft:5}}
              onClick={()=>text.navigate_function()}
              >
                {text.icon}
              </ListItemIcon>
            </ListItem>
          ))}
        </List>
      </Drawer>
          }
      
      <Box component="main" sx={{ flexGrow: 1, pl: 15 }}>
      <DrawerHeader />
      <div style={{marginLeft:-60}}>
        {props.children}
        <NewsletterFoot />
          </div>
      </Box>
        </React.Fragment>
    </div>
  );
}
