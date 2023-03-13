import React from "react";
import { useEffect } from "react";

import { useParams } from "react-router-dom";
import DisplayBlocks from "../../Components/displayBlocks/displayBlocks";

import BeatLoader from "react-spinners/BeatLoader";
import {
  fetchBlocks,
  getTemplateData,
} from "../../utilityFunctions/axiosFunctions";

const BlogssPage = () => {
  const { id } = useParams();

  const [loading, setLoading] = React.useState(true);
  const [dataToSend, setDataToSend] = React.useState(null);

  const [main, setMain] = React.useState(false);

  useEffect(() => {
    if (dataToSend) {
      setMain(true);
      setLoading(false);
    }
  }, [dataToSend]);

  //
  const setDataForMain = (blocks, blogIds) => {
    setDataToSend({
      type: "blog",
      blocks,
      blogIds,
    });
  };

  const loadSavedTemplate = async () => {
    let BlogsPageBlocks = [];
    let BlogIds = [];
    try {
      const Template = await getTemplateData(id);
      console.log(Template);
      if (Template.pages?.BlogsPage?.blocks) {
        const blocks = await fetchBlocks(Template.pages.BlogsPage.blocks);
        console.log(blocks);
        BlogsPageBlocks = blocks;
      }
      if (Template.data?.blogs) {
        BlogIds = Template.data.blogs;
      }

      
      setDataForMain(BlogsPageBlocks, BlogIds);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    loadSavedTemplate();
  }, []);

  return (
    <>
      {main ? (
        <DisplayBlocks data={dataToSend} />
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

export default BlogssPage;
