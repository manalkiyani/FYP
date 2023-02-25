import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "./App";
import { v4 as uuid } from "uuid";
import SaveBtn from "./components/SaveBtn";

import DragDrop from "./DragDrop/DragDrop";

//Blog Home Page
const Main = (props) => {
  const { template, setTemplate } = useContext(UserContext);
  const [components, setComponents] = useState([]);
  const [tag, setTag] = useState(null);
  const [Index, setIndex] = useState(null);
  const [clickedComponentId, setClickedComponentId] = useState(null);
  const [blocksPanelDisplayed, setBlocksPanelDisplayed] = useState(false);
  const [dragDisable, setDragDisable] = useState(true);
  const [textEditorDisplayed, setTextEditorDisplayed] = useState(false);
  const [textEditor, setTextEditor] = useState(null);
  const [type, setType] = useState(null);
 
  //inside context , i will have blocks complete info

  useEffect(() => {
    setContext();
  }, [components]);

  const setContext = () => {
    setTemplate({
      ...template,
      pages: {
        ...template.pages,
        ["HomePage"]: {
          blocks: components,
        },
      },
    });
  };
  useEffect(() => {
    const alteredBlocks = props.data.blocks.map((block) => {
      return {
        ...block,
        key: uuid(),
      };
    });
    console.log("alteredBlocks", alteredBlocks);
    setComponents(alteredBlocks);
  }, [props.data]);

  return (
    <>
      <SaveBtn />

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
    </>
  );
};

export default Main;
