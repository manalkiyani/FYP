import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../App";
import { v4 as uuid } from "uuid";
import { useParams } from "react-router-dom";
import SaveBtn from "../components/Buttons/SaveBtn";
import Blogs from "./components/Blogs/Blogs";
import Products from "../eccomerceWebsite/pages/ProductsPage";
import DragDrop from "../DragDrop/DragDrop";
import UpdateBtn from "../components/Buttons/UpdateBtn";

//Blog Home Page
const Main = (props) => {
  const { id } = useParams();

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
  const [blogIds, setBlogIds] = useState(null);
   const [productIds, setProductIds] = useState(null);
  

  //inside context , i will have blocks complete info

  useEffect(() => {
    setContext();
  }, [components]);

  const setContext = () => {
    console.log("template", template);

    setTemplate({
      ...template,
      pages: {
        ...template.pages,
        [props.data.page]: {
          blocks: components,
        },
      },
    });
  };
  useEffect(() => {
    console.log("props.data.type", props.data.type);
    const alteredBlocks = props.data.blocks.map((block) => {
      return {
        ...block,
        key: uuid(),
      };
    });
    setComponents(alteredBlocks);
    if (props.data.type === "blog") {
      setBlogIds(props.data.blogIds);  
      console.log(props.data.blogIds);
    }
    if (props.data.type === "eccomerce") {
      setProductIds(props.data.productIds);
      console.log(props.data.productIds);
    }
   
    
  }, [props.data]);

  return (
    <>
     {(id === "001" || id === "002") ? <SaveBtn /> : <UpdateBtn />}


      {blogIds && <Blogs blogIds={blogIds} />}
      {productIds && <Products productIds={productIds} />}

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
