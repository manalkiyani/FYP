import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { blogTemplate } from "../../TemplatesData/blogTemplate";
import { useContext } from "react";
import { UserContext } from "../../App";
import { useLocation } from "react-router-dom";
import Header1 from "../../components/blocks/Header1/Header1";
import Features2 from "../../components/blocks/Features2/Features2";

import Main from "../../Main";
import axios from "axios";
import { mapBlocks } from "../../utilityFunctions/helperFunctions";
const BlogHomePage = () => {
  const { id } = useParams();
  const { pathname } = useLocation();
  const [dataToSend, setDataToSend] = React.useState(null);
  const { template, setTemplate } = useContext(UserContext);
  const [loaded, setLoaded] = React.useState(false);
  const [main, setMain] = React.useState(false);
  const [blocks, setblocks] = React.useState(null);

  useEffect(() => {
    if (!loaded) {
      if (!id) {
        //load default template

        if (Object.keys(template.pages).length !== 0) {
          // pages are loaded alreadr
          //if template is already loaded in context

          setDataToSend({
            type: template.type,
            page: "HomePage",
            blocks: template.pages.HomePage.blocks,
          });
          setMain(true);
        } else {
          //template is not loaded in context

          fetchBlocks(blogTemplate.pages.HomePage.blocks); //first fetch blocks from block Ids

          if (blocks) {
            console.log("gotten blocks");
            setLoaded(true);

            setTemplate(
              //store template in context
              {
                type: "blog", //type
                pages: {
                  HomePage: { blocks: blocks },
                  BlogsPage: { blocks: blogTemplate.pages.BlogsPage.blocks },
                },
                data: { blogs: blogTemplate.data.blogs },
              }
            );

            setDataToSend({
              type: "blog",
              page: "HomePage",
              blocks: blocks,
            });
            setMain(true);
          }
        }
      }
    }
  }, [blocks]);

  const fetchBlocks = (blockIds) => {
    axios
      .post("http://localhost:8800/api/blocks/get", { blockIds })
      .then((res) => {
        let fetchedBlocks = res.data.Blocks;

        const blocks = mapBlocks(fetchedBlocks);
        setblocks(blocks);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return <>{main ? <Main data={dataToSend} /> : <div>Loading...</div>}</>;
};

export default BlogHomePage;
