import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { blogTemplate } from "../../TemplatesData/blogTemplate";
import { useContext } from "react";
import { UserContext } from "../../App";
import {
  getTemplateData,
  fetchAdminBlocks,
} from "../../utilityFunctions/axiosFunctions";
import BeatLoader from "react-spinners/BeatLoader";
import Main from "../Main";

const BlogHomePage = () => {
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

    if (homePage) {
      setDataForMain(homePage.blocks);
      console.log(template);
      return true;
    } else {
      return false;
    }
  };
  const fetchHomePageBlocks = async (blockIds) => {
    try {
      const blocks = await fetchAdminBlocks(blockIds);
      console.log(blocks);
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
      type: "blog",
      pages: {
        ...template.pages,
        HomePage: { blocks },
      },
    });
  };
  const setDataForMain = (blocks) => {
    console.log("inside setDataForMain");
    setDataToSend({
      type: "blog",
      blocks,
    });
  };

  useEffect(() => {
    const inContext = checkHomePageinContext();

    if (!inContext) {
      if (id === "001") {
        fetchHomePageBlocks(blogTemplate.pages.HomePage.blocks);
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

export default BlogHomePage;