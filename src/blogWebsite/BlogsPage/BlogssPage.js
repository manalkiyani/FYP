import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../App";
import BlogMain from "../../BlogMain";
import { blogTemplate } from "../../TemplatesData/blogTemplate";
import Header1 from "../../components/blocks/Header1/Header1";
import Features2 from "../../components/blocks/Features2/Features2";

import axios from "axios";
const BlogssPage = () => {
  const { id } = useParams();
  const { template, setTemplate } = useContext(UserContext);
  const [dataToSend, setDataToSend] = React.useState(null);
  const [main, setMain] = React.useState(false);
  const [blocks, setblocks] = React.useState(null);

  useEffect(() => {
    if (!id) {
      //load default template

      if (Object.keys(template.pages).length !== 0) {
        console.log("blogs page : template is loaded in context");
        // pages are loaded alreadr
        //if template is already loaded in context
        fetchBlocks(blogTemplate.pages.BlogsPage.blocks); //first fetch blocks from block Ids
        if (blocks) {
          console.log(blocks);
          setTemplate(
            //store template in context
            {
              ...template, //type
              pages: { ...template.pages, BlogsPage: { blocks: blocks } },
            }
          );

          setDataToSend({
            type: template.type,
            page: "BlogsPage",
            blocks: blocks,
            blogs: template.data.blogs,
          });
          setMain(true);
        }
      }
    }
  }, []);

  const fetchBlocks = (blockIds) => {
    axios
      .post("http://localhost:8800/api/blocks/get", { blockIds })
      .then((res) => {
        let fetchedBlocks = res.data.Blocks;
        fetchedBlocks.map((block) => {
          switch (block.Component) {
            case "Header1":
              block.Component = Header1;
              break;
            case "Features2":
              block.Component = Features2;
          }
        });

        setblocks(fetchedBlocks);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return <>{main ? <BlogMain data={dataToSend} /> : <div>Loading ...</div>}</>;
};

export default BlogssPage;
