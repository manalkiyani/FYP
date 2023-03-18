import "./featured.scss";





import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import { useEffect } from "react";
import Divider from '@mui/material/Divider';

import axios from 'axios';

import downloadImage from '../../../assets/download.png';
import { useState } from "react";


const Featured = () => {
  const [username, setUsername] = useState('')
const [email, setEmail] = useState('')
const [activePlan, setActivePlan] = useState('')
const [amount, setAmount] = useState(0)

  let ADMIN_ID='64058525e63bfc4d3d681984'

  useEffect(() => {
    console.log("in useeffect, getting admin ")
    axios.post("http://localhost:8800/api/admin/getadmindata",{ADMIN_ID})
    .then((response) => {
      console.log("this is username "+ response.data.username)
      console.log("this is email "+ response.data.email)
      console.log("this is activeplan "+ response.data.activePlan)
      setUsername(response.data.username);
      setEmail(response.data.email);
      setActivePlan(response.data.activePlan);
      setAmount(response.data.amount)
    });
  }, []);


  return (
    <div className="featured">
      <div className="top">
        <h1  style={{color:'#40AFC0'}} className="title">Admin Profile</h1>   
      </div>
      <Divider flexItem sx={{  borderRightWidth: 3, backgroundColor:'gray' }}></Divider>
      <div className="bottom">

 

        <div className="info">

        <div className="featuredChart">
        
        <img
        src={downloadImage}
        style={{
          position: 'absolute',   
          marginLeft:'-180px',  
          marginTop:'20px', 
          width: '7%',
        }}
      />
      
      </div>


        <div style={{marginTop:'15px', marginRight:'50px'}} className="leftinfobox">

        <p style={{fontSize:'25px'}} className="amount">{username}</p>
        <p style={{fontSize:'20px', marginTop:'-13px'}} className="doubleamount"><p style={{color: 'gray'}}>Rs</p> &nbsp; {amount} <p style={{color:'gray'}}> /month </p></p>
      
        <p className="doubleamount1"> <p style={{color: 'gray'}}> Package: </p> <p style={{color:'#40AFC0'}}>&nbsp; {activePlan} </p> </p>
 
        </div>
        <Divider orientation="vertical" flexItem sx={{ marginLeft:'30px', borderRightWidth: 3, backgroundColor:'black' }} />

        <div style={{marginTop:'15px', marginLeft:'100px'}} className="rightinfobox">

        <p style={{fontSize:'15px', marginTop:'12px'}} className="doubleamount"><p style={{color: 'gray'}}>Contact: </p>  &nbsp;  +923926451945</p>
        <p className="doubleamount1"><p style={{color: 'gray'}}>Email: </p> &nbsp;  {email}</p>
   
        <p style={{marginLeft:'80px', fontSize:'15px',color: 'gray', marginTop:'-30px'}} className="amount">More Information</p>
        </div>
        </div>

        

 

      </div>
    </div>
  );
};

export default Featured;
