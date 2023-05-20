import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import cloneDeep from "lodash/cloneDeep";
import {
  getTemplateData,
  fetchViewerBlocks,
} from "../utilityFunctions/axiosFunctions";

import { mapViewerBlocks } from "../utilityFunctions/helperFunctions";
import { useLocalStorageState } from "ahooks";
import { getTemplateId } from "../utilityFunctions/TemplateIdController";

const useViewerTemplateData = (homePage) => {
  // const [viewerTemplate] = useLocalStorageState("viewerTemplate");

  const [loading, setLoading] = React.useState(true);
  const [dataToSend, setDataToSend] = React.useState(null);

  useEffect(() => {
    console.log("in viewer", dataToSend);
    if (dataToSend) {
      setLoading(false);
    }
  }, [dataToSend]);

  const loadSavedTemplate = async () => {
    // let id = viewerTemplate?.id;
    // if (!id) {
      const response = await getTemplateId();
      console.log(response);
    const  id= response.templateId
    // }

    let homePageBlocks = [];
    let alteredBlocks = [];

    try {
      const Template = await getTemplateData(id);

      if (Template.pages?.[homePage]?.blocks) {
        homePageBlocks = await fetchViewerBlocks(
          Template.pages[homePage].blocks
        );
        console.log("in viewer", homePageBlocks);
        const copy = cloneDeep(homePageBlocks);
        alteredBlocks = await mapViewerBlocks(copy);
      }

      setDataToSend({
        blocks: alteredBlocks,
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadSavedTemplate();
  }, []);
  return { loading, dataToSend };
};

export default useViewerTemplateData;
