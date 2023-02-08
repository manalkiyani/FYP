import React from 'react';

import move from '../../../assets/icons/move.png';
import del from '../../../assets/icons/delete.png';
import add from '../../../assets/icons/plus.png'
import classes from './handleBlock.module.css';
import Dropdown from 'react-bootstrap/Dropdown';

const handleBlock = (props) => {

  return (
    <div className={classes.container}>
      {props.displaySetLayout?
      <Dropdown className={classes.icon3}>
      <Dropdown.Toggle
     variant="outline" id="dropdown-basic">
       {props.layout}
      </Dropdown.Toggle>

      <Dropdown.Menu >
          <Dropdown.Item  onClick={()=>props.setLayout(5,props.id)}>5 :     20%</Dropdown.Item>
          <Dropdown.Item  onClick={()=>props.setLayout(4,props.id)}>4 :     30%</Dropdown.Item>
          <Dropdown.Item  onClick={()=>props.setLayout(3,props.id)}>3 :     40%</Dropdown.Item>
          
       </Dropdown.Menu>
      </Dropdown>
      :null}
       {props.displayAddCard ?  
      <div
        onClick={props.addCard}
        className={classes.icon1}>
      <img  className={classes.icon} src={add}/>
      </div> : null}
     
      <div  onClick={props.enableDrag} 
            className={classes.icon2}
            
            >
        <img  className={classes.icon} src={move}/>
      </div>
      <div 
        onClick={props.del}
        className={classes.icon2}>
      <img  className={classes.icon} src={del}/>
      </div>
     
      

    </div>
  )
}

export default handleBlock;