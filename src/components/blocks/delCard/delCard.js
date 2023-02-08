import React from 'react';
import del from '../../../assets/icons/delete.png';
import classes from './delCard.module.css';

const delCard = (props) => {
  return (
    <div  onClick={ ()=> props.del(props.index)} 
            className={classes.container}
           >
      <img  className={classes.icon} src={del}/>
      </div>
  )
}

export default delCard