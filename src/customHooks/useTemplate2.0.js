import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import React from "react";
import { v4 as uuid } from "uuid";
import { useLocalStorageState } from "ahooks";
import {
  fetchAdminBlocks,
  getTemplateData,
} from "../utilityFunctions/axiosFunctions";

//blog,blogTemplate,SecondPage,blogs
export const useTemplateData = (
  type,
  templateName,
  homePage,
  mainPage,
  data
) => {
  const { id } = useParams();

  const [loading, setLoading] = React.useState(true);
  const [dataToSend, setDataToSend] = React.useState(null);
  const [template, setTemplate] = useLocalStorageState("template", {
    defaultValue: {
      type: "",
      pages: {},
      data: {},
    },
  });

  const checkPagesinLocalStorage = async () => {
    const HomePage = template.pages?.[homePage];
   

    if (HomePage &&  template.type === type) {
      setDataForMain(template.pages[homePage].blocks);

      return true;
    } else {
      return false;
    }
  };

  const fetchPageData = async (homePageBlockIds,mainpageBlockIds,mainPageDataIds) => {
    try {
      console.log("2.fetchPageData");
      let homePageBlocks = await fetchAdminBlocks(homePageBlockIds);
       let mainPageBlocks = await fetchAdminBlocks(mainpageBlockIds);

      homePageBlocks = await alterBlocks(homePageBlocks);
       mainPageBlocks = await alterBlocks(mainPageBlocks);
      console.log("4.alteredBlocks", homePageBlocks);

      
        setDataInLocalStorage(homePageBlocks,mainPageBlocks, mainPageDataIds);

      setDataForMain(homePageBlocks);
 
      console.log("9.alteredBlocks", mainPageBlocks);

    
    } catch (error) {
      console.error(error);
    }
  };

   const setDataInLocalStorage = (homePageBlocks,mainPageBlocks, dataIds) => {
    console.log("10.setSecondPageDataInLocalStorage", mainPageBlocks, dataIds);
    setTemplate(
      //store template in context
      {
        type: type, //type
        pages: { [homePage]: { homePageBlocks }, [mainPage]: { mainPageBlocks } },
        data: { [data]: dataIds },
      }
    );
  };
  const loadSavedPages = async () => {
    let homePageBlocks = [];
     let SecondPageBlocks = [];
    let dataIds = [];
    try {
      const savedTemplate = await getTemplateData(id);

      if (savedTemplate.pages?.[homePage]?.blocks) {
        let blocks = await fetchAdminBlocks(
          savedTemplate.pages[homePage].blocks
        );
        homePageBlocks = await alterBlocks(blocks);
      
       
      }
       if (savedTemplate.pages?.[mainPage]?.blocks) {
        const blocks = await fetchAdminBlocks(
          savedTemplate.pages?.[mainPage].blocks
        );
        SecondPageBlocks = await alterBlocks(blocks);

       
      }
      if (savedTemplate.data?.[data]) {
        dataIds = savedTemplate.data[data];
      }

      setDataInLocalStorage(homePageBlocks,SecondPageBlocks, dataIds);
      setDataForMain(homePageBlocks);
    } catch (error) {
      console.error(error);
    }
  };

 const setDataForMain = async (blocks) => {
    console.log("6.setDataForMain", blocks);
    setDataToSend({
      type: type,
      homePage,
      blocks,
    });
  };

  const alterBlocks = async (testBlocks) => {
    console.log("testBlocks", testBlocks);
    const alteredBlocks = testBlocks.map((block) => {
      console.log("Component", block.Component);
      block.key = uuid();
      return block;
    });

    console.log("alteredBlocks", alteredBlocks);

   
    return alteredBlocks;
  };
  const setLocalStorage = async () => {
    const pagesInStorage = await checkPagesinLocalStorage();

  

    if (!pagesInStorage) {
      if (id === "001" || id === "002" || id === "003" || id === "004") {
        console.log("1.pages not in storage");
        await fetchPageData(
          templateName.pages[homePage].blocks,
        templateName.pages[mainPage].blocks,)
         templateName.data[data]
       
      } else {
        await loadSavedPages();
        
      }
    }

   
  };

  

  const clearLocalStorage = async () => {
    localStorage.removeItem("template");

    setTemplate(undefined);
  };

  const utilityFunction = async () => {
    // await clearLocalStorage();
    console.log("template", template);
    await setLocalStorage();
  };

  useEffect(() => {
    console.log("homepage", homePage);
    if (template) {
      utilityFunction();
    }
  }, []);

  return { loading, dataToSend };
};
