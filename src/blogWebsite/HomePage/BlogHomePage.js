import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { blogTemplate } from "../../TemplatesData/blogTemplate";
import { useContext } from "react";
import { UserContext } from "../../App";
import { useLocation } from "react-router-dom";

import BeatLoader from "react-spinners/BeatLoader";
import Main from "../../Main";
import axios from "axios";
import { mapBlocks } from "../../utilityFunctions/helperFunctions";

const BlogHomePage = () => {
  const { id } = useParams();
  const { pathname } = useLocation();
  const [loading, setLoading] = React.useState(true);
  const [dataToSend, setDataToSend] = React.useState(null);
  const { template, setTemplate } = useContext(UserContext);
  const [loaded, setLoaded] = React.useState(false);
  const [main, setMain] = React.useState(false);
  const [blocks, setblocks] = React.useState(null);

  useEffect(() => {
    if (!loaded) {
      console.log("template.type", template.type);
      if (!id) {
        //load default template

        if (template.pages?.HomePage) {
          // home page are loaded already in context
          //if template is already loaded in context
          console.log("not loaded in context");

          setDataToSend({
            type: 'blog',
            page: "HomePage",
            blocks: template.pages.HomePage.blocks,
          });
          setMain(true);
        } else {
          //home page is not loaded in context

          fetchBlocks(blogTemplate.pages.HomePage.blocks); //first fetch blocks from block Ids

          if (blocks) {
            console.log("gotten blocks");
            setLoaded(true);

            setTemplate(
              //store template in context
              {
                type: "blog", //type
                pages: {
                  ...template.pages,
                  HomePage: { blocks: blocks },
                },
                ...template,
              }
            );

            setDataToSend({
              type: "blog",
              page: "HomePage",
              blocks: blocks,
            });
            setMain(true);
            setLoading(false);
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
