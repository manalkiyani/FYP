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
    <div style={{backgroundColor:'#40AFC0'}} className="sidebar">

      <hr />
      <div style={{marginLeft:'-115px'}} className="center">
        <ul>
        <Divider flexItem sx={{marginBottom:'5px',  backgroundColor:'white' }} />

        
          <li>

            <DashboardIcon className="icon" />
            <span className="semiboldfont">Dashboard</span>
          </li>
          <Divider flexItem sx={{ marginTop:'5px', backgroundColor:'white' }} />
          <p className="title">LISTS</p>
          <Link to="/adminmessages" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span className="semiboldfont">Messages</span>
            </li>
          </Link>

          <Link to="/adminpayments" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span style={{marginTop:'10px'}} className="semiboldfont">Orders</span>
            </li>
          </Link>
          <Link to="/adminappointments" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span style={{marginTop:'10px'}} className="semiboldfont">Appointments</span>
            </li>
          </Link>
          <li>
            <CreditCardIcon className="icon" />
            <span style={{marginTop:'10px'}} className="semiboldfont">Job Applications</span>
          </li>
          <Divider flexItem sx={{ marginTop:'10px', backgroundColor:'white' }} />


          <p className="title">USER</p>
          <Link to="/admindashboard" style={{ textDecoration: "none" }}>
          <li>
            <AccountCircleOutlinedIcon className="icon" />
            <span className="semiboldfont">Profile</span>
          </li>
          </Link>
          <li>
            <ExitToAppIcon className="icon" />
            <span style={{marginTop:'10px'}} className="semiboldfont">Logout</span>
          </li>
          <Divider flexItem sx={{ marginTop:'10px', backgroundColor:'white' }} />
        </ul>
      </div>

    </div>
  );
};

export default Sidebar;
