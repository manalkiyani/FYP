import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../App";
import { v4 as uuid } from "uuid";
import { useParams } from "react-router-dom";
import SaveBtn from "../components/Buttons/SaveBtn";
import Blogs from "../blogWebsite/components/Blogs/Blogs";
import Products from "../eccomerceWebsite/pages/ProductsPage";
import DragDrop from "../DragDrop/DragDrop";
import UpdateBtn from "../components/Buttons/UpdateBtn";
import {
  mapAdminBlocks,
  unmapBlocks,
} from "../utilityFunctions/helperFunctions";
import { cloneDeep } from "lodash";
import { BeatLoader } from "react-spinners";
import { useLocalStorageState } from "ahooks";

//Blog Home Page
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
  const [blogIds, setBlogIds] = useState(null);
  const [productIds, setProductIds] = useState(null);
  const [loading, setLoading] = useState(true);

  //inside context , i will have blocks complete info

  useEffect(() => {
   components &&  setLocalStorage();
  }, [components]);

  const setLocalStorage = async () => {
    const componentsCopy = cloneDeep(components);
    const unmapedBlocks = await unmapBlocks(componentsCopy);
    console.log("props.data.page in BLOGMAIN", props.data.page);

    setTemplate({
      ...template,
      pages: {
        ...template.pages,
        [props.data.page]: {
          blocks: unmapedBlocks,
        },  
      },
    });
  };
  const alterBlocks = async () => {
    console.log("in BLogMAin");
    console.log("in Blog main", props.data.blocks);
    const copy = cloneDeep(props.data.blocks);
    const alteredBlocks = await mapAdminBlocks(copy);

    // const alteredBlocks = blocks.map((block) => {
    //   return {
    //     ...block,
    //     key: uuid(),
    //   };
    // });
    console.log("in BLogMAin Altered Blogs", alteredBlocks);
    setComponents(alteredBlocks);
    if (props.data.type === "blog") {
      setLoading(false);
      setBlogIds(props.data.blogIds);
      console.log(props.data.blogIds);
    }
    if (props.data.type === "eccomerce") {
      setLoading(false);
      setProductIds(props.data.productIds);
      console.log(props.data.productIds);
    }
  };
  useEffect(() => {
    alterBlocks();
  }, [props.data]);

  return (
    <>
      {id === "001" || id === "002" ? <SaveBtn /> : <UpdateBtn />}
      {loading ? (
        <center>
          <BeatLoader
            color={"#7890A3"}
            loading={loading}
            size={20}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </center>
      ) : (
        <>
          {blogIds && <Blogs blogIds={blogIds} />}
          {productIds && <Products productIds={productIds} />}
        </>
      )}

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
