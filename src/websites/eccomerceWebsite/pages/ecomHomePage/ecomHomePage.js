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
