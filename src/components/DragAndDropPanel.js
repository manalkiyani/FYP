import React from 'react'
import SideDrawer from './SideDrawer/SideDrawer';
import blocks from './blocks/blocksData';
import Image from './SideDrawer/Image/Image';

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
              <p style={{ fontSize: "20px", margin: 0 }}>
                {" "}
                Drag Blocks to Page
              </p>
            </div>
            {blocks.map((item) => {
              return (
                <Image
                  dragStart={props.dragStartHandler}
                  key={item.type}
                  id={item.type}
                  source={require("../assets/imgs/" + item.img)}
                />
              );
            })}
          </>
        </SideDrawer>
  )
}

export default DragAndDropPanel
