import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { productTemplate } from "../../../TemplatesData/productTemplate";

import { useContext } from "react";
import { UserContext } from "../../../App";

import { getTemplateData,fetchAdminBlocks } from "../../../utilityFunctions/axiosFunctions";
import BeatLoader from "react-spinners/BeatLoader";
import Main from "../../../blogWebsite/Main";

const EcomHomePage = () => {
  const { id } = useParams();

  const [loading, setLoading] = React.useState(true);
  const [dataToSend, setDataToSend] = React.useState(null);
  const { template, setTemplate } = useContext(UserContext);

  const [main, setMain] = React.useState(false);

  useEffect(() => {
    if (dataToSend) {
      setMain(true);
      setLoading(false);
    }
  }, [dataToSend]);

  const checkHomePageinContext = () => {
    const homePage = template.pages?.HomePage;
    console.log("not in context");
    if (homePage) {
      setDataForMain(homePage.blocks);

      return true;
    } else {
      return false;
    }
  };
  const fetchHomePageBlocks = async (blockIds) => {
    try {
      const blocks = await fetchAdminBlocks(blockIds);

      setTemplateinContext(blocks);
      setDataForMain(blocks);
    } catch (error) {
      console.error(error);
    }
  };
  const loadSavedTemplate = async () => {
    let homePageBlocks = [];
    try {
      const Template = await getTemplateData(id);
      console.log(Template);
      if (Template.pages?.HomePage?.blocks) {
        const blocks = await fetchAdminBlocks(Template.pages.HomePage.blocks);
        console.log(blocks);
        homePageBlocks = blocks;
      }

      setTemplateinContext(homePageBlocks);
      setDataForMain(homePageBlocks);
    } catch (error) {
      console.error(error);
    }
  };
  const setTemplateinContext = (blocks) => {
    setTemplate({
      type: "eccomerce",
      pages: {
        HomePage: { blocks },
      },
    });
  };
  const setDataForMain = (blocks) => {
    console.log("inside setDataForMain");
    setDataToSend({
      type: "eccomerce",
      blocks,
    });
  };

  useEffect(() => {
    const inContext = checkHomePageinContext();

    if (!inContext) {
      if (id === "002") {
        fetchHomePageBlocks(productTemplate.pages.HomePage.blocks);

      } else {
        
        loadSavedTemplate();
      }
    }
  }, []);

  return (
    <>
      {main ? (
        <Main data={dataToSend} />
      ) : (
        <center>
          <BeatLoader
            color={"#7890A3"}
            loading={loading}
            size={20}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </center>
      )}
    </>
  );
};

export default EcomHomePage;
