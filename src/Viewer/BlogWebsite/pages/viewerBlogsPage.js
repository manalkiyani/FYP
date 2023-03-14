import React from "react";
import { useEffect } from "react";

import { useParams } from "react-router-dom";
import DisplayBlocks from "../../Components/displayBlocks/displayBlocks";
import Blogs from "../components/Blogs/Blogs";
import BeatLoader from "react-spinners/BeatLoader";
import { fetchViewerBlocks,getTemplateData } from "../../../utilityFunctions/axiosFunctions";


const ViewerBlogsPage = () => {
  const { id } = useParams();
  const [blogIds, setBlogIds] = React.useState(null);
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


  const loadSavedTemplate = async () => {
    let BlogsPageBlocks = [];
    let BlogIds = [];
    try {
      const Template = await getTemplateData(id);
      console.log(Template);
      if (Template.pages?.BlogsPage?.blocks) {
        const blocks = await fetchViewerBlocks(Template.pages.BlogsPage.blocks);
        console.log(blocks);
        BlogsPageBlocks = blocks;
      }
      if (Template.data?.blogs) {
        BlogIds = Template.data.blogs;
      }

      setDataToSend({
     
      blocks:BlogsPageBlocks
      
    });
    setBlogIds(BlogIds);
    
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    loadSavedTemplate();
  }, []);

  return (
    <>
     {/*display blogs here*/ }
     {blogIds && <Blogs blogIds={blogIds} />}
    {/*display blocks here*/}
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

export default ViewerBlogsPage;
