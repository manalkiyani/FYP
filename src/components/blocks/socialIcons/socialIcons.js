import React, { Component } from "react";

import fb from "../../../assets/icons/facebook.png";
import twitter from "../../../assets/icons/twitter.png";
import insta from "../../../assets/icons/instagram.png";

import classes from "./socialIcons.module.css";

import SocialIconsPanel from "../../socialIconsPanel/SocialIconsPanel";

class SocialIcons extends Component {
  state = {
    showIconsPanel: false,
  };
  closePanel = () => {
    this.setState({
      showIconsPanel: false,
    });
  };

  render() {
    return (
      <>
        <div
          onClick={() => this.setState({ showIconsPanel: true })}
          className={classes.icons}
        >
          {this.props.socialIcons.map(({ icon, url, link }) => {
            return <img key={icon} alt="" src={url} />;
          })}
        </div>
        {this.state.showIconsPanel && (
          <SocialIconsPanel
            handleSocialIcons={this.props.handleSocialIcons}
            socialIcons={this.props.socialIcons}
            show={this.state.showIconsPanel}
            closePanel={this.closePanel}
          />
        )}
      </>
    );
  }
}

export default SocialIcons;
