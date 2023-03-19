import "./featured.scss";





import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import { useEffect } from "react";
import Divider from '@mui/material/Divider';
import { getUser,getUsername } from "../../../utilityFunctions/authFunctions";
import React from 'react';
import axios from 'axios';

import downloadImage from '../../../assets/download.png';
import { useState } from "react";


const Featured = () => {

   const [user, setUser] = React.useState({});
  React.useEffect(() => {
    getUserData()
      .then((data) => {
        setUser(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const getUserData = async () => {
    const token = await getUsername();
    console.log(token);
    const { data } = await getUser({ username: token.username });
    console.log(data);
    return data; // Return the data retrieved from the API
  };
 


  return (
    <div className="featured">
      <div className="top">
        <h1  style={{color:'#40AFC0'}} className="title">Admin Profile</h1>   
      </div>
      <Divider flexItem ></Divider>
      <div className="bottom">

 

        <div className="info">

        <div className="featuredChart">
        
       
      
      </div>


        <div style={{marginTop:'15px', marginRight:'50px'}} className="leftinfobox">

        <p style={{fontSize:'25px'}} className="amount">{user.username}</p>
      
        <p className="doubleamount1"> <p style={{color: 'gray'}}> Package: </p> <p style={{color:'#40AFC0'}}>&nbsp; {user.activePlan} </p> </p>
 
        </div>
        <Divider orientation="vertical" flexItem sx={{ marginLeft:'30px', backgroundColor:'black' }} />

        <div style={{marginTop:'15px', marginLeft:'100px'}} className="rightinfobox">

        <p style={{fontSize:'15px', marginTop:'12px'}} className="doubleamount"><p style={{color: 'gray'}}>Contact: </p>  &nbsp;  +923926451945</p>
        <p className="doubleamount1"><p style={{color: 'gray'}}>Email: </p> &nbsp;  {user.email}</p>
   
        
        </div>
        </div>

        

 

      </div>
    </div>
  );
};

export default Featured;
