import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from "react-router-dom";
import { useContext } from "react";
import Divider from '@mui/material/Divider';

const Sidebar = () => {

  return (
    <div style={{backgroundColor:'#008B8B'}} className="sidebar">

      <hr />
      <div  className="center">
        <ul>
        <Divider flexItem sx={{marginBottom:'5px',  backgroundColor:'white' }} />

        
          <li>

            <DashboardIcon className="icon" />
            <span className="semiboldfont">Dashboard</span>
          </li>
          <Divider flexItem sx={{ marginTop:'5px', backgroundColor:'white' }} />
         
         

          <p className="title">USER</p>
         
          <li>
            <AccountCircleOutlinedIcon className="icon" />
            <span >Profile</span>
          </li>
          
          <li>
            <ExitToAppIcon className="icon" />
            <span style={{marginTop:'10px'}} >Logout</span>
          </li>
          <Divider flexItem sx={{ marginTop:'10px', backgroundColor:'white' }} />
        </ul>
      </div>

    </div>
  );
};

export default Sidebar;
