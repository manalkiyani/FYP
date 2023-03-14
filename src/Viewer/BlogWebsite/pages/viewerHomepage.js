import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import DisplayBlocks from "../../Components/displayBlocks/displayBlocks";
import {
  getTemplateData,
  fetchViewerBlocks,
} from "../../../utilityFunctions/axiosFunctions";
import FadeLoader from "react-spinners/FadeLoader";


const ViewerHomepage = () => {
  const { id } = useParams();

  const [loaded, setLoaded] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [dataToSend, setDataToSend] = React.useState(null);

  const [main, setMain] = React.useState(false);

  useEffect(() => {
    if (dataToSend) {
      setMain(true);
      setLoading(false);
      setLoaded(true);
    }
  }, [dataToSend]);

  const loadSavedTemplate = async () => {
    let homePageBlocks = [];
    try {
      const Template = await getTemplateData(id);
      //   console.log(Template);
      if (Template.pages?.HomePage?.blocks) {
        const blocks = await fetchViewerBlocks(Template.pages.HomePage.blocks);
        // console.log(blocks);
        homePageBlocks = blocks;
      }

      setDataToSend({
      blocks:  homePageBlocks,
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!loaded) {
      loadSavedTemplate();
    }
  }, []);

  return (
    <>
    {console.log('viewerHomepage')}
      {main ? (
        <DisplayBlocks data={dataToSend} />
      ) : (
        <center>
          <FadeLoader
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

export default ViewerHomepage;
