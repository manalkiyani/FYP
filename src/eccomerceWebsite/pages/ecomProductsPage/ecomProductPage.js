import React, { useEffect ,useContext} from "react";
import { useParams } from "react-router-dom";

import BeatLoader from "react-spinners/BeatLoader";
import { UserContext } from "../../../App";
import BlogMain from '../../../blogWebsite/BlogMain'
import { productTemplate } from "../../../TemplatesData/productTemplate";
import { fetchAdminBlocks,getTemplateData} from "../../../utilityFunctions/axiosFunctions";

const EcomPage = () => {
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
    const ProductsPage = template.pages?.ProductsPage;

    if (ProductsPage) {
      setDataForMain(ProductsPage.blocks, template.data.products);

      return true;
    } else {
      return false;
    }
  };
  //
  const fetchBlogsPageData = async (blockIds, productIds) => {
    try {
      const blocks = await fetchAdminBlocks(blockIds);

      setTemplateinContext(blocks, productIds);
      setDataForMain(blocks, productIds);
    } catch (error) {
      console.error(error);
    }
  };
  //
  const setTemplateinContext = (blocks, productIds) => {
    setTemplate(
      //store template in context
      {
        type: "eccomerce", //type
        pages: { ...template.pages, ProductsPage: { blocks: blocks } },
        data: { ...template.data, products: productIds },
      }
    );
  };
  //
  const setDataForMain = (blocks, productIds) => {
    setDataToSend({
      type: "eccomerce",
      page:'ProductsPage',
      blocks,
      productIds,
    });
  };

  const loadSavedTemplate = async () => {
    let ProsuctsPageBlocks = [];
    let ProductIds = [];
    try {
      const Template = await getTemplateData(id);
      console.log(Template);
      if (Template.pages?.ProductsPage?.blocks) {
        const blocks = await fetchAdminBlocks(Template.pages.ProductsPage.blocks);
        console.log(blocks);
        ProsuctsPageBlocks = blocks;
      }
      if (Template.data?.products) {
        ProductIds = Template.data.products;
      }

      setTemplateinContext(ProsuctsPageBlocks, ProductIds);
      setDataForMain(ProsuctsPageBlocks, ProductIds);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    const inContext = checkBlogsPageinContext();
    //load default template
    if (!inContext) {
      if (id === "002") {
        fetchBlogsPageData(
          productTemplate.pages.ProductsPage.blocks,
          productTemplate.data.products
        );
      } else {
        
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

export default EcomPage;
