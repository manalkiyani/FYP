import React from "react";
import SideDrawer from "./SideDrawer/SideDrawer";
import blocks from "./blocks/blocksData";
import Image from "./SideDrawer/Image/Image";

const DragAndDropPanel = (props) => {
  return (
    <SideDrawer show={props.blocksPanelDisplayed} width="30%">
      <>
        <div
          style={{
            backgroundColor: "#40AFC0",
            width: "100%",
            marginBottom: "10px",
            padding: "10px",
            paddingLeft: "25px",
            color: "#fff",
          }}
        >
          <p style={{ fontSize: "20px", margin: 0 }}> Drag Components to Page</p>
        </div>
        <div
          style={{
            padding: "20px 0px 20px 20px",
          }}
        >
          <h5>Headers Section</h5>
          {blocks.map((item) => {
            return item.type === "header1" ||
              item.type === "header2" ||
              item.type === "header3" ? (
              <Image
                dragStart={props.dragStartHandler}
                key={item.type}
                id={item.type}
                source={require("../assets/imgs/" + item.img)}
              />
            ) : null;
          })}
          <h5>Features Section</h5>
          {blocks.map((item) => {
            return item.type === "features1" ||
              item.type === "features2" ||
              item.type === "features4" ||
              item.type === "features3" ? (
              <Image
                dragStart={props.dragStartHandler}
                key={item.type}
                id={item.type}
                source={require("../assets/imgs/" + item.img)}
              />
            ) : null;
          })}
          <h5>Gallery and Image Slider</h5>
          {blocks.map((item) => {
            return item.type === "gallery1" || item.type === "gallery2" ? (
              <Image
                dragStart={props.dragStartHandler}
                key={item.type}
                id={item.type}
                source={require("../assets/imgs/" + item.img)}
              />
            ) : null;
          })}
           <h5>People And Team</h5>
          {blocks.map((item) => {
            return item.type === "people1" || item.type === "people2" ? (
              <Image
                dragStart={props.dragStartHandler}
                key={item.type}
                id={item.type}
                source={require("../assets/imgs/" + item.img)}
              />
            ) : null;
          })}
          <h5>About Section</h5>
          {blocks.map((item) => {
            return item.type === "about1" ? (
              <Image
                dragStart={props.dragStartHandler}
                key={item.type}
                id={item.type}
                source={require("../assets/imgs/" + item.img)}
              />
            ) : null;
          })}
          <h5>FAQ Section</h5>
          {blocks.map((item) => {
            return item.type === "faq1" || item.type === "faq2" ? (
              <Image
                dragStart={props.dragStartHandler}
                key={item.type}
                id={item.type}
                source={require("../assets/imgs/" + item.img)}
              />
            ) : null;
          })}
            
        </div>
      </>
    </SideDrawer>
  );
};

export default DragAndDropPanel;
