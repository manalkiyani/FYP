import React, { Component } from "react";
import classes from "../../../components/blocks/Gallery2/Gallery2.module.css";
export default class ViewerGallery2 extends Component {
  render() {
    return (
      <div className={classes.panel}>
        {Object.getOwnPropertyNames(this.props.Data.data).map((index) => {
          return (
            <div key={index} className={classes.card}>
              <img
                className={classes.img}
                src={this.props.Data.data[index].bg.picture}
              />
            </div>
          );
        })}
      </div>
    );
  }
}
