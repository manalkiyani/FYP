import React from 'react';
import classes from './SideDrawer.module.css';

const SideDrawer = (props) => {

    let attachedClasses = [classes.SideDrawer, classes.Close];
    if (props.show) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }
    
    return (
        <div className={attachedClasses.join(' ')}
            style={{width: props.width}}>
            {props.children} 
        </div>
    )
}

export default SideDrawer;
