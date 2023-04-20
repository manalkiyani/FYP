import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { blogTemplate } from "../../TemplatesData/blogTemplate";
import {
  getTemplateData,
  fetchAdminBlocks,
} from "../../utilityFunctions/axiosFunctions";
import BeatLoader from "react-spinners/BeatLoader";
import Main from "../../CommonComponnets/Main";
import { useLocalStorageState } from "ahooks";
import { useTemplateData } from "../../customHooks/useTemplateData";

const BlogTemplateData = () => {
  const { loading, dataToSend } = useTemplateData(
    "blog",
    blogTemplate,
    "BlogHomePage",
    "BlogsPage",
    "blogs"
  );
  // const { id } = useParams();

  // const [loading, setLoading] = React.useState(true);
  // const [dataToSend, setDataToSend] = React.useState(null);
  // const [template, setTemplate] = useLocalStorageState("template", {
  //   defaultValue: {
  //     type: "",
  //     pages: {},
  //     data: {},
  //   },
  // });
  // const [main, setMain] = React.useState(false);

  // const checkHomePageinLocalStorage = async () => {
  //   const homePage = template.pages?.HomePage;
  //   console.log("homePage", homePage);
  //   if (homePage) {
  //     setDataForMain(homePage.blocks);

  //     return true;
  //   } else {
  //     return false;
  //   }
  // };

  // const fetchHomePageBlocks = async (blockIds) => {
  //   try {
  //     const blocks = await fetchAdminBlocks(blockIds);
  //     console.log("blocks", blocks);
  //     await setHomePageDataInLocalStorage(blocks);
  //     setDataForMain(blocks);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  // const loadSavedHomePage = async () => {
  //   let homePageBlocks = [];
  //   try {
  //     const savedTemplate = await getTemplateData(id);
  //     console.log(savedTemplate);
  //     if (savedTemplate.pages?.HomePage?.blocks) {
  //       const blocks = await fetchAdminBlocks(
  //         savedTemplate.pages.HomePage.blocks
  //       );
  //       console.log(blocks);
  //       homePageBlocks = blocks;
  //       setHomePageDataInLocalStorage(blocks);
  //     }
  //     setDataForMain(homePageBlocks);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  // const setHomePageDataInLocalStorage = async (blocks) => {
  //   console.log("template", template);
  //   setTemplate({

  //     type: "blog",
  //     pages: {
  //       ...template.pages,
  //       HomePage: { blocks },
  //     },
  //     data: {
  //       ...template.data,
  //     },
  //   });
  //   console.log(template);
  // };
  // const setDataForMain = (blocks) => {

  //   setDataToSend({
  //     type: "blog",
  //     blocks,
  //   });
  // };

  // const fetchBlogsPageData = async (blockIds, blogIds) => {
  //   try {
  //     const blocks = await fetchAdminBlocks(blockIds);

  //     setBlogsPageDataInLocalStorage(blocks, blogIds);
  //     // setDataForMain(blocks, blogIds);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const setBlogsPageDataInLocalStorage = (blocks, blogIds) => {
  //   console.log("setBlogsPageDataInLocalStorage");
  //   setTemplate(
  //     //store template in context
  //     {
  //       type: "blog", //type
  //       pages: { ...template.pages, BlogsPage: { blocks: blocks } },
  //       data: { blogs: blogIds },
  //     }
  //   );
  // };
  // const checkBlogsPageinLocalStorage = async () => {
  //   const BlogsPage = template.pages?.BlogsPage;

  //   if (BlogsPage) {
  //     console.log(template?.data?.blogs);
  //     // setDataForMain(BlogsPage.blocks, template.data.blogs);

  //     return true;
  //   } else {
  //     return false;
  //   }
  // };
  // const loadSavedBlogsPage = async () => {
  //   let BlogsPageBlocks = [];
  //   let BlogIds = [];
  //   try {
  //     const Template = await getTemplateData(id);
  //     console.log(Template);
  //     if (Template.pages?.BlogsPage?.blocks) {
  //       const blocks = await fetchAdminBlocks(Template.pages.BlogsPage.blocks);
  //       console.log(blocks);
  //       BlogsPageBlocks = blocks;
  //     }
  //     if (Template.data?.blogs) {
  //       BlogIds = Template.data.blogs;
  //     }

  //     setBlogsPageDataInLocalStorage(BlogsPageBlocks, BlogIds);
  //     // setDataForMain(BlogsPageBlocks, BlogIds);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const setLocalStorage = async () => {
  //   const homePageInStorage = await checkHomePageinLocalStorage();

  //   const BlogsPageInStorage = await checkBlogsPageinLocalStorage();

  //   if (!homePageInStorage) {
  //     console.log("homepagenotinStorage");
  //     if (id === "001") {
  //       await fetchHomePageBlocks(blogTemplate.pages.HomePage.blocks);
  //     } else {
  //       await loadSavedHomePage();
  //     }
  //   }
  //   console.log("template", template);

  //   if (!BlogsPageInStorage) {
  //     console.log("BlogsPageNotInStorage");
  //     if (id === "001") {
  //       await fetchBlogsPageData(
  //         blogTemplate.pages.BlogsPage.blocks,
  //         blogTemplate.data.blogs
  //       );
  //     } else {
  //       await loadSavedBlogsPage();
  //     }
  //   }
  //   console.log("template", template);
  //    setMain(true);
  //     setLoading(false);
  // };
  // useEffect(() => {
  //   if (template) {
  //     setLocalStorage();
  //   }
  // }, [template]);

  return (
    <>
      {loading ? (
        <center>
          <BeatLoader
            color={"#7890A3"}
            loading={loading}
            size={20}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </center>
      ) : (
        <Main data={dataToSend} />
      )}
    </>
  );
};

export default BlogTemplateData;
