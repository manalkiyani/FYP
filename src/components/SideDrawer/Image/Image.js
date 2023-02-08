import React from 'react'
import classes from './Image.module.css';

const Image = (props) => {

   

  return (
   <img 

        onDragStart={props.dragStart}
        id={props.id}
        draggable={true}
       
        alt ='block' 
        src={props.source}
        className={classes.draggable}
        />
  )
}

export default Image;