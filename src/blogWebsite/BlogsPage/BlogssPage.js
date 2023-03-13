import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../App";
import BlogMain from "../BlogMain";
import { blogTemplate } from "../../TemplatesData/blogTemplate";

import BeatLoader from "react-spinners/BeatLoader";
import {
  fetchBlocks,
  getTemplateData,
} from "../../utilityFunctions/axiosFunctions";

const BlogssPage = () => {
  const { id } = useParams();
  const { template, setTemplate } = useContext(UserContext);
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
  const checkBlogsPageinContext = () => {
    const BlogsPage = template.pages?.BlogsPage;

    if (BlogsPage) {
      setDataForMain(BlogsPage.blocks, template.data.blogs);

      return true;
    } else {
      return false;
    }
  };
  //
  const fetchBlogsPageData = async (blockIds, blogIds) => {
    try {
      const blocks = await fetchBlocks(blockIds);

      setTemplateinContext(blocks, blogIds);
      setDataForMain(blocks, blogIds);
    } catch (error) {
      console.error(error);
    }
  };
  //
  const setTemplateinContext = (blocks, blogIds) => {
    setTemplate(
      //store template in context
      {
        type: "blog", //type
        pages: { ...template.pages, BlogsPage: { blocks: blocks } },
        data: { ...template.data, blogs: blogIds },
      }
    );
  };
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

      setTemplateinContext(BlogsPageBlocks, BlogIds);
      setDataForMain(BlogsPageBlocks, BlogIds);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    const inContext = checkBlogsPageinContext();
    //load default template
    if (!inContext) {
      if (id === "001") {
        fetchBlogsPageData(
          blogTemplate.pages.BlogsPage.blocks,
          blogTemplate.data.blogs
        );
      } else {
        console.log("in else");
        loadSavedTemplate();
      }
    }
  }, []);

  return (
    <>
      {main ? (
        <BlogMain data={dataToSend} />
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
