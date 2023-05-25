import React, { Component } from "react";
import classes from "../../../components/blocks/Gallery2/Gallery2.module.css";
import { Flex } from "@mantine/core";
export default class ViewerGallery2 extends Component {
  render() {
    return (
      <div className={classes.panel}>
        <Flex justify="center" gap="md" position="row" wrap="wrap">
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
        </Flex>
      </div>
    );
  }
}
