import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../App";
import BlogMain from "../../BlogMain";
import { blogTemplate } from "../../TemplatesData/blogTemplate";
import { mapBlocks } from "../../utilityFunctions/helperFunctions";
import BeatLoader from "react-spinners/BeatLoader";

import axios from "axios";
const BlogssPage = () => {
  const { id } = useParams();
  const { template, setTemplate } = useContext(UserContext);
  const [loading, setLoading] = React.useState(true);
  const [dataToSend, setDataToSend] = React.useState(null);
  const [loaded, setLoaded] = React.useState(false);
  const [main, setMain] = React.useState(false);
  const [blocks, setblocks] = React.useState(null);

  useEffect(() => {
    if (dataToSend) {
      setMain(true);
    }
  }, [dataToSend]);
  useEffect(() => {
    if (!loaded) {
      if (!id) {
        //load default template

        if (template.pages?.BlogsPage) {
          console.log("in if");
          setDataToSend({
            type: template.type,
            page: "BlogsPage",
            blocks: template.pages.BlogsPage.blocks,
            blogIds: template.data.blogs,
          });
          //  setMain(true);
          //   setLoading(false);
        } else {
          console.log("blogs page :", template.pages);
          console.log("blogs page : blogs page is not loaded in context");

          //if template is already loaded in context but not context page
          fetchBlocks(
            blogTemplate.pages.BlogsPage.blocks,
            blogTemplate.data.blogs
          ); //first fetch blocks from block Ids
        }
      }
    }
  }, []);

  const fetchBlocks = (blockIds, blogIds) => {
    axios
      .post("http://localhost:8800/api/blocks/get", { blockIds })
      .then((res) => {
        let fetchedBlocks = res.data.Blocks;
        const blocks = mapBlocks(fetchedBlocks);
        setTemplate(
          //store template in context
          {
            type: "blog", //type
            pages: { ...template.pages, BlogsPage: { blocks: blocks } },
            data: { ...template.data, blogs: blogIds },
          }
        );

        setDataToSend({
          type: template.type,
          page: "BlogsPage",
          blocks: blocks,
          blogIds: blogIds,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

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
