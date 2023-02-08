import React, { useState } from 'react';

import link from '../../../../assets/icons/link.png'; 
import LinkButton from '../linkButton';

import classes from './buttonMenu.module.css';

const ButtonMenu = (props) => {
  const [show,setshow]=useState(false);


  const handleClick=(link)=>{
     setshow(false)
    props.onClick(link)
   
  }
  return (
    <>
 {  show && <LinkButton link={handleClick}/>}
    <div className={classes.container}>
  
   { !show && <div className={classes.icon2}>
     <img alt="" onClick={()=>setshow(true)} className={classes.icon} src={link}/>
   </div>}
  


 </div>
    </>
    

  )
}

export default ButtonMenu