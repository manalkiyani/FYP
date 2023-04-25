import React from "react";
import { productTemplate } from "../../../../TemplatesData/productTemplate";

import BeatLoader from "react-spinners/BeatLoader";
import Main from "../../../CommonComponnets/Main";
import { useTemplateData } from "../../../../customHooks/useTemplateData";

const EcomHomePage = () => {
  const { loading, dataToSend } = useTemplateData(
    "eccomerce",
    productTemplate,
    "EccomerceHomePage",
    "ProductsPage",
    "products"
  );
  // const { id } = useParams();

  // const { template, setTemplate } = useContext(UserContext);

  // const [main, setMain] = React.useState(false);

  // useEffect(() => {
  //   if (dataToSend) {
  //     setMain(true);
  //     setLoading(false);
  //   }
  // }, [dataToSend]);

  // const checkHomePageinContext = () => {
  //   const homePage = template.pages?.HomePage;
  //   console.log("not in context");
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

  //     setTemplateinContext(blocks);
  //     setDataForMain(blocks);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  // const loadSavedTemplate = async () => {
  //   let homePageBlocks = [];
  //   try {
  //     const Template = await getTemplateData(id);
  //     console.log(Template);
  //     if (Template.pages?.HomePage?.blocks) {
  //       const blocks = await fetchAdminBlocks(Template.pages.HomePage.blocks);
  //       console.log(blocks);
  //       homePageBlocks = blocks;
  //     }

  //     setTemplateinContext(homePageBlocks);
  //     setDataForMain(homePageBlocks);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  // const setTemplateinContext = (blocks) => {
  //   setTemplate({
  //     type: "eccomerce",
  //     pages: {
  //       HomePage: { blocks },
  //     },
  //   });
  // };
  // const setDataForMain = (blocks) => {
  //   console.log("inside setDataForMain");
  //   setDataToSend({
  //     type: "eccomerce",
  //     blocks,
  //   });
  // };

  // useEffect(() => {
  //   const inContext = checkHomePageinContext();

  //   if (!inContext) {
  //     if (id === "002") {
  //       fetchHomePageBlocks(productTemplate.pages.HomePage.blocks);
  //     } else {
  //       loadSavedTemplate();
  //     }
  //   }
  // }, []);

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

export default EcomHomePage;
