import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../App";
import { v4 as uuid } from "uuid";
import SaveBtn from "../../components/Buttons/SaveBtn";
import { useParams } from "react-router-dom";
import DragDrop from "../../DragDrop/DragDrop";
import UpdateBtn from "../../components/Buttons/UpdateBtn";
import { mapAdminBlocks } from "../../utilityFunctions/helperFunctions";
import { unmapBlocks } from "../../utilityFunctions/helperFunctions";
import { useLocalStorageState } from "ahooks";
import cloneDeep from "lodash/cloneDeep";
const Main = (props) => {
  const { id } = useParams();
  // const { template, setTemplate } = useContext(UserContext);
  const [template, setTemplate] = useLocalStorageState("template", "");
  const [components, setComponents] = useState([]);
  const [tag, setTag] = useState(null);
  const [Index, setIndex] = useState(null);
  const [clickedComponentId, setClickedComponentId] = useState(null);
  const [blocksPanelDisplayed, setBlocksPanelDisplayed] = useState(false);
  const [dragDisable, setDragDisable] = useState(true);
  const [textEditorDisplayed, setTextEditorDisplayed] = useState(false);
  const [textEditor, setTextEditor] = useState(null);
  const [type, setType] = useState(null);
  const [showDragDrop, setShowDragDrop] = useState(false);

  //inside context , i will have blocks complete info

  useEffect(() => {
    components && setLocalStorage();
    components && setShowDragDrop(true);
  }, [components]);

  const setLocalStorage = async () => {
    console.log("inside setLocalStorage MAIN");
    const componentsCopy = cloneDeep(components);
    const unmapedBlocks = await unmapBlocks(componentsCopy);
    console.log("unmapedBlocks in MAIN", unmapedBlocks);

    setTemplate({
      ...template,
      pages: {
        ...template?.pages,
        [props?.data?.homePage]: {
          blocks: unmapedBlocks,
        },
      },
    });
  };
  const alterBlocks = async () => {
    console.log("unaltered blocks in MAIN", props?.data?.blocks);
    const copy = cloneDeep(props?.data?.blocks);
    const alteredBlocks = await mapAdminBlocks(copy);
    console.log("alteredBlocks in MAIN", alteredBlocks);

    

    setComponents(alteredBlocks);
  };
  useEffect(() => {
    alterBlocks();
  }, [props.data]);

  return (
    <>
      
     
      {showDragDrop ? (
        <DragDrop
          components={components}
          setComponents={setComponents}
          blocksPanelDisplayed={blocksPanelDisplayed}
          setBlocksPanelDisplayed={setBlocksPanelDisplayed}
          dragDisable={dragDisable}
          setDragDisable={setDragDisable}
          clickedComponentId={clickedComponentId}
          setClickedComponentId={setClickedComponentId}
          Index={Index}
          setIndex={setIndex}
          tag={tag}
          setTag={setTag}
          textEditorDisplayed={textEditorDisplayed}
          setTextEditorDisplayed={setTextEditorDisplayed}
          textEditor={textEditor}
          setTextEditor={setTextEditor}
          type={type}
          setType={setType}
        />
      ) : null}
    </>
  );
};

export default Main;
