import React, { Component } from "react";

import classes from "./Header1.module.css";
import HandleBlock from "../HandleBlock/handleBlock";
import ContentEditable from "react-contenteditable";
import ButtonMenu from "../linkButton/btnMenu/buttonMenu";
import SocialIcons from "../socialIcons/socialIcons";

export default class Header1 extends Component {
  state = {
    showMenu: false,
    ref: null,
    displayHandleBlock: false,
  };
  //  textFromComponent,
  //   index,
  //   tag,
  //   clickedComponentId,
  //   type

  handleTextChange = (e, tag) => {
    console.log(e.target.value);
    this.props.changeText(e.target.value, null, tag, this.props.id, "header1");
  };

  handleClick = () => {
    this.props.onClick(this.props.id, "btn", null, "header1");
    this.setState({
      showMenu: true,
    });
  };
  linkButton = (link) => {
    this.setState({ showMenu: false });

    console.log(link);
  };

  disableHandleBlock = () => {
    this.setState({
      displayHandleBlock: false,
    });
  };
  enableHandleBlock = () => {
    this.setState({
      displayHandleBlock: true,
    });
  };
  handleSocialIcons = (socialIcons) => {
    this.props.handleSocialIcons(socialIcons, this.props.id);
  };

  render() {
    return (
      <div
        style={{
          boxShadow:
            this.props.dragDisable === false
              ? "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
              : "none",
        }}
        onMouseOver={this.enableHandleBlock}
        onMouseOut={this.disableHandleBlock}
        className={classes.header}
      >
        {this.state.displayHandleBlock && (
          <HandleBlock
            del={() => this.props.deleteBlock(this.props.id)}
            enableDrag={this.props.enableDrag}
          />
        )}
        <img className={classes.img} src={this.props.Data.data.img} />
        <div style={{ position: "absolute", zIndex: 1 }}>
          <ContentEditable
            className={classes.h}
            html={this.props.Data.data.h.text} // innerHTML of the editable div
            disabled={false} // use true to disable editing
            onChange={(e) => this.handleTextChange(e, "h")} // handle innerHTML change
            onClick={() =>
              this.props.onClick(this.props.id, "h", null, "header1")
            }
            style={{
              fontSize: this.props.Data.data.h.size,
              fontFamily: this.props.Data.data.h.family,
              color: this.props.Data.data.h.color,
              fontWeight:
                this.props.Data.data.h.bold === true ? "bold" : "normal",
              textDecoration:
                this.props.Data.data.h.underline === true
                  ? "underline"
                  : "none",
              fontStyle:
                this.props.Data.data.h.italic === true ? "italic" : "normal",
              textAlign: this.props.Data.data.h.align,
            }}
          />

          <ContentEditable
            html={this.props.Data.data.p.text} // innerHTML of the editable div
            disabled={false} // use true to disable editing
            className={classes.p}
            onClick={() =>
              this.props.onClick(this.props.id, "p", null, "header1")
            }
            onChange={(e) => this.handleTextChange(e, "p")} // handle innerHTML change
            style={{
              fontSize: this.props.Data.data.p.size,
              fontFamily: this.props.Data.data.p.family,
              color: this.props.Data.data.p.color,
              fontWeight:
                this.props.Data.data.p.bold === true ? "bold" : "normal",
              textDecoration:
                this.props.Data.data.p.underline === true
                  ? "underline"
                  : "none",
              fontStyle:
                this.props.Data.data.p.italic === true ? "italic" : "normal",
              textAlign: this.props.Data.data.p.align,
            }}
          />

          {this.state.showMenu ? (
            <ButtonMenu onClick={this.linkButton} />
          ) : null}

          <ContentEditable
            className={classes.btn}
            html={this.props.Data.data.btn.text}
            disabled={false}
            onClick={this.handleClick}
            onChange={(e) => this.handleTextChange(e, "btn")}
            // onClick ={(e)=>{
            //   e.preventDefault();
            //   window.open('');
            // }}
            style={{
              fontSize: this.props.Data.data.btn.size,
              fontFamily: this.props.Data.data.btn.family,
              color: this.props.Data.data.btn.color,
              fontWeight:
                this.props.Data.data.btn.bold === true ? "bold" : "normal",
              textDecoration:
                this.props.Data.data.btn.underline === true
                  ? "underline"
                  : "none",
              fontStyle:
                this.props.Data.data.btn.italic === true ? "italic" : "normal",
              textAlign: this.props.Data.data.btn.align,
            }}
          />

          <SocialIcons
            socialIcons={this.props.Data.socialIcons}
            handleSocialIcons={this.handleSocialIcons}
          />
        </div>
      </div>
    );
  }
}
