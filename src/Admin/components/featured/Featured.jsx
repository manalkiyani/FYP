import "./featured.scss";





import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import { useEffect } from "react";
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
        <h1 className="title">Admin Profile</h1>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className="bottom">
        <div className="featuredChart">
        
          <img
          src={downloadImage}
          style={{
            position: 'absolute',     
            width: '7%',
      
          }}
        />
        </div>
        <p className="data">{username}</p>
        <p className="amount">Email: {email}</p>
        <p className="amount">Package: {activePlan}</p>
        <p className="amount">Rs {amount}/month</p>

 
        <div className="summary">
    

        </div>
      </div>
    </div>
  );
};

export default Featured;
