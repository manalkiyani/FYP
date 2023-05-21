import React, { useState, useEffect, useContext } from "react";

import { useParams } from "react-router-dom";

import Blogs from "../blogWebsite/components/Blogs/Blogs";

import { cloneDeep } from "lodash";
import { BeatLoader } from "react-spinners";
import { useLocalStorageState } from "ahooks";
import SaveBtn from "../../components/Buttons/SaveBtn";
import UpdateBtn from "../../components/Buttons/UpdateBtn";
import {
  mapAdminBlocks,
  unmapBlocks,
} from "../../utilityFunctions/helperFunctions";
import DragDrop from "../../DragDrop/DragDrop";
import ViewJobs from "../../Viewer/BusinessWebsite/Pages/ViewJobs/ViewJobs";
import AdminProducts from "../eccomerceWebsite/components/adminProducts/AdminProducts";
import DoctorsPage from "../medicalWebsite/newMedicalWebsite/DoctorsPage";
import EditDoctorForm from "../medicalWebsite/EditDoctorForm/EditDoctorForm";

//Blog Home Page
const BlogMain = (props) => {
  const { id } = useParams();

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

  const [loading, setLoading] = useState(true);

  const [blogIds, setBlogIds] = useState(null);
  const [productIds, setProductIds] = useState(null);
  const [jobIds, setJobIds] = useState(null);
  const [doctorIds, setDoctorIds] = useState(null);

  // inside context , i will have blocks complete info

  useEffect(() => {
    components && setLocalStorage();
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
    const copy = cloneDeep(props.data.blocks);
    const alteredBlocks = await mapAdminBlocks(copy);

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
    if (props.data.type === "business") {
      setLoading(false);
      setJobIds(props.data.jobIds);
      console.log("job ids", props.data.jobIds);
    }
    if (props.data.type === "medical") {
      setLoading(false);
      setDoctorIds(props.data.doctorIds);
      console.log(props.data.doctorIds);
    }
  };
  useEffect(() => {
    alterBlocks();
  }, [props.data]);

  return (
    <>
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
          {blogIds && <Blogs view="none"blogIds={blogIds} />}
          {productIds && <AdminProducts view="none" productIds={productIds} />}
          {jobIds && <ViewJobs jobIds={jobIds} />}
          {doctorIds && <DoctorsPage doctorIds = {doctorIds}/>}

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

export default BlogMain;
